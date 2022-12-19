import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

// Components Imports
import Home from "./Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Cart from "./components/Cart";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import SearchedProduct from "./components/pages/SearchedProduct";
import ProCatagory from "./components/ProCatagory";
import CheckoutPage from "./components/pages/CheckoutPage";
import TrackOrder from "./components/pages/TrackOrder";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/account/:id" element={<Account />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/products" element={<AllProducts />} />
        <Route exact path="/products/:id" element={<SearchedProduct />} />
        <Route exact path="/products/category/:id" element={<ProCatagory />} />
        <Route exact path="/product/:id" element={<SingleProduct />} />
        <Route exact path="/checkout" element={<CheckoutPage />} />
        <Route exact path="/order/track" element={<TrackOrder />} />
        <Route exact path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
