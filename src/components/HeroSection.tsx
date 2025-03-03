import React from "react";
import { Button } from "../components/ui/button";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  onSearch?: (filters: any) => void;
}

const HeroSection = ({
  title = "Find Your Perfect Car",
  subtitle = "Search thousands of new and used vehicles all in one place",
  backgroundImage = "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  onSearch = (filters) => console.log("Search filters:", filters),
}: HeroSectionProps) => {
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
                defaultValue=""
              >
                <option value="" disabled>
                  Select Make
                </option>
                <option value="toyota">Toyota</option>
                <option value="honda">Honda</option>
                <option value="ford">Ford</option>
                <option value="bmw">BMW</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
                <option value="tesla">Tesla</option>
              </select>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-white mb-1">
                Model
              </label>
              <select
                className="w-full h-10 px-3 rounded-md bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Model
                </option>
                <option value="camry">Camry</option>
                <option value="corolla">Corolla</option>
                <option value="civic">Civic</option>
                <option value="accord">Accord</option>
                <option value="f150">F-150</option>
                <option value="mustang">Mustang</option>
                <option value="3series">3 Series</option>
                <option value="model3">Model 3</option>
              </select>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-white mb-1">
                Price Range
              </label>
              <select
                className="w-full h-10 px-3 rounded-md bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onClick={() =>
                onSearch({
                  make: "toyota", // In a real app, these would be the actual selected values
                  model: "camry",
                  price: "20000-30000",
                  condition: "used",
                })
              }
            >
              Search Cars
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
