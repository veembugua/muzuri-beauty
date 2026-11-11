import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-rose-600">
              Muzuri
            </span>
            <span className="text-2xl font-serif font-light text-gold-600 ml-1">
              Beauty
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-rose-600 font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-700 hover:text-rose-600 font-medium transition"
            >
              Shop
            </Link>
            <Link
              to="/shop?category=dresses"
              className="text-gray-700 hover:text-rose-600 font-medium transition"
            >
              Dresses
            </Link>
            <Link
              to="/shop?category=bags"
              className="text-gray-700 hover:text-rose-600 font-medium transition"
            >
              Bags
            </Link>
            <Link
              to="/shop?category=accessories"
              className="text-gray-700 hover:text-rose-600 font-medium transition"
            >
              Accessories
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-rose-600 font-medium transition"
            >
              Visit Us
            </Link>

            <Link to="/cart" className="relative">
              <svg
                className="w-6 h-6 text-gray-700 hover:text-rose-600 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-3 px-4">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 hover:text-rose-600 font-medium py-2"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 hover:text-rose-600 font-medium py-2"
              >
                Shop All
              </Link>
              <Link
                to="/shop?category=dresses"
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 hover:text-rose-600 font-medium py-2"
              >
                Dresses
              </Link>
              <Link
                to="/shop?category=bags"
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 hover:text-rose-600 font-medium py-2"
              >
                Bags
              </Link>
              <Link
                to="/shop?category=accessories"
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 hover:text-rose-600 font-medium py-2"
              >
                Accessories
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="text-rose-600 hover:text-rose-700 font-bold py-2 border-t border-gray-100 mt-2 pt-3"
              >
                📍 Visit Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
