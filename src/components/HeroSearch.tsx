import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { SearchFilters } from "./SearchBar";
import carApiService from "../services/api";

interface HeroSearchProps {
  onSearch?: (filters: SearchFilters) => void;
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
}

const carMakes = [
  "All Makes",
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Tesla",
  "Nissan",
  "Hyundai",
];

const modelsByMake: Record<string, string[]> = {
  "All Makes": ["All Models"],
  Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "Prius"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "HR-V"],
  Ford: ["F-150", "Mustang", "Explorer", "Escape", "Edge", "Bronco"],
  Chevrolet: ["Silverado", "Equinox", "Tahoe", "Malibu", "Traverse", "Camaro"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series", "i4"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "EQS"],
  Audi: ["A4", "A6", "Q5", "Q7", "e-tron", "A3"],
  Tesla: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"],
  Nissan: ["Altima", "Rogue", "Sentra", "Pathfinder", "Murano", "Leaf"],
  Hyundai: ["Elantra", "Tucson", "Santa Fe", "Sonata", "Palisade", "Kona"],
};

const HeroSearch = ({
  onSearch = () => {},
  backgroundImage = "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
  title = "Find Your Perfect Car",
  subtitle = "Search thousands of new and used vehicles all in one place",
}: HeroSearchProps) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    make: "All Makes",
    model: "All Models",
    priceRange: [0, 100000],
    condition: "all",
    keyword: "",
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [availableModels, setAvailableModels] = useState<string[]>(
    modelsByMake["All Makes"],
  );

  const handleMakeChange = (value: string) => {
    setFilters({
      ...filters,
      make: value,
      model: "All Models",
    });
    setAvailableModels(modelsByMake[value] || ["All Models"]);
  };

  const handleModelChange = (value: string) => {
    setFilters({
      ...filters,
      model: value,
    });
  };

  const handleConditionChange = (value: string) => {
    setFilters({
      ...filters,
      condition: value,
    });
  };

  const handlePriceChange = (values: number[]) => {
    const [min, max] = values;
    setPriceRange([min, max]);
    setFilters({
      ...filters,
      priceRange: [min, max],
    });
  };

  const handleSearch = async () => {
    try {
      // Call the API with the filters
      const searchResults = await carApiService.searchCars(filters);

      // Call the onSearch prop with the filters and results
      onSearch(filters);

      // Navigate to search results page with query parameters
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

      // Use navigate for a smoother experience
      const searchUrl = `/search?${searchParams.toString()}`;
      navigate(searchUrl);
    } catch (error) {
      console.error("Error searching cars:", error);
      // Navigate anyway even if the API call fails
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

      navigate(`/search?${searchParams.toString()}`);
    }
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full bg-slate-900 bg-opacity-50 bg-white">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mb-4 sm:mb-6 md:mb-8 max-w-2xl text-base sm:text-lg text-white/90">
          {subtitle}
        </p>

        {/* Search Box */}
        <div className="w-full max-w-4xl rounded-lg bg-white p-3 sm:p-4 shadow-lg">
          <div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Make Dropdown */}
            <div>
              <label
                htmlFor="make"
                className="mb-1 block text-xs sm:text-sm font-medium text-gray-700"
              >
                Make
              </label>
              <Select value={filters.make} onValueChange={handleMakeChange}>
                <SelectTrigger id="make" className="w-full h-9 sm:h-10">
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  {carMakes.map((make) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model Dropdown */}
            <div>
              <label
                htmlFor="model"
                className="mb-1 block text-xs sm:text-sm font-medium text-gray-700"
              >
                Model
              </label>
              <Select value={filters.model} onValueChange={handleModelChange}>
                <SelectTrigger
                  id="model"
                  className="w-full h-9 sm:h-10"
                  disabled={!filters.make || filters.make === "All Makes"}
                >
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="sm:col-span-2">
              <label
                htmlFor="price-range"
                className="mb-1 block text-xs sm:text-sm font-medium text-gray-700"
              >
                Price Range: {formatPrice(priceRange[0])} -{" "}
                {formatPrice(priceRange[1])}
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="price-range"
                    variant="outline"
                    className="w-full h-9 sm:h-10 justify-between"
                  >
                    <span className="text-xs sm:text-sm">
                      {formatPrice(priceRange[0])} -{" "}
                      {formatPrice(priceRange[1])}
                    </span>
                    <ChevronDown className="ml-2 h-3 w-3 sm:h-4 sm:w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-4" align="start">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {formatPrice(priceRange[0])}
                      </span>
                      <span className="text-sm font-medium">
                        {formatPrice(priceRange[1])}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[priceRange[0], priceRange[1]]}
                      max={150000}
                      step={1000}
                      onValueChange={handlePriceChange}
                      className="py-4"
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
            {/* Condition Radio Buttons */}
            <div className="flex space-x-4 w-full sm:w-auto justify-center sm:justify-start">
              <label className="flex items-center space-x-1 sm:space-x-2">
                <input
                  type="radio"
                  name="condition"
                  value="all"
                  checked={filters.condition === "all"}
                  onChange={() => handleConditionChange("all")}
                  className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600"
                />
                <span className="text-xs sm:text-sm">All</span>
              </label>
              <label className="flex items-center space-x-1 sm:space-x-2">
                <input
                  type="radio"
                  name="condition"
                  value="new"
                  checked={filters.condition === "new"}
                  onChange={() => handleConditionChange("new")}
                  className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600"
                />
                <span className="text-xs sm:text-sm">New</span>
              </label>
              <label className="flex items-center space-x-1 sm:space-x-2">
                <input
                  type="radio"
                  name="condition"
                  value="used"
                  checked={filters.condition === "used"}
                  onChange={() => handleConditionChange("used")}
                  className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600"
                />
                <span className="text-xs sm:text-sm">Used</span>
              </label>
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto h-9 sm:h-10 text-sm"
            >
              <Search className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Search Cars
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
