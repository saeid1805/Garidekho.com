import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CarCard from "../components/CarCard";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Search,
  Car,
  Fuel,
  Gauge,
  Calendar,
  DollarSign,
  X,
  Loader2,
} from "lucide-react";
import carApiService, { Car as CarType, SearchFilters } from "../services/api";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cars, setCars] = useState<CarType[]>([]);
  const [totalCars, setTotalCars] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [sortOption, setSortOption] = useState("relevance");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Get search params from URL
  const searchParams = new URLSearchParams(location.search);
  const initialFilters: SearchFilters = {
    make: searchParams.get("make") || "",
    model: searchParams.get("model") || "",
    priceRange: [
      parseInt(searchParams.get("minPrice") || "0"),
      parseInt(searchParams.get("maxPrice") || "100000"),
    ],
    condition: searchParams.get("condition") || "all",
    keyword: searchParams.get("keyword") || "",
  };

  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  // Fetch cars based on filters
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Call API with filters and pagination
        const response = await carApiService.searchCars(
          filters,
          currentPage,
          12,
        );

        setCars(response.cars);
        setTotalCars(response.total);
        setTotalPages(response.totalPages);

        // Update URL with search params
        updateSearchParams();

        // Update active filters for display
        updateActiveFilters();
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load vehicles. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [filters, currentPage, sortOption]);

  // Update URL search params based on filters
  const updateSearchParams = () => {
    const params = new URLSearchParams();

    if (filters.make) params.set("make", filters.make);
    if (filters.model) params.set("model", filters.model);
    if (filters.priceRange[0] > 0)
      params.set("minPrice", filters.priceRange[0].toString());
    if (filters.priceRange[1] < 100000)
      params.set("maxPrice", filters.priceRange[1].toString());
    if (filters.condition !== "all") params.set("condition", filters.condition);
    if (filters.keyword) params.set("keyword", filters.keyword);
    if (sortOption !== "relevance") params.set("sort", sortOption);
    if (currentPage > 1) params.set("page", currentPage.toString());

    // Update URL without reloading the page
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  // Update active filters for display
  const updateActiveFilters = () => {
    const active: string[] = [];

    if (filters.make && filters.make !== "All Makes")
      active.push(`Make: ${filters.make}`);
    if (filters.model && filters.model !== "All Models")
      active.push(`Model: ${filters.model}`);
    if (filters.condition && filters.condition !== "all") {
      active.push(
        `Condition: ${filters.condition.charAt(0).toUpperCase() + filters.condition.slice(1)}`,
      );
    }
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000) {
      active.push(
        `Price: $${filters.priceRange[0].toLocaleString()} - $${filters.priceRange[1].toLocaleString()}`,
      );
    }
    if (filters.keyword) active.push(`Keyword: ${filters.keyword}`);

    setActiveFilters(active);
  };

  // Handle search submission
  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortOption(value);
    // In a real app, you would update the API call to include sorting
  };

  // Handle removing a filter
  const handleRemoveFilter = (filter: string) => {
    const filterType = filter.split(":")[0].trim().toLowerCase();

    const updatedFilters = { ...filters };

    if (filterType === "make") updatedFilters.make = "";
    if (filterType === "model") updatedFilters.model = "";
    if (filterType === "condition") updatedFilters.condition = "all";
    if (filterType === "price") updatedFilters.priceRange = [0, 100000];
    if (filterType === "keyword") updatedFilters.keyword = "";

    setFilters(updatedFilters);
    setCurrentPage(1);
  };

  // Handle clearing all filters
  const handleClearAllFilters = () => {
    setFilters({
      make: "",
      model: "",
      priceRange: [0, 100000],
      condition: "all",
      keyword: "",
    });
    setCurrentPage(1);
  };

  // Handle car click
  const handleCarClick = (carId: string) => {
    navigate(`/car/${carId}`);
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            {isLoading
              ? "Searching for vehicles..."
              : error
                ? "Error loading results"
                : `Found ${totalCars} vehicles matching your criteria`}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            initialFilters={filters}
            className="shadow-sm"
          />
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm font-medium text-gray-700">
              Active Filters:
            </span>
            {activeFilters.map((filter, index) => (
              <Badge
                key={index}
                variant="outline"
                className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200"
              >
                {filter}
                <button
                  onClick={() => handleRemoveFilter(filter)}
                  className="ml-1 hover:text-blue-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAllFilters}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-xs"
            >
              Clear All
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:block ${filtersVisible ? "block" : "hidden"}`}>
            <div className="bg-white rounded-lg border p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFiltersVisible(!filtersVisible)}
                  className="lg:hidden"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-blue-600" />
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={
                          filters.priceRange[1] <= 20000 ? "default" : "outline"
                        }
                        size="sm"
                        className="text-xs justify-start"
                        onClick={() => {
                          setFilters({ ...filters, priceRange: [0, 20000] });
                          setCurrentPage(1);
                        }}
                      >
                        Under $20,000
                      </Button>
                      <Button
                        variant={
                          filters.priceRange[0] >= 20000 &&
                          filters.priceRange[1] <= 30000
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="text-xs justify-start"
                        onClick={() => {
                          setFilters({
                            ...filters,
                            priceRange: [20000, 30000],
                          });
                          setCurrentPage(1);
                        }}
                      >
                        $20,000 - $30,000
                      </Button>
                      <Button
                        variant={
                          filters.priceRange[0] >= 30000 &&
                          filters.priceRange[1] <= 40000
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="text-xs justify-start"
                        onClick={() => {
                          setFilters({
                            ...filters,
                            priceRange: [30000, 40000],
                          });
                          setCurrentPage(1);
                        }}
                      >
                        $30,000 - $40,000
                      </Button>
                      <Button
                        variant={
                          filters.priceRange[0] >= 40000 &&
                          filters.priceRange[1] <= 50000
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="text-xs justify-start"
                        onClick={() => {
                          setFilters({
                            ...filters,
                            priceRange: [40000, 50000],
                          });
                          setCurrentPage(1);
                        }}
                      >
                        $40,000 - $50,000
                      </Button>
                      <Button
                        variant={
                          filters.priceRange[0] >= 50000 ? "default" : "outline"
                        }
                        size="sm"
                        className="text-xs justify-start"
                        onClick={() => {
                          setFilters({
                            ...filters,
                            priceRange: [50000, 100000],
                          });
                          setCurrentPage(1);
                        }}
                      >
                        $50,000 and up
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Vehicle Condition */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <Car className="mr-2 h-4 w-4 text-blue-600" />
                    Vehicle Condition
                  </h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={
                          filters.condition === "all" ? "default" : "outline"
                        }
                        size="sm"
                        className="text-xs justify-start"
                        onClick={() => {
                          setFilters({ ...filters, condition: "all" });
                          setCurrentPage(1);
                        }}
                      >
                        All
                      </Button>
                      <Button
                        variant={
                          filters.condition === "new" ? "default" : "outline"
                        }
                        size="sm"
                        className="text-xs justify-start"
                        onClick={() => {
                          setFilters({ ...filters, condition: "new" });
                          setCurrentPage(1);
                        }}
                      >
                        New
                      </Button>
                      <Button
                        variant={
                          filters.condition === "used" ? "default" : "outline"
                        }
                        size="sm"
                        className="text-xs justify-start"
                        onClick={() => {
                          setFilters({ ...filters, condition: "used" });
                          setCurrentPage(1);
                        }}
                      >
                        Used
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Fuel Type */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <Fuel className="mr-2 h-4 w-4 text-blue-600" />
                    Fuel Type
                  </h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {["Gasoline", "Hybrid", "Electric", "Diesel"].map(
                        (fuel) => (
                          <Button
                            key={fuel}
                            variant="outline"
                            size="sm"
                            className="text-xs justify-start"
                            onClick={() => {
                              // In a real app, you would add fuel type to filters
                              // For now, just update the keyword
                              setFilters({ ...filters, keyword: fuel });
                              setCurrentPage(1);
                            }}
                          >
                            {fuel}
                          </Button>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Year */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                    Year
                  </h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        2024,
                        2023,
                        2022,
                        2021,
                        2020,
                        "2015-2019",
                        "Pre-2015",
                      ].map((year) => (
                        <Button
                          key={year.toString()}
                          variant="outline"
                          size="sm"
                          className="text-xs justify-start"
                          onClick={() => {
                            // In a real app, you would add year to filters
                            // For now, just update the keyword
                            setFilters({
                              ...filters,
                              keyword: year.toString(),
                            });
                            setCurrentPage(1);
                          }}
                        >
                          {year}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Toggle and Sort */}
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden flex items-center"
                onClick={() => setFiltersVisible(!filtersVisible)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>

              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                <Select value={sortOption} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price_low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price_high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="year_new">Year: Newest First</SelectItem>
                    <SelectItem value="year_old">Year: Oldest First</SelectItem>
                    <SelectItem value="mileage_low">
                      Mileage: Low to High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-96">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500">Loading vehicles...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-96 bg-red-50 rounded-lg">
                <p className="text-red-600 font-medium mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : cars.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg">
                <Search className="h-12 w-12 text-gray-300 mb-4" />
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                  No vehicles found
                </h2>
                <p className="text-gray-500 mb-6 text-center max-w-md">
                  We couldn't find any vehicles matching your search criteria.
                  Try adjusting your filters or search terms.
                </p>
                <Button onClick={handleClearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cars.map((car) => (
                    <CarCard
                      key={car.id}
                      id={car.id}
                      image={car.image}
                      make={car.make}
                      model={car.model}
                      year={car.year}
                      price={car.price}
                      mileage={car.mileage}
                      fuelType={car.fuelType}
                      transmission={car.transmission}
                      condition={car.condition}
                      featured={car.featured}
                      onClick={() => handleCarClick(car.id)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="my-8">
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                          />
                        </PaginationItem>
                      )}

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => {
                          // Show first page, last page, and pages around current page
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  isActive={page === currentPage}
                                  onClick={() => handlePageChange(page)}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          }

                          // Show ellipsis for gaps
                          if (page === 2 && currentPage > 3) {
                            return (
                              <PaginationItem key="ellipsis-start">
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }

                          if (
                            page === totalPages - 1 &&
                            currentPage < totalPages - 2
                          ) {
                            return (
                              <PaginationItem key="ellipsis-end">
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }

                          return null;
                        },
                      )}

                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;
