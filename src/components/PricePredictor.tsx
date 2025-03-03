import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Calculator, TrendingUp, Info, BarChart3 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface PricePredictorProps {
  onPredictionComplete?: (prediction: PredictionResult) => void;
}

interface PredictionResult {
  predictedPrice: number;
  priceRange: [number, number];
  confidence: number;
  similarListings: Array<{
    id: string;
    make: string;
    model: string;
    year: number;
    mileage: number;
    price: number;
  }>;
  marketTrend: "up" | "down" | "stable";
  trendPercentage: number;
}

const PricePredictor = ({
  onPredictionComplete = () => {},
}: PricePredictorProps) => {
  const [make, setMake] = useState("Tesla");
  const [model, setModel] = useState("Model 3");
  const [year, setYear] = useState(2021);
  const [mileage, setMileage] = useState(15000);
  const [condition, setCondition] = useState("excellent");
  const [features, setFeatures] = useState<string[]>([
    "premium_audio",
    "autopilot",
  ]);
  const [exteriorColor, setExteriorColor] = useState("white");
  const [interiorColor, setInteriorColor] = useState("black");
  const [zipCode, setZipCode] = useState("94105");

  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  // Mock data for available makes and models
  const availableMakes = [
    "Tesla",
    "BMW",
    "Audi",
    "Mercedes-Benz",
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
  ];

  const availableModels: Record<string, string[]> = {
    Tesla: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"],
    BMW: ["3 Series", "5 Series", "X3", "X5", "i4", "iX"],
    Audi: ["A4", "A6", "Q5", "e-tron", "Q7"],
    "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "EQS", "S-Class"],
    Toyota: ["Camry", "RAV4", "Corolla", "Highlander", "Prius"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot", "HR-V"],
    Ford: ["F-150", "Mustang", "Explorer", "Escape", "Bronco"],
    Chevrolet: ["Silverado", "Equinox", "Tahoe", "Malibu", "Bolt"],
  };

  const availableFeatures = [
    { id: "premium_audio", label: "Premium Audio" },
    { id: "autopilot", label: "Autopilot/Driver Assist" },
    { id: "leather", label: "Leather Seats" },
    { id: "sunroof", label: "Sunroof/Moonroof" },
    { id: "navigation", label: "Navigation System" },
    { id: "heated_seats", label: "Heated Seats" },
    { id: "360_camera", label: "360° Camera" },
    { id: "premium_wheels", label: "Premium Wheels" },
  ];

  const availableColors = [
    "black",
    "white",
    "silver",
    "gray",
    "blue",
    "red",
    "green",
    "brown",
    "gold",
    "orange",
  ];

  const handleMakeChange = (value: string) => {
    setMake(value);
    // Reset model when make changes
    if (availableModels[value]) {
      setModel(availableModels[value][0]);
    }
  };

  const toggleFeature = (featureId: string) => {
    if (features.includes(featureId)) {
      setFeatures(features.filter((id) => id !== featureId));
    } else {
      setFeatures([...features, featureId]);
    }
  };

  const handlePredictPrice = () => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock prediction result based on inputs
      const basePrice = make === "Tesla" ? 45000 : 35000;
      const yearFactor = (year - 2015) * 1000;
      const mileageFactor = mileage * -0.05;
      const conditionFactor =
        condition === "excellent" ? 5000 : condition === "good" ? 2500 : 0;
      const featuresFactor = features.length * 1200;

      const predictedPrice =
        basePrice +
        yearFactor +
        mileageFactor +
        conditionFactor +
        featuresFactor;
      const roundedPrice = Math.round(predictedPrice / 100) * 100; // Round to nearest hundred

      const result: PredictionResult = {
        predictedPrice: roundedPrice,
        priceRange: [roundedPrice * 0.95, roundedPrice * 1.05],
        confidence: 87,
        similarListings: [
          {
            id: "sim1",
            make,
            model,
            year: year - 1,
            mileage: mileage + 5000,
            price: roundedPrice - 2000,
          },
          {
            id: "sim2",
            make,
            model,
            year,
            mileage: mileage - 3000,
            price: roundedPrice + 1500,
          },
          {
            id: "sim3",
            make,
            model,
            year: year + 1,
            mileage: mileage - 8000,
            price: roundedPrice + 4000,
          },
        ],
        marketTrend: "up",
        trendPercentage: 3.2,
      };

      setPrediction(result);
      setShowResults(true);
      setIsLoading(false);
      onPredictionComplete(result);
    }, 1500);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full max-w-3xl bg-white">
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <CardTitle className="flex items-center text-blue-800">
          <Calculator className="mr-2 h-5 w-5" />
          AI Price Predictor
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!showResults ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Make
                </label>
                <Select value={make} onValueChange={handleMakeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMakes.map((makeName) => (
                      <SelectItem key={makeName} value={makeName}>
                        {makeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels[make]?.map((modelName) => (
                      <SelectItem key={modelName} value={modelName}>
                        {modelName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <Select
                  value={year.toString()}
                  onValueChange={(value) => setYear(parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => 2024 - i).map(
                      (yearValue) => (
                        <SelectItem
                          key={yearValue}
                          value={yearValue.toString()}
                        >
                          {yearValue}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Mileage
                  </label>
                  <span className="text-sm text-gray-500">
                    {mileage.toLocaleString()} miles
                  </span>
                </div>
                <Slider
                  value={[mileage]}
                  min={0}
                  max={150000}
                  step={1000}
                  onValueChange={(values) => setMileage(values[0])}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0 miles</span>
                  <span>150,000 miles</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exterior Color
                </label>
                <Select value={exteriorColor} onValueChange={setExteriorColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableColors.map((color) => (
                      <SelectItem key={color} value={color}>
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{
                              backgroundColor:
                                color === "white" ? "#f8fafc" : color,
                            }}
                          />
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interior Color
                </label>
                <Select value={interiorColor} onValueChange={setInteriorColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableColors.map((color) => (
                      <SelectItem key={color} value={color}>
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{
                              backgroundColor:
                                color === "white" ? "#f8fafc" : color,
                            }}
                          />
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <Input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Enter ZIP code"
                  maxLength={5}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {availableFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className={`px-3 py-2 rounded-md border cursor-pointer text-sm transition-colors ${features.includes(feature.id) ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`}
                    onClick={() => toggleFeature(feature.id)}
                  >
                    {feature.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handlePredictPrice}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Analyzing Market Data..." : "Predict Price"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {prediction && (
              <>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {formatCurrency(prediction.predictedPrice)}
                  </h3>
                  <p className="text-gray-500">
                    Estimated value for your {year} {make} {model}
                  </p>
                  <div className="flex items-center justify-center mt-2">
                    <div className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full flex items-center">
                      <Info className="h-3.5 w-3.5 mr-1" />
                      {prediction.confidence}% confidence
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Price Range</h4>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-60 text-xs">
                            This range represents the estimated minimum and
                            maximum values based on current market conditions.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">
                      {formatCurrency(prediction.priceRange[0])}
                    </span>
                    <div className="h-2 flex-1 mx-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                    <span className="text-gray-700">
                      {formatCurrency(prediction.priceRange[1])}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Market Trend
                    </h4>
                    <div className="flex items-center">
                      <TrendingUp
                        className={`h-5 w-5 mr-1 ${prediction.marketTrend === "up" ? "text-green-600" : prediction.marketTrend === "down" ? "text-red-600" : "text-yellow-600"}`}
                      />
                      <span
                        className={`font-medium ${prediction.marketTrend === "up" ? "text-green-600" : prediction.marketTrend === "down" ? "text-red-600" : "text-yellow-600"}`}
                      >
                        {prediction.marketTrend === "up"
                          ? "Up"
                          : prediction.marketTrend === "down"
                            ? "Down"
                            : "Stable"}{" "}
                        {prediction.trendPercentage}%
                      </span>
                    </div>
                  </div>
                  <BarChart3 className="h-10 w-10 text-blue-300" />
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Similar Listings
                  </h4>
                  <div className="space-y-3">
                    {prediction.similarListings.map((listing) => (
                      <div
                        key={listing.id}
                        className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {listing.year} {listing.make} {listing.model}
                          </p>
                          <p className="text-sm text-gray-500">
                            {listing.mileage.toLocaleString()} miles
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {formatCurrency(listing.price)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(
                              ((listing.price - prediction.predictedPrice) /
                                prediction.predictedPrice) *
                              100
                            ).toFixed(1)}
                            %
                            {listing.price > prediction.predictedPrice
                              ? "higher"
                              : "lower"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowResults(false)}
                  >
                    Adjust Details
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    List Your Car
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PricePredictor;
