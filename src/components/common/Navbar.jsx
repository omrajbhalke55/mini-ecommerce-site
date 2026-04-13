import { useState } from 'react'
import logo from '../../assets/logo.svg'
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const { cartItems } = useCart();

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }
                `}
            </style>

            <nav className="bg-white h-16 w-full md:px-10 lg:px-10 xl:px-10 px-6 py-4 flex items-center justify-between gap-30 relative">

                {/* LEFT: IMAGE LOGO */}
                <Link to="/">
                    <img src={logo} className="h-14 w-auto" alt="logo" />
                </Link>

                {/* CENTER: SEARCH BAR */}
                <div className="hidden md:flex items-center bg-[#F5FAFF] border border-[#6B8A9B] rounded-full px-4 py-2 w-xl">

                    {/* Search Icon */}
                    <svg className="w-4 h-4 text-zinc-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>

                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none text-sm w-full text-zinc-700 placeholder-zinc-400"
                    />
                </div>

                {/* RIGHT: CART BUTTON */}
                <Link to="/cart">
                <button className="hidden md:flex items-center gap-2 text-white text-sm font-medium px-3 py-2 rounded-md bg-[#2AA7A1] cursor-pointer">

                    {/* Cart Icon */}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>

                    Cart <span>{cartItems.length ? cartItems.length : ""}</span>
                </button>
                </Link>

                {/* MOBILE MENU BUTTON */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1"
                >
                    <span className={`block w-6 h-0.5 bg-zinc-800 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-zinc-800 ${menuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-zinc-800 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* MOBILE MENU */}
                {menuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border-t border-zinc-200 flex flex-col p-5 gap-3 md:hidden z-50">

                        {/* Mobile Search */}
                        <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-full px-4 py-2">
                            <svg className="w-4 h-4 text-zinc-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent outline-none text-sm w-full"
                            />
                        </div>

                        {/* Mobile Cart */}
                        <button className="flex items-center justify-center gap-2 bg-zinc-900 text-white text-sm font-medium px-5 py-2.5 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            Cart
                        </button>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Navbar