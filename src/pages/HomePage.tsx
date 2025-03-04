import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationMenu from "../components/NavigationMenu";
import HeroSearch from "../components/HeroSearch";
import QuickCategorySection from "../components/QuickCategorySection";
import FeaturedCarsSection from "../components/FeaturedCarsSection";
import CompareCarSection from "../components/CompareCarSection";
import NewsAndComparisonsSection from "../components/NewsAndComparisonsSection";
import PopularBrands from "../components/PopularBrands";
import CarComparisonPreview from "../components/CarComparisonPreview";
import Footer from "../components/Footer";
import ChatSupport from "../components/ChatSupport";
import { SearchFilters } from "../components/SearchBar";
import carApiService, { Car } from "../services/api";

const HomePage = () => {
  const [favorites, setFavorites] = useState<Car[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    const userObj = user ? JSON.parse(user) : null;
    const storageKey = userObj ? `favorites_${userObj.id}` : "favorites_guest";

    const savedFavorites = localStorage.getItem(storageKey);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
      }
    }
  }, []);
  const navigate = useNavigate();

  const handleSearch = async (filters: SearchFilters) => {
    try {
      // Call the API with the filters
      const searchResults = await carApiService.searchCars(filters);

      // Build search params for navigation
      const searchParams = new URLSearchParams();
      if (filters.make && filters.make !== "All Makes")
        searchParams.set("make", filters.make);
      if (filters.model && filters.model !== "All Models")
        searchParams.set("model", filters.model);
      if (filters.priceRange[0] > 0)
        searchParams.set("minPrice", filters.priceRange[0].toString());
      if (filters.priceRange[1] < 100000)
        searchParams.set("maxPrice", filters.priceRange[1].toString());
      if (filters.condition && filters.condition !== "all")
        searchParams.set("condition", filters.condition);
      if (filters.keyword) searchParams.set("keyword", filters.keyword);

      // Navigate to search results page
      navigate(`/search?${searchParams.toString()}`);
    } catch (error) {
      console.error("Error searching cars:", error);
      // Navigate anyway even if the API call fails
      const searchParams = new URLSearchParams();
      if (filters.make && filters.make !== "All Makes")
        searchParams.set("make", filters.make);
      if (filters.model && filters.model !== "All Models")
        searchParams.set("model", filters.model);
      if (filters.priceRange[0] > 0)
        searchParams.set("minPrice", filters.priceRange[0].toString());
      if (filters.priceRange[1] < 100000)
        searchParams.set("maxPrice", filters.priceRange[1].toString());
      if (filters.condition && filters.condition !== "all")
        searchParams.set("condition", filters.condition);
      if (filters.keyword) searchParams.set("keyword", filters.keyword);

      navigate(`/search?${searchParams.toString()}`);
    }
  };

  // Handler for category clicks
  const handleCategoryClick = (category: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set("keyword", category);
    navigate(`/search?${searchParams.toString()}`);
  };

  // Handler for view all listings
  const handleViewAllListings = () => {
    navigate("/search");
  };

  // Handler for car card clicks
  const handleCarClick = (carId: string) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Menu */}
      <NavigationMenu favoritesCount={favorites?.length || 0} />

      {/* Hero Section with Search */}
      <HeroSearch
        onSearch={handleSearch}
        title="Find Your Perfect Car"
        subtitle="Search thousands of new and used vehicles all in one place"
        backgroundImage="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      />

      {/* Quick Category Section */}
      <QuickCategorySection onCategoryClick={handleCategoryClick} />

      {/* Popular Brands */}
      <PopularBrands title="Popular Brands" />

      {/* Featured Cars Section */}
      <FeaturedCarsSection
        title="Featured Vehicles"
        description="Explore our handpicked selection of premium vehicles with exceptional value"
        onViewAllClick={handleViewAllListings}
        onCarClick={handleCarClick}
      />

      {/* Car Comparison Section */}
      <CompareCarSection />

      {/* Car Comparison Preview */}
      <CarComparisonPreview />

      {/* News and Comparisons Section */}
      <NewsAndComparisonsSection
        title="Automotive Insights"
        description="Stay updated with the latest automotive news and detailed comparisons to help you make the best decisions for your next vehicle purchase."
      />

      {/* Footer */}
      <Footer />

      {/* AI Chat Support */}
      <ChatSupport
        initialMessage="Hello! I'm your AI assistant. Looking for a specific type of vehicle or have questions about financing? I'm here to help!"
        onSearch={handleSearch}
      />
    </div>
  );
};

export default HomePage;
