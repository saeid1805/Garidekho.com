import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import CarCard from "./CarCard";

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

interface FeaturedListingsProps {
  title?: string;
  description?: string;
  cars?: Car[];
  onViewAllClick?: () => void;
}

const FeaturedListings = ({
  title = "Featured Vehicles",
  description = "Explore our handpicked selection of premium vehicles with exceptional value",
  cars = [
    {
      id: "car-1",
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      make: "Toyota",
      model: "Camry",
      year: 2023,
      price: 28999,
      mileage: 12500,
      fuelType: "Hybrid",
      transmission: "Automatic",
      condition: "used",
      featured: true,
    },
    {
      id: "car-2",
      image:
        "https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      make: "Honda",
      model: "Accord",
      year: 2023,
      price: 31995,
      mileage: 5000,
      fuelType: "Gasoline",
      transmission: "Automatic",
      condition: "used",
      featured: true,
    },
    {
      id: "car-3",
      image:
        "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      price: 42990,
      mileage: 1000,
      fuelType: "Electric",
      transmission: "Automatic",
      condition: "new",
      featured: true,
    },
    {
      id: "car-4",
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
    },
  ],
  onViewAllClick = () => {},
}: FeaturedListingsProps) => {
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

  return (
    <section className="w-full py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
            <p className="mt-2 text-slate-600">{description}</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
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
            <Button variant="outline" className="ml-2" onClick={onViewAllClick}>
              View All
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-6 -mx-4 px-4 space-x-6 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cars.map((car) => (
            <div key={car.id} className="flex-shrink-0">
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
                onClick={() => console.log(`Clicked on car: ${car.id}`)}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button onClick={onViewAllClick}>View All Vehicles</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
