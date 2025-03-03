import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Separator } from "./ui/separator";
import { ArrowRight, Check, X } from "lucide-react";

interface SpecItem {
  name: string;
  car1Value: string | number;
  car2Value: string | number;
  winner?: 1 | 2;
}

interface CarComparisonProps {
  car1: {
    id: string;
    name: string;
    image: string;
    price: number;
    year: number;
  };
  car2: {
    id: string;
    name: string;
    image: string;
    price: number;
    year: number;
  };
  specs: SpecItem[];
  comparisonLink?: string;
}

const CarComparison = ({
  car1 = {
    id: "1",
    name: "Tesla Model 3",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
    price: 42990,
    year: 2023,
  },
  car2 = {
    id: "2",
    name: "BMW i4",
    image:
      "https://images.unsplash.com/photo-1617814076668-8dfc6fe159ed?q=80&w=2072&auto=format&fit=crop",
    price: 56395,
    year: 2023,
  },
  specs = [
    {
      name: "Range",
      car1Value: "272 miles",
      car2Value: "301 miles",
      winner: 2,
    },
    {
      name: "Acceleration (0-60)",
      car1Value: "5.8 sec",
      car2Value: "5.5 sec",
      winner: 2,
    },
    {
      name: "Charging Speed",
      car1Value: "170 kW",
      car2Value: "200 kW",
      winner: 2,
    },
    {
      name: "Starting Price",
      car1Value: "$42,990",
      car2Value: "$56,395",
      winner: 1,
    },
  ],
  comparisonLink = "/comparisons/tesla-model-3-vs-bmw-i4",
}: CarComparisonProps) => {
  return (
    <Card className="w-full max-w-[700px] overflow-hidden bg-white border-slate-200">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Car 1 */}
          <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-slate-200">
            <div className="h-32 overflow-hidden rounded-md">
              <img
                src={car1.image}
                alt={car1.name}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">
              {car1.name}
            </h3>
            <p className="text-sm text-slate-500">
              {car1.year} · ${car1.price.toLocaleString()}
            </p>
          </div>

          {/* Car 2 */}
          <div className="flex-1 p-4">
            <div className="h-32 overflow-hidden rounded-md">
              <img
                src={car2.image}
                alt={car2.name}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">
              {car2.name}
            </h3>
            <p className="text-sm text-slate-500">
              {car2.year} · ${car2.price.toLocaleString()}
            </p>
          </div>
        </div>

        <Separator />

        {/* Specs Comparison */}
        <div className="p-4">
          <h4 className="mb-3 text-sm font-medium text-slate-700">
            Key Specifications
          </h4>
          <div className="space-y-2">
            {specs.map((spec, index) => (
              <div key={index} className="flex items-center text-sm">
                <div className="w-1/3 font-medium text-slate-600">
                  {spec.name}
                </div>
                <div className="flex flex-1 gap-2">
                  <div className="flex-1 flex items-center justify-between">
                    <span>{spec.car1Value}</span>
                    {spec.winner === 1 && (
                      <Check size={16} className="text-green-500" />
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span>{spec.car2Value}</span>
                    {spec.winner === 2 && (
                      <Check size={16} className="text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end p-4 pt-0">
        <Button variant="outline" size="sm" asChild>
          <a href={comparisonLink} className="flex items-center gap-1">
            Full Comparison <ArrowRight size={14} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarComparison;
