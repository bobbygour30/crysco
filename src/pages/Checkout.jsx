// src/pages/Checkout.jsx
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  CreditCard, 
  Home, 
  Truck, 
  ShoppingCart, 
  AlertCircle,
  Loader2 
} from "lucide-react";

function loadRazorpay(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/api/cart/get", { userId: user._id });
      const cartData = res.data.cartData || {};
      setCart(cartData);

      const productIds = Object.keys(cartData);
      if (productIds.length === 0) {
        setProducts([]);
        return;
      }

      const prodRes = await Promise.all(
        productIds.map(id => api.post("/api/product/single", { productId: id }))
      );
      setProducts(prodRes.map(r => r.data.product).filter(Boolean));
    } catch (err) {
      console.error("Fetch cart error:", err);
      setError("Failed to load cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // No delivery charge added here anymore
  const calculateTotal = () => {
    let total = 0;
    products.forEach(prod => {
      const qty = cart[prod._id] || 0;
      total += prod.price * qty;
    });
    return total;
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      setError("Please enter a delivery address");
      return;
    }

    setLoading(true);
    setError(null);

    const amount = calculateTotal(); // pure cart total
    const items = products
      .map(prod => ({
        itemId: prod._id,
        quantity: cart[prod._id] || 0,
      }))
      .filter(item => item.quantity > 0);

    try {
      if (paymentMethod === "COD") {
        const res = await api.post("/api/order/place", {
          userId: user._id,
          items,
          address: { fullAddress: address.trim() }, // saved as object
          amount,
        });

        if (res.data.success) {
          alert("Order placed successfully!");
          navigate("/myorders");
        }
      } else {
        const sdkLoaded = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
        if (!sdkLoaded) throw new Error("Failed to load Razorpay SDK");

        const orderRes = await api.post("/api/order/razorpay", {
          userId: user._id,
          items,
          address: { fullAddress: address.trim() },
          amount,
        });

        const { order } = orderRes.data;

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_your_test_key_here",
          amount: order.amount,
          currency: "INR",
          name: "Crysco",
          description: "Order Payment",
          order_id: order.id,
          handler: async (response) => {
            try {
              const verifyRes = await api.post("/api/order/verifyRazorpay", {
                userId: user._id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verifyRes.data.success) {
                alert("Payment successful!");
                navigate("/myorders");
              } else {
                alert("Payment verification failed");
              }
            } catch (err) {
              alert("Payment verification failed");
            }
          },
          theme: { color: "#0d9488" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error("Order placement error:", err);
      setError(err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-800">
          Secure Checkout
        </h1>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Order Summary */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-6 md:p-8 border-b bg-slate-50">
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                  <ShoppingCart className="text-teal-600" size={24} />
                  Order Summary
                </h2>
              </div>

              {products.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  Your cart is empty. Add items to continue.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {products.map(prod => {
                    const qty = cart[prod._id] || 0;
                    if (qty === 0) return null;
                    return (
                      <div key={prod._id} className="p-6 flex gap-6 hover:bg-slate-50 transition">
                        <div className="w-20 h-20 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                          <img
                            src={prod.image?.[0] || "https://via.placeholder.com/80"}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900">{prod.name}</h3>
                          <p className="text-sm text-slate-600 mt-1">Qty: {qty}</p>
                        </div>
                        <div className="text-right font-semibold text-slate-900">
                          ₹{prod.price * qty}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="p-6 md:p-8 bg-slate-50">
                <div className="flex justify-between text-xl font-bold border-t pt-4">
                  <span>Total</span>
                  <span className="text-teal-700">₹{calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment & Address */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 sticky top-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Home className="text-teal-600" size={24} />
                Delivery Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    rows={4}
                    placeholder="House no, Street, Area, City, State, PIN"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none resize-none transition"
                    required
                  />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                    <CreditCard className="text-teal-600" size={22} />
                    Payment Method
                  </h3>

                  <div className="space-y-4">
                    <label className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:border-teal-500 transition has-[:checked]:border-teal-600 has-[:checked]:bg-teal-50/50">
                      <input
                        type="radio"
                        name="payment"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-teal-600 border-slate-300 focus:ring-teal-500"
                      />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-slate-500">Pay when you receive</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:border-teal-500 transition has-[:checked]:border-teal-600 has-[:checked]:bg-teal-50/50">
                      <input
                        type="radio"
                        name="payment"
                        value="Razorpay"
                        checked={paymentMethod === "Razorpay"}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-teal-600 border-slate-300 focus:ring-teal-500"
                      />
                      <div>
                        <p className="font-medium">Pay Online (Razorpay)</p>
                        <p className="text-sm text-slate-500">UPI, Card, Netbanking</p>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || products.length === 0 || !address.trim()}
                  className="w-full py-4 mt-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-xl hover:from-teal-700 hover:to-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Truck size={20} />
                      Place Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}