import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Search,
  User,
  Heart,
  Menu,
  X,
  LogIn,
  LogOut,
  Home,
  Car,
  BarChart3,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { cn } from "@/lib/utils";

interface NavigationMenuProps {
  favoritesCount?: number;
}

const NavigationMenu = ({ favoritesCount = 0 }: NavigationMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset active dropdown when closing menu
    if (isMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Car className="h-8 w-8 text-[#0073ff]" />
              <span className="ml-2 text-xl font-bold text-[#0073ff]">
                AutoMarket
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 hover:text-[#0073ff] transition-colors ${isActive("/") ? "text-[#0073ff] font-medium" : ""}`}
            >
              Home
            </Link>
            <div className="relative group">
              <button
                className={`flex items-center text-gray-700 hover:text-[#0073ff] transition-colors ${isActive("/new-cars") ? "text-[#0073ff] font-medium" : ""}`}
              >
                New Cars
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 origin-top-left">
                <Link
                  to="/new-cars"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0073ff]"
                >
                  All New Cars
                </Link>
                <Link
                  to="/new-cars?category=SUV"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0073ff]"
                >
                  SUVs
                </Link>
                <Link
                  to="/new-cars?category=Sedan"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0073ff]"
                >
                  Sedans
                </Link>
                <Link
                  to="/new-cars?category=Electric"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0073ff]"
                >
                  Electric Vehicles
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button
                className={`flex items-center text-gray-700 hover:text-[#0073ff] transition-colors ${isActive("/used-cars") ? "text-[#0073ff] font-medium" : ""}`}
              >
                Used Cars
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 origin-top-left">
                <Link
                  to="/used-cars"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0073ff]"
                >
                  All Used Cars
                </Link>
                <Link
                  to="/used-cars?maxPrice=20000"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0073ff]"
                >
                  Under $20,000
                </Link>
                <Link
                  to="/used-cars?minMileage=0&maxMileage=30000"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0073ff]"
                >
                  Low Mileage
                </Link>
              </div>
            </div>
            <Link
              to="/price-predictor"
              className={`text-gray-700 hover:text-[#0073ff] transition-colors ${isActive("/price-predictor") ? "text-[#0073ff] font-medium" : ""}`}
            >
              Price Predictor
            </Link>
            <Link
              to="/dealer-portal"
              className={`text-gray-700 hover:text-[#0073ff] transition-colors ${isActive("/dealer-portal") ? "text-[#0073ff] font-medium" : ""}`}
            >
              Dealer Portal
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/search")}
              aria-label="Search vehicles"
            >
              <Search className="h-5 w-5 text-gray-700" />
            </Button>

            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5 text-gray-700" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#0073ff] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2"
                  onClick={() => navigate("/dashboard")}
                >
                  <User className="h-5 w-5 text-gray-700" />
                  <span className="text-sm text-gray-700">{user.name}</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5 text-gray-700" />
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => navigate("/login")}>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={cn(
          "md:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-full",
        )}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={closeMenu}
        ></div>
        <div className="relative w-4/5 max-w-sm h-full bg-white shadow-xl overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Car className="h-8 w-8 text-[#0073ff]" />
              <span className="ml-2 text-xl font-bold text-[#0073ff]">
                AutoMarket
              </span>
            </Link>
            <Button variant="ghost" size="icon" onClick={closeMenu}>
              <X className="h-6 w-6 text-gray-700" />
            </Button>
          </div>

          <div className="p-4 space-y-1">
            <Link
              to="/"
              className={`flex items-center py-3 px-4 rounded-md ${isActive("/") ? "bg-blue-50 text-[#0073ff] font-medium" : "text-gray-700"}`}
              onClick={closeMenu}
            >
              <Home className="mr-3 h-5 w-5" />
              Home
            </Link>

            <div className="border-b border-gray-100 my-2"></div>

            <div>
              <button
                className={`flex items-center justify-between w-full py-3 px-4 rounded-md ${isActive("/new-cars") ? "bg-blue-50 text-[#0073ff] font-medium" : "text-gray-700"}`}
                onClick={() => toggleDropdown("new-cars")}
              >
                <div className="flex items-center">
                  <Car className="mr-3 h-5 w-5" />
                  New Cars
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform",
                    activeDropdown === "new-cars" ? "rotate-180" : "",
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  activeDropdown === "new-cars"
                    ? "max-h-60 opacity-100"
                    : "max-h-0 opacity-0",
                )}
              >
                <div className="pl-12 pr-4 py-2 space-y-2">
                  <Link
                    to="/new-cars"
                    className="block py-2 text-gray-600 hover:text-[#0073ff]"
                    onClick={closeMenu}
                  >
                    All New Cars
                  </Link>
                  <Link
                    to="/new-cars?category=SUV"
                    className="block py-2 text-gray-600 hover:text-[#0073ff]"
                    onClick={closeMenu}
                  >
                    SUVs
                  </Link>
                  <Link
                    to="/new-cars?category=Sedan"
                    className="block py-2 text-gray-600 hover:text-[#0073ff]"
                    onClick={closeMenu}
                  >
                    Sedans
                  </Link>
                  <Link
                    to="/new-cars?category=Electric"
                    className="block py-2 text-gray-600 hover:text-[#0073ff]"
                    onClick={closeMenu}
                  >
                    Electric Vehicles
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <button
                className={`flex items-center justify-between w-full py-3 px-4 rounded-md ${isActive("/used-cars") ? "bg-blue-50 text-[#0073ff] font-medium" : "text-gray-700"}`}
                onClick={() => toggleDropdown("used-cars")}
              >
                <div className="flex items-center">
                  <Car className="mr-3 h-5 w-5" />
                  Used Cars
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform",
                    activeDropdown === "used-cars" ? "rotate-180" : "",
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  activeDropdown === "used-cars"
                    ? "max-h-60 opacity-100"
                    : "max-h-0 opacity-0",
                )}
              >
                <div className="pl-12 pr-4 py-2 space-y-2">
                  <Link
                    to="/used-cars"
                    className="block py-2 text-gray-600 hover:text-[#0073ff]"
                    onClick={closeMenu}
                  >
                    All Used Cars
                  </Link>
                  <Link
                    to="/used-cars?maxPrice=20000"
                    className="block py-2 text-gray-600 hover:text-[#0073ff]"
                    onClick={closeMenu}
                  >
                    Under $20,000
                  </Link>
                  <Link
                    to="/used-cars?minMileage=0&maxMileage=30000"
                    className="block py-2 text-gray-600 hover:text-[#0073ff]"
                    onClick={closeMenu}
                  >
                    Low Mileage
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/price-predictor"
              className={`flex items-center py-3 px-4 rounded-md ${isActive("/price-predictor") ? "bg-blue-50 text-[#0073ff] font-medium" : "text-gray-700"}`}
              onClick={closeMenu}
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Price Predictor
            </Link>

            <Link
              to="/dealer-portal"
              className={`flex items-center py-3 px-4 rounded-md ${isActive("/dealer-portal") ? "bg-blue-50 text-[#0073ff] font-medium" : "text-gray-700"}`}
              onClick={closeMenu}
            >
              <Settings className="mr-3 h-5 w-5" />
              Dealer Portal
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center py-3 px-4 rounded-md ${isActive("/favorites") ? "bg-blue-50 text-[#0073ff] font-medium" : "text-gray-700"}`}
              onClick={closeMenu}
            >
              <Heart className="mr-3 h-5 w-5" />
              Favorites
              {favoritesCount > 0 && (
                <span className="ml-2 bg-[#0073ff] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <div className="border-t border-gray-200 my-4 pt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-[#0073ff]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full justify-start py-3 px-4 rounded-md text-gray-700 hover:bg-blue-50 hover:text-[#0073ff]"
                    onClick={() => {
                      navigate("/dashboard");
                      closeMenu();
                    }}
                  >
                    <User className="mr-3 h-5 w-5" />
                    My Dashboard
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start py-3 px-4 rounded-md border-gray-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-center py-2.5"
                    onClick={() => {
                      navigate("/login");
                      closeMenu();
                    }}
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </Button>

                  <Button
                    variant="default"
                    className="w-full justify-center py-2.5 bg-[#0073ff] hover:bg-[#005cd9]"
                    onClick={() => {
                      navigate("/register");
                      closeMenu();
                    }}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
