import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CarDetailsPage from "./pages/CarDetailsPage";
import DealerPortalPage from "./pages/DealerPortalPage";
import PricePredictorPage from "./pages/PricePredictorPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import NavigationMenu from "./components/NavigationMenu";
import routes from "tempo-routes";
import { AuthProvider } from "./context/AuthContext";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Car } from "./services/api";

function App() {
  // Use the custom hook for favorites management
  const [favorites, setFavorites] = useState<Car[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    const userObj = user ? JSON.parse(user) : null;
    const storageKey = userObj ? `favorites_${userObj.id}` : "favorites_guest";

    const savedFavorites = localStorage.getItem(storageKey);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
      }
    }
  }, [isAuthenticated]);

  // Save favorites to localStorage when they change
  useEffect(() => {
    const user = localStorage.getItem("user");
    const userObj = user ? JSON.parse(user) : null;
    const storageKey = userObj ? `favorites_${userObj.id}` : "favorites_guest";

    localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, isAuthenticated]);

  const addToFavorites = (car: Car) => {
    if (!favorites.some((fav) => fav.id === car.id)) {
      setFavorites([...favorites, car]);
    }
  };

  const removeFromFavorites = (carId: string) => {
    setFavorites(favorites.filter((car) => car.id !== carId));
  };

  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <NavigationMenu favoritesCount={favorites.length} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/car/:id"
              element={<CarDetailsPage onAddToFavorites={addToFavorites} />}
            />
            <Route
              path="/dealer-portal"
              element={
                <ProtectedRoute>
                  <DealerPortalPage />
                </ProtectedRoute>
              }
            />
            <Route path="/price-predictor" element={<PricePredictorPage />} />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoritesPage
                    favorites={favorites}
                    onRemoveFromFavorites={removeFromFavorites}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/new-cars" element={<SearchResultsPage />} />
            <Route path="/used-cars" element={<SearchResultsPage />} />
            <Route path="/sell" element={<Navigate to="/" />} />
            <Route path="/research" element={<Navigate to="/" />} />
            <Route path="/comparisons" element={<Navigate to="/" />} />
            <Route path="/news" element={<Navigate to="/" />} />
            <Route path="/experts" element={<Navigate to="/" />} />
            {/* Add Tempo routes before the catch-all */}
            {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
