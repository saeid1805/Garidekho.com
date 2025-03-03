import React, { useState, useEffect } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  useEffect(() => {
    const loadCars = async () => {
      if (initialCars) {
        setCars(initialCars);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
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
          <Button
            variant="ghost"
            className="flex items-center mt-4 md:mt-0 text-blue-600 hover:text-blue-800"
            onClick={onViewAllClick}
          >
            View all listings
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="overflow-x-auto pb-2">
            <TabsList className="mb-6 sm:mb-8 w-full sm:w-auto min-w-max">
              <TabsTrigger value="all" className="text-xs sm:text-sm">
                All Vehicles
              </TabsTrigger>
              <TabsTrigger value="new" className="text-xs sm:text-sm">
                New
              </TabsTrigger>
              <TabsTrigger value="used" className="text-xs sm:text-sm">
                Used
              </TabsTrigger>
              <TabsTrigger value="featured" className="text-xs sm:text-sm">
                Featured
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500">Loading featured vehicles...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
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
                >
                  Retry
                </Button>
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <p className="text-gray-500 mb-4">
                  No vehicles found in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredCars.map((car) => (
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
            )}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedCarsSection;
