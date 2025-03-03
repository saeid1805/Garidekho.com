import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import CarCard from "./CarCard";
import SearchBar from "./SearchBar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

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

interface RecommendedCarsProps {
  title?: string;
  description?: string;
  cars?: Car[];
  onViewAllClick?: () => void;
  searchQuery?: string;
  onCarClick?: (carId: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const RecommendedCars = ({
  title = "Recommended for You",
  description = "Based on your browsing history and preferences",
  cars = [
    {
      id: "rec-1",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      make: "Tesla",
      model: "Model Y",
      year: 2023,
      price: 52990,
      mileage: 0,
      fuelType: "Electric",
      transmission: "Automatic",
      condition: "new",
      featured: true,
      category: "Electric Vehicles",
    },
    {
      id: "rec-2",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      make: "Chevrolet",
      model: "Corvette",
      year: 2022,
      price: 64995,
      mileage: 3500,
      fuelType: "Gasoline",
      transmission: "Manual",
      condition: "used",
      featured: true,
      category: "Performance",
    },
    {
      id: "rec-3",
      image:
        "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      make: "Honda",
      model: "CR-V Hybrid",
      year: 2023,
      price: 32450,
      mileage: 0,
      fuelType: "Hybrid",
      transmission: "Automatic",
      condition: "new",
      featured: false,
      category: "SUVs",
    },
    {
      id: "rec-4",
      image:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      make: "Ford",
      model: "Explorer",
      year: 2022,
      price: 38995,
      mileage: 15000,
      fuelType: "Gasoline",
      transmission: "Automatic",
      condition: "used",
      featured: false,
      category: "Family Cars",
    },
  ],
  onViewAllClick = () => {},
  searchQuery = "",
  onCarClick = (carId: string) => console.log(`Clicked on car: ${carId}`),
  currentPage = 1,
  totalPages = 1,
  onPageChange = (page: number) => {},
}: RecommendedCarsProps) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // Use props for pagination if provided, otherwise use local state
  const [localCurrentPage, setLocalCurrentPage] = useState(1);
  const [localTotalPages, setLocalTotalPages] = useState(1);

  // Use either props or local state
  const effectiveCurrentPage = currentPage || localCurrentPage;
  const effectiveTotalPages = totalPages || localTotalPages;

  // Handle page change
  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setLocalCurrentPage(page);
    }
  };

  // Extract unique categories from cars
  const categories = Array.from(
    new Set(cars.map((car) => car.category).filter(Boolean)),
  );

  // Filter cars by category if one is selected
  const displayedCars = activeCategory
    ? cars.filter(
        (car) =>
          car.category === activeCategory || car.fuelType === activeCategory,
      )
    : cars;

  return (
    <section className="w-full py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            <p className="mt-2 text-slate-600">
              {searchQuery
                ? `Based on your search: "${searchQuery}"`
                : description}
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" className="ml-2" onClick={onViewAllClick}>
              View All
            </Button>
          </div>
        </div>

        {/* Category filters */}
        {categories.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <Badge
              variant={activeCategory === null ? "default" : "outline"}
              className={`cursor-pointer ${activeCategory === null ? "bg-blue-600" : "hover:bg-blue-50"}`}
              onClick={() => setActiveCategory(null)}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`cursor-pointer ${activeCategory === category ? "bg-blue-600" : "hover:bg-blue-50"}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}

        {/* Search filters */}
        {showFilters && (
          <div className="mb-6">
            <SearchBar className="mb-4" />
          </div>
        )}

        {/* Navigation controls */}
        <div className="flex justify-end mb-4 space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {displayedCars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {displayedCars.map((car) => (
                <div key={car.id}>
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
            {effectiveTotalPages > 1 && (
              <Pagination className="my-8">
                <PaginationContent>
                  {effectiveCurrentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          handlePageChange(effectiveCurrentPage - 1)
                        }
                      />
                    </PaginationItem>
                  )}

                  {Array.from(
                    { length: effectiveTotalPages },
                    (_, i) => i + 1,
                  ).map((page) => {
                    // Show first page, last page, and pages around current page
                    if (
                      page === 1 ||
                      page === effectiveTotalPages ||
                      (page >= effectiveCurrentPage - 1 &&
                        page <= effectiveCurrentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={page === effectiveCurrentPage}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    // Show ellipsis for gaps
                    if (page === 2 && effectiveCurrentPage > 3) {
                      return (
                        <PaginationItem key="ellipsis-start">
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    if (
                      page === effectiveTotalPages - 1 &&
                      effectiveCurrentPage < effectiveTotalPages - 2
                    ) {
                      return (
                        <PaginationItem key="ellipsis-end">
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    return null;
                  })}

                  {effectiveCurrentPage < effectiveTotalPages && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(effectiveCurrentPage + 1)
                        }
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          <div className="py-12 text-center bg-gray-50 rounded-lg">
            <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No vehicles found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search filters or browse all vehicles
            </p>
            <Button onClick={() => setActiveCategory(null)}>
              View All Vehicles
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendedCars;
