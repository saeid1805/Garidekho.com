import React from "react";
import { useNavigate } from "react-router-dom";
import CardekhoHeader from "../components/CardekhoHeader";
import HeroSearch from "../components/HeroSearch";
import PopularBrands from "../components/PopularBrands";
import FeaturedCarsSection from "../components/FeaturedCarsSection";
import UpcomingCars from "../components/UpcomingCars";
import CompareCarSection from "../components/CompareCarSection";
import NewsAndComparisonsSection from "../components/NewsAndComparisonsSection";
import CarComparisonPreview from "../components/CarComparisonPreview";
import CardekhoFeatureCards from "../components/CardekhoFeatureCards";
import Footer from "../components/Footer";
import ChatSupport from "../components/ChatSupport";
import { SearchFilters } from "../components/SearchBar";

const CardekhoHomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (filters: SearchFilters) => {
    console.log("Search with filters:", filters);

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
      {/* Header */}
      <CardekhoHeader />

      {/* Hero Section with Search */}
      <HeroSearch
        onSearch={handleSearch}
        title="Find Your Right Car"
        subtitle="Search from thousands of verified cars in your neighborhood"
        backgroundImage="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      />

      {/* Feature Cards */}
      <CardekhoFeatureCards />

      {/* Popular Brands */}
      <PopularBrands title="Popular Brands" />

      {/* Featured Cars Section */}
      <FeaturedCarsSection
        title="The Most Searched Cars"
        description="Explore the most popular cars that users are searching for right now"
        onViewAllClick={handleViewAllListings}
        onCarClick={handleCarClick}
      />

      {/* Upcoming Cars */}
      <UpcomingCars title="Upcoming Cars" />

      {/* Car Comparison Section */}
      <CompareCarSection />

      {/* Car Comparison Preview */}
      <CarComparisonPreview />

      {/* News and Comparisons Section */}
      <NewsAndComparisonsSection
        title="Latest News & Expert Reviews"
        description="Stay updated with the latest automotive news, expert reviews, and detailed comparisons"
      />

      {/* Footer */}
      <Footer />

      {/* AI Chat Support */}
      <ChatSupport
        initialMessage="Hello! I'm your AI assistant. Looking for a specific type of vehicle or have questions about car features? I'm here to help!"
        onSearch={handleSearch}
      />
    </div>
  );
};

export default CardekhoHomePage;
