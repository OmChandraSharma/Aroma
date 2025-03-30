require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));  // Allow frontend requests
app.use(cookieParser());  // Enable cookies

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' }); // Short-lived access token (15 min)
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' }); // Long-lived refresh token (7 days)
};

// 🔹 Register User
app.post('/signup', async (req, res) => {
    const { username, email, phone_number, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING id, username, email, phone_number',
            [username, email, phone_number, hashedPassword]
        );
        res.status(201).json({ success: true, redirect: "/login" });

    } catch (error) {
        res.status(500).json({ error: 'User registration failed' });
    }
});

// 🔹 Login User
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(400).json({ error: 'Invalid credentials' });

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store refresh token in database (optional but recommended)
        await pool.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [refreshToken, user.id]);

        // Send refresh token as HTTP-only cookie (secure)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set true in production
            sameSite: 'Strict',
        });

        res.json({ accessToken, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// 🔹 Refresh Token Route
app.post('/refresh', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(403).json({ error: 'Access denied, no refresh token' });

    try {
        const user = await pool.query('SELECT * FROM users WHERE refresh_token = $1', [refreshToken]);
        if (user.rows.length === 0) return res.status(403).json({ error: 'Invalid refresh token' });

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ error: 'Invalid refresh token' });

            const accessToken = generateAccessToken({ id: decoded.id });
            res.json({ accessToken });
        });
    } catch (error) {
        res.status(500).json({ error: 'Token refresh failed' });
    }
});

// 🔹 Logout (Clear Refresh Token)
app.post('/logout', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204); // No content, user already logged out

    try {
        await pool.query('UPDATE users SET refresh_token = NULL WHERE refresh_token = $1', [refreshToken]);
        res.clearCookie('refreshToken');
        res.json({ success: true, message: 'Logged out' });
    } catch (error) {
        res.status(500).json({ error: 'Logout failed' });
    }
});

// 🔹 Middleware to Protect Routes
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token is invalid or expired' });

        req.user = user;
        next();
    });
};

// 🔹 Protected Route Example
app.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [req.user.id]);
        res.json(user.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve profile' });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
