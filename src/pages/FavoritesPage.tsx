import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";
import { Button } from "../components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { Car } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface FavoritesPageProps {
  favorites: Car[];
  onRemoveFromFavorites: (carId: string) => void;
}

const FavoritesPage = ({
  favorites,
  onRemoveFromFavorites,
}: FavoritesPageProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCarClick = (carId: string) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Favorite Vehicles
          </h1>
          <p className="text-gray-600">
            {user
              ? `Manage your saved vehicles, ${user.name}.`
              : "Manage your saved vehicles."}
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((car) => (
              <div key={car.id} className="relative">
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
                  onClick={() => handleCarClick(car.id)}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 z-10 bg-white border border-red-200 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromFavorites(car.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Start adding vehicles to your favorites to keep track of the ones
              you're interested in.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Browse Vehicles
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
