import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const { wishlist, cartItems } = useCart();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="page-container text-center py-20">
        <p className="text-gray-400 mb-4">You are not logged in.</p>
        <Link to="/login" className="text-[#2AA7A1] font-semibold">Go to Login →</Link>
      </div>
    );
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  // Get initials for avatar
  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const joinedDate = new Date(currentUser.joinedAt).toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric"
  });

  return (
    <div className="page-container max-w-2xl">

      <h1 className="text-[28px] font-bold text-gray-800 mb-6">My Profile</h1>

      {/* Profile card */}
      <div className="bg-white rounded-2xl shadow-card p-8 mb-5">
        <div className="flex items-center gap-5 mb-6">
          {/* Avatar circle with initials */}
          <div className="w-16 h-16 rounded-full bg-[#2AA7A1] flex items-center justify-center text-white text-xl font-bold shrink-0">
            {initials}
          </div>
          <div>
            <div className="text-xl font-bold text-gray-800">{currentUser.name}</div>
            <div className="text-sm text-gray-400">{currentUser.email}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-5">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#2AA7A1]">{wishlist.length}</div>
            <div className="text-xs text-gray-400 mt-1">Favourites</div>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="text-2xl font-bold text-[#2AA7A1]">{cartItems.length}</div>
            <div className="text-xs text-gray-400 mt-1">In Cart</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-700">{joinedDate}</div>
            <div className="text-xs text-gray-400 mt-1">Member Since</div>
          </div>
        </div>
      </div>

      {/* Account details */}
      <div className="bg-white rounded-2xl shadow-card p-8 mb-5">
        <h2 className="text-base font-bold text-gray-800 mb-4">Account Details</h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Full Name</span>
            <span className="text-sm font-semibold text-gray-800">{currentUser.name}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm font-semibold text-gray-800">{currentUser.email}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-500">Account ID</span>
            <span className="text-sm font-mono text-gray-400">{currentUser.id}</span>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl shadow-card p-8 mb-5">
        <h2 className="text-base font-bold text-gray-800 mb-4">Quick Links</h2>
        <div className="flex flex-col gap-2">
          <Link
            to="/favourites"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5FAFF] transition-colors no-underline text-gray-700 text-sm font-medium"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2AA7A1" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            My Favourites ({wishlist.length})
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5FAFF] transition-colors no-underline text-gray-700 text-sm font-medium"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2AA7A1" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            My Cart ({cartItems.length} items)
          </Link>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full py-3 border-2 border-red-200 text-red-500 font-semibold rounded-xl bg-transparent cursor-pointer hover:bg-red-50 transition-colors"
      >
        Log Out
      </button>

    </div>
  );
}