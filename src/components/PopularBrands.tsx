import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

interface Brand {
  id: string;
  name: string;
  logo: string;
  url: string;
}

interface PopularBrandsProps {
  title?: string;
  brands?: Brand[];
}

const PopularBrands = ({
  title = "Popular Brands",
  brands = [
    {
      id: "toyota",
      name: "Toyota",
      logo: "https://www.carlogos.org/car-logos/toyota-logo-2019-3700x1200.png",
      url: "/search?make=Toyota",
    },
    {
      id: "honda",
      name: "Honda",
      logo: "https://www.carlogos.org/car-logos/honda-logo-2000-2300x1300.png",
      url: "/search?make=Honda",
    },
    {
      id: "ford",
      name: "Ford",
      logo: "https://www.carlogos.org/car-logos/ford-logo-2017-1500x1101.png",
      url: "/search?make=Ford",
    },
    {
      id: "bmw",
      name: "BMW",
      logo: "https://www.carlogos.org/car-logos/bmw-logo-2020-gray-1500x1500.png",
      url: "/search?make=BMW",
    },
    {
      id: "mercedes",
      name: "Mercedes-Benz",
      logo: "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011-1920x1080.png",
      url: "/search?make=Mercedes-Benz",
    },
    {
      id: "audi",
      name: "Audi",
      logo: "https://www.carlogos.org/car-logos/audi-logo-2016-1500x1500.png",
      url: "/search?make=Audi",
    },
    {
      id: "tesla",
      name: "Tesla",
      logo: "https://www.carlogos.org/car-logos/tesla-logo-2007-2000x2000.png",
      url: "/search?make=Tesla",
    },
    {
      id: "hyundai",
      name: "Hyundai",
      logo: "https://www.carlogos.org/car-logos/hyundai-logo-2017-3000x1500.png",
      url: "/search?make=Hyundai",
    },
  ],
}: PopularBrandsProps) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <div className="flex space-x-2">
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
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 space-x-6 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={brand.url}
              className="flex-shrink-0 flex flex-col items-center group"
            >
              <div className="w-24 h-24 rounded-full bg-white border border-gray-200 flex items-center justify-center p-4 mb-2 group-hover:border-[#FF6B3A] group-hover:shadow-md transition-all">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#FF6B3A]">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;
