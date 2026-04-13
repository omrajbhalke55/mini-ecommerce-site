import useCart from "../hooks/useCart";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import CouponBox from "../components/cart/CouponBox";

const Cart = () => {
  const { cartItems } = useCart();

  // ✅ TOTAL CALCULATION
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <h2 className="p-6">Your cart is empty</h2>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Your Cart
      </h1>

      {/* Items */}
      {cartItems.map(item => (
        <CartItem key={item.id} item={item} />
      ))}

      {/* Total */}
      <div className="mt-6 text-right">
        <h2 className="text-xl font-semibold">
          Total: ₹{total}
        </h2>
      </div>
      <CouponBox />
      <CartSummary />

    </div>
  );
};

export default Cart;