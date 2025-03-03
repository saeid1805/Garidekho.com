import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  Calculator,
  BarChart3,
  Home,
  Car,
  Settings,
  Heart,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  logoSrc?: string;
  navItems?: Array<{
    label: string;
    href: string;
  }>;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
}

// Helper function to get icon for navigation items
const getNavIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "home":
      return <Home className="h-5 w-5 text-gray-500" />;
    case "new cars":
    case "used cars":
      return <Car className="h-5 w-5 text-gray-500" />;
    case "sell your car":
      return <ShoppingCart className="h-5 w-5 text-gray-500" />;
    case "research":
      return <Search className="h-5 w-5 text-gray-500" />;
    case "price predictor":
      return <Calculator className="h-5 w-5 text-gray-500" />;
    case "dealer portal":
      return <Settings className="h-5 w-5 text-gray-500" />;
    default:
      return <Car className="h-5 w-5 text-gray-500" />;
  }
};

const Header = ({
  logoSrc = "/vite.svg",
  navItems = [
    { label: "Home", href: "/" },
    { label: "New Cars", href: "/new-cars" },
    { label: "Used Cars", href: "/used-cars" },
    { label: "Sell Your Car", href: "/sell" },
    { label: "Research", href: "/research" },
    { label: "Price Predictor", href: "/price-predictor" },
    { label: "Dealer Portal", href: "/dealer-portal" },
  ],
  onSearchClick = () => {
    navigate("/search");
  },
  onCartClick = () => {},
  onProfileClick = () => {},
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen) {
        const target = event.target as HTMLElement;
        const header = document.querySelector("header");
        const mobileMenu = document.getElementById("mobile-menu");

        if (
          header &&
          mobileMenu &&
          !header.contains(target) &&
          !mobileMenu.contains(target)
        ) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logoSrc} alt="Car Marketplace" className="h-10 w-auto" />
          <span className="ml-2 text-xl font-bold text-blue-600">
            AutoMarket
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => {
            const isActive = window.location.pathname === item.href;
            return (
              <Link
                key={index}
                to={item.href}
                className={`text-gray-700 hover:text-blue-600 transition-colors font-medium relative ${isActive ? "text-blue-600" : ""}`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSearchClick}
            className="text-gray-700 hover:text-blue-600 hidden sm:flex"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="text-gray-700 hover:text-blue-600 hidden sm:flex"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onProfileClick}
            className="text-gray-700 hover:text-blue-600 hidden sm:flex"
          >
            <User className="h-5 w-5" />
          </Button>

          {user ? (
            <div className="hidden sm:flex items-center space-x-3">
              <Button
                variant="ghost"
                className="flex items-center space-x-2"
                onClick={() => navigate("/dashboard")}
              >
                <User className="h-5 w-5 text-gray-700" />
                <span className="text-sm text-gray-700">
                  Hello, {user.name}
                </span>
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                className="hidden sm:flex"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                className="hidden sm:flex"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 relative z-50"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 transition-transform duration-200" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-200" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden bg-white border-t border-gray-200 fixed w-full left-0 transition-all duration-300 ease-in-out z-50 shadow-lg",
          mobileMenuOpen
            ? "top-20 max-h-[calc(100vh-5rem)] overflow-y-auto opacity-100"
            : "top-[-100vh] max-h-0 opacity-0 overflow-hidden",
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="flex items-center py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {getNavIcon(item.label)}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
          <div className="flex flex-col space-y-2 pt-4 mt-2 border-t border-gray-200">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  className="flex items-center py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="ml-3">My Dashboard</span>
                </Link>

                <Link
                  to="/favorites"
                  className="flex items-center py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="h-5 w-5 text-gray-500" />
                  <span className="ml-3">Saved Vehicles</span>
                </Link>

                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start mt-2"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-center"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    navigate("/register");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-center bg-blue-600 hover:bg-blue-700"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
