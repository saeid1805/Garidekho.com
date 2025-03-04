import React, { useState, useEffect } from "react";
import { ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import CarCard from "./CarCard";
import carApiService, { Car } from "../services/api";

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

  useEffect(() => {
    const loadCars = async () => {
      if (initialCars) {
        setCars(initialCars);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        // Add a small delay to show loading state more clearly
        await new Promise((resolve) => setTimeout(resolve, 500));
        const data = await carApiService.getFeaturedCars();
        setCars(data);
      } catch (err) {
        console.error("Error fetching featured cars:", err);
        setError("Failed to load featured vehicles. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCars();
  }, [initialCars]);

  // Filter cars based on active tab
  const getFilteredCars = () => {
    switch (activeTab) {
      case "new":
        return cars.filter((car) => car.condition === "new");
      case "used":
        return cars.filter((car) => car.condition === "used");
      case "featured":
        return cars.filter((car) => car.featured);
      default:
        return cars;
    }
  };

  const filteredCars = getFilteredCars();

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
            <p className="text-slate-600">{description}</p>
          </div>
          {!isLoading && !error && (
            <Button
              variant="ghost"
              className="flex items-center text-blue-600 hover:text-blue-800 mt-4 md:mt-0"
              onClick={onViewAllClick}
            >
              View all listings
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>

        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="all" disabled={isLoading}>
              All Vehicles
            </TabsTrigger>
            <TabsTrigger value="new" disabled={isLoading}>
              New
            </TabsTrigger>
            <TabsTrigger value="used" disabled={isLoading}>
              Used
            </TabsTrigger>
            <TabsTrigger value="featured" disabled={isLoading}>
              Featured
            </TabsTrigger>
          </TabsList>

          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex justify-center">
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
                      </div>
                    </div>
                  </div>
                ))}
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
            ) : filteredCars.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <p className="text-gray-500 mb-4">
                  No vehicles found matching your filters.
                </p>
                <Button variant="outline" onClick={() => setActiveTab("all")}>
                  Show All Vehicles
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCars.slice(0, 8).map((car) => (
                  <div key={car.id} className="flex justify-center">
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
            )}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedCarsSection;
