import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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
        "flex flex-col items-center justify-center h-16 sm:h-20 md:h-24 w-full gap-1 sm:gap-2 p-1 sm:p-2 hover:bg-blue-50 hover:border-blue-300 transition-all",
        className,
      )}
      onClick={onClick}
    >
      <div className="text-blue-600">{icon}</div>
      <span className="text-xs sm:text-sm font-medium">{label}</span>
    </Button>
  );
};

export default CategoryButton;
