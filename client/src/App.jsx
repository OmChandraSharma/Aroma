import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import CartPage from "./pages/cart/Cart.jsx";
import Sell from "./pages/Sell_item/Sell.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx"; // NEW

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/product/:productId" element={<ProductDetails />} />{" "}
        {/* NEW */}
      </Routes>
    </Router>
  );
}

export default App;
