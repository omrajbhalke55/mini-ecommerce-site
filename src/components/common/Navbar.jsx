import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import useCart from "../../hooks/useCart";

export default function Navbar() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSearch(e) {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
      setMenuOpen(false);
    }
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

        {/* Cart */}
        <div className="ml-auto relative">
          <Link to="/cart">
            <button className="flex items-center gap-2 text-white text-sm font-medium px-3 py-2 rounded-md bg-[#2AA7A1] hover:bg-[#23918c] cursor-pointer transition-colors border-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 animate-badge-pop">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>
        </div>

        {/* Hamburger */}
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
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            <button className="flex items-center justify-center gap-2 bg-[#2AA7A1] text-white text-sm font-medium px-5 py-2.5 rounded-full w-full border-none cursor-pointer">
              Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}