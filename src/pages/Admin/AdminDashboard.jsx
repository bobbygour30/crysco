// src/pages/Admin/AdminDashboard.jsx
import { Link, useNavigate } from "react-router-dom";
import { Package, ShoppingBag, LogOut, Users, Settings } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const quickActions = [
    { title: "Add New Product", path: "/admin/addproduct", icon: Package, color: "teal" },
    { title: "View All Orders", path: "/admin/orders", icon: ShoppingBag, color: "cyan" },
    // You can add more later: Users, Settings, Analytics...
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome back</h2>
          <p className="text-slate-600">Manage your products, orders, and store settings</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, idx) => (
            <Link
              key={idx}
              to={action.path}
              className={`group bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-lg hover:border-${action.color}-300 transition-all duration-300`}
            >
              <div className={`w-14 h-14 rounded-xl bg-${action.color}-100 flex items-center justify-center mb-6 group-hover:bg-${action.color}-200 transition-colors`}>
                <action.icon size={28} className={`text-${action.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{action.title}</h3>
              <p className="text-slate-500">Click to manage</p>
            </Link>
          ))}
        </div>

        {/* Stats placeholder */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-slate-800">142</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Products</p>
            <p className="text-3xl font-bold text-slate-800">38</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Revenue</p>
            <p className="text-3xl font-bold text-teal-600">$12,450</p>
          </div>
        </div>
      </div>
    </div>
  );
}