// src/pages/MyOrders.jsx
import { useEffect, useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, ChevronRight, Loader2, Package, Clock, CheckCircle, XCircle 
} from "lucide-react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({}); // Cache product info
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const ORDERS_PER_PAGE = 10;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [user, page, navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/order/userorders", { userId: user._id });
      const allOrders = res.data.orders || [];

      // Filter only successful orders
      const successfulOrders = allOrders.filter(
        order => order.payment === true || order.paymentMethod === "COD"
      );

      // Client-side pagination
      const start = (page - 1) * ORDERS_PER_PAGE;
      const paginated = successfulOrders.slice(start, start + ORDERS_PER_PAGE);
      setOrders(paginated);
      setTotalPages(Math.ceil(successfulOrders.length / ORDERS_PER_PAGE));

      // Fetch product details for displayed orders
      await fetchProductDetails(paginated);
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async (currentOrders) => {
    const newDetails = { ...productDetails };
    const missingIds = new Set();

    currentOrders.forEach(order => {
      order.items.forEach(item => {
        if (!newDetails[item.itemId]) {
          missingIds.add(item.itemId);
        }
      });
    });

    if (missingIds.size === 0) return;

    try {
      const promises = Array.from(missingIds).map(id =>
        api.post("/api/product/single", { productId: id })
      );
      const responses = await Promise.all(promises);
      responses.forEach(res => {
        if (res.data.success) {
          newDetails[res.data.product._id] = res.data.product;
        }
      });
      setProductDetails(newDetails);
    } catch (err) {
      console.error("Failed to fetch product details:", err);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      "Order placed": "bg-yellow-100 text-yellow-800 border-yellow-200",
      Processing: "bg-blue-100 text-blue-800 border-blue-200",
      Shipped: "bg-purple-100 text-purple-800 border-purple-200",
      Delivered: "bg-green-100 text-green-800 border-green-200",
      Cancelled: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${styles[status] || "bg-gray-100 text-gray-800"}`}>
        {status === "Order placed" && <Clock size={14} />}
        {status === "Processing" && <Loader2 size={14} className="animate-spin" />}
        {status === "Shipped" && <Truck size={14} />}
        {status === "Delivered" && <CheckCircle size={14} />}
        {status === "Cancelled" && <XCircle size={14} />}
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-12 w-12 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">My Orders</h1>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition flex items-center gap-2"
          >
            <Package size={20} /> Continue Shopping
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <p className="text-2xl text-slate-600 mb-6">No orders yet</p>
            <p className="text-slate-500 mb-8">Start shopping to see your orders here!</p>
            <button
              onClick={() => navigate("/products")}
              className="px-10 py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition text-lg"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-6 md:p-8 border-b bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Order ID</p>
                    <p className="text-xl font-bold text-slate-800">#{order._id.slice(-8)}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Amount</p>
                      <p className="text-2xl font-bold text-teal-700">₹{order.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Placed on</p>
                      <p className="text-lg font-medium text-slate-700">
                        {new Date(order.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Payment</p>
                      <p className="font-medium">
                        {order.paymentMethod} {order.payment ? "(Paid)" : "(Pending)"}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-slate-500 mb-2">Delivery Address</p>
                    <p className="text-slate-700 whitespace-pre-line">
                      {order.address?.fullAddress || "No address saved"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500 mb-3">Items ({order.items.length})</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.items.map((item, idx) => {
                        const prod = productDetails[item.itemId];
                        return (
                          <div key={idx} className="flex gap-4 bg-slate-50 p-4 rounded-lg">
                            <div className="w-16 h-16 bg-white rounded-md flex-shrink-0 overflow-hidden border">
                              <img
                                src={prod?.image?.[0] || "https://via.placeholder.com/64"}
                                alt={prod?.name || "Product"}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-slate-800">
                                {prod?.name || "Product #" + (idx + 1)}
                              </p>
                              <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-12">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-3 rounded-full bg-white border shadow-sm disabled:opacity-50 hover:bg-slate-50 transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-lg font-medium text-slate-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-3 rounded-full bg-white border shadow-sm disabled:opacity-50 hover:bg-slate-50 transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}