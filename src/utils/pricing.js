import React from 'react'

export const calculatePricing = (cartItems, coupon = null) => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.05; // 5% GST

  let discount = 0;

  // Coupon logic
  if (coupon === "SAVE10") {
    discount = subtotal * 0.1;
  }

  const total = subtotal + tax - discount;

  return {
    subtotal,
    tax,
    discount,
    total
  };
};
