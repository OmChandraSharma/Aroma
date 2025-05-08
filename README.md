# Aroma E-commerce Platform

Aroma is a web-based e-commerce marketplace tailored for the IITJ Academy community. It facilitates the buying, selling, and renting of pre-owned items in a secure, user-friendly, and sustainable environment.

##  Project Overview

This platform aims to:
- Support peer-to-peer transactions.
- Promote the reuse of goods to reduce environmental impact.
- Provide a bidding system for auctions.
- Offer a smooth buying and selling experience with secure payment integration.

---

##  Core Features

###  User Management
- Registration, login, and profile handling
- Password recovery and multi-factor authentication
- Address and preference settings

### Item Management
- List, edit, and categorize products
- Inventory and price management
- Upload item images

### Search & Discovery
- Advanced keyword search
- Filter by brand, category, rating, and price
- Sort and save searches

###  Shopping & Bidding
- Add to cart and wishlist
- Bidding system with real-time updates
- Checkout with multiple payment methods

###  Payment & Orders
- Secure payment via Stripe, Razorpay, etc.
- Order tracking and refund processing
- Digital receipts

---

##  User Roles

| Role           | Access Level  | Description                                       |
|----------------|---------------|---------------------------------------------------|
| Guest          | Minimal       | Can browse and search                            |
| Buyer          | Standard      | Can search, bid, and purchase items              |
| Seller         | Extended      | Can list and manage products                     |
| Premium User   | Full          | All features with priority support               |
| Admin          | Complete      | Manage users, transactions, and listings         |

---

##  Tech Stack

### Frontend:
- React / Angular
- HTML5, CSS3 (Responsive Design)

### Backend:
- Node.js with Express / Django
- RESTful APIs

### Database:
- MySQL / PostgreSQL

### Other:
- JWT Authentication
- Cloud storage for images
- Email and SMS services
- Real-time updates via WebSocket or polling

---

### Security Features

- HTTPS, SSL/TLS encryption
- Secure password storage (hashed)
- Login rate limiting
- Encrypted payment data
- Role-based access control



---

##  Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install  # or pip install -r requirements.txt
