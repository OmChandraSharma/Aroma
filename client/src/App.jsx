import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import CartPage from "./pages/cart/Cart.jsx";
import Sell from "./pages/Sell_item/Sell.jsx";

import { saveToken } from "./utils/auth.js";
import "./App.css";

function App() {
  useEffect(() => {
    // Generate and store a dummy JWT token
    const dummyToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
      "eyJ1c2VySWQiOjEsIm5hbWUiOiJKb2huIERvZSJ9." +
      "s5Ot_uZxqS85fWj6LgOn3z-eGLHKj0KAhUJkI0PGE-Y";
    saveToken(dummyToken);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </Router>
  );
}

export default App;
