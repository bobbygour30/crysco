// src/components/Navbar.jsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Facebook,
  Linkedin,
  Instagram,
  LogOut,
} from "lucide-react";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout, cartCount, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const NAV_ITEMS = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about-us" },
    { label: "Products", path: "/products" },
    { label: "Buy Samples", path: "/samples" },
    { label: "Inquiry", path: "/inquiry" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms & Conditions", path: "/terms" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Safe first name or fallback
  const displayName = user?.name?.split(" ")[0] || "User";

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* TOP BAR */}
      <div className="bg-slate-900 text-slate-100 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <span className="tracking-wide">🚚 Free Shipping on Bulk Orders</span>

          <div className="flex items-center gap-5">
            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-4">
              <Facebook size={16} className="hover:text-teal-400 cursor-pointer transition" />
              <Instagram size={16} className="hover:text-teal-400 cursor-pointer transition" />
              <Linkedin size={16} className="hover:text-teal-400 cursor-pointer transition" />
            </div>

            {/* Auth + Cart */}
            <div className="hidden md:flex items-center gap-5 ml-4">
              {isLoading ? (
                <span className="text-slate-400 text-sm animate-pulse">Loading...</span>
              ) : user ? (
                <div className="flex items-center gap-5">
                  <span className="text-slate-300 font-medium">
                    Hi, {displayName}
                  </span>
                  <Link to="/myorders" className="hover:text-teal-400 transition">
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 hover:text-teal-400 transition"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                  <Link
                    to="/cart"
                    className="flex items-center gap-1.5 hover:text-teal-400 transition font-medium"
                  >
                    <ShoppingCart size={16} />
                    Cart ({cartCount})
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-5">
                  <Link to="/login" className="hover:text-teal-400 transition">
                    Login
                  </Link>
                  <Link to="/signup" className="hover:text-teal-400 transition">
                    Sign Up
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center gap-1.5 hover:text-teal-400 transition"
                  >
                    <ShoppingCart size={16} />
                    Cart (0)
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={assets.logo}
              alt="Crysco Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8 text-slate-800 font-medium">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="relative group transition-colors hover:text-teal-600"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <Link
              to="/contact"
              className="ml-4 px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-600 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>

            {user?.isAdmin && (
              <Link
                to="/admin/dashboard"
                className="ml-4 text-teal-600 hover:text-teal-800 font-semibold"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-slate-800 focus:outline-none"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex items-center justify-between border-b">
            <h2 className="text-xl font-bold text-slate-800">Menu</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-600 hover:text-slate-900"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          <nav className="p-6 flex flex-col gap-5 text-slate-800 font-medium">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setOpen(false)}
                className="py-2 hover:text-teal-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 text-center py-3 px-6 rounded-full font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 transition-all"
            >
              Contact Us
            </Link>

            <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
              {isLoading ? (
                <div className="text-slate-500 animate-pulse">Loading...</div>
              ) : user ? (
                <>
                  <div className="text-slate-700 font-medium">
                    Hi, {displayName}
                  </div>
                  <Link
                    to="/myorders"
                    onClick={() => setOpen(false)}
                    className="block py-2 hover:text-teal-600 transition"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left py-2 hover:text-teal-600 transition"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                  <Link
                    to="/cart"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2 hover:text-teal-600 transition"
                  >
                    <ShoppingCart size={18} /> Cart ({cartCount})
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2 hover:text-teal-600 transition"
                  >
                    <User size={18} /> Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2 hover:text-teal-600 transition"
                  >
                    <User size={18} /> Sign Up
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2 hover:text-teal-600 transition"
                  >
                    <ShoppingCart size={18} /> Cart (0)
                  </Link>
                </>
              )}

              {user?.isAdmin && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setOpen(false)}
                  className="block py-2 text-teal-600 hover:text-teal-800 font-medium transition"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}