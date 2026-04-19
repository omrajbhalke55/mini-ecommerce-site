import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24"
      fill={filled ? "#ef4444" : "none"}
      stroke={filled ? "#ef4444" : "#9ca3af"} strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

export default function Favourites() {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const { currentUser } = useAuth();

  // Not logged in
  if (!currentUser) {
    return (
      <div className="page-container">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <HeartIcon filled={false} />
          <p className="text-lg font-semibold text-gray-700 mt-4 mb-2">Please log in to see your Favourites</p>
          <p className="text-sm text-gray-400 mb-6">Your saved items will appear here after you log in.</p>
          <Link to="/login" className="px-6 py-2.5 bg-[#2AA7A1] text-white text-sm font-semibold rounded-lg no-underline hover:bg-[#23918c] transition-colors">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  // Empty wishlist
  if (wishlist.length === 0) {
    return (
      <div className="page-container">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gray-200 mb-4">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <p className="text-lg font-semibold text-gray-700 mb-2">No favourites yet</p>
          <p className="text-sm text-gray-400 mb-6">
            Tap the ♡ heart on any product to save it here.
          </p>
          <Link to="/" className="px-6 py-2.5 bg-[#2AA7A1] text-white text-sm font-semibold rounded-lg no-underline hover:bg-[#23918c] transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="mb-6">
        <h1 className="text-[28px] font-bold text-gray-800 mb-1">My Favourites</h1>
        <p className="text-sm text-gray-400">{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
        {wishlist.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-card overflow-hidden flex flex-col">

            {/* Image */}
            <Link to={`/products/${product.id}`} className="block relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-44 object-cover bg-slate-50"
              />
              {/* Remove from favourites */}
              <button
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center cursor-pointer border-none shadow-sm hover:bg-red-100 transition-colors"
                onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                title="Remove from Favourites"
              >
                <HeartIcon filled={true} />
              </button>
            </Link>

            {/* Info */}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <span className="text-[11px] text-[#2AA7A1] font-semibold uppercase tracking-wide">{product.category}</span>
              <Link to={`/products/${product.id}`} className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 no-underline hover:text-[#2AA7A1] transition-colors">
                {product.name}
              </Link>
              <div className="flex items-center gap-2 mt-auto pt-1">
                <span className="text-base font-bold text-[#2AA7A1]">₹{product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <button
                className="w-full py-2 bg-[#2AA7A1] text-white text-sm font-semibold rounded-lg border-none cursor-pointer hover:bg-[#23918c] transition-colors mt-1"
                onClick={() => addToCart(product, 1)}
              >
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}