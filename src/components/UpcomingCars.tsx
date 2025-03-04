import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface UpcomingCar {
  id: string;
  name: string;
  image: string;
  price: string;
  launchDate: string;
  url: string;
}

interface UpcomingCarsProps {
  title?: string;
  cars?: UpcomingCar[];
}

const UpcomingCars = ({
  title = "Upcoming Cars",
  cars = [
    {
      id: "upcoming-1",
      name: "Tesla Cybertruck",
      image:
        "https://images.unsplash.com/photo-1562618305-15b8c2327cb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$39,900 - $69,900",
      launchDate: "Late 2023",
      url: "/car/tesla-cybertruck",
    },
    {
      id: "upcoming-2",
      name: "Ford F-150 Lightning",
      image:
        "https://images.unsplash.com/photo-1648826869519-3fad5c4e0c1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$39,974 - $90,874",
      launchDate: "Spring 2023",
      url: "/car/ford-f150-lightning",
    },
    {
      id: "upcoming-3",
      name: "Chevrolet Silverado EV",
      image:
        "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$39,900 - $80,000",
      launchDate: "Fall 2023",
      url: "/car/chevrolet-silverado-ev",
    },
    {
      id: "upcoming-4",
      name: "BMW i7",
      image:
        "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$119,300 - $139,300",
      launchDate: "December 2023",
      url: "/car/bmw-i7",
    },
    {
      id: "upcoming-5",
      name: "Audi Q6 e-tron",
      image:
        "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$75,000 - $95,000",
      launchDate: "Early 2024",
      url: "/car/audi-q6-etron",
    },
  ],
}: UpcomingCarsProps) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
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
          className="flex overflow-x-auto pb-6 space-x-6 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cars.map((car) => (
            <div
              key={car.id}
              className="flex-shrink-0 w-72 bg-white rounded-lg overflow-hidden shadow-md group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-[#FF6B3A]">
                  Upcoming
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600">
                  {car.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Expected Launch: {car.launchDate}
                </p>
                <p className="text-[#FF6B3A] font-bold mb-3">{car.price}</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={car.url}
                    className="text-[#FF6B3A] hover:text-[#e55a2a] text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-xs border-[#FF6B3A] text-[#FF6B3A] hover:bg-orange-50"
                  >
                    <Bell className="h-3 w-3" />
                    Alert Me
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingCars;
