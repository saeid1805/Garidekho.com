import { SearchFilters } from "../components/SearchBar";

// Define car interface
export interface Car {
  id: string;
  image: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  condition: "new" | "used";
  featured: boolean;
  category?: string;
  description?: string;
  vin?: string;
  exteriorColor?: string;
  interiorColor?: string;
  mpg?: string;
  engine?: string;
  drivetrain?: string;
  dealerId?: string;
  dealerName?: string;
  dealerRating?: number;
  dealerLocation?: string;
}

// Define news article interface
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  imageUrl: string;
  url: string;
  author?: string;
  content?: string;
}

// Define car comparison interface
export interface CarComparison {
  id: string;
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
  specs: Array<{
    name: string;
    car1Value: string | number;
    car2Value: string | number;
    winner?: 1 | 2;
  }>;
  comparisonLink: string;
  title?: string;
  date?: string;
}

// Mock data for cars
const mockCars: Car[] = [
  {
    id: "car-1",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    make: "Toyota",
    model: "Camry",
    year: 2023,
    price: 28999,
    mileage: 12500,
    fuelType: "Hybrid",
    transmission: "Automatic",
    condition: "used",
    featured: true,
    category: "Sedan",
    description:
      "Well-maintained Toyota Camry with low mileage. Features include backup camera, Bluetooth connectivity, and Toyota Safety Sense package.",
    vin: "1HGCM82633A123456",
    exteriorColor: "Silver",
    interiorColor: "Black",
    mpg: "28 city / 39 highway",
    engine: "2.5L 4-Cylinder Hybrid",
    drivetrain: "FWD",
    dealerId: "dealer-1",
    dealerName: "Toyota of Downtown",
    dealerRating: 4.7,
    dealerLocation: "San Francisco, CA",
  },
  {
    id: "car-2",
    image:
      "https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    make: "Honda",
    model: "Accord",
    year: 2024,
    price: 32500,
    mileage: 0,
    fuelType: "Gasoline",
    transmission: "Automatic",
    condition: "new",
    featured: true,
    category: "Sedan",
    description:
      "Brand new Honda Accord with full manufacturer warranty. Includes Honda Sensing suite, Apple CarPlay, Android Auto, and wireless charging.",
    vin: "1HGCV2F34MA123456",
    exteriorColor: "Modern Steel Metallic",
    interiorColor: "Gray",
    mpg: "30 city / 38 highway",
    engine: "1.5L Turbocharged 4-Cylinder",
    drivetrain: "FWD",
    dealerId: "dealer-2",
    dealerName: "Honda Bay Area",
    dealerRating: 4.5,
    dealerLocation: "Oakland, CA",
  },
  {
    id: "car-3",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 42990,
    mileage: 5000,
    fuelType: "Electric",
    transmission: "Automatic",
    condition: "used",
    featured: true,
    category: "Electric",
    description:
      "Low mileage Tesla Model 3 in excellent condition. Features Autopilot, premium sound system, and glass roof. Remaining manufacturer warranty.",
    vin: "5YJ3E1EA1PF123456",
    exteriorColor: "Pearl White",
    interiorColor: "Black",
    mpg: "N/A (358 mile range)",
    engine: "Electric Motor",
    drivetrain: "RWD",
    dealerId: "dealer-3",
    dealerName: "Tesla Motors SF",
    dealerRating: 4.8,
    dealerLocation: "San Francisco, CA",
  },
  {
    id: "car-4",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    make: "BMW",
    model: "X5",
    year: 2022,
    price: 62450,
    mileage: 15000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    condition: "used",
    featured: false,
    category: "SUVs",
    description:
      "Certified pre-owned BMW X5 with xDrive. Includes premium package, navigation, panoramic sunroof, and heated seats.",
    vin: "5UXCR6C01M9D12345",
    exteriorColor: "Alpine White",
    interiorColor: "Cognac",
    mpg: "21 city / 26 highway",
    engine: "3.0L Turbocharged 6-Cylinder",
    drivetrain: "AWD",
    dealerId: "dealer-4",
    dealerName: "BMW of Silicon Valley",
    dealerRating: 4.6,
    dealerLocation: "Mountain View, CA",
  },
  {
    id: "car-5",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    make: "Tesla",
    model: "Model Y",
    year: 2023,
    price: 52990,
    mileage: 0,
    fuelType: "Electric",
    transmission: "Automatic",
    condition: "new",
    featured: true,
    category: "Electric",
    description:
      "New Tesla Model Y with long range battery. Features include Autopilot, premium interior, and 7-seat configuration.",
    vin: "7SAYGDEF3PF123456",
    exteriorColor: "Deep Blue Metallic",
    interiorColor: "White",
    mpg: "N/A (330 mile range)",
    engine: "Dual Motor Electric",
    drivetrain: "AWD",
    dealerId: "dealer-3",
    dealerName: "Tesla Motors SF",
    dealerRating: 4.8,
    dealerLocation: "San Francisco, CA",
  },
  {
    id: "car-6",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    make: "Ford",
    model: "Mustang Mach-E",
    year: 2023,
    price: 45995,
    mileage: 1200,
    fuelType: "Electric",
    transmission: "Automatic",
    condition: "used",
    featured: true,
    category: "Electric",
    description:
      "Nearly new Ford Mustang Mach-E with extended range battery. Includes Ford Co-Pilot360, panoramic sunroof, and premium audio system.",
    vin: "3FMTK3SU1NMA12345",
    exteriorColor: "Rapid Red",
    interiorColor: "Black",
    mpg: "N/A (300 mile range)",
    engine: "Extended Range Electric",
    drivetrain: "AWD",
    dealerId: "dealer-5",
    dealerName: "Ford EV Center",
    dealerRating: 4.4,
    dealerLocation: "San Jose, CA",
  },
  {
    id: "car-7",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    make: "Mercedes-Benz",
    model: "EQS",
    year: 2023,
    price: 104400,
    mileage: 500,
    fuelType: "Electric",
    transmission: "Automatic",
    condition: "used",
    featured: true,
    category: "Luxury",
    description:
      "Executive demo Mercedes-Benz EQS with Hyperscreen. Features include Burmester 3D sound system, augmented reality navigation, and massage seats.",
    vin: "W1K7X4KB0NA123456",
    exteriorColor: "Obsidian Black",
    interiorColor: "Macchiato Beige",
    mpg: "N/A (350 mile range)",
    engine: "Dual Motor Electric",
    drivetrain: "AWD",
    dealerId: "dealer-6",
    dealerName: "Mercedes-Benz of Palo Alto",
    dealerRating: 4.9,
    dealerLocation: "Palo Alto, CA",
  },
  {
    id: "car-8",
    image:
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    make: "Honda",
    model: "CR-V Hybrid",
    year: 2023,
    price: 32450,
    mileage: 0,
    fuelType: "Hybrid",
    transmission: "Automatic",
    condition: "new",
    featured: false,
    category: "SUVs",
    description:
      "New Honda CR-V Hybrid with all-wheel drive. Includes Honda Sensing, leather seats, and power tailgate.",
    vin: "7FARW2H90NE123456",
    exteriorColor: "Platinum White Pearl",
    interiorColor: "Black",
    mpg: "40 city / 35 highway",
    engine: "2.0L 4-Cylinder Hybrid",
    drivetrain: "AWD",
    dealerId: "dealer-2",
    dealerName: "Honda Bay Area",
    dealerRating: 4.5,
    dealerLocation: "Oakland, CA",
  },
  {
    id: "car-9",
    image:
      "https://images.unsplash.com/photo-1625252595576-d1c989a9b8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    make: "Hyundai",
    model: "Tucson",
    year: 2023,
    price: 26450,
    mileage: 8000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    condition: "used",
    featured: false,
    category: "SUVs",
    description:
      "Low mileage Hyundai Tucson with remaining factory warranty. Features include panoramic sunroof, heated seats, and Hyundai SmartSense.",
    vin: "5NMJFDUF8NH123456",
    exteriorColor: "Amazon Gray",
    interiorColor: "Black",
    mpg: "26 city / 33 highway",
    engine: "2.5L 4-Cylinder",
    drivetrain: "AWD",
    dealerId: "dealer-7",
    dealerName: "Hyundai of Santa Clara",
    dealerRating: 4.3,
    dealerLocation: "Santa Clara, CA",
  },
  {
    id: "car-10",
    image:
      "https://images.unsplash.com/photo-1626443252351-4f3a387d6d43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    make: "Mazda",
    model: "CX-5",
    year: 2023,
    price: 26700,
    mileage: 12000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    condition: "used",
    featured: false,
    category: "SUVs",
    description:
      "Well-maintained Mazda CX-5 with premium package. Features include Bose sound system, leather seats, and advanced safety features.",
    vin: "JM3KFBDM7N0123456",
    exteriorColor: "Soul Red Crystal",
    interiorColor: "Black",
    mpg: "24 city / 30 highway",
    engine: "2.5L 4-Cylinder",
    drivetrain: "AWD",
    dealerId: "dealer-8",
    dealerName: "Mazda of Fremont",
    dealerRating: 4.4,
    dealerLocation: "Fremont, CA",
  },
];

// Mock data for news articles
const mockNewsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "2023 Electric Vehicle Comparison: Top Models Reviewed",
    description:
      "Our experts compare the latest electric vehicles on the market, evaluating range, performance, and value to help you make an informed decision.",
    date: "May 15, 2023",
    category: "Electric Vehicles",
    imageUrl:
      "https://images.unsplash.com/photo-1593941707882-a56bbc8427f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    url: "/news/ev-comparison-2023",
    author: "Michael Chen",
  },
  {
    id: "2",
    title: "The Future of Self-Driving Cars: Where We Stand in 2023",
    description:
      "Explore the current state of autonomous vehicle technology, regulatory challenges, and what to expect in the coming years as self-driving cars become more mainstream.",
    date: "June 2, 2023",
    category: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    url: "/news/future-of-self-driving-cars",
    author: "Sarah Johnson",
  },
  {
    id: "3",
    title: "SUV Buying Guide: How to Choose the Right Size and Features",
    description:
      "From compact crossovers to full-size SUVs, our comprehensive guide helps you navigate the crowded SUV market to find the perfect vehicle for your lifestyle and needs.",
    date: "June 10, 2023",
    category: "Buying Guide",
    imageUrl:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    url: "/guides/suv-buying-guide",
    author: "David Martinez",
  },
  {
    id: "4",
    title: "Hybrid vs. Electric: Which is Right for Your Lifestyle?",
    description:
      "We break down the pros and cons of hybrid and fully electric vehicles to help you determine which technology aligns best with your driving habits and environmental goals.",
    date: "June 15, 2023",
    category: "Buying Guide",
    imageUrl:
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    url: "/guides/hybrid-vs-electric",
    author: "Emily Rodriguez",
  },
  {
    id: "5",
    title: "The Most Anticipated Car Models Coming in 2024",
    description:
      "Get a sneak peek at the most exciting new vehicles set to hit the market next year, from revolutionary electric models to redesigned classics.",
    date: "June 20, 2023",
    category: "Industry News",
    imageUrl:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    url: "/news/anticipated-models-2024",
    author: "James Wilson",
  },
  {
    id: "6",
    title: "Understanding Car Financing: Options and Strategies",
    description:
      "Navigate the complex world of auto loans, leasing, and financing with our comprehensive guide to getting the best deal on your next vehicle purchase.",
    date: "June 25, 2023",
    category: "Finance",
    imageUrl:
      "https://images.unsplash.com/photo-1589758438368-0ad531db3366?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    url: "/guides/car-financing-options",
    author: "Lisa Thompson",
  },
];

// Mock data for car comparisons
const mockCarComparisons: CarComparison[] = [
  {
    id: "1",
    car1: {
      id: "1",
      name: "Tesla Model 3",
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
      price: 42990,
      year: 2023,
    },
    car2: {
      id: "2",
      name: "BMW i4",
      image:
        "https://images.unsplash.com/photo-1617814076668-8dfc6fe159ed?q=80&w=2072&auto=format&fit=crop",
      price: 56395,
      year: 2023,
    },
    specs: [
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
    comparisonLink: "/comparisons/tesla-model-3-vs-bmw-i4",
    title: "Tesla Model 3 vs BMW i4: Electric Sedan Showdown",
    date: "June 15, 2023",
  },
  {
    id: "2",
    car1: {
      id: "3",
      name: "Toyota RAV4",
      image:
        "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?q=80&w=2067&auto=format&fit=crop",
      price: 27575,
      year: 2023,
    },
    car2: {
      id: "4",
      name: "Honda CR-V",
      image:
        "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2067&auto=format&fit=crop",
      price: 28410,
      year: 2023,
    },
    specs: [
      {
        name: "Fuel Economy",
        car1Value: "30 mpg",
        car2Value: "32 mpg",
        winner: 2,
      },
      {
        name: "Cargo Space",
        car1Value: "37.6 cu ft",
        car2Value: "39.3 cu ft",
        winner: 2,
      },
      {
        name: "Horsepower",
        car1Value: "203 hp",
        car2Value: "190 hp",
        winner: 1,
      },
      {
        name: "Starting Price",
        car1Value: "$27,575",
        car2Value: "$28,410",
        winner: 1,
      },
    ],
    comparisonLink: "/comparisons/toyota-rav4-vs-honda-crv",
    title: "Toyota RAV4 vs Honda CR-V: Compact SUV Battle",
    date: "May 28, 2023",
  },
  {
    id: "3",
    car1: {
      id: "5",
      name: "Ford Mustang Mach-E",
      image:
        "https://images.unsplash.com/photo-1633509817627-5a29634fba8a?q=80&w=2067&auto=format&fit=crop",
      price: 43895,
      year: 2023,
    },
    car2: {
      id: "6",
      name: "Volkswagen ID.4",
      image:
        "https://images.unsplash.com/photo-1617469767053-8f35aaa39fce?q=80&w=2067&auto=format&fit=crop",
      price: 38995,
      year: 2023,
    },
    specs: [
      {
        name: "Range",
        car1Value: "247 miles",
        car2Value: "275 miles",
        winner: 2,
      },
      {
        name: "Acceleration (0-60)",
        car1Value: "5.2 sec",
        car2Value: "7.6 sec",
        winner: 1,
      },
      {
        name: "Cargo Space",
        car1Value: "29.7 cu ft",
        car2Value: "30.3 cu ft",
        winner: 2,
      },
      {
        name: "Starting Price",
        car1Value: "$43,895",
        car2Value: "$38,995",
        winner: 2,
      },
    ],
    comparisonLink: "/comparisons/ford-mach-e-vs-vw-id4",
    title: "Ford Mustang Mach-E vs Volkswagen ID.4: Electric SUV Comparison",
    date: "June 5, 2023",
  },
  {
    id: "4",
    car1: {
      id: "7",
      name: "Hyundai Tucson",
      image:
        "https://images.unsplash.com/photo-1625252595576-d1c989a9b8d6?q=80&w=2067&auto=format&fit=crop",
      price: 26450,
      year: 2023,
    },
    car2: {
      id: "8",
      name: "Mazda CX-5",
      image:
        "https://images.unsplash.com/photo-1626443252351-4f3a387d6d43?q=80&w=2067&auto=format&fit=crop",
      price: 26700,
      year: 2023,
    },
    specs: [
      {
        name: "Fuel Economy",
        car1Value: "29 mpg",
        car2Value: "28 mpg",
        winner: 1,
      },
      {
        name: "Cargo Space",
        car1Value: "38.7 cu ft",
        car2Value: "30.9 cu ft",
        winner: 1,
      },
      {
        name: "Horsepower",
        car1Value: "187 hp",
        car2Value: "187 hp",
        winner: 0,
      },
      {
        name: "Starting Price",
        car1Value: "$26,450",
        car2Value: "$26,700",
        winner: 1,
      },
    ],
    comparisonLink: "/comparisons/hyundai-tucson-vs-mazda-cx5",
    title: "Hyundai Tucson vs Mazda CX-5: Compact SUV Comparison",
    date: "May 20, 2023",
  },
];

// API service class
class CarApiService {
  // Get all cars with pagination
  async getAllCars(
    page: number = 1,
    limit: number = 8,
  ): Promise<{ cars: Car[]; total: number; totalPages: number }> {
    // Simulate API delay
    await this.delay(500);

    // Calculate pagination
    const total = mockCars.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCars = mockCars.slice(startIndex, endIndex);

    return {
      cars: paginatedCars,
      total,
      totalPages,
    };
  }

  // Get car by ID
  async getCarById(id: string): Promise<Car | null> {
    // Simulate API delay
    await this.delay(300);
    const car = mockCars.find((car) => car.id === id);
    return car || null;
  }

  // Search cars with filters and pagination
  async searchCars(
    filters: SearchFilters,
    page: number = 1,
    limit: number = 8,
  ): Promise<{ cars: Car[]; total: number; totalPages: number }> {
    // Simulate API delay
    await this.delay(800);

    const filteredCars = mockCars.filter((car) => {
      // Filter by make
      if (
        filters.make &&
        filters.make !== "All Makes" &&
        car.make !== filters.make
      ) {
        return false;
      }

      // Filter by model
      if (
        filters.model &&
        filters.model !== "All Models" &&
        car.model !== filters.model
      ) {
        return false;
      }

      // Filter by price range
      if (
        car.price < filters.priceRange[0] ||
        car.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Filter by condition
      if (filters.condition && filters.condition !== "all") {
        if (filters.condition === "new" && car.condition !== "new") {
          return false;
        }
        if (filters.condition === "used" && car.condition !== "used") {
          return false;
        }
      }

      // Filter by keyword
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        const matchesMake = car.make.toLowerCase().includes(keyword);
        const matchesModel = car.model.toLowerCase().includes(keyword);
        const matchesCategory = car.category?.toLowerCase().includes(keyword);
        const matchesFuelType = car.fuelType.toLowerCase().includes(keyword);

        if (
          !matchesMake &&
          !matchesModel &&
          !matchesCategory &&
          !matchesFuelType
        ) {
          return false;
        }
      }

      return true;
    });

    // Calculate pagination
    const total = filteredCars.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCars = filteredCars.slice(startIndex, endIndex);

    return {
      cars: paginatedCars,
      total,
      totalPages,
    };
  }

  // Get cars by category with pagination
  async getCarsByCategory(
    category: string,
    page: number = 1,
    limit: number = 8,
  ): Promise<{ cars: Car[]; total: number; totalPages: number }> {
    // Simulate API delay
    await this.delay(600);

    const filteredCars = mockCars.filter(
      (car) =>
        car.category?.toLowerCase() === category.toLowerCase() ||
        car.make.toLowerCase() === category.toLowerCase() ||
        car.fuelType.toLowerCase() === category.toLowerCase(),
    );

    // Calculate pagination
    const total = filteredCars.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCars = filteredCars.slice(startIndex, endIndex);

    return {
      cars: paginatedCars,
      total,
      totalPages,
    };
  }

  // Get featured cars
  async getFeaturedCars(): Promise<Car[]> {
    // Simulate API delay
    await this.delay(400);
    return mockCars.filter((car) => car.featured);
  }

  // Get all news articles
  async getNewsArticles(): Promise<NewsArticle[]> {
    // Simulate API delay
    await this.delay(300);
    return mockNewsArticles;
  }

  // Get news article by ID
  async getNewsArticleById(id: string): Promise<NewsArticle | null> {
    // Simulate API delay
    await this.delay(200);
    const article = mockNewsArticles.find((article) => article.id === id);
    return article || null;
  }

  // Get all car comparisons
  async getCarComparisons(): Promise<CarComparison[]> {
    // Simulate API delay
    await this.delay(300);
    return mockCarComparisons;
  }

  // Get car comparison by ID
  async getCarComparisonById(id: string): Promise<CarComparison | null> {
    // Simulate API delay
    await this.delay(200);
    const comparison = mockCarComparisons.find(
      (comparison) => comparison.id === id,
    );
    return comparison || null;
  }

  // Helper method to simulate API delay
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Create and export a singleton instance
const carApiService = new CarApiService();
export default carApiService;
