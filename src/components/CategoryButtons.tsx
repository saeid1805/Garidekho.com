import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Car, Zap, DollarSign, Truck, Gauge, Users } from "lucide-react";

interface CategoryButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

const CategoryButton = ({
  icon,
  label,
  onClick = () => {},
  className,
}: CategoryButtonProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "flex flex-col items-center justify-center h-24 w-full gap-2 p-2 hover:bg-blue-50 hover:border-blue-300 transition-all",
        className,
      )}
      onClick={onClick}
    >
      <div className="text-blue-600">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );
};

interface CategoryButtonsProps {
  categories?: Array<{
    id: string;
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
  }>;
}

const CategoryButtons = ({
  categories = [
    {
      id: "suv",
      icon: <Truck size={24} />,
      label: "SUVs",
      onClick: () => console.log("SUVs clicked"),
    },
    {
      id: "electric",
      icon: <Zap size={24} />,
      label: "Electric Vehicles",
      onClick: () => console.log("Electric Vehicles clicked"),
    },
    {
      id: "budget",
      icon: <DollarSign size={24} />,
      label: "Budget Cars",
      onClick: () => console.log("Budget Cars clicked"),
    },
    {
      id: "luxury",
      icon: <Car size={24} />,
      label: "Luxury Cars",
      onClick: () => console.log("Luxury Cars clicked"),
    },
    {
      id: "performance",
      icon: <Gauge size={24} />,
      label: "Performance",
      onClick: () => console.log("Performance clicked"),
    },
    {
      id: "family",
      icon: <Users size={24} />,
      label: "Family Cars",
      onClick: () => console.log("Family Cars clicked"),
    },
  ],
}: CategoryButtonsProps) => {
  return (
    <section className="w-full py-6 sm:py-8 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              icon={category.icon}
              label={category.label}
              onClick={category.onClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryButtons;
