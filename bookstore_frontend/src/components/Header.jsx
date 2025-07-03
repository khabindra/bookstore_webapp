import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext"; // ✅ IMPORT

const Header = () => {
  const navigate = useNavigate();
  const { totalItems } = useContext(CartContext); // ✅ USE CONTEXT

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="top-0 py-1 lg:py-2 w-full bg-transparent lg:relative z-50 dark:bg-gray-900">
      <nav className="z-10 sticky top-0 left-0 right-0 max-w-4xl xl:max-w-5xl mx-auto px-5 py-2.5 lg:border-none lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button>
            <div className="flex items-center space-x-2">
              <h2 className="text-black dark:text-white font-bold text-2xl">
                Booknest App
              </h2>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <ul className="flex space-x-10 text-base font-bold text-black/60 dark:text-white">
              <li className="hover:underline hover:underline-offset-4">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:underline hover:underline-offset-4">
                <Link to="/service-page">Our services</Link>
              </li>
              <li className="hover:underline hover:underline-offset-4">
                <Link to="/about-page">About</Link>
              </li>
              <li className="hover:underline hover:underline-offset-4">
                <Link to="/contact-page">Contact</Link>
              </li>

              {storedUser && storedUser.role === "admin" && (
                <li className="hover:underline hover:underline-offset-4">
                  <Link to="/admin-orders">Admin Orders</Link>
                </li>
              )}

              {storedUser && storedUser.role === "user" && (
                <li className="hover:underline hover:underline-offset-4">
                  <Link to="/user-orders">My Orders</Link>
                </li>
              )}
            </ul>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex lg:items-center gap-x-2">
            {!storedUser && (
              <Link to="/signup-page">
                <button className="text-black dark:text-white px-6 py-2.5 font-semibold">
                  Sign up
                </button>
              </Link>
            )}

            {storedUser &&
            (storedUser.role === "user" || storedUser.role === "admin") ? (
              <button
                onClick={logout}
                className="bg-[#ff3b3b] text-white px-6 py-2.5 font-semibold rounded-md hover:shadow-lg transition duration-200"
              >
                Logout
              </button>
            ) : (
              <Link to="/login-page">
                <button className="bg-[#4A3BFF] text-white px-6 py-2.5 font-semibold rounded-md hover:shadow-lg transition duration-200">
                  Login
                </button>
              </Link>
            )}

            {storedUser && storedUser.role === "admin" && (
              <Link to="/create-page">
                <button className="bg-[#05a8f3] text-white px-6 py-2.5 font-semibold rounded-md hover:shadow-lg transition duration-200">
                  Add Books +
                </button>
              </Link>
            )}

            {storedUser && storedUser.role === "user" && (
              <button
                className="relative flex items-center px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                onClick={() => navigate("/cart")}
              >
                <FaShoppingCart className="mr-2 text-xl text-gray-700" />
                <span className="font-semibold text-gray-700">Cart</span>

                {/* ✅ Cart Count Badge */}
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              className="focus:outline-none text-slate-200 dark:text-white"
              onClick={toggleMobileMenu}
            >
              <svg
                className="text-2xl text-slate-800 dark:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                height="1em"
                width="1em"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu: stays same... */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 space-y-4 text-base font-semibold text-black dark:text-white">
            <Link to="/" className="block" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link
              to="/service-page"
              className="block"
              onClick={toggleMobileMenu}
            >
              Our services
            </Link>
            <Link to="/about-page" className="block" onClick={toggleMobileMenu}>
              About
            </Link>
            <Link
              to="/contact-page"
              className="block"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>

            {storedUser && storedUser.role === "admin" && (
              <Link
                to="/admin-orders"
                className="block w-full text-center py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                onClick={toggleMobileMenu}
              >
                Admin Orders
              </Link>
            )}

            {storedUser && storedUser.role === "user" && (
              <Link
                to="/user-orders"
                className="block w-full text-center py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                onClick={toggleMobileMenu}
              >
                My Orders
              </Link>
            )}

            <div className="flex flex-col gap-y-2 pt-4">
              {!storedUser && (
                <>
                  <Link to="/signup-page" onClick={toggleMobileMenu}>
                    <button className="w-full flex items-center justify-center px-6 py-2.5 font-semibold bg-blue-500 text-black dark:text-white">
                      Sign up
                    </button>
                  </Link>
                  <Link to="/login-page" onClick={toggleMobileMenu}>
                    <button className="w-full flex items-center justify-center rounded-md bg-[#4A3BFF] text-white px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200">
                      Login
                    </button>
                  </Link>
                </>
              )}
              {storedUser && (
                <button
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                  }}
                  className="w-full flex items-center justify-center rounded-md bg-[#ff3b3b] text-white px-6 py-2.5 font-semibold hover:shadow-lg transition duration-200"
                >
                  Logout
                </button>
              )}

              {storedUser && storedUser.role === "admin" && (
                <Link to="/create-page" onClick={toggleMobileMenu}>
                  <button className="w-full bg-[#05a8f3] text-white px-6 py-2.5 font-semibold rounded-md">
                    Add Books +
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
