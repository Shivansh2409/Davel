import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";

const Nav_2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigateTo = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const navLinks = [
    { name: "Dashboard", href: "/" },
    { name: "Projects", href: "/dashboard" },
    { name: "Tasks", href: "/not-found" },
    { name: "Team", href: "/not-found" },
  ];
  function logoutHandler(e) {
    e.preventDefault();
    axios
      .get("/users/logout")
      .then((res) => {
        console.log(res.data);
        // Remove the token from localStorage
        localStorage.removeItem("token");
        // Set the user context to null
        setUser(null);
        // Navigate to the home page
        navigateTo("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <nav className="bg-gray-900/80 backdrop-blur-lg border-b border-white/10 fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pr-8 cursor-pointer"
            onClick={() => navigateTo("/")}
          >
            Davel AI
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                onClick={() => {
                  navigateTo(link.href);
                }}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </a>
            ))}
          </div>

          {/* Right Section - Profile Dropdown */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm text-white">
                    Y
                  </div>
                </button>
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <a
                      href="#"
                      onClick={() => {
                        navigateTo("/not-found");
                      }}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      onClick={logoutHandler}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white">
                  Y
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  You
                </div>
                <div className="text-sm font-medium leading-none text-gray-400">
                  your.email@example.com
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                Your Profile
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav_2;
