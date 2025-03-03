import React, { useState } from "react";
import {
  Car,
  Zap,
  DollarSign,
  Truck,
  Gauge,
  Users,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import CategoryButton from "./CategoryButton";

interface QuickCategorySectionProps {
  onCategoryClick?: (category: string) => void;
}

const QuickCategorySection = ({
  onCategoryClick = () => {},
}: QuickCategorySectionProps) => {
  const categories = [
    { id: "suv", icon: <Truck size={24} />, label: "SUVs" },
    { id: "electric", icon: <Zap size={24} />, label: "Electric" },
    { id: "budget", icon: <DollarSign size={24} />, label: "Budget" },
    { id: "luxury", icon: <Car size={24} />, label: "Luxury" },
    { id: "performance", icon: <Gauge size={24} />, label: "Performance" },
    { id: "family", icon: <Users size={24} />, label: "Family" },
    { id: "sedan", icon: <Car size={24} />, label: "Sedan" },
    { id: "hybrid", icon: <Zap size={24} />, label: "Hybrid" },
  ];

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const newPosition = Math.max(0, scrollPosition - 300);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const maxScroll =
        scrollContainerRef.current.scrollWidth -
        scrollContainerRef.current.clientWidth;
      const newPosition = Math.min(maxScroll, scrollPosition + 300);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="w-full py-8 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Browse by Category
          </h2>
          <div className="hidden sm:flex space-x-2">
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

        {/* Desktop view - grid */}
        <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              icon={category.icon}
              label={category.label}
              onClick={() => onCategoryClick(category.label)}
            />
          ))}
        </div>

        {/* Mobile/tablet view - scrollable */}
        <div
          ref={scrollContainerRef}
          className="md:hidden flex overflow-x-auto pb-4 -mx-2 px-2 space-x-3 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <div key={category.id} className="flex-shrink-0 w-[120px]">
              <CategoryButton
                icon={category.icon}
                label={category.label}
                onClick={() => onCategoryClick(category.label)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickCategorySection;
