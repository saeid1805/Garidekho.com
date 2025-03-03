import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Loader2,
  AlertCircle,
  Filter,
  X,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import CarCard from "./CarCard";
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
}

interface FeaturedCarsSectionProps {
  title?: string;
  description?: string;
  initialCars?: Car[];
  onViewAllClick?: () => void;
  onCarClick?: (carId: string) => void;
}

const FeaturedCarsSection = ({
  title = "Featured Vehicles",
  description = "Explore our handpicked selection of premium vehicles with exceptional value",
  initialCars,
  onViewAllClick = () => console.log("View all clicked"),
  onCarClick = (carId) => console.log(`Car ${carId} clicked`),
}: FeaturedCarsSectionProps) => {
  const [cars, setCars] = useState<Car[]>(initialCars || []);
  const [isLoading, setIsLoading] = useState(!initialCars);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  // State for additional filters
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [makeFilter, setMakeFilter] = useState<string>("all");
  const [fuelTypeFilter, setFuelTypeFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadCars = async () => {
      if (initialCars) {
        setCars(initialCars);
        setTotalPages(Math.ceil(initialCars.length / itemsPerPage));
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        // Add a small delay to show loading state more clearly
        await new Promise((resolve) => setTimeout(resolve, 500));
        const data = await carApiService.getFeaturedCars();
        setCars(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (err) {
        console.error("Error fetching featured cars:", err);
        setError("Failed to load featured vehicles. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCars();
  }, [initialCars, itemsPerPage]);

  // Filter cars based on active tab and additional filters
  const getFilteredCars = () => {
    let filtered = cars;

    // Apply condition filter (tab)
    switch (activeTab) {
      case "new":
        filtered = filtered.filter((car) => car.condition === "new");
        break;
      case "used":
        filtered = filtered.filter((car) => car.condition === "used");
        break;
      case "featured":
        filtered = filtered.filter((car) => car.featured);
        break;
    }

    // Apply price filter
    if (priceFilter !== "all") {
      switch (priceFilter) {
        case "under20k":
          filtered = filtered.filter((car) => car.price < 20000);
          break;
        case "20k-40k":
          filtered = filtered.filter(
            (car) => car.price >= 20000 && car.price <= 40000,
          );
          break;
        case "40k-60k":
          filtered = filtered.filter(
            (car) => car.price > 40000 && car.price <= 60000,
          );
          break;
        case "over60k":
          filtered = filtered.filter((car) => car.price > 60000);
          break;
      }
    }

    // Apply make filter
    if (makeFilter !== "all") {
      filtered = filtered.filter(
        (car) => car.make.toLowerCase() === makeFilter.toLowerCase(),
      );
    }

    // Apply fuel type filter
    if (fuelTypeFilter !== "all") {
      filtered = filtered.filter(
        (car) => car.fuelType.toLowerCase() === fuelTypeFilter.toLowerCase(),
      );
    }

    return filtered;
  };

  const allFilteredCars = getFilteredCars();

  // Update total pages when filters change
  useEffect(() => {
    setTotalPages(Math.ceil(allFilteredCars.length / itemsPerPage));
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [
    allFilteredCars.length,
    itemsPerPage,
    activeTab,
    priceFilter,
    makeFilter,
    fuelTypeFilter,
  ]);

  // Get paginated cars
  const getPaginatedCars = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allFilteredCars.slice(startIndex, endIndex);
  };

  const paginatedCars = getPaginatedCars();

  // Get unique makes and fuel types for filter options
  const uniqueMakes = [...new Set(cars.map((car) => car.make))].sort();
  const uniqueFuelTypes = [...new Set(cars.map((car) => car.fuelType))].sort();

  // Reset all filters
  const resetFilters = () => {
    setActiveTab("all");
    setPriceFilter("all");
    setMakeFilter("all");
    setFuelTypeFilter("all");
  };

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
            <p className="text-slate-600">{description}</p>
          </div>
          {!isLoading && !error && (
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button
                variant="ghost"
                className="flex items-center text-blue-600 hover:text-blue-800"
                onClick={onViewAllClick}
              >
                View all listings
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="overflow-x-auto pb-2">
            <TabsList
              className="mb-4 sm:mb-6 w-full sm:w-auto min-w-max"
              disabled={isLoading}
            >
              <TabsTrigger
                value="all"
                className="text-xs sm:text-sm"
                disabled={isLoading}
              >
                All Vehicles
              </TabsTrigger>
              <TabsTrigger
                value="new"
                className="text-xs sm:text-sm"
                disabled={isLoading}
              >
                New
              </TabsTrigger>
              <TabsTrigger
                value="used"
                className="text-xs sm:text-sm"
                disabled={isLoading}
              >
                Used
              </TabsTrigger>
              <TabsTrigger
                value="featured"
                className="text-xs sm:text-sm"
                disabled={isLoading}
              >
                Featured
              </TabsTrigger>
            </TabsList>

            {/* Additional Filters */}
            {showFilters && !isLoading && !error && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filter Options</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Price Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Range
                    </label>
                    <select
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white"
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                    >
                      <option value="all">All Prices</option>
                      <option value="under20k">Under $20,000</option>
                      <option value="20k-40k">$20,000 - $40,000</option>
                      <option value="40k-60k">$40,000 - $60,000</option>
                      <option value="over60k">Over $60,000</option>
                    </select>
                  </div>

                  {/* Make Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <select
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white"
                      value={makeFilter}
                      onChange={(e) => setMakeFilter(e.target.value)}
                    >
                      <option value="all">All Makes</option>
                      {uniqueMakes.map((make) => (
                        <option key={make} value={make}>
                          {make}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Fuel Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fuel Type
                    </label>
                    <select
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white"
                      value={fuelTypeFilter}
                      onChange={(e) => setFuelTypeFilter(e.target.value)}
                    >
                      <option value="all">All Fuel Types</option>
                      {uniqueFuelTypes.map((fuelType) => (
                        <option key={fuelType} value={fuelType}>
                          {fuelType}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Active Filters */}
                {(priceFilter !== "all" ||
                  makeFilter !== "all" ||
                  fuelTypeFilter !== "all") && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="text-sm text-gray-500 mr-2 flex items-center">
                      Active filters:
                    </div>
                    {priceFilter !== "all" && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {priceFilter === "under20k"
                          ? "Under $20,000"
                          : priceFilter === "20k-40k"
                            ? "$20,000 - $40,000"
                            : priceFilter === "40k-60k"
                              ? "$40,000 - $60,000"
                              : "Over $60,000"}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => setPriceFilter("all")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {makeFilter !== "all" && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {makeFilter}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => setMakeFilter("all")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {fuelTypeFilter !== "all" && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {fuelTypeFilter}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => setFuelTypeFilter("all")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs ml-auto"
                      onClick={resetFilters}
                    >
                      Reset All
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="min-h-[400px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex justify-center sm:justify-start"
                    >
                      <div className="w-full max-w-[280px] sm:max-w-[350px] overflow-hidden rounded-lg bg-white border border-gray-200">
                        <Skeleton className="h-[160px] sm:h-[200px] w-full" />
                        <div className="p-4 space-y-3">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-6 w-1/2" />
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                          <div className="flex justify-between pt-2">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-4 w-1/4" />
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
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <p className="text-red-500 mb-4">{error}</p>
                <Button
                  onClick={() => {
                    setIsLoading(true);
                    carApiService
                      .getFeaturedCars()
                      .then((data) => {
                        setCars(data);
                        setError(null);
                      })
                      .catch((err) => {
                        console.error("Error retrying fetch:", err);
                        setError(
                          "Failed to load featured vehicles. Please try again later.",
                        );
                      })
                      .finally(() => setIsLoading(false));
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Retry
                </Button>
              </div>
            ) : allFilteredCars.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <p className="text-gray-500 mb-4">
                  No vehicles found matching your filters.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">
                    Showing {paginatedCars.length} of {allFilteredCars.length}{" "}
                    {allFilteredCars.length === 1 ? "vehicle" : "vehicles"}
                  </div>
                  <div className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {paginatedCars.map((car) => (
                    <div
                      key={car.id}
                      className="flex justify-center sm:justify-start"
                    >
                      <CarCard
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
                        onClick={() => onCarClick(car.id)}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="my-8">
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPage(currentPage - 1)}
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
                                  onClick={() => setCurrentPage(page)}
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
                            onClick={() => setCurrentPage(currentPage + 1)}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedCarsSection;
