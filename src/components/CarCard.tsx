import React from "react";
import { Heart, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CarCardProps {
  id?: string;
  image?: string;
  make?: string;
  model?: string;
  year?: number;
  price?: number;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
  condition?: "new" | "used";
  featured?: boolean;
  onClick?: () => void;
}

const CarCard = ({
  id = "car-1",
  image = "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  make = "Toyota",
  model = "Camry",
  year = 2023,
  price = 28999,
  mileage = 12500,
  fuelType = "Hybrid",
  transmission = "Automatic",
  condition = "used",
  featured = false,
  onClick = () => {},
}: CarCardProps) => {
  return (
    <Card
      className="w-full max-w-[280px] sm:max-w-[350px] overflow-hidden transition-all duration-200 hover:shadow-lg bg-white"
      onClick={onClick}
    >
      <div className="relative">
        {featured && (
          <Badge className="absolute top-2 right-2 z-10" variant="secondary">
            Featured
          </Badge>
        )}
        <div className="absolute top-2 left-2 z-10">
          <Badge
            variant={condition === "new" ? "default" : "outline"}
            className={
              condition === "new" ? "bg-green-600" : "bg-white text-gray-700"
            }
          >
            {condition === "new" ? "New" : "Used"}
          </Badge>
        </div>
        <div className="relative h-[160px] sm:h-[200px] w-full overflow-hidden">
          <img
            src={image}
            alt={`${year} ${make} ${model}`}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <button
            className="absolute top-2 right-2 rounded-full bg-white/80 p-1.5 text-gray-700 hover:bg-white hover:text-red-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Add to favorites functionality would go here
            }}
          >
            <Heart size={18} />
          </button>
        </div>
      </div>

      <CardHeader className="pb-2 pt-3 sm:pt-4">
        <CardTitle className="text-base sm:text-lg font-bold">
          {year} {make} {model}
        </CardTitle>
        <p className="text-xl sm:text-2xl font-bold text-primary">
          ${price.toLocaleString()}
        </p>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
        <div className="flex items-center gap-1">
          <span className="text-gray-500">Mileage:</span>
          <span className="font-medium">{mileage.toLocaleString()} mi</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">Fuel:</span>
          <span className="font-medium">{fuelType}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">Trans:</span>
          <span className="font-medium">{transmission}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">Year:</span>
          <span className="font-medium">{year}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <button
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // View details functionality would go here
          }}
        >
          <Info size={16} />
          <span>View Details</span>
        </button>
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-800 hover:bg-blue-200"
        >
          {condition === "new" ? "Warranty" : "Certified"}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
