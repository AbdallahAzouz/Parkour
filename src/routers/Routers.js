import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Checkout from "../pages/Checkout";
import {
  Dashboard,
  AddProducts,
  AllProducts,
  Users,
  EditProduct,
} from "../admin";
import AdminOnlyRoute from "./AdminOnlyRoute";
import Contact from "../components/contact/Contact";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/*   <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      /> */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="/collection/:id" element={<Shop />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
      </Route>
      <Route path="/" element={<AdminOnlyRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/all-products" element={<AllProducts />} />
        <Route path="dashboard/add-products" element={<AddProducts />} />
        <Route path="dashboard/edit-product" element={<EditProduct />} />
        <Route path="dashboard/users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default Routers;
