import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import BuySamples from "./pages/BuySamples";
import Inquiry from "./pages/Inquiry";
import ContactUs from "./pages/ContactUs";
import ProtectedRoute from "./components/ProtectedRoute";

/* ✅ AUTH PAGES */
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* ✅ E-COMMERCE & USER PAGES */
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";

/* ✅ ADMIN PAGES */
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddProduct from "./pages/Admin/AddProduct";
import OrderList from "./pages/Admin/OrderList";
import ProductDetail from "./pages/ProductDetail";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
        
      <main className="flex-grow">
        <ScrollToTop />
        <Routes element={<ProtectedRoute />}>
          {/* Public / Marketing Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/samples" element={<BuySamples />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/product/:productId" element={<ProductDetail />} />

          {/* Legal Pages */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User / Shopping Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/myorders" element={<MyOrders />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/addproduct" element={<AddProduct />} />
          <Route path="/admin/orders" element={<OrderList />} />

          {/* Optional: 404 fallback */}
          <Route path="*" element={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-300">404</h1>
                <p className="text-xl mt-4">Page not found</p>
                <a href="/" className="mt-6 inline-block px-6 py-3 bg-teal-600 text-white rounded-full">
                  Back to Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;