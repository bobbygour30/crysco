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

/* ✅ AUTH PAGES */
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/samples" element={<BuySamples />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* ✅ AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
