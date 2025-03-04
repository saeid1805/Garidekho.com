import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, User, Heart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { colors } from "./CardekhoStyle";

const CardekhoHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-100 py-1 text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <Link
              to="/find-on-road-price"
              className="text-gray-600 hover:text-[#FF6B3A] transition-colors"
            >
              Find On-Road Price
            </Link>
            <Link
              to="/roadside-assistance"
              className="text-gray-600 hover:text-[#FF6B3A] transition-colors"
            >
              Roadside Assistance
            </Link>
            <Link
              to="/car-insurance"
              className="text-gray-600 hover:text-[#FF6B3A] transition-colors"
            >
              Car Insurance
            </Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link
              to="/login"
              className="text-gray-600 hover:text-[#FF6B3A] transition-colors"
            >
              Login / Register
            </Link>
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-gray-600">Show your Love:</span>
              <a href="#" className="text-gray-600 hover:text-[#FF6B3A]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#FF6B3A]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20" r="20" fill="#FF6B3A" />
                <path
                  d="M20 10C14.48 10 10 14.48 10 20C10 25.52 14.48 30 20 30C25.52 30 30 25.52 30 20C30 14.48 25.52 10 20 10ZM20 28C15.59 28 12 24.41 12 20C12 15.59 15.59 12 20 12C24.41 12 28 15.59 28 20C28 24.41 24.41 28 20 28Z"
                  fill="white"
                />
                <path
                  d="M20 15V20L24 22"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-[#FF6B3A]">
                CarDekho
              </span>
              <span className="text-xs text-gray-500 ml-1 mt-2">
                BADHTE INDIA KA BHAROSA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#FF6B3A] font-medium">
                New Cars
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 origin-top-left">
                <Link
                  to="/new-cars"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B3A]"
                >
                  Explore New Cars
                </Link>
                <Link
                  to="/electric-cars"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B3A]"
                >
                  Electric Cars
                </Link>
                <Link
                  to="/popular-cars"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B3A]"
                >
                  Popular Cars
                </Link>
                <Link
                  to="/upcoming-cars"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B3A]"
                >
                  Upcoming Cars
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#FF6B3A] font-medium">
                Used Cars
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 origin-top-left">
                <Link
                  to="/used-cars"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B3A]"
                >
                  Buy Used Cars
                </Link>
                <Link
                  to="/sell-car"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B3A]"
                >
                  Sell My Car
                </Link>
                <Link
                  to="/car-valuation"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B3A]"
                >
                  Used Car Valuation
                </Link>
              </div>
            </div>

            <Link
              to="/sell"
              className="text-gray-700 hover:text-[#FF6B3A] font-medium"
            >
              Sell
            </Link>

            <Link
              to="/compare"
              className="text-gray-700 hover:text-[#FF6B3A] font-medium"
            >
              Compare
            </Link>

            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#FF6B3A] font-medium">
                News & Reviews
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 origin-top-left">
                <Link
                  to="/car-news"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B3A]"
                >
                  Car News
                </Link>
                <Link
                  to="/user-reviews"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B3A]"
                >
                  User Reviews
                </Link>
                <Link
                  to="/road-tests"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B3A]"
                >
                  Road Tests
                </Link>
                <Link
                  to="/videos"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B3A]"
                >
                  Videos
                </Link>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-[#FF6B3A] font-medium">
                More
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 origin-top-right">
                <Link
                  to="/car-accessories"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B3A]"
                >
                  Car Accessories
                </Link>
                <Link
                  to="/dealer-info"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B3A]"
                >
                  Dealer Info
                </Link>
              </div>
            </div>
          </nav>

          {/* Search and User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search..."
                className="w-40 lg:w-60 h-9 pl-8 pr-4 rounded-full bg-gray-100 border-gray-200 focus:bg-white focus:border-[#FF6B3A] focus:ring-[#FF6B3A]/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
            <Link
              to="/favorites"
              className="text-gray-700 hover:text-[#FF6B3A]"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-[#FF6B3A]">
              <User className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-[#FF6B3A]"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 space-y-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 rounded-md bg-gray-100 border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Button
                type="submit"
                className="absolute right-1 top-1 h-8 bg-[#FF6B3A] hover:bg-[#e55a2a]"
              >
                Search
              </Button>
            </form>

            <div className="space-y-2">
              <div className="border-b border-gray-200 pb-2">
                <button className="flex items-center justify-between w-full py-2 text-left text-gray-700 hover:text-[#FF6B3A] font-medium">
                  New Cars
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 mt-1 space-y-1">
                  <Link
                    to="/new-cars"
                    className="block py-1 text-sm text-gray-600 hover:text-[#FF6B3A]"
                  >
                    Explore New Cars
                  </Link>
                  <Link
                    to="/electric-cars"
                    className="block py-1 text-sm text-gray-600 hover:text-[#FF6B3A]"
                  >
                    Electric Cars
                  </Link>
                  <Link
                    to="/popular-cars"
                    className="block py-1 text-sm text-gray-600 hover:text-[#FF6B3A]"
                  >
                    Popular Cars
                  </Link>
                  <Link
                    to="/upcoming-cars"
                    className="block py-1 text-sm text-gray-600 hover:text-[#FF6B3A]"
                  >
                    Upcoming Cars
                  </Link>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <button className="flex items-center justify-between w-full py-2 text-left text-gray-700 hover:text-[#FF6B3A] font-medium">
                  Used Cars
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 mt-1 space-y-1">
                  <Link
                    to="/used-cars"
                    className="block py-1 text-sm text-gray-600 hover:text-[#FF6B3A]"
                  >
                    Buy Used Cars
                  </Link>
                  <Link
                    to="/sell-car"
                    className="block py-1 text-sm text-gray-600 hover:text-[#FF6B3A]"
                  >
                    Sell My Car
                  </Link>
                  <Link
                    to="/car-valuation"
                    className="block py-1 text-sm text-gray-600 hover:text-[#FF6B3A]"
                  >
                    Used Car Valuation
                  </Link>
                </div>
              </div>

              <Link
                to="/sell"
                className="block py-2 text-gray-700 hover:text-[#FF6B3A] font-medium border-b border-gray-200"
              >
                Sell
              </Link>

              <Link
                to="/compare"
                className="block py-2 text-gray-700 hover:text-[#FF6B3A] font-medium border-b border-gray-200"
              >
                Compare
              </Link>

              <div className="border-b border-gray-200 pb-2">
                <button className="flex items-center justify-between w-full py-2 text-left text-gray-700 hover:text-[#FF6B3A] font-medium">
                  News & Reviews
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 mt-1 space-y-1">
                  <Link
                    to="/car-news"
                    className="block py-1 text-sm text-gray-600 hover:text-[#FF6B3A]"
                  >
                    Car News
                  </Link>
                  <Link
                    to="/user-reviews"
                    className="block py-1 text-sm text-gray-600 hover:text-[#FF6B3A]"
                  >
                    User Reviews
                  </Link>
                  <Link
                    to="/road-tests"
                    className="block py-1 text-sm text-gray-600 hover:text-[#FF6B3A]"
                  >
                    Road Tests
                  </Link>
                  <Link
                    to="/videos"
                    className="block py-1 text-sm text-gray-600 hover:text-[#FF6B3A]"
                  >
                    Videos
                  </Link>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <button className="flex items-center justify-between w-full py-2 text-left text-gray-700 hover:text-[#FF6B3A] font-medium">
                  More
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 mt-1 space-y-1">
                  <Link
                    to="/car-accessories"
                    className="block py-1 text-sm text-gray-600 hover:text-[#FF6B3A]"
                  >
                    Car Accessories
                  </Link>
                  <Link
                    to="/dealer-info"
                    className="block py-1 text-sm text-gray-600 hover:text-[#FF6B3A]"
                  >
                    Dealer Info
                  </Link>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link to="/login" className="text-[#FF6B3A] font-medium">
                  Login / Register
                </Link>
                <Link
                  to="/favorites"
                  className="text-gray-700 hover:text-[#FF6B3A]"
                >
                  <Heart className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default CardekhoHeader;
