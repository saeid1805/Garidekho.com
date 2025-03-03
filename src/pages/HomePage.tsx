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
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

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

  // Loading states for different sections
  const [heroLoading, setHeroLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);

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

  // Simulate loading states for different sections
  useEffect(() => {
    // Simulate staggered loading for a more realistic experience
    const heroTimer = setTimeout(() => setHeroLoading(false), 800);
    const categoriesTimer = setTimeout(() => setCategoriesLoading(false), 1200);
    const featuredTimer = setTimeout(() => setFeaturedLoading(false), 1800);
    const newsTimer = setTimeout(() => setNewsLoading(false), 2200);

    return () => {
      clearTimeout(heroTimer);
      clearTimeout(categoriesTimer);
      clearTimeout(featuredTimer);
      clearTimeout(newsTimer);
    };
  }, []);

  // Search handler that navigates to search results page
  const handleSearch = (filters: any) => {
    console.log("Search with filters:", filters);

    // Create search query for display
    setSearchQuery(
      `${filters.make} ${filters.model} ${filters.condition}`.trim(),
    );

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
    console.log("View all listings clicked");
    navigate("/search");
  };

  // Handler for car card clicks
  const handleCarClick = (carId: string) => {
    navigate(`/car/${carId}`);
  };

  // Handler for category clicks
  const handleCategoryClick = (category: string) => {
    console.log(`Category clicked: ${category}`);

    // Set up search parameters based on category
    const searchParams = new URLSearchParams();

    // Handle special categories with specific filters
    switch (category.toLowerCase()) {
      case "budget":
        searchParams.set("maxPrice", "20000");
        break;
      case "luxury":
        searchParams.set("minPrice", "50000");
        break;
      case "electric":
      case "hybrid":
        searchParams.set("fuelType", category);
        break;
      case "suvs":
      case "sedan":
      case "family":
      case "performance":
      default:
        // For other categories, use as keyword
        searchParams.set("keyword", category);
        break;
    }

    // Navigate to search results page with the appropriate filters
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section with Search */}
      {heroLoading ? (
        <div className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full bg-slate-900 bg-opacity-50 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900"></div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <Skeleton className="h-12 w-3/4 max-w-xl mb-4 bg-slate-700" />
            <Skeleton className="h-6 w-2/3 max-w-lg mb-8 bg-slate-700" />
            <div className="w-full max-w-4xl rounded-lg bg-white/10 p-6">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-10 w-full bg-slate-700" />
                <Skeleton className="h-10 w-full bg-slate-700" />
                <Skeleton className="h-10 w-full bg-slate-700" />
                <Skeleton className="h-10 w-full bg-slate-700" />
              </div>
              <div className="mt-4 flex justify-center">
                <Skeleton className="h-10 w-40 bg-slate-700" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <HeroSearch
          onSearch={handleSearch}
          title="Find Your Perfect Car"
          subtitle="Search thousands of new and used vehicles all in one place"
          backgroundImage="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
        />
      )}

      {/* Quick Category Section */}
      {categoriesLoading ? (
        <section className="w-full py-8 bg-slate-50">
          <div className="container mx-auto px-4">
            <Skeleton className="h-8 w-48 mb-6 bg-slate-200" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="h-24 w-full bg-slate-200" />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <QuickCategorySection onCategoryClick={handleCategoryClick} />
      )}

      {/* Featured Cars Section */}
      <div id="featured-cars">
        {featuredLoading ? (
          <section className="w-full py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <Skeleton className="h-8 w-64 mb-2 bg-slate-100" />
                  <Skeleton className="h-5 w-96 bg-slate-100" />
                </div>
              </div>

              <div className="mb-6">
                <Skeleton className="h-10 w-full max-w-md bg-slate-100" />
              </div>

              <div className="min-h-[400px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex justify-center sm:justify-start"
                    >
                      <div className="w-full max-w-[280px] sm:max-w-[350px] overflow-hidden rounded-lg bg-white border border-gray-200">
                        <Skeleton className="h-[160px] sm:h-[200px] w-full bg-slate-100" />
                        <div className="p-4 space-y-3">
                          <Skeleton className="h-5 w-3/4 bg-slate-100" />
                          <Skeleton className="h-6 w-1/2 bg-slate-100" />
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <Skeleton className="h-4 w-full bg-slate-100" />
                            <Skeleton className="h-4 w-full bg-slate-100" />
                            <Skeleton className="h-4 w-full bg-slate-100" />
                            <Skeleton className="h-4 w-full bg-slate-100" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center justify-center mt-8">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-2" />
                  <p className="text-gray-500">Loading featured vehicles...</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <FeaturedCarsSection
            title="Featured Vehicles"
            description="Explore our handpicked selection of premium vehicles with exceptional value"
            onViewAllClick={handleViewAllListings}
            onCarClick={handleCarClick}
          />
        )}
      </div>

      {/* News and Comparisons Section */}
      {newsLoading ? (
        <section className="w-full py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <Skeleton className="h-8 w-64 mx-auto mb-3 bg-slate-100" />
              <Skeleton className="h-5 w-full max-w-2xl mx-auto bg-slate-100" />
            </div>

            <div className="mb-6">
              <Skeleton className="h-10 w-full max-w-md mx-auto bg-slate-100" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden bg-white border border-gray-200"
                >
                  <Skeleton className="h-48 w-full bg-slate-100" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4 bg-slate-100" />
                    <Skeleton className="h-4 w-full bg-slate-100" />
                    <Skeleton className="h-4 w-full bg-slate-100" />
                    <div className="flex justify-between pt-2">
                      <Skeleton className="h-4 w-1/4 bg-slate-100" />
                      <Skeleton className="h-4 w-1/4 bg-slate-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <NewsAndComparisonsSection
          title="Automotive Insights"
          description="Stay informed with the latest automotive news and detailed comparisons to help you make the best decisions for your next vehicle purchase."
        />
      )}

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
