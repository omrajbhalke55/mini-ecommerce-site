import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { cartCount, wishlist } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch(e) {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
      setMenuOpen(false);
    }
  }

  // Get initials from user name
  function getInitials(name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  function handleLogout() {
    logout();
    setDropdownOpen(false);
    navigate("/");
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-white border-b border-[#6B8A9B]/30 shadow-sm">
      <div className="max-w-[1200px] mx-auto h-full flex items-center gap-5 px-5">

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src={logo} className="h-12 w-auto" alt="MediHAA logo" />
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 items-center bg-[#F5FAFF] border border-[#6B8A9B] rounded-full px-4 py-2 max-w-xl">
          <svg className="w-4 h-4 text-zinc-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search medicines, supplements…"
            className="bg-transparent outline-none text-sm w-full text-zinc-700 placeholder-zinc-400"
          />
          {search && (
            <button onClick={() => { setSearch(""); navigate("/"); }} className="text-zinc-400 text-lg ml-1">×</button>
          )}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">

          {/* Cart */}
          <div className="relative">
            <Link to="/cart">
              <button className="flex items-center gap-2 text-white text-sm font-medium px-3 py-2 rounded-md bg-[#2AA7A1] hover:bg-[#23918c] cursor-pointer transition-colors border-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Cart
              </button>
            </Link>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 pointer-events-none">
                {cartCount}
              </span>
            )}
          </div>

          {/* Profile OR Login */}
          {currentUser ? (
            // PROFILE AVATAR + DROPDOWN
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="w-9 h-9 rounded-full bg-[#2AA7A1] text-white text-sm font-bold flex items-center justify-center cursor-pointer border-none hover:bg-[#23918c] transition-colors focus:outline-none"
                title={currentUser.name}
              >
                {getInitials(currentUser.name)}
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-white rounded-xl shadow-card-lg border border-gray-100 py-2 z-50">

                  {/* User info header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="text-sm font-semibold text-gray-800 truncate">{currentUser.name}</div>
                    <div className="text-xs text-gray-400 truncate">{currentUser.email}</div>
                  </div>

                  {/* Menu items */}
                  <Link
                    to="/favourites"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F5FAFF] transition-colors no-underline"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2AA7A1" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    My Favourites
                    {wishlist.length > 0 && (
                      <span className="ml-auto bg-red-100 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F5FAFF] transition-colors no-underline"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2AA7A1" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    My Profile
                  </Link>

                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors bg-transparent border-none cursor-pointer text-left"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Log Out
                    </button>
                  </div>

                </div>
              )}
            </div>
          ) : (
            // LOGIN BUTTON (not logged in)
            <Link to="/login">
              <button className="flex items-center gap-2 text-[#2AA7A1] text-sm font-semibold px-3 py-2 rounded-md border border-[#2AA7A1] bg-transparent hover:bg-[#2AA7A1] hover:text-white cursor-pointer transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                Login
              </button>
            </Link>
          )}

        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1"
        >
          <span className={`block w-6 h-0.5 bg-zinc-800 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-zinc-800 transition-opacity ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-zinc-800 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-zinc-200 flex flex-col p-5 gap-3 md:hidden z-50">
          {/* Mobile search */}
          <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-full px-4 py-2">
            <svg className="w-4 h-4 text-zinc-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text" value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search..." className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          {/* Mobile cart */}
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            <button className="flex items-center justify-center gap-2 bg-[#2AA7A1] text-white text-sm font-medium px-5 py-2.5 rounded-full w-full border-none cursor-pointer">
              Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          </Link>

          {/* Mobile: logged in links */}
          {currentUser ? (
            <>
              <Link to="/favourites" onClick={() => setMenuOpen(false)} className="text-sm text-gray-700 text-center py-2 no-underline hover:text-[#2AA7A1]">
                ♡ My Favourites {wishlist.length > 0 && `(${wishlist.length})`}
              </Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-sm text-gray-700 text-center py-2 no-underline hover:text-[#2AA7A1]">
                My Profile
              </Link>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="text-sm text-red-500 text-center py-2 bg-transparent border-none cursor-pointer"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-[#2AA7A1] text-center font-semibold py-2 no-underline">
              Log In / Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}