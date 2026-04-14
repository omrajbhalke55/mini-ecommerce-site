import { Link } from "react-router-dom";
import { products } from "../../data/product";
import useCart from "../../hooks/useCart";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border rounded-xl p-4 hover:shadow-md transition">
      <Link to={`/products/${product.id}`}>

        {/* Image */}
        <div className="w-full h-40 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain"
          />
        </div>

        {/* Name */}
        <h2 className="mt-3 text-sm font-medium text-zinc-800 line-clamp-2">
          {product.name}
        </h2>

        {/* Rating */}
        <div className="flex items-center mt-1 text-xs">
          {Array(5).fill("").map((_, i) => (
            <span key={i}>
              {product.rating > i ? "⭐" : "☆"}
            </span>
          ))}
          <span className="ml-1 text-zinc-500">
            ({product.rating})
          </span>
        </div>

        {/* Price */}
        <p className="mt-2 text-md font-semibold text-[#2AA7A1]">
          ₹{product.price}
        </p>
      </Link>
      <div className="flex items-center mt-2 text-sm">
        <button
          onClick={() => addToCart(product)}
          className="w-xs py-2 rounded-md bg-[#2AA7A1] text-white hover:bg-[#23918c] transition cursor-pointer"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductCard;