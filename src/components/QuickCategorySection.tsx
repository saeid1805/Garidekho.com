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

interface QuickCategorySectionProps {
  onCategoryClick?: (category: string) => void;
}

const QuickCategorySection = ({
  onCategoryClick = () => {},
}: QuickCategorySectionProps) => {
  const categories = [
    {
      id: "suv",
      icon: <Truck size={24} />,
      label: "SUVs",
      onClick: () => onCategoryClick("SUVs"),
    },
    {
      id: "electric",
      icon: <Zap size={24} />,
      label: "Electric",
      onClick: () => onCategoryClick("Electric"),
    },
    {
      id: "budget",
      icon: <DollarSign size={24} />,
      label: "Budget",
      onClick: () => onCategoryClick("Budget"),
    },
    {
      id: "luxury",
      icon: <Car size={24} />,
      label: "Luxury",
      onClick: () => onCategoryClick("Luxury"),
    },
    {
      id: "performance",
      icon: <Gauge size={24} />,
      label: "Performance",
      onClick: () => onCategoryClick("Performance"),
    },
    {
      id: "family",
      icon: <Users size={24} />,
      label: "Family",
      onClick: () => onCategoryClick("Family"),
    },
  ];

  return (
    <section className="w-full py-8 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
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

export default QuickCategorySection;
