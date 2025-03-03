import React from "react";
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
  onSearchClick = () => {},
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
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
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
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
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden bg-white border-t border-gray-200 absolute w-full left-0 transition-all duration-300 ease-in-out",
          mobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden",
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
            {user ? (
              <Button
                variant="outline"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-center"
              >
                Sign Out ({user.name})
              </Button>
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
                  className="w-full justify-center"
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
