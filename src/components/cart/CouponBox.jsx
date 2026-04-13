import { useState } from "react";
import useCart from "../../hooks/useCart";

const CouponBox = () => {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleApply = () => {
    const success = applyCoupon(input.trim());

    if (!success) {
      setError("Invalid coupon");
    } else {
      setError("");
      setInput("");
    }
  };

  return (
    <div className="border p-4 rounded-xl mt-4">

      <h3 className="font-medium mb-2">Apply Coupon</h3>

      {coupon ? (
        <div className="flex justify-between items-center">
          <span className="text-green-600">{coupon} applied</span>
          <button
            onClick={removeCoupon}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter coupon"
              className="border px-2 py-1 flex-1"
            />
            <button
              onClick={handleApply}
              className="bg-[#2AA7A1] text-white px-3 rounded"
            >
              Apply
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs mt-1">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CouponBox;