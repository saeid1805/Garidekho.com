import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarLoanCalculator from "../components/CarLoanCalculator";
import RecommendedCars from "../components/RecommendedCars";
import ThreeSixtyViewer from "../components/ThreeSixtyViewer";
import ChatSupport from "../components/ChatSupport";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Heart,
  Share2,
  Phone,
  MessageSquare,
  Calendar,
  MapPin,
  Shield,
  Fuel,
  Gauge,
  Car,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Play,
  Box,
  Loader2,
} from "lucide-react";
import carApiService, { Car as CarType } from "../services/api";

interface CarDetailsPageProps {
  onAddToFavorites?: (car: CarType) => void;
}

const CarDetailsPage = ({ onAddToFavorites }: CarDetailsPageProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"gallery" | "360" | "video">(
    "gallery",
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [car, setCar] = useState<any>(null);
  const [similarCars, setSimilarCars] = useState<any[]>([]);

  // Fetch car details on component mount
  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);

        // Fetch car details
        const carData = await carApiService.getCarById(id);
        if (!carData) {
          throw new Error("Car not found");
        }
        setCar(carData);

        // Fetch similar cars (cars with same category or make)
        const allCarsResponse = await carApiService.getAllCars(1, 20);
        const filtered = allCarsResponse.cars
          .filter(
            (c) =>
              c.id !== id &&
              (c.category === carData.category ||
                c.make === carData.make ||
                c.fuelType === carData.fuelType),
          )
          .slice(0, 4);
        setSimilarCars(filtered);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError("Failed to load car details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const nextImage = () => {
    if (!car) return;
    setCurrentImageIndex((prev) =>
      prev === car.images?.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    if (!car) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? car.images?.length - 1 : prev - 1,
    );
  };

  // Handle car card clicks
  const handleCarClick = (carId: string) => {
    navigate(`/car/${carId}`);
  };

  // If loading, show loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading car details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // If error, show error message
  if (error || !car) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 bg-red-50 rounded-lg">
            <p className="text-red-600 font-medium mb-4">
              {error || "Car not found"}
            </p>
            <Button onClick={() => navigate("/")}>Return to Homepage</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock data for images and 360 view
  const images = car.images || [
    car.image,
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1554744512-d6c603f27c54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1553260168-69b041873e65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  ];

  const threeSixtyImages = car.threeSixtyImages || [
    car.image,
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1554744512-d6c603f27c54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1553260168-69b041873e65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    car.image,
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1554744512-d6c603f27c54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1553260168-69b041873e65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  ];

  const videoUrl = car.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ";

  // Car title
  const carTitle = `${car.year} ${car.make} ${car.model} ${car.trim || ""}`;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-4">
          <nav className="flex text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <Link
              to={car.condition === "new" ? "/new-cars" : "/used-cars"}
              className="hover:text-blue-600 transition-colors"
            >
              {car.condition === "new" ? "New Cars" : "Used Cars"}
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <Link
              to={`/${car.condition}-cars/${car.make.toLowerCase()}`}
              className="hover:text-blue-600 transition-colors"
            >
              {car.make}
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-gray-900">{car.model}</span>
          </nav>
        </div>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to search results
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Car Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* View Mode Selector */}
            <div className="flex space-x-2 mb-2">
              <Button
                variant={viewMode === "gallery" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("gallery")}
                className={viewMode === "gallery" ? "bg-blue-600" : ""}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                <ChevronRight className="mr-2 h-4 w-4" />
                Gallery
              </Button>
              <Button
                variant={viewMode === "360" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("360")}
                className={viewMode === "360" ? "bg-blue-600" : ""}
              >
                <Box className="mr-2 h-4 w-4" />
                360° View
              </Button>
              <Button
                variant={viewMode === "video" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("video")}
                className={viewMode === "video" ? "bg-blue-600" : ""}
              >
                <Play className="mr-2 h-4 w-4" />
                Video Tour
              </Button>
            </div>

            {/* Media Display Area */}
            {viewMode === "gallery" && (
              <>
                {/* Car Images */}
                <div className="relative rounded-lg overflow-hidden bg-gray-100 h-[400px]">
                  <img
                    src={images[currentImageIndex]}
                    alt={carTitle}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-blue-600" : "bg-white/70"}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${index === currentImageIndex ? "ring-2 ring-blue-600" : "opacity-70"}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${carTitle} - view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}

            {viewMode === "360" && (
              <div className="rounded-lg overflow-hidden bg-gray-100 h-[400px]">
                <ThreeSixtyViewer
                  images={threeSixtyImages}
                  width="100%"
                  height={400}
                  autoRotate={true}
                />
              </div>
            )}

            {viewMode === "video" && (
              <div className="rounded-lg overflow-hidden bg-gray-100 h-[400px]">
                <iframe
                  src={videoUrl}
                  title={`${carTitle} video tour`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Car Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{carTitle}</h1>
                <div className="flex items-center mt-2">
                  <Badge
                    variant={car.condition === "new" ? "default" : "outline"}
                    className={car.condition === "new" ? "bg-green-600" : ""}
                  >
                    {car.condition === "new" ? "New" : "Used"}
                  </Badge>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500">
                    {car.mileage.toLocaleString()} miles
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500">{car.transmission}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500">{car.fuelType}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <span className="text-3xl font-bold text-gray-900">
                    ${car.price.toLocaleString()}
                  </span>
                  {car.condition === "used" && (
                    <span className="ml-2 text-sm text-gray-500">
                      Est. ${Math.round(car.price / 60).toLocaleString()}/mo
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onAddToFavorites && car) {
                        onAddToFavorites(car);
                      }
                    }}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Save to Favorites
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Overview
                </h2>
                <p className="text-gray-700">{car.description}</p>
              </div>

              <Tabs defaultValue="specs">
                <TabsList className="w-full">
                  <TabsTrigger value="specs" className="flex-1">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="features" className="flex-1">
                    Features
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex-1">
                    Vehicle History
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="specs" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Make:</span>
                        <span className="font-medium">{car.make}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Model:</span>
                        <span className="font-medium">{car.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Year:</span>
                        <span className="font-medium">{car.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Mileage:</span>
                        <span className="font-medium">
                          {car.mileage.toLocaleString()} miles
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Fuel Type:</span>
                        <span className="font-medium">{car.fuelType}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Transmission:</span>
                        <span className="font-medium">{car.transmission}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Exterior Color:</span>
                        <span className="font-medium">
                          {car.exteriorColor || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Interior Color:</span>
                        <span className="font-medium">
                          {car.interiorColor || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">MPG:</span>
                        <span className="font-medium">{car.mpg || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">VIN:</span>
                        <span className="font-medium">{car.vin || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Bluetooth",
                      "Backup Camera",
                      "Navigation System",
                      "Heated Seats",
                      "Sunroof/Moonroof",
                      "Leather Seats",
                      "Third Row Seating",
                      "Apple CarPlay/Android Auto",
                      "Keyless Entry",
                      "Premium Sound System",
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 border rounded-md"
                      >
                        <div className="h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3">
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Clean Title</h3>
                        <p className="text-sm text-gray-500">
                          This vehicle has a clean title history with no
                          reported accidents or damage.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3">
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Service History</h3>
                        <p className="text-sm text-gray-500">
                          Regular maintenance performed at authorized service
                          centers.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-3">
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Ownership</h3>
                        <p className="text-sm text-gray-500">
                          {car.condition === "new"
                            ? "New vehicle with manufacturer warranty."
                            : "One previous owner, well maintained."}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Column - Dealer Info and Actions */}
          <div className="space-y-6">
            {/* Dealer Info Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="font-bold text-blue-600">
                      {car.dealerName?.charAt(0) || "D"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {car.dealerName || "Authorized Dealer"}
                    </h3>
                    <div className="flex items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(car.dealerRating || 4.5) ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-500">
                        ({car.dealerRating || "4.5"})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">
                      {car.dealerLocation || "San Francisco, CA"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">(555) 123-4567</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Dealer
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Dealer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Financing Calculator Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Estimate Payments
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Vehicle Price:</span>
                    <span className="font-medium">
                      ${car.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Down Payment:</span>
                    <span className="font-medium">$5,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Term:</span>
                    <span className="font-medium">60 months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">APR:</span>
                    <span className="font-medium">4.9%</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium">Est. Monthly Payment:</span>
                    <span className="font-bold text-blue-600">
                      $
                      {Math.round(
                        ((car.price - 5000) / 60) * 1.13,
                      ).toLocaleString()}
                      /mo
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Financing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Test Drive Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">
                  Schedule a Test Drive
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Take this {car.make} {car.model} for a spin to experience it
                  firsthand.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Test Drive
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Cars Section */}
        {similarCars.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Similar Vehicles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarCars.map((similarCar) => (
                <CarCard
                  key={similarCar.id}
                  id={similarCar.id}
                  image={similarCar.image}
                  make={similarCar.make}
                  model={similarCar.model}
                  year={similarCar.year}
                  price={similarCar.price}
                  mileage={similarCar.mileage}
                  fuelType={similarCar.fuelType}
                  transmission={similarCar.transmission}
                  condition={similarCar.condition}
                  featured={similarCar.featured}
                  onClick={() => handleCarClick(similarCar.id)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Chat Support */}
      <ChatSupport initialMessage="Hello! I see you're looking at the ${car.year} ${car.make} ${car.model}. Do you have any questions about this vehicle?" />
    </div>
  );
};

export default CarDetailsPage;
