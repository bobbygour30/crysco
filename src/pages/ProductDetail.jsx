import { useEffect, useState, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  ArrowLeft,
  Truck,
  RotateCcw,
  IndianRupee,
  Star,
} from "lucide-react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

/* -------------------------------------------------------
   1000+ INDIAN PEOPLE (generated once)
------------------------------------------------------- */
const FIRST_NAMES = [
  "Amit","Rohit","Rahul","Ankit","Vikas","Kunal","Arjun","Suresh","Ramesh",
  "Neha","Pooja","Riya","Ananya","Sneha","Kavita","Priya","Shreya","Isha",
  "Mohit","Deepak","Nikhil","Manish","Yash","Varun","Aakash","Abhishek",
];

const CITIES = [
  "Delhi","Mumbai","Bengaluru","Pune","Noida","Gurgaon","Jaipur",
  "Indore","Ahmedabad","Surat","Chandigarh","Lucknow","Bhopal",
];

const generatePeople = () => {
  const people = [];
  for (let i = 0; i < 1000; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastInitial = String.fromCharCode(65 + (i % 26));
    people.push({
      name: `${first} ${lastInitial}.`,
      city: CITIES[i % CITIES.length],
      time: `${(i % 15) + 1} minutes ago`,
    });
  }
  return people;
};

/* deterministic index from productId */
const getStartIndex = (id, length) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % length;
};

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user, addToCart } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const PEOPLE = useMemo(() => generatePeople(), []);
  const [liveIndex, setLiveIndex] = useState(0);

  /* ---------------- Fetch Product ---------------- */
  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const res = await api.post("/api/product/single", { productId });
      if (res.data.success) {
        setProduct(res.data.product);
        setActiveImg(res.data.product.image[0]);
        setLiveIndex(getStartIndex(productId, PEOPLE.length));
      } else {
        setError("Product not found");
      }
    } catch {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Rotate Live Social Proof ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveIndex((prev) => (prev + 1) % PEOPLE.length);
    }, 10000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, [PEOPLE.length]);

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (error)
    return <div className="min-h-screen flex items-center justify-center">{error}</div>;

  const reviews = product.reviews || [];
  const avgRating =
    reviews.reduce((a, b) => a + b.rating, 0) / (reviews.length || 1);

  const live = PEOPLE[liveIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 py-12 px-4"
    >
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b flex items-center gap-3">
          <button onClick={() => navigate("/products")} className="text-slate-600">
            <ArrowLeft />
          </button>
          <span className="text-sm text-slate-500">Back to products</span>
        </div>

        {/* Main */}
        <div className="grid md:grid-cols-2 gap-10 p-6 md:p-10">

          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden">
              <img
                src={activeImg}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {product.image.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(img)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    activeImg === img ? "border-indigo-500" : "border-transparent"
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Premium Product
            </p>

            <h1 className="text-xl font-semibold text-slate-900">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold flex items-center">
                <IndianRupee size={22} /> {product.price}
              </span>
              <span className="text-sm text-green-600 font-semibold">
                54% OFF
              </span>
            </div>

            

            {/* Ratings */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < avgRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }
                />
              ))}
              <span className="text-sm text-slate-500 ml-2">
                ({reviews.length} reviews)
              </span>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 text-xs text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck size={20} /> Free Delivery
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw size={20} /> Easy Returns
              </div>
              <div className="flex flex-col items-center gap-1">
                <IndianRupee size={20} /> COD Available
              </div>
            </div>

            <button
              onClick={() => {
                if (!user) navigate("/login");
                else addToCart(product._id);
              }}
              className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-900"
            >
              Buy Now
            </button>

            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
            {/* 🌈 LIVE SOCIAL PROOF (BRIGHT + PER PRODUCT UNIQUE) */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 rounded-xl blur opacity-60" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={live.name + live.city}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="relative flex items-center gap-4 bg-white rounded-xl px-4 py-3 shadow-md"
                >
                  <div className="relative">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white items-center justify-center font-bold">
                      {live.name[0]}
                    </span>
                  </div>

                  <div className="text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">
                      {live.name}
                    </span>{" "}
                    from <span className="font-medium">{live.city}</span>
                    <div className="text-xs text-slate-500">
                      just purchased this • {live.time}
                    </div>
                  </div>

                  <span className="ml-auto text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                    LIVE
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
        </div>

        {/* Reviews */}
        <div className="border-t p-8">
          <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>

          {reviews.length === 0 ? (
            <p className="text-slate-500">No reviews yet.</p>
          ) : (
            <div className="space-y-4 max-h-[350px] overflow-y-auto">
              {reviews.map((r, i) => (
                <div key={i} className="border rounded-xl p-4">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-slate-600 mt-1">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}
