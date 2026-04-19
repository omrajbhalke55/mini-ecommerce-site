import { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { COUPONS } from "../data/products";
import { useAuthContext } from "./AuthContext";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  // Get current user to scope storage keys
  const { currentUser } = useAuthContext();
  const userKey = currentUser ? currentUser.email : "guest";

  // All keys are now scoped per user
  const [cartItems, setCartItems] = useLocalStorage(`medihaa-cart-${userKey}`, []);
  const [appliedCoupon, setAppliedCoupon] = useLocalStorage(`medihaa-coupon-${userKey}`, null);
  const [wishlist, setWishlist] = useLocalStorage(`medihaa-wishlist-${userKey}`, []);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        const newQty = product.stock
          ? Math.min(existing.quantity + quantity, product.stock)
          : existing.quantity + quantity;
        return prev.map((i) => i.id === product.id ? { ...i, quantity: newQty } : i);
      }
      return [...prev, { ...product, quantity: Math.min(quantity, product.stock || 99) }];
    });
  }, [setCartItems]);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, [setCartItems]);

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        return { ...i, quantity: i.stock ? Math.min(quantity, i.stock) : quantity };
      })
    );
  }, [setCartItems]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedCoupon(null);
  }, [setCartItems, setAppliedCoupon]);

  const applyCoupon = useCallback((code) => {
    const coupon = COUPONS[code.toUpperCase()];
    if (coupon) {
      setAppliedCoupon({ code: code.toUpperCase(), ...coupon });
      return { success: true, label: coupon.label };
    }
    return { success: false };
  }, [setAppliedCoupon]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, [setAppliedCoupon]);

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) =>
      prev.find((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product]
    );
  }, [setWishlist]);

  const isInWishlist = useCallback((id) => wishlist.some((i) => i.id === id), [wishlist]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, appliedCoupon, wishlist, cartCount,
      addToCart, removeFromCart, updateQuantity, clearCart,
      applyCoupon, removeCoupon, toggleWishlist, isInWishlist,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}