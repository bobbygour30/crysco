import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import assets from "../assets/assets";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* ================= TOP BAR ================= */}
      <div className="bg-slate-900 text-slate-100 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <span className="tracking-wide">
            🚚 Free Shipping on Bulk Orders
          </span>

          <div className="flex items-center gap-4">
            <Facebook size={16} className="hover:text-teal-400 cursor-pointer" />
            <Instagram size={16} className="hover:text-teal-400 cursor-pointer" />
            <Linkedin size={16} className="hover:text-teal-400 cursor-pointer" />

            <div className="hidden md:flex items-center gap-4 ml-6">
              <button className="hover:text-teal-400 transition">
                Login / Register
              </button>
              <button className="flex items-center gap-1 hover:text-teal-400 transition">
                <ShoppingCart size={16} /> Cart (0)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAV ================= */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className="w-30" />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-8 text-slate-700 font-medium">
            {[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/about" },
              { label: "Products", path: "/products" },
              { label: "Buy Samples", path: "/samples" },
              { label: "Inquiry", path: "/inquiry" },
              { label: "Contact Us", path: "/contact" },
              { label: "Privacy Policy", path: "/privacy" },
              { label: "Terms & Conditions", path: "/terms" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="relative group"
              >
                <span>{item.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-teal-500 transition-all group-hover:w-full" />
              </Link>
            ))}

            {/* CTA BUTTON */}
            <button className="relative overflow-hidden px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-teal-300/50">
              <span className="relative z-10">Buy Online</span>
              <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition" />
            </button>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-slate-800"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-6 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <p className="font-bold text-lg">Menu</p>
            <button onClick={() => setOpen(false)}>
              <X size={26} />
            </button>
          </div>

          <nav className="flex flex-col gap-5 text-slate-700 font-medium">
            {[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/about" },
              { label: "Products", path: "/products" },
              { label: "Buy Samples", path: "/samples" },
              { label: "Inquiry", path: "/inquiry" },
              { label: "Contact Us", path: "/contact" },
              { label: "Privacy Policy", path: "/privacy" },
              { label: "Terms & Conditions", path: "/terms" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setOpen(false)}
                className="hover:text-teal-500 transition"
              >
                {item.label}
              </Link>
            ))}

            <button className="mt-6 px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 shadow-md hover:scale-105 transition">
              Buy Online
            </button>

            <div className="mt-6 flex items-center gap-4 text-slate-600">
              <User size={18} />
              <span>Login / Register</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
