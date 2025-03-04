import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, X, ArrowRight, Check } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { colors } from "./CardekhoStyle";
import carApiService, { Car } from "../services/api";

interface CompareCarSectionProps {
  title?: string;
  description?: string;
  maxCars?: number;
}

interface ComparisonSpec {
  name: string;
  values: (string | number | null)[];
  winner?: number | null;
}

const CompareCarSection = ({
  title = "Compare Cars Side by Side",
  description = "Select up to 4 cars to compare specifications and features",
  maxCars = 4,
}: CompareCarSectionProps) => {
  const navigate = useNavigate();
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [availableCars, setAvailableCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [specs, setSpecs] = useState<ComparisonSpec[]>([]);

  // Fetch available cars for comparison
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await carApiService.getFeaturedCars();
        setAvailableCars(response);
      } catch (err) {
        console.error("Error fetching cars for comparison:", err);
        setError("Failed to load cars. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Generate comparison specs when selected cars change
  useEffect(() => {
    if (selectedCars.length > 0) {
      generateComparisonSpecs();
    } else {
      setSpecs([]);
    }
  }, [selectedCars]);

  const handleAddCar = (carId: string) => {
    if (selectedCars.length >= maxCars) return;

    const carToAdd = availableCars.find((car) => car.id === carId);
    if (carToAdd && !selectedCars.some((car) => car.id === carId)) {
      setSelectedCars([...selectedCars, carToAdd]);
    }
  };

  const handleRemoveCar = (index: number) => {
    const newSelectedCars = [...selectedCars];
    newSelectedCars.splice(index, 1);
    setSelectedCars(newSelectedCars);
  };

  const generateComparisonSpecs = () => {
    // Basic specs to compare
    const newSpecs: ComparisonSpec[] = [
      {
        name: "Price",
        values: selectedCars.map((car) => `$${car.price.toLocaleString()}`),
        winner:
          selectedCars.length > 1
            ? selectedCars.indexOf(
                selectedCars.reduce((prev, curr) =>
                  prev.price < curr.price ? prev : curr,
                ),
              )
            : null,
      },
      {
        name: "Year",
        values: selectedCars.map((car) => car.year),
        winner:
          selectedCars.length > 1
            ? selectedCars.indexOf(
                selectedCars.reduce((prev, curr) =>
                  prev.year > curr.year ? prev : curr,
                ),
              )
            : null,
      },
      {
        name: "Mileage",
        values: selectedCars.map((car) =>
          car.condition === "new"
            ? "New"
            : `${car.mileage.toLocaleString()} mi`,
        ),
        winner:
          selectedCars.length > 1
            ? selectedCars.indexOf(
                selectedCars.reduce((prev, curr) => {
                  if (prev.condition === "new") return prev;
                  if (curr.condition === "new") return curr;
                  return prev.mileage < curr.mileage ? prev : curr;
                }),
              )
            : null,
      },
      {
        name: "Fuel Type",
        values: selectedCars.map((car) => car.fuelType),
        winner: null, // No winner for fuel type
      },
      {
        name: "Transmission",
        values: selectedCars.map((car) => car.transmission),
        winner: null, // No winner for transmission
      },
      {
        name: "Condition",
        values: selectedCars.map((car) =>
          car.condition === "new" ? "New" : "Used",
        ),
        winner:
          selectedCars.length > 1
            ? selectedCars.indexOf(
                selectedCars.reduce((prev, curr) => {
                  return prev.condition === "new" ? prev : curr;
                }),
              )
            : null,
      },
    ];

    setSpecs(newSpecs);
  };

  const handleViewFullComparison = () => {
    if (selectedCars.length < 2) return;

    const carIds = selectedCars.map((car) => car.id).join(",");
    navigate(`/compare?cars=${carIds}`);
  };

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Car Selection Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gray-100">
            {Array.from({ length: maxCars }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden h-64 flex flex-col"
              >
                {index < selectedCars.length ? (
                  // Selected Car
                  <div className="flex flex-col h-full">
                    <div className="relative h-32 bg-gray-200">
                      <img
                        src={selectedCars[index].image}
                        alt={`${selectedCars[index].make} ${selectedCars[index].model}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleRemoveCar(index)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                      >
                        <X className="h-4 w-4 text-gray-700" />
                      </button>
                    </div>
                    <div className="p-3 flex-grow">
                      <h3 className="font-bold text-gray-900 mb-1">
                        {selectedCars[index].year} {selectedCars[index].make}{" "}
                        {selectedCars[index].model}
                      </h3>
                      <p className="text-[#0073ff] font-bold">
                        ${selectedCars[index].price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  // Empty Slot
                  <div className="flex flex-col items-center justify-center h-full p-4 border-2 border-dashed border-gray-300">
                    {isLoading ? (
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0073ff] mx-auto mb-2"></div>
                        <p className="text-gray-500 text-sm">Loading cars...</p>
                      </div>
                    ) : (
                      <>
                        <PlusCircle className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-gray-500 text-sm text-center mb-3">
                          Add a car to compare
                        </p>
                        <Select
                          onValueChange={handleAddCar}
                          disabled={isLoading || availableCars.length === 0}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a car" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCars.map((car) => (
                              <SelectItem
                                key={car.id}
                                value={car.id}
                                disabled={selectedCars.some(
                                  (selected) => selected.id === car.id,
                                )}
                              >
                                {car.year} {car.make} {car.model}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          {selectedCars.length > 0 && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-3 border-b-2 border-gray-200 bg-gray-50 w-1/5">
                        Specifications
                      </th>
                      {selectedCars.map((car, index) => (
                        <th
                          key={index}
                          className="text-left p-3 border-b-2 border-gray-200 bg-gray-50"
                        >
                          {car.make} {car.model}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map((spec, specIndex) => (
                      <tr
                        key={specIndex}
                        className={
                          specIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }
                      >
                        <td className="p-3 border-b border-gray-200 font-medium">
                          {spec.name}
                        </td>
                        {spec.values.map((value, valueIndex) => (
                          <td
                            key={valueIndex}
                            className={`p-3 border-b border-gray-200 ${spec.winner === valueIndex ? "text-[#0073ff] font-bold" : ""}`}
                          >
                            {value}
                            {spec.winner === valueIndex && (
                              <Check className="inline-block ml-1 h-4 w-4 text-[#0073ff]" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedCars.length >= 2 && (
                <div className="mt-6 text-center">
                  <Button
                    onClick={handleViewFullComparison}
                    className="bg-[#0073ff] hover:bg-[#005cd9] text-white px-6 py-3 rounded-md inline-flex items-center"
                  >
                    View Full Comparison
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {selectedCars.length === 0 && !isLoading && (
            <div className="p-10 text-center">
              <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <ArrowRight className="h-8 w-8 text-[#0073ff]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Start Comparing Cars
                </h3>
                <p className="text-gray-600 mb-6">
                  Select at least two cars to see a detailed comparison of
                  specifications and features.
                </p>
                <Select
                  onValueChange={handleAddCar}
                  disabled={isLoading || availableCars.length === 0}
                >
                  <SelectTrigger className="w-full max-w-xs mx-auto">
                    <SelectValue placeholder="Select your first car" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCars.map((car) => (
                      <SelectItem key={car.id} value={car.id}>
                        {car.year} {car.make} {car.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-10 text-center">
              <div className="bg-red-50 rounded-lg p-8 max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                  <X className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Error Loading Cars
                </h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-[#0073ff] hover:bg-[#005cd9] text-white"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompareCarSection;
