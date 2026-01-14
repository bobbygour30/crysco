// src/pages/Admin/OrderList.jsx
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { CheckCircle, Clock, Truck, XCircle } from "lucide-react";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.post("/api/order/list", {});
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await api.post("/api/order/status", { orderId, status });
      fetchOrders();
    } catch (err) {
      console.error(err);
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

    const icons = {
      "Order placed": <Clock size={16} />,
      Processing: <Settings size={16} />,
      Shipped: <Truck size={16} />,
      Delivered: <CheckCircle size={16} />,
      Cancelled: <XCircle size={16} />,
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${styles[status] || "bg-gray-100 text-gray-800"}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Orders Management</h1>
        <p className="text-slate-600 mb-8">View and update customer orders</p>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{order._id.slice(-8)}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.userId.slice(-8)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-teal-600">${order.amount}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.items.length} items</td>
                    <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                        className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                      >
                        <option value="Order placed">Order Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="py-16 text-center text-slate-500">
              No orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}