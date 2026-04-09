import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="border border-zinc-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer bg-white">

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
        <p className="mt-2 text-lg font-semibold text-[#2AA7A1]">
          ₹{product.price}
        </p>

      </div>
    </Link>
  );
};

export default ProductCard;