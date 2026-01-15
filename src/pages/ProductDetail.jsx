// src/pages/ProductDetail.jsx (NEW FILE)
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, ShoppingCart, ExternalLink, ArrowLeft } from "lucide-react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, addToCart } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/api/product/single", { productId });
      if (res.data.success) {
        setProduct(res.data.product);
      } else {
        setError("Product not found");
      }
    } catch (err) {
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await addToCart(product._id);
      alert("Item added to cart successfully!");
    } catch (error) {
      alert("Failed to add item to cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl text-red-600">{error || "Product not found"}</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8 border-b flex items-center gap-4">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-slate-600 hover:text-teal-700"
          >
            <ArrowLeft size={24} /> Back to Products
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 p-6 md:p-8">
          {/* Images Carousel */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden">
              <img
                src={product.image[0] || "https://via.placeholder.com/600"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.image.slice(1).map((img, idx) => (
                <div key={idx} className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">{product.name}</h1>
            
            <p className="text-2xl md:text-3xl font-bold text-teal-600">₹{product.price}</p>

            <p className="text-slate-600 leading-relaxed">{product.description}</p>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 py-4 text-lg font-semibold rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition"
              >
                <ShoppingCart size={24} /> Add to Cart
              </button>

              

              {product.amazonLink && (
                <a
                  href={product.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-4 text-lg font-semibold rounded-xl bg-orange-600 text-white hover:bg-orange-700 transition"
                >
                  <ExternalLink size={24} /> Buy from Amazon
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}