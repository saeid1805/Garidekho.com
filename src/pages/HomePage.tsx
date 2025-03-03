import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HeroSearch from "../components/HeroSearch";
import QuickCategorySection from "../components/QuickCategorySection";
import FeaturedCarsSection from "../components/FeaturedCarsSection";
import NewsAndComparisonsSection from "../components/NewsAndComparisonsSection";
import RecommendedCars from "../components/RecommendedCars";
import Footer from "../components/Footer";
import ChatSupport from "../components/ChatSupport";
import { SearchFilters } from "../components/SearchBar";
import carApiService, { Car } from "../services/api";

interface Car {
  id: string;
  image: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  condition: "new" | "used";
  featured: boolean;
  category?: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  const [allCars, setAllCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  // Fetch all cars on component mount or page change
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await carApiService.getAllCars(
          currentPage,
          itemsPerPage,
        );
        setAllCars(response.cars);
        setTotalPages(response.totalPages);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load cars. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [currentPage]);

  // Search handler
  const handleSearch = async (filters: SearchFilters) => {
    console.log("Search with filters:", filters);

    try {
      setIsLoading(true);
      setError(null);
      setCurrentPage(1); // Reset to first page on new search

      // Use API service to search cars with pagination
      const response = await carApiService.searchCars(filters, 1, itemsPerPage);

      setFilteredCars(response.cars);
      setTotalPages(response.totalPages);
      setIsSearched(true);

      // Create search query text for display
      let queryText = [];
      if (filters.make && filters.make !== "All Makes")
        queryText.push(filters.make);
      if (filters.model && filters.model !== "All Models")
        queryText.push(filters.model);
      if (filters.condition && filters.condition !== "all")
        queryText.push(filters.condition);
      if (filters.keyword) queryText.push(`"${filters.keyword}"`);

      setSearchQuery(queryText.join(" "));

      // Navigate to search results section
      window.scrollTo({
        top: document.getElementById("search-results")?.offsetTop || 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error("Error searching cars:", err);
      setError("Failed to search cars. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for view all listings
  const handleViewAllListings = () => {
    console.log("View all listings clicked");
    // In a real app, this would navigate to all listings page
  };

  // Handler for car card clicks
  const handleCarClick = (carId: string) => {
    navigate(`/car/${carId}`);
  };

  // Handler for category clicks
  const handleCategoryClick = async (category: string) => {
    console.log(`Category clicked: ${category}`);

    try {
      setIsLoading(true);
      setError(null);
      setCurrentPage(1); // Reset to first page on new category selection

      // Use API service to get cars by category with pagination
      const response = await carApiService.getCarsByCategory(
        category,
        1,
        itemsPerPage,
      );

      setFilteredCars(response.cars);
      setTotalPages(response.totalPages);
      setIsSearched(true);
      setSearchQuery(`Category: ${category}`);

      // Navigate to search results section
      window.scrollTo({
        top: document.getElementById("search-results")?.offsetTop || 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error(`Error fetching cars for category ${category}:`, err);
      setError("Failed to load category. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for clearing search results
  const handleClearSearch = () => {
    setIsSearched(false);
    setSearchQuery("");
    setFilteredCars([]);
    setCurrentPage(1);
  };

  // Handler for page change in search results
  const handleSearchPageChange = async (page: number) => {
    if (page === currentPage) return;

    try {
      setIsLoading(true);
      setError(null);

      let response;
      if (searchQuery.startsWith("Category:")) {
        const category = searchQuery.replace("Category: ", "");
        response = await carApiService.getCarsByCategory(
          category,
          page,
          itemsPerPage,
        );
      } else {
        // Recreate filters from search query (simplified version)
        const filters: SearchFilters = {
          make: "",
          model: "",
          priceRange: [0, 100000],
          condition: "all",
          keyword: searchQuery,
        };
        response = await carApiService.searchCars(filters, page, itemsPerPage);
      }

      setFilteredCars(response.cars);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error changing page:", err);
      setError("Failed to load page. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

      {/* Quick Category Section */}
      <QuickCategorySection onCategoryClick={handleCategoryClick} />

      {/* Search Results Section */}
      {isSearched && (
        <div id="search-results">
          <RecommendedCars
            title="Search Results"
            searchQuery={searchQuery}
            cars={filteredCars}
            onViewAllClick={handleClearSearch}
            onCarClick={handleCarClick}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handleSearchPageChange}
          />
        </div>
      )}

      {/* Featured Cars Section */}
      <div id="featured-cars">
        <FeaturedCarsSection
          title="Featured Vehicles"
          description="Explore our handpicked selection of premium vehicles with exceptional value"
          onViewAllClick={handleViewAllListings}
          onCarClick={handleCarClick}
        />
      </div>

      {/* News and Comparisons Section */}
      <NewsAndComparisonsSection
        title="Automotive Insights"
        description="Stay informed with the latest automotive news and detailed comparisons to help you make the best decisions for your next vehicle purchase."
      />

      {/* Footer */}
      <Footer />

      {/* AI Chat Support */}
      <ChatSupport initialMessage="Hello! I'm your AI assistant. Looking for a specific type of vehicle or have questions about financing? I'm here to help!" />
    </div>
  );
};

export default HomePage;
