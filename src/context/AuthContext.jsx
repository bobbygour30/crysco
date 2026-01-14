// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Restore login state + cart count on every page load / reload
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        // Step 1: Validate token and fetch fresh user data
        const userRes = await api.get("/api/user/me");
        if (userRes.data.success) {
          setUser(userRes.data.user);
          // Step 2: Fetch cart count right after user is restored
          await fetchCartCount();
        } else {
          // Only clear if explicitly unauthorized
          if (userRes.status === 401 || userRes.status === 403) {
            localStorage.removeItem("token");
          }
          setUser(null);
        }
      } catch (err) {
        console.log("Session restore error:", err.response?.data || err.message);
        // Do NOT clear token on network errors — only on clear auth failure
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
        }
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []); // Empty deps = runs once on mount/reload

  const login = async (email, password) => {
    const res = await api.post("/api/user/login", { email, password });
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      await fetchCartCount();
    }
    return res;
  };

  const register = async (name, email, password) => {
    const res = await api.post("/api/user/register", { name, email, password });
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      await fetchCartCount();
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCartCount(0);
  };

  const addToCart = async (itemId) => {
    if (!user) throw new Error("User not logged in");

    const res = await api.post("/api/cart/add", {
      userId: user._id,
      itemId,
    });

    if (res.data.success) {
      await fetchCartCount();
    }

    return res;
  };

  const fetchCartCount = async () => {
    if (!user) return;

    try {
      const res = await api.post("/api/cart/get", { userId: user._id });
      let count = 0;
      const cartData = res.data.cartData || {};
      Object.values(cartData).forEach((qty) => (count += qty));
      setCartCount(count);
      console.log("Cart count refreshed to:", count); // Keep for debug (remove later)
    } catch (err) {
      console.error("Cart count fetch failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        cartCount,
        addToCart,
        fetchCartCount,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};