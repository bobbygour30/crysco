// src/pages/ProductList.jsx
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ShoppingCart, ExternalLink } from "lucide-react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { user, addToCart } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/product/list");
        setProducts(res.data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await addToCart(productId);
      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-br from-teal-600 to-cyan-600 py-28 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-teal-100 text-lg"
          >
            Discover Crysco’s range of premium kitchen towels, garbage bags, and tissue products.
          </motion.p>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {products.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl transition overflow-hidden cursor-pointer"
                onClick={() => handleProductClick(product._id)} // ← Added click to detail page
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition" />

                <div className="relative h-56 flex items-center justify-center p-6">
                  <img
                    src={product.image?.[0] || "https://via.placeholder.com/300x300?text=Product"}
                    alt={product.name}
                    className="max-h-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="relative px-6 pb-8 text-center">
                  <h3 className="text-sm font-semibold text-slate-800 mb-4">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-teal-600 mb-6">
                    ₹{product.price}
                  </p>

                  <div className="flex flex-col gap-3" onClick={(e) => e.stopPropagation()}> {/* Prevent bubbling to detail page */}
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="flex items-center justify-center gap-2 w-full py-3 px-5 text-sm font-semibold rounded-full bg-teal-600 text-white hover:bg-teal-700 transition"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>

                   

                    {product.amazonLink && (
                      <a
                        href={product.amazonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 px-5 text-sm font-semibold rounded-full border border-orange-500 text-orange-600 hover:bg-orange-50 transition"
                      >
                        <ExternalLink size={18} />
                        Buy from Amazon
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Looking for Bulk Orders or Custom Packaging?
          </motion.h2>
          <p className="text-slate-300 max-w-3xl mx-auto mb-10">
            Crysco provides reliable bulk supply and customized solutions across India.
          </p>
          <button className="px-8 py-3 rounded-full bg-teal-600 hover:bg-teal-700 transition font-semibold">
            Contact Sales Team
          </button>
        </div>
      </section>
    </main>
  );
}