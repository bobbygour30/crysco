import React from "react";
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import BuySamples from "./pages/BuySamples";
import Inquiry from "./pages/Inquiry";

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
        <Route path="/inquiry" element={<Inquiry/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
