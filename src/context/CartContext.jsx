import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [coupon, setCoupon] = useState(null);

    // ADD TO CART
    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find(item => item.id === product.id);

            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { ...product, quantity: 1 }];
        });
    };

    // REMOVE ITEM
    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    //  UPDATE QUANTITY
    const updateQuantity = (id, qty) => {
        if (qty < 1) return;

        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: qty } : item
            )
        );
    };

    // CLEAR CART
    const clearCart = () => {
        setCartItems([]);
    };

    // APPLYING COUPONS
    const applyCoupon = (code) => {
        if (code === "SAVE10") {
            setCoupon(code);
            return true;
        }
        return false;
    };

    const removeCoupon = () => {
        setCoupon(null);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            coupon,
            applyCoupon,
            removeCoupon
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;