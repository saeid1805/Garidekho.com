import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { SearchFilters } from "./SearchBar";
import carApiService from "../services/api";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  onSearch?: (filters: SearchFilters) => void;
}

const HeroSection = ({
  title = "Find Your Perfect Car",
  subtitle = "Search thousands of new and used vehicles all in one place",
  backgroundImage = "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
  onSearch = (filters) => console.log("Search filters:", filters),
}: HeroSectionProps) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [condition, setCondition] = useState("all");
  const [isSearching, setIsSearching] = useState(false);

  // Handle form submission
  const handleSearch = async () => {
    setIsSearching(true);

    try {
      // Create filters object
      const filters: SearchFilters = {
        make,
        model,
        priceRange,
        condition,
      };

      // Call the API service
      const results = await carApiService.searchCars(filters);

      // Pass the filters to the parent component
      onSearch(filters);
    } catch (error) {
      console.error("Error searching cars:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle price range selection
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "0-10000") setPriceRange([0, 10000]);
    else if (value === "10000-20000") setPriceRange([10000, 20000]);
    else if (value === "20000-30000") setPriceRange([20000, 30000]);
    else if (value === "30000-50000") setPriceRange([30000, 50000]);
    else if (value === "50000-100000") setPriceRange([50000, 100000]);
    else if (value === "100000+") setPriceRange([100000, 1000000]);
  };

  // Add event listeners after component mounts
  useEffect(() => {
    const makeSelect = document.getElementById(
      "make-select",
    ) as HTMLSelectElement;
    const modelSelect = document.getElementById(
      "model-select",
    ) as HTMLSelectElement;
    const priceSelect = document.getElementById(
      "price-select",
    ) as HTMLSelectElement;
    const conditionSelect = document.getElementById(
      "condition-select",
    ) as HTMLSelectElement;

    if (makeSelect)
      makeSelect.addEventListener("change", (e) =>
        setMake((e.target as HTMLSelectElement).value),
      );
    if (modelSelect)
      modelSelect.addEventListener("change", (e) =>
        setModel((e.target as HTMLSelectElement).value),
      );
    if (priceSelect)
      priceSelect.addEventListener("change", handlePriceRangeChange);
    if (conditionSelect)
      conditionSelect.addEventListener("change", (e) =>
        setCondition((e.target as HTMLSelectElement).value),
      );

    return () => {
      if (makeSelect)
        makeSelect.removeEventListener("change", (e) =>
          setMake((e.target as HTMLSelectElement).value),
        );
      if (modelSelect)
        modelSelect.removeEventListener("change", (e) =>
          setModel((e.target as HTMLSelectElement).value),
        );
      if (priceSelect)
        priceSelect.removeEventListener("change", handlePriceRangeChange);
      if (conditionSelect)
        conditionSelect.removeEventListener("change", (e) =>
          setCondition((e.target as HTMLSelectElement).value),
        );
    };
  }, []);
  return (
    <div className="relative w-full h-[600px] bg-slate-900">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        {/* Hero Text */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl">
          {title}
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl">{subtitle}</p>

        {/* Search Component */}
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-white mb-1">
                Make
              </label>
              <select
                className="w-full h-10 px-3 rounded-md bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="make-select"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Make
                </option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes-Benz">Mercedes</option>
                <option value="Audi">Audi</option>
                <option value="Tesla">Tesla</option>
              </select>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-white mb-1">
                Model
              </label>
              <select
                className="w-full h-10 px-3 rounded-md bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="model-select"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Model
                </option>
                <option value="Camry">Camry</option>
                <option value="Corolla">Corolla</option>
                <option value="Civic">Civic</option>
                <option value="Accord">Accord</option>
                <option value="F-150">F-150</option>
                <option value="Mustang">Mustang</option>
                <option value="3 Series">3 Series</option>
                <option value="Model 3">Model 3</option>
              </select>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-white mb-1">
                Price Range
              </label>
              <select
                className="w-full h-10 px-3 rounded-md bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="price-select"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Price
                </option>
                <option value="0-10000">$0 - $10,000</option>
                <option value="10000-20000">$10,000 - $20,000</option>
                <option value="20000-30000">$20,000 - $30,000</option>
                <option value="30000-50000">$30,000 - $50,000</option>
                <option value="50000-100000">$50,000 - $100,000</option>
                <option value="100000+">$100,000+</option>
              </select>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-white mb-1">
                Condition
              </label>
              <select
                className="w-full h-10 px-3 rounded-md bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="condition-select"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Condition
                </option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="certified">Certified Pre-Owned</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              className="w-full md:w-auto px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search Cars
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="flex items-center text-white">
            <span className="text-blue-400 font-bold mr-2">10,000+</span>
            <span>Cars Available</span>
          </div>
          <div className="flex items-center text-white">
            <span className="text-blue-400 font-bold mr-2">500+</span>
            <span>Trusted Dealers</span>
          </div>
          <div className="flex items-center text-white">
            <span className="text-blue-400 font-bold mr-2">24/7</span>
            <span>Customer Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
