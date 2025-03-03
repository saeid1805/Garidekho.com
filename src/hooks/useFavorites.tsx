import { useState, useEffect } from "react";
import { Car } from "../services/api";
import { useAuth } from "../context/AuthContext";

// Custom hook to manage favorites with user-specific storage
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Car[]>([]);
  const { user } = useAuth();

  // Generate a storage key based on user ID or use a default
  const storageKey = user ? `favorites_${user.id}` : "favorites_guest";

  // Load favorites from localStorage on mount or when user changes
  useEffect(() => {
    const savedFavorites = localStorage.getItem(storageKey);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
      }
    }
  }, [storageKey]);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, storageKey]);

  // Add a car to favorites
  const addToFavorites = (car: Car) => {
    if (!favorites.some((fav) => fav.id === car.id)) {
      setFavorites([...favorites, car]);
    }
  };

  // Remove a car from favorites
  const removeFromFavorites = (carId: string) => {
    setFavorites(favorites.filter((car) => car.id !== carId));
  };

  // Check if a car is in favorites
  const isInFavorites = (carId: string) => {
    return favorites.some((car) => car.id === carId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
  };
};
