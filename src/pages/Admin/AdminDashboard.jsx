// src/pages/Admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { 
  Package, ShoppingBag, LogOut, Edit, Trash2, 
  ChevronLeft, ChevronRight, X, Loader2, Eye 
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Tab state
  const [activeTab, setActiveTab] = useState("products"); // "products" or "orders"

  // Products state
  const [products, setProducts] = useState([]);
  const [productPage, setProductPage] = useState(1);
  const [productTotalPages, setProductTotalPages] = useState(1);
  const [productLoading, setProductLoading] = useState(true);
  const [editModal, setEditModal] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", price: "" });
  const [newImages, setNewImages] = useState({});

  // Orders state
  const [orders, setOrders] = useState([]);
  const [orderPage, setOrderPage] = useState(1);
  const [orderTotalPages, setOrderTotalPages] = useState(1);
  const [orderLoading, setOrderLoading] = useState(true);
  const [orderViewModal, setOrderViewModal] = useState(null); // for viewing details

  const ITEMS_PER_PAGE = 10;

  // Fetch products
  useEffect(() => {
    if (activeTab === "products") fetchProducts();
  }, [activeTab, productPage]);

  const fetchProducts = async () => {
    setProductLoading(true);
    try {
      const res = await api.get("/api/product/list");
      const allProducts = res.data.products || [];
      const start = (productPage - 1) * ITEMS_PER_PAGE;
      const paginated = allProducts.slice(start, start + ITEMS_PER_PAGE);
      setProducts(paginated);
      setProductTotalPages(Math.ceil(allProducts.length / ITEMS_PER_PAGE));
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setProductLoading(false);
    }
  };

  // Fetch orders
  useEffect(() => {
    if (activeTab === "orders") fetchOrders();
  }, [activeTab, orderPage]);

  const fetchOrders = async () => {
    setOrderLoading(true);
    try {
      const res = await api.post("/api/order/list", {});
      const allOrders = res.data.orders || [];
      const start = (orderPage - 1) * ITEMS_PER_PAGE;
      const paginated = allOrders.slice(start, start + ITEMS_PER_PAGE);
      setOrders(paginated);
      setOrderTotalPages(Math.ceil(allOrders.length / ITEMS_PER_PAGE));
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setOrderLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.post("/api/product/remove", { id });
      alert("Product deleted");
      fetchProducts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const openEditModal = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
    });
    setNewImages({});
    setEditModal(product);
  };

  const handleUpdateChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) setNewImages({ ...newImages, [key]: file });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("id", editModal._id);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);

    Object.entries(newImages).forEach(([key, file]) => {
      data.append(key, file);
    });

    try {
      const res = await api.post("/api/product/update", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        alert("Product updated");
        setEditModal(null);
        fetchProducts();
      }
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await api.post("/api/order/delete", { orderId: id }); // add this endpoint if needed
      alert("Order deleted");
      fetchOrders();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.post("/api/order/status", { orderId, status: newStatus });
      alert("Status updated");
      fetchOrders();
    } catch (err) {
      alert("Status update failed");
    }
  };

  const openOrderViewModal = (order) => {
    setOrderViewModal(order);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("products")}
            className={`pb-4 px-6 font-medium text-lg transition-colors ${
              activeTab === "products"
                ? "border-b-4 border-teal-600 text-teal-700"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-4 px-6 font-medium text-lg transition-colors ${
              activeTab === "orders"
                ? "border-b-4 border-teal-600 text-teal-700"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Orders
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "products" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800">Products Management</h2>
              <Link
                to="/admin/addproduct"
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
              >
                <Package size={20} /> Add New Product
              </Link>
            </div>

            {productLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-teal-600" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                No products found. Add your first product!
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition"
                    >
                      <div className="h-48 bg-slate-100 flex items-center justify-center">
                        <img
                          src={product.image?.[0] || "https://via.placeholder.com/300"}
                          alt={product.name}
                          className="max-h-full object-contain"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2 truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <p className="text-xl font-bold text-teal-600 mb-4">
                          ₹{product.price}
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => openEditModal(product)}
                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            <Edit size={18} /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                          >
                            <Trash2 size={18} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {productTotalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12">
                    <button
                      onClick={() => setProductPage(p => Math.max(1, p - 1))}
                      disabled={productPage === 1}
                      className="p-3 rounded-full bg-slate-200 disabled:opacity-50 hover:bg-slate-300 transition"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-slate-700 font-medium">
                      Page {productPage} of {productTotalPages}
                    </span>
                    <button
                      onClick={() => setProductPage(p => Math.min(productTotalPages, p + 1))}
                      disabled={productPage === productTotalPages}
                      className="p-3 rounded-full bg-slate-200 disabled:opacity-50 hover:bg-slate-300 transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {activeTab === "orders" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800">Orders Management</h2>
            </div>

            {orderLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-teal-600" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                No orders found yet.
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div>
                          <p className="text-sm text-slate-500">Order ID</p>
                          <p className="text-xl font-bold text-slate-800">#{order._id.slice(-8)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">Amount</p>
                          <p className="text-xl font-bold text-teal-700">₹{order.amount}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 mb-4">
                        <div>
                          <p className="text-sm text-slate-500">Status</p>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="mt-1 px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                          >
                            <option value="Order placed">Order placed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Payment</p>
                          <p className="font-medium">
                            {order.paymentMethod} {order.payment ? "(Paid)" : "(Pending)"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Date</p>
                          <p className="font-medium">
                            {new Date(order.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => openOrderViewModal(order)}
                          className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          <Eye size={18} /> View Details
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                          <Trash2 size={18} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {orderTotalPages > 1 && (
                  <div className="flex justify-center items-center gap-6 mt-12">
                    <button
                      onClick={() => setOrderPage(p => Math.max(1, p - 1))}
                      disabled={orderPage === 1}
                      className="p-3 rounded-full bg-white border shadow-sm disabled:opacity-50 hover:bg-slate-50 transition"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-lg font-medium text-slate-700">
                      Page {orderPage} of {orderTotalPages}
                    </span>
                    <button
                      onClick={() => setOrderPage(p => Math.min(orderTotalPages, p + 1))}
                      disabled={orderPage === orderTotalPages}
                      className="p-3 rounded-full bg-white border shadow-sm disabled:opacity-50 hover:bg-slate-50 transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Edit Product Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Edit Product</h2>
              <button
                onClick={() => setEditModal(null)}
                className="text-slate-500 hover:text-slate-800"
              >
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleUpdateChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Price (₹)</label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  New Images (optional - replaces all)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {["image1", "image2", "image3", "image4"].map((key, i) => (
                    <label key={key} className="cursor-pointer">
                      <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition overflow-hidden">
                        {newImages[key] ? (
                          <img
                            src={URL.createObjectURL(newImages[key])}
                            alt="preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-slate-500 text-sm">Image {i+1}</span>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, key)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setEditModal(null)}
                  className="px-6 py-3 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Order Modal */}
      {orderViewModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <button
                onClick={() => setOrderViewModal(null)}
                className="text-slate-500 hover:text-slate-800"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-500">Order ID</p>
                  <p className="font-bold text-slate-800">#{orderViewModal._id.slice(-8)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="font-medium">{orderViewModal.status}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="text-xl font-bold text-teal-700">₹{orderViewModal.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Placed on</p>
                  <p className="font-medium">
                    {new Date(orderViewModal.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Payment Method</p>
                  <p className="font-medium">
                    {orderViewModal.paymentMethod} {orderViewModal.payment ? "(Paid)" : "(Pending)"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500 mb-2">Delivery Address</p>
                <p className="text-slate-700 whitespace-pre-line">
                  {orderViewModal.address?.fullAddress || "No address saved"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500 mb-3">Items ({orderViewModal.items.length})</p>
                <div className="space-y-4">
                  {orderViewModal.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 bg-slate-50 p-4 rounded-lg">
                      <div className="w-16 h-16 bg-white rounded-md flex-shrink-0 overflow-hidden border">
                        {/* Image placeholder - fetch if needed */}
                      </div>
                      <div>
                        <p className="font-medium">Item {idx + 1}</p>
                        <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}