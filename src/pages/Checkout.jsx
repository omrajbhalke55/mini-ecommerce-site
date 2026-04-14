import useCart from "../hooks/useCart";
import { calculatePricing } from "../utils/pricing";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, coupon, clearCart } = useCart();
  const navigate = useNavigate();

  const { subtotal, tax, discount, total } =
    calculatePricing(cartItems, coupon);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    alert("Order placed successfully!");

    clearCart();

    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Checkout
      </h1>

      {/* Empty Cart */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {/* Order Items */}
          <div className="border rounded-xl p-4 mb-6">
            <h2 className="font-medium mb-4">Order Items</h2>

            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex justify-between text-sm mb-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="border rounded-xl p-4 mb-6">

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2 text-green-600">
              <span>Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

          </div>

          {/* Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-[#2AA7A1] text-white py-3 rounded-full hover:bg-[#23918c] cursor-pointer"
          >
            Place Order
          </button>
        </>
      )}

    </div>
  );
};

export default Checkout;