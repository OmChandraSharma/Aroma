import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/signup.jsx";
import CartPage from "./pages/cart/Cart.jsx"; // adjust path as needed

import "./App.css";
import Sell from "./pages/Sell_item/Sell.jsx";

function App() {
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
