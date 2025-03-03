import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { Car } from "../services/api";
import CarCard from "../components/CarCard";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import {
  User,
  Heart,
  History,
  Settings,
  Search,
  Bell,
  LogOut,
  Edit,
  Save,
  Trash2,
  Clock,
  Car as CarIcon,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface SavedSearch {
  id: string;
  name: string;
  criteria: string;
  date: string;
  url: string;
}

interface Activity {
  id: string;
  type: "view" | "search" | "save" | "contact";
  description: string;
  date: string;
  carId?: string;
  carName?: string;
}

const UserDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // User profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    notifications: true,
  });

  // Favorites state
  const [favorites, setFavorites] = useState<Car[]>([]);

  // Saved searches state
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

  // Recent activity state
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // In a real app, these would be API calls
        // For now, we'll use mock data and localStorage

        // Load favorites
        const userObj = user
          ? JSON.parse(localStorage.getItem("user") || "")
          : null;
        const storageKey = userObj
          ? `favorites_${userObj.id}`
          : "favorites_guest";
        const savedFavorites = localStorage.getItem(storageKey);
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }

        // Load saved searches (mock data)
        setSavedSearches([
          {
            id: "search-1",
            name: "Tesla Model 3",
            criteria: "Make: Tesla, Model: Model 3, Price: $30,000 - $50,000",
            date: "2023-06-15",
            url: "/search?make=Tesla&model=Model%203&minPrice=30000&maxPrice=50000",
          },
          {
            id: "search-2",
            name: "SUVs under $40k",
            criteria: "Category: SUVs, Price: Under $40,000, Condition: New",
            date: "2023-06-10",
            url: "/search?category=SUVs&maxPrice=40000&condition=new",
          },
          {
            id: "search-3",
            name: "Used Electric Vehicles",
            criteria: "Fuel Type: Electric, Condition: Used",
            date: "2023-06-05",
            url: "/search?fuelType=Electric&condition=used",
          },
        ]);

        // Load recent activity (mock data)
        setRecentActivity([
          {
            id: "activity-1",
            type: "view",
            description: "Viewed Tesla Model 3",
            date: "2023-06-18T14:30:00",
            carId: "car-3",
            carName: "2023 Tesla Model 3",
          },
          {
            id: "activity-2",
            type: "search",
            description: "Searched for SUVs under $40,000",
            date: "2023-06-17T10:15:00",
          },
          {
            id: "activity-3",
            type: "save",
            description: "Saved Tesla Model Y to favorites",
            date: "2023-06-16T16:45:00",
            carId: "car-5",
            carName: "2023 Tesla Model Y",
          },
          {
            id: "activity-4",
            type: "contact",
            description: "Contacted dealer about BMW X5",
            date: "2023-06-15T09:20:00",
            carId: "car-4",
            carName: "2022 BMW X5",
          },
          {
            id: "activity-5",
            type: "view",
            description: "Viewed Honda CR-V Hybrid",
            date: "2023-06-14T11:10:00",
            carId: "car-8",
            carName: "2023 Honda CR-V Hybrid",
          },
        ]);
      } catch (err) {
        console.error("Error loading user data:", err);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  // Handle profile update
  const handleProfileUpdate = () => {
    // In a real app, this would be an API call
    setIsEditingProfile(false);
    // Show success message or notification
  };

  // Handle removing a favorite
  const handleRemoveFavorite = (carId: string) => {
    setFavorites(favorites.filter((car) => car.id !== carId));

    // Update localStorage
    const userObj = user
      ? JSON.parse(localStorage.getItem("user") || "")
      : null;
    const storageKey = userObj ? `favorites_${userObj.id}` : "favorites_guest";
    localStorage.setItem(
      storageKey,
      JSON.stringify(favorites.filter((car) => car.id !== carId)),
    );
  };

  // Handle removing a saved search
  const handleRemoveSavedSearch = (searchId: string) => {
    setSavedSearches(savedSearches.filter((search) => search.id !== searchId));
  };

  // Handle car click
  const handleCarClick = (carId: string) => {
    navigate(`/car/${carId}`);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // If loading, show loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 bg-red-50 rounded-lg">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your account, saved vehicles, and searches
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {user?.name}
                  </h2>
                  <p className="text-gray-500">{user?.email}</p>
                </div>

                <Separator className="my-4" />

                <nav className="space-y-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "overview" ? "bg-blue-50 text-blue-700" : ""}`}
                    onClick={() => setActiveTab("overview")}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Overview
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "favorites" ? "bg-blue-50 text-blue-700" : ""}`}
                    onClick={() => setActiveTab("favorites")}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Saved Vehicles
                    {favorites.length > 0 && (
                      <Badge className="ml-auto bg-blue-600">
                        {favorites.length}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "searches" ? "bg-blue-50 text-blue-700" : ""}`}
                    onClick={() => setActiveTab("searches")}
                  >
                    <Search className="mr-2 h-5 w-5" />
                    Saved Searches
                    {savedSearches.length > 0 && (
                      <Badge className="ml-auto bg-blue-600">
                        {savedSearches.length}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "activity" ? "bg-blue-50 text-blue-700" : ""}`}
                    onClick={() => setActiveTab("activity")}
                  >
                    <History className="mr-2 h-5 w-5" />
                    Recent Activity
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "settings" ? "bg-blue-50 text-blue-700" : ""}`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Account Settings
                  </Button>
                </nav>

                <Separator className="my-4" />

                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Dashboard Overview</CardTitle>
                    <CardDescription>
                      Welcome back, {user?.name}! Here's a summary of your
                      activity.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center">
                        <Heart className="h-8 w-8 text-blue-600 mb-2" />
                        <h3 className="text-xl font-bold text-gray-900">
                          {favorites.length}
                        </h3>
                        <p className="text-gray-500">Saved Vehicles</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center">
                        <Search className="h-8 w-8 text-blue-600 mb-2" />
                        <h3 className="text-xl font-bold text-gray-900">
                          {savedSearches.length}
                        </h3>
                        <p className="text-gray-500">Saved Searches</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center">
                        <History className="h-8 w-8 text-blue-600 mb-2" />
                        <h3 className="text-xl font-bold text-gray-900">
                          {recentActivity.length}
                        </h3>
                        <p className="text-gray-500">Recent Activities</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Favorites */}
                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Recently Saved Vehicles</CardTitle>
                      <Button
                        variant="ghost"
                        className="text-blue-600"
                        onClick={() => setActiveTab("favorites")}
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {favorites.length === 0 ? (
                      <div className="text-center py-6">
                        <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          You haven't saved any vehicles yet.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => navigate("/search")}
                        >
                          Browse Vehicles
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {favorites.slice(0, 2).map((car) => (
                          <div key={car.id} className="relative">
                            <div
                              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                              onClick={() => handleCarClick(car.id)}
                            >
                              <div className="w-20 h-20 rounded overflow-hidden mr-3">
                                <img
                                  src={car.image}
                                  alt={`${car.year} ${car.make} ${car.model}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {car.year} {car.make} {car.model}
                                </h3>
                                <p className="text-blue-600 font-bold">
                                  ${car.price.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {car.mileage.toLocaleString()} miles •{" "}
                                  {car.fuelType}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveFavorite(car.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Activity</CardTitle>
                      <Button
                        variant="ghost"
                        className="text-blue-600"
                        onClick={() => setActiveTab("activity")}
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {recentActivity.length === 0 ? (
                      <div className="text-center py-6">
                        <History className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          No recent activity to display.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentActivity.slice(0, 3).map((activity) => (
                          <div key={activity.id} className="flex items-start">
                            <div className="mr-3 mt-1">
                              {activity.type === "view" && (
                                <Eye className="h-5 w-5 text-blue-600" />
                              )}
                              {activity.type === "search" && (
                                <Search className="h-5 w-5 text-green-600" />
                              )}
                              {activity.type === "save" && (
                                <Heart className="h-5 w-5 text-red-600" />
                              )}
                              {activity.type === "contact" && (
                                <Mail className="h-5 w-5 text-purple-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-900">
                                {activity.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatDate(activity.date)} at{" "}
                                {formatTime(activity.date)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === "favorites" && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Saved Vehicles</CardTitle>
                  <CardDescription>
                    Manage your saved vehicles and quickly access them anytime.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {favorites.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">
                        No saved vehicles
                      </h3>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        You haven't saved any vehicles yet. Browse our inventory
                        and save vehicles you're interested in.
                      </p>
                      <Button
                        onClick={() => navigate("/search")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Browse Vehicles
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                              handleRemoveFavorite(car.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Saved Searches Tab */}
            {activeTab === "searches" && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Saved Searches</CardTitle>
                  <CardDescription>
                    Access your saved searches to quickly find vehicles matching
                    your criteria.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {savedSearches.length === 0 ? (
                    <div className="text-center py-12">
                      <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">
                        No saved searches
                      </h3>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        You haven't saved any searches yet. Save your search
                        criteria to quickly access them later.
                      </p>
                      <Button
                        onClick={() => navigate("/search")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Start Searching
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedSearches.map((search) => (
                        <div
                          key={search.id}
                          className="border rounded-lg p-4 hover:bg-gray-50 relative"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900 mb-1">
                                {search.name}
                              </h3>
                              <p className="text-sm text-gray-500 mb-2">
                                {search.criteria}
                              </p>
                              <p className="text-xs text-gray-400">
                                Saved on {formatDate(search.date)}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                onClick={() => navigate(search.url)}
                              >
                                Run Search
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-red-600"
                                onClick={() =>
                                  handleRemoveSavedSearch(search.id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Track your recent interactions with vehicles and searches.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentActivity.length === 0 ? (
                    <div className="text-center py-12">
                      <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">
                        No recent activity
                      </h3>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Your recent activity will appear here as you browse and
                        interact with vehicles.
                      </p>
                      <Button
                        onClick={() => navigate("/search")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Browse Vehicles
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="border rounded-lg p-4 hover:bg-gray-50"
                        >
                          <div className="flex items-start">
                            <div className="mr-3 mt-1">
                              {activity.type === "view" && (
                                <Eye className="h-5 w-5 text-blue-600" />
                              )}
                              {activity.type === "search" && (
                                <Search className="h-5 w-5 text-green-600" />
                              )}
                              {activity.type === "save" && (
                                <Heart className="h-5 w-5 text-red-600" />
                              )}
                              {activity.type === "contact" && (
                                <Mail className="h-5 w-5 text-purple-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-900 font-medium">
                                {activity.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatDate(activity.date)} at{" "}
                                {formatTime(activity.date)}
                              </p>
                              {activity.carId && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="mt-2 text-blue-600 hover:text-blue-800 p-0 h-auto"
                                  onClick={() =>
                                    navigate(`/car/${activity.carId}`)
                                  }
                                >
                                  View Vehicle
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your profile information and account preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Profile Information */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Profile Information
                        </h3>
                        {!isEditingProfile ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditingProfile(true)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                          </Button>
                        ) : (
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIsEditingProfile(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="bg-blue-600"
                              onClick={handleProfileUpdate}
                            >
                              <Save className="mr-2 h-4 w-4" />
                              Save Changes
                            </Button>
                          </div>
                        )}
                      </div>

                      {isEditingProfile ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={profile.name}
                              onChange={(e) =>
                                setProfile({ ...profile, name: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profile.email}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={profile.phone}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  phone: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={profile.location}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  location: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium">{profile.name}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                              Email Address
                            </p>
                            <p className="font-medium">{profile.email}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                              Phone Number
                            </p>
                            <p className="font-medium">{profile.phone}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{profile.location}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Notification Preferences */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Notification Preferences
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500">
                              Receive updates about saved vehicles, price drops,
                              and new listings
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={profile.notifications}
                              onChange={() =>
                                setProfile({
                                  ...profile,
                                  notifications: !profile.notifications,
                                })
                              }
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Account Security */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Account Security
                      </h3>
                      <Button variant="outline">Change Password</Button>
                    </div>

                    <Separator />

                    {/* Delete Account */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Delete Account
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                      <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboardPage;

// Missing component for the activity tab
const Eye = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
