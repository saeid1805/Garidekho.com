import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import HeroSearch from "./HeroSearch";
import CategoryButtons from "./CategoryButtons";
import FeaturedListings from "./FeaturedListings";
import ContentSection from "./ContentSection";
import RecommendedCars from "./RecommendedCars";
import CarLoanCalculator from "./CarLoanCalculator";
import ChatSupport from "./ChatSupport";
import Footer from "./Footer";

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock search handler
  const handleSearch = (filters: any) => {
    console.log("Search with filters:", filters);
    // In a real app, this would navigate to search results page with these filters
    setSearchQuery(
      `${filters.make} ${filters.model} ${filters.condition}`.trim(),
    );
    // Simulate navigation to search results
    window.scrollTo({
      top: document.getElementById("recommended")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  // Mock handler for view all listings
  const handleViewAllListings = () => {
    console.log("View all listings clicked");
    // In a real app, this would navigate to all listings page
  };

  // Handler for car card clicks
  const handleCarClick = (carId: string) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section with Search */}
      <HeroSearch
        onSearch={handleSearch}
        title="Find Your Perfect Car"
        subtitle="Search thousands of new and used vehicles all in one place"
        backgroundImage="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      />

      {/* Category Buttons */}
      <CategoryButtons />

      {/* Featured Listings */}
      <FeaturedListings
        title="Featured Vehicles"
        description="Explore our handpicked selection of premium vehicles with exceptional value"
        onViewAllClick={handleViewAllListings}
      />

      {/* Recommended Cars Section - Shows after search */}
      <div id="recommended">
        {searchQuery && (
          <RecommendedCars
            title="Search Results"
            searchQuery={searchQuery}
            onViewAllClick={handleViewAllListings}
          />
        )}
      </div>

      {/* Loan Calculator Section */}
      <div className="w-full py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Calculate Your Car Loan
              </h2>
              <p className="text-slate-600 mb-6">
                Use our easy loan calculator to estimate your monthly payments
                and find financing options that fit your budget.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="font-bold text-blue-600">1</span>
                  </div>
                  <p>Adjust loan amount, interest rate, and term</p>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="font-bold text-blue-600">2</span>
                  </div>
                  <p>See your estimated monthly payment instantly</p>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="font-bold text-blue-600">3</span>
                  </div>
                  <p>Apply for financing with our trusted partners</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <CarLoanCalculator />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section (News and Comparisons) */}
      <ContentSection />

      {/* Footer */}
      <Footer />

      {/* AI Chat Support */}
      <ChatSupport initialMessage="Hello! I'm your AI assistant. Looking for a specific type of vehicle or have questions about financing? I'm here to help!" />
    </div>
  );
}

export default Home;
