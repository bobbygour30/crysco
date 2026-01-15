import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // src/pages/Admin/AdminLogin.jsx (relevant part)
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/api/user/admin", { email, password });
    if (res.data.success) {
      localStorage.setItem("adminToken", res.data.token);
      console.log("Admin token saved:", res.data.token.substring(0, 20) + "...");
      navigate("/admin/dashboard");
    } else {
      alert(res.data.message || "Login failed");
    }
  } catch (err) {
    alert(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <h1 className="text-3xl font-bold text-center mb-2 text-slate-800">Admin Login</h1>
        <p className="text-center text-slate-500 mb-8">Sign in to manage your store</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition
              ${loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}