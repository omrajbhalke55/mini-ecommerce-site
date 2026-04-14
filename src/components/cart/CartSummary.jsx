import React from 'react'

import { calculatePricing } from "../../utils/pricing";
import useCart from "../../hooks/useCart";

const CartSummary = () => {
  const { cartItems, coupon } = useCart();

  const { subtotal, tax, discount, total } =
    // calculatePricing(cartItems, "SAVE10"); // temp coupon
    calculatePricing(cartItems, coupon);
    

  return (
    <div className="border p-4 rounded-xl mt-6">

      <h2 className="text-lg font-semibold mb-4">Summary</h2>

      <div className="flex justify-between text-sm mb-2">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span>Tax (5%)</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm mb-2 text-green-600">
        <span>Discount</span>
        <span>-₹{discount.toFixed(2)}</span>
      </div>

      <hr className="my-3" />

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

    </div>
  );
};

export default CartSummary;