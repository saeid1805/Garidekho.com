import React, { useState } from "react";
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
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface NavigationMenuProps {
  favoritesCount?: number;
}

const NavigationMenu = ({ favoritesCount = 0 }: NavigationMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-blue-600">
                AutoMarket
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 hover:text-blue-600 transition-colors ${isActive("/") ? "text-blue-600 font-medium" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/new-cars"
              className={`text-gray-700 hover:text-blue-600 transition-colors ${isActive("/new-cars") ? "text-blue-600 font-medium" : ""}`}
            >
              New Cars
            </Link>
            <Link
              to="/used-cars"
              className={`text-gray-700 hover:text-blue-600 transition-colors ${isActive("/used-cars") ? "text-blue-600 font-medium" : ""}`}
            >
              Used Cars
            </Link>
            <Link
              to="/price-predictor"
              className={`text-gray-700 hover:text-blue-600 transition-colors ${isActive("/price-predictor") ? "text-blue-600 font-medium" : ""}`}
            >
              Price Predictor
            </Link>
            <Link
              to="/dealer-portal"
              className={`text-gray-700 hover:text-blue-600 transition-colors ${isActive("/dealer-portal") ? "text-blue-600 font-medium" : ""}`}
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
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4 space-y-2">
            <Link
              to="/"
              className={`block py-2 ${isActive("/") ? "text-blue-600 font-medium" : "text-gray-700"}`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Home
              </div>
            </Link>
            <Link
              to="/new-cars"
              className={`block py-2 ${isActive("/new-cars") ? "text-blue-600 font-medium" : "text-gray-700"}`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Car className="mr-2 h-5 w-5" />
                New Cars
              </div>
            </Link>
            <Link
              to="/used-cars"
              className={`block py-2 ${isActive("/used-cars") ? "text-blue-600 font-medium" : "text-gray-700"}`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Car className="mr-2 h-5 w-5" />
                Used Cars
              </div>
            </Link>
            <Link
              to="/price-predictor"
              className={`block py-2 ${isActive("/price-predictor") ? "text-blue-600 font-medium" : "text-gray-700"}`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Price Predictor
              </div>
            </Link>
            <Link
              to="/dealer-portal"
              className={`block py-2 ${isActive("/dealer-portal") ? "text-blue-600 font-medium" : "text-gray-700"}`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Dealer Portal
              </div>
            </Link>
            <Link
              to="/favorites"
              className={`block py-2 ${isActive("/favorites") ? "text-blue-600 font-medium" : "text-gray-700"}`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Favorites
                {favoritesCount > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </div>
            </Link>

            <div className="pt-2 border-t border-gray-200">
              {user ? (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/dashboard");
                      closeMenu();
                    }}
                  >
                    <User className="mr-2 h-5 w-5 text-gray-700" />
                    <span className="text-gray-700">{user.name}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
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
                    className="w-full justify-start bg-blue-600"
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
      )}
    </nav>
  );
};

export default NavigationMenu;
