// src/pages/Cart.js
import { useEffect, useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const { user, cartCount, updateCartCount } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      const res = await api.post("/api/cart/get", { userId: user._id });

      const cartData = res.data.cartData || {};
      setCart(cartData);

      const productIds = Object.keys(cartData);
      if (productIds.length === 0) {
        setProducts([]);
        updateCartCount(0);
        return;
      }

      const prodRes = await Promise.all(
        productIds.map((id) => api.post("/api/product/single", { productId: id }))
      );
      setProducts(prodRes.map((r) => r.data.product || {}));

      let count = 0;
      Object.values(cartData).forEach((qty) => (count += qty));
      updateCartCount(count);
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      await api.post("/api/cart/update", { 
        userId: user._id,
        itemId, 
        quantity 
      });
      fetchCart();
    } catch (error) {
      console.error("Update quantity error:", error);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    products.forEach((prod) => {
      const qty = cart[prod._id] || 0;
      total += prod.price * qty;
    });
    return total;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {products.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => {
                const qty = cart[prod._id] || 0;
                return (
                  <tr key={prod._id}>
                    <td>{prod.name}</td>
                    <td>₹{prod.price}</td>
                    <td>
                      <input
                        type="number"
                        value={qty}
                        onChange={(e) => handleUpdateQuantity(prod._id, parseInt(e.target.value))}
                        min="1"
                      />
                    </td>
                    <td>₹{prod.price * qty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-4">
            <h2>Total: ₹{calculateTotal()}</h2>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-teal-500 text-white px-4 py-2 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}