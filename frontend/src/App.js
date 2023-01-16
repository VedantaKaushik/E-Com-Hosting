import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

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
import PrivateRoutes from "./components/PrivateRoutes";

const App = () => {
  const User = sessionStorage.getItem("user");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoutes user={User} />}>
        <Route path="/account/:id" element={<Account />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/products/:id" element={<SearchedProduct />} />
      <Route path="/products/category/:id" element={<ProCatagory />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order/track" element={<TrackOrder />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
