import React, { useState, useEffect } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
  className?: string;
  initialFilters?: Partial<SearchFilters>;
}

export interface SearchFilters {
  make: string;
  model: string;
  priceRange: [number, number];
  condition: string;
  keyword?: string;
}

const SearchBar = ({
  onSearch,
  className = "",
  initialFilters,
}: SearchBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    make: initialFilters?.make || "",
    model: initialFilters?.model || "",
    priceRange: initialFilters?.priceRange || [5000, 50000],
    condition: initialFilters?.condition || "all",
    keyword: initialFilters?.keyword || "",
  });

  // Mock data for dropdowns
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

  const carModels: Record<string, string[]> = {
    "All Makes": ["All Models"],
    Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "Prius"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "HR-V"],
    Ford: ["F-150", "Mustang", "Explorer", "Escape", "Edge", "Bronco"],
    Chevrolet: [
      "Silverado",
      "Equinox",
      "Tahoe",
      "Malibu",
      "Traverse",
      "Camaro",
    ],
    BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series", "i4"],
    "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "EQS"],
    Audi: ["A4", "A6", "Q5", "Q7", "e-tron", "A3"],
    Tesla: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"],
    Nissan: ["Altima", "Rogue", "Sentra", "Pathfinder", "Murano", "Leaf"],
    Hyundai: ["Elantra", "Tucson", "Santa Fe", "Sonata", "Palisade", "Kona"],
  };

  const conditions = ["All Conditions", "New", "Used", "Certified Pre-Owned"];

  const [availableModels, setAvailableModels] = useState<string[]>(
    filters.make && filters.make in carModels
      ? carModels[filters.make]
      : ["All Models"],
  );

  // Update available models when make changes
  useEffect(() => {
    if (filters.make && filters.make in carModels) {
      setAvailableModels(carModels[filters.make]);
    } else {
      setAvailableModels(["All Models"]);
    }
  }, [filters.make]);

  const handleMakeChange = (value: string) => {
    setFilters({
      ...filters,
      make: value,
      model: "", // Reset model when make changes
    });
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

  const handlePriceRangeChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: [value[0], value[1]],
    });
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      keyword: e.target.value,
    });
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(filters);
    }
    // Optionally collapse the expanded view after search
    setIsExpanded(false);
  };

  const handleReset = () => {
    setFilters({
      make: "",
      model: "",
      priceRange: [5000, 50000],
      condition: "all",
      keyword: "",
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 ${className}`}>
      {/* Basic Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <Input
            type="text"
            placeholder="Search by make, model, or keyword"
            className="pl-10 pr-4 py-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.keyword || ""}
            onChange={handleKeywordChange}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-1 px-3 py-3 border border-gray-300 rounded-md w-full sm:w-auto"
          onClick={toggleExpanded}
        >
          Filters
          <ChevronDown
            size={16}
            className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md w-full sm:w-auto"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Make
            </label>
            <Select value={filters.make} onValueChange={handleMakeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Makes" />
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <Select
              value={filters.model}
              onValueChange={handleModelChange}
              disabled={!filters.make}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Models" />
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <Select
              value={filters.condition}
              onValueChange={handleConditionChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Conditions" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Price Range
              </label>
              <span className="text-sm text-gray-500">
                ${filters.priceRange[0].toLocaleString()} - $
                {filters.priceRange[1].toLocaleString()}
              </span>
            </div>
            <Slider
              defaultValue={[5000, 50000]}
              min={0}
              max={100000}
              step={1000}
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onValueChange={handlePriceRangeChange}
              className="py-4"
            />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-1"
            >
              <X size={16} />
              Reset
            </Button>
            <Button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
