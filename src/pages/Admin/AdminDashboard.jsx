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
  const [activeTab, setActiveTab] = useState("products");

  // Shared pagination
  const ITEMS_PER_PAGE = 10;

  // Products tab state
  const [products, setProducts] = useState([]);
  const [productPage, setProductPage] = useState(1);
  const [productTotalPages, setProductTotalPages] = useState(1);
  const [productLoading, setProductLoading] = useState(true);

  const [editProductModal, setEditProductModal] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    amazonLink: ""
  });
  const [newProductImages, setNewProductImages] = useState({});

  // Orders tab state
  const [orders, setOrders] = useState([]);
  const [orderPage, setOrderPage] = useState(1);
  const [orderTotalPages, setOrderTotalPages] = useState(1);
  const [orderLoading, setOrderLoading] = useState(true);
  const [viewOrderModal, setViewOrderModal] = useState(null);

  // Cache for product details in orders
  const [productCache, setProductCache] = useState({});

  // Fetch products
  useEffect(() => {
    if (activeTab === "products") fetchProducts();
  }, [activeTab, productPage]);

  const fetchProducts = async () => {
    setProductLoading(true);
    try {
      const res = await api.get("/api/product/list");
      const all = res.data.products || [];
      const start = (productPage - 1) * ITEMS_PER_PAGE;
      setProducts(all.slice(start, start + ITEMS_PER_PAGE));
      setProductTotalPages(Math.ceil(all.length / ITEMS_PER_PAGE));
    } catch (err) {
      console.error(err);
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
      const all = res.data.orders || [];
      const start = (orderPage - 1) * ITEMS_PER_PAGE;
      const paginated = all.slice(start, start + ITEMS_PER_PAGE);
      setOrders(paginated);
      setOrderTotalPages(Math.ceil(all.length / ITEMS_PER_PAGE));

      // Load product details
      await loadProductDetails(paginated);
    } catch (err) {
      console.error(err);
    } finally {
      setOrderLoading(false);
    }
  };

  const loadProductDetails = async (currentOrders) => {
    const needed = new Set();
    currentOrders.forEach(o => o.items.forEach(i => {
      if (!productCache[i.itemId]) needed.add(i.itemId);
    }));

    if (needed.size === 0) return;

    try {
      const promises = [...needed].map(id => 
        api.post("/api/product/single", { productId: id })
      );
      const results = await Promise.all(promises);
      const newCache = { ...productCache };
      results.forEach(r => {
        if (r.data.success) {
          newCache[r.data.product._id] = r.data.product;
        }
      });
      setProductCache(newCache);
    } catch (err) {
      console.error(err);
    }
  };

  // Product actions
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.post("/api/product/remove", { id });
      alert("Product deleted");
      fetchProducts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const openProductEdit = (p) => {
    setProductForm({
      name: p.name,
      description: p.description,
      price: p.price,
      amazonLink: p.amazonLink || ""
    });
    setNewProductImages({});
    setEditProductModal(p);
  };

  const handleProductFormChange = (e) => {
    setProductForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleProductImage = (e, key) => {
    const file = e.target.files[0];
    if (file) setNewProductImages(f => ({ ...f, [key]: file }));
  };

  const submitProductUpdate = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("id", editProductModal._id);
    fd.append("name", productForm.name);
    fd.append("description", productForm.description);
    fd.append("price", productForm.price);
    fd.append("amazonLink", productForm.amazonLink);

    Object.entries(newProductImages).forEach(([k, f]) => fd.append(k, f));

    try {
      const res = await api.post("/api/product/update", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data.success) {
        alert("Product updated");
        setEditProductModal(null);
        fetchProducts();
      } else {
        alert(res.data.message || "Update failed");
      }
    } catch (err) {
      alert("Failed to update product");
    }
  };

  // Order actions
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete order?")) return;
    try {
      await api.post("/api/order/delete", { orderId: id });
      alert("Order deleted");
      fetchOrders();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const changeStatus = async (orderId, status) => {
    try {
      await api.post("/api/order/status", { orderId, status });
      alert("Status updated");
      fetchOrders();
    } catch (err) {
      alert("Status update failed");
    }
  };

  const viewOrder = (order) => {
    setViewOrderModal(order);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("products")}
            className={`pb-4 px-8 font-semibold text-lg transition-colors ${
              activeTab === "products"
                ? "border-b-4 border-teal-600 text-teal-700"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-4 px-8 font-semibold text-lg transition-colors ${
              activeTab === "orders"
                ? "border-b-4 border-teal-600 text-teal-700"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Orders
          </button>
        </div>
      </div>

      {/* Main content wrapper */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {activeTab === "products" && (
          <>
            <header className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800">Products</h2>
              <Link
                to="/admin/addproduct"
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition shadow-sm"
              >
                <Package size={20} /> Add Product
              </Link>
            </header>

            {productLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-teal-600" />
              </div>
            ) : products.length === 0 ? (
              <p className="text-center py-20 text-slate-500 text-lg">
                No products yet. Add your first one!
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map(p => (
                    <article
                      key={p._id}
                      className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden hover:shadow-xl transition-all"
                    >
                      <div className="h-48 bg-slate-50 flex items-center justify-center p-4">
                        <img
                          src={p.image?.[0] || "https://via.placeholder.com/300"}
                          alt={p.name}
                          className="max-h-full object-contain"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                          {p.name}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                          {p.description}
                        </p>
                        <p className="text-xl font-bold text-teal-600 mb-4">
                          ₹{p.price}
                        </p>

                        {p.amazonLink && (
                          <a
                            href={p.amazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-sm text-orange-600 hover:text-orange-700 mb-4 underline"
                          >
                            Amazon link →
                          </a>
                        )}

                        <div className="flex gap-3">
                          <button
                            onClick={() => openProductEdit(p)}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                          >
                            <Edit size={18} /> Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(p._id)}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                          >
                            <Trash2 size={18} /> Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {productTotalPages > 1 && (
                  <nav className="flex justify-center gap-6 mt-12">
                    <button
                      disabled={productPage === 1}
                      onClick={() => setProductPage(p => Math.max(1, p - 1))}
                      className="p-3 rounded-full bg-white border disabled:opacity-50 hover:bg-slate-50 transition"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-lg font-medium text-slate-700">
                      Page {productPage} / {productTotalPages}
                    </span>
                    <button
                      disabled={productPage === productTotalPages}
                      onClick={() => setProductPage(p => Math.min(productTotalPages, p + 1))}
                      className="p-3 rounded-full bg-white border disabled:opacity-50 hover:bg-slate-50 transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </nav>
                )}
              </>
            )}
          </>
        )}

        {activeTab === "orders" && (
          <>
            <header className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800">Orders</h2>
            </header>

            {orderLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-teal-600" />
              </div>
            ) : orders.length === 0 ? (
              <p className="text-center py-20 text-slate-500 text-lg">
                No orders have been placed yet.
              </p>
            ) : (
              <>
                <div className="space-y-6">
                  {orders.map(order => (
                    <article
                      key={order._id}
                      className="bg-white rounded-2xl shadow border border-slate-200 p-6 hover:shadow-xl transition-all"
                    >
                      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                          <p className="text-sm text-slate-500">Order ID</p>
                          <p className="text-xl font-bold text-slate-900">
                            #{order._id.slice(-8)}
                          </p>
                        </div>
                        <p className="text-2xl font-bold text-teal-700">
                          ₹{order.amount}
                        </p>
                      </header>

                      <div className="grid md:grid-cols-4 gap-6 mb-6">
                        <div>
                          <p className="text-sm text-slate-500">Status</p>
                          <select
                            value={order.status}
                            onChange={e => changeStatus(order._id, e.target.value)}
                            className="mt-1 w-full px-3 py-2 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          >
                            <option>Order placed</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                          </select>
                        </div>

                        <div>
                          <p className="text-sm text-slate-500">Payment</p>
                          <p className="font-medium mt-1">
                            {order.paymentMethod} {order.payment ? "✓ Paid" : "⌛ Pending"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-slate-500">Date</p>
                          <p className="font-medium mt-1">
                            {new Date(order.date).toLocaleDateString("en-IN")}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-slate-500">Customer</p>
                          <p className="font-medium mt-1 text-slate-700">
                            {order.userId.slice(-6)}
                          </p>
                        </div>
                      </div>

                      <footer className="flex gap-4">
                        <button
                          onClick={() => viewOrder(order)}
                          className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
                        >
                          <Eye size={20} /> Details
                        </button>
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition"
                        >
                          <Trash2 size={20} /> Delete
                        </button>
                      </footer>
                    </article>
                  ))}
                </div>

                {orderTotalPages > 1 && (
                  <nav className="flex justify-center gap-6 mt-12">
                    <button
                      disabled={orderPage === 1}
                      onClick={() => setOrderPage(p => Math.max(1, p - 1))}
                      className="p-3 rounded-full bg-white border disabled:opacity-50 hover:bg-slate-50 transition"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-lg font-medium text-slate-700">
                      Page {orderPage} / {orderTotalPages}
                    </span>
                    <button
                      disabled={orderPage === orderTotalPages}
                      onClick={() => setOrderPage(p => Math.min(orderTotalPages, p + 1))}
                      className="p-3 rounded-full bg-white border disabled:opacity-50 hover:bg-slate-50 transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </nav>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Edit Product Modal */}
      {editProductModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Edit Product</h2>
              <button
                onClick={() => setEditProductModal(null)}
                className="p-2 hover:bg-slate-100 rounded-full"
              >
                <X size={28} />
              </button>
            </div>

            <form onSubmit={submitProductUpdate} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  name="name"
                  value={productForm.name}
                  onChange={handleProductFormChange}
                  className="w-full px-4 py-3 border rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleProductFormChange}
                  rows={4}
                  className="w-full px-4 py-3 border rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price (₹)</label>
                <input
                  name="price"
                  type="number"
                  value={productForm.price}
                  onChange={handleProductFormChange}
                  className="w-full px-4 py-3 border rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Amazon Link (optional)</label>
                <input
                  name="amazonLink"
                  value={productForm.amazonLink}
                  onChange={handleProductFormChange}
                  placeholder="https://amazon.in/..."
                  className="w-full px-4 py-3 border rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Replace Images (optional)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {["image1", "image2", "image3", "image4"].map((k, i) => (
                    <label key={k} className="cursor-pointer">
                      <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition overflow-hidden relative">
                        {newProductImages[k] ? (
                          <img
                            src={URL.createObjectURL(newProductImages[k])}
                            alt={`preview ${i+1}`}
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
                        onChange={e => handleProductImage(e, k)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setEditProductModal(null)}
                  className="px-6 py-3 bg-slate-200 hover:bg-slate-300 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Order Modal */}
      {viewOrderModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <button
                onClick={() => setViewOrderModal(null)}
                className="p-2 hover:bg-slate-100 rounded-full"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-500">Order ID</p>
                  <p className="font-bold text-slate-900">#{viewOrderModal._id.slice(-8)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="font-medium capitalize">{viewOrderModal.status}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="text-xl font-bold text-teal-700">₹{viewOrderModal.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Date</p>
                  <p className="font-medium">
                    {new Date(viewOrderModal.date).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Payment</p>
                  <p className="font-medium">
                    {viewOrderModal.paymentMethod} {viewOrderModal.payment ? "✓ Paid" : "⌛ Pending"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500 mb-2">Delivery Address</p>
                <p className="text-slate-700 whitespace-pre-line">
                  {viewOrderModal.address?.fullAddress || "No address saved"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500 mb-3">Items ({viewOrderModal.items.length})</p>
                <div className="space-y-4">
                  {viewOrderModal.items.map((item, idx) => {
                    const prod = productCache[item.itemId];
                    return (
                      <div key={idx} className="flex gap-4 bg-slate-50 p-4 rounded-lg">
                        <div className="w-16 h-16 bg-white rounded-md overflow-hidden border flex-shrink-0">
                          <img
                            src={prod?.image?.[0] || "https://via.placeholder.com/64"}
                            alt={prod?.name || "Item"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">
                            {prod?.name || `Item ${idx + 1}`}
                          </p>
                          <p className="text-sm text-slate-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}