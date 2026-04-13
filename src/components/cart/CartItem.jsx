import useCart from "../../hooks/useCart";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center gap-4 border-b py-4">

      {/* Image */}
      <img
        src={item.image}
        className="w-20 h-20 object-contain"
      />

      {/* Info */}
      <div className="flex-1">
        <h2 className="text-sm font-medium">{item.name}</h2>
        <p className="text-zinc-500 text-sm">₹{item.price}</p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="px-2 border cursor-pointer"
        >-</button>

        <span>{item.quantity}</span>

        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="px-2 border cursor-pointer"
        >+</button>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 text-sm cursor-pointer"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;