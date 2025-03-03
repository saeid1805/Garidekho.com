import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  MessageSquare,
  Send,
  X,
  Minimize,
  Maximize,
  Bot,
  Car,
  DollarSign,
  Search,
  Calendar,
  Fuel,
  Gauge,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import carApiService, { Car as CarType } from "../services/api";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatSupportProps {
  initialMessage?: string;
  agentName?: string;
  agentAvatar?: string;
  onSearch?: (filters: any) => void;
}

const ChatSupport = ({
  initialMessage = "Hello! I'm your virtual assistant. How can I help you with your car search today?",
  agentName = "AutoMarket AI",
  agentAvatar = "https://api.dicebear.com/7.x/bottts/svg?seed=AutoBot",
  onSearch = (filters) => {},
}: ChatSupportProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State for search context
  const [searchContext, setSearchContext] = useState<{
    make?: string;
    model?: string;
    priceRange?: [number, number];
    condition?: string;
    fuelType?: string;
    year?: number;
    category?: string;
  }>({});

  // State to track conversation state
  const [conversationState, setConversationState] = useState<{
    expectingMake?: boolean;
    expectingModel?: boolean;
    expectingBudget?: boolean;
    expectingCondition?: boolean;
    expectingFuelType?: boolean;
    expectingYear?: boolean;
    expectingCategory?: boolean;
    searchReady?: boolean;
  }>({});

  // State to track if we're showing search results
  const [showingResults, setShowingResults] = useState(false);
  const [searchResults, setSearchResults] = useState<CarType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Sample predefined responses for demo purposes
  const botResponses = {
    greetings: [
      "Hello! How can I help you find your perfect car today?",
      "Hi there! Looking for a specific vehicle? I can help you search.",
      "Welcome to AutoMarket! What type of car are you interested in?",
    ],
    carSearch: [
      "I can help you find cars based on your preferences. What's your budget range?",
      "Are you looking for a new or used vehicle?",
      "What features are most important to you in a car?",
    ],
    financing: [
      "Our financing calculator can help you estimate monthly payments. Would you like me to guide you through it?",
      "We offer competitive financing rates starting at 3.9% APR for qualified buyers.",
      "You can apply for pre-approval online in just a few minutes. Would you like the link?",
    ],
    testDrive: [
      "You can schedule a test drive directly through our platform. Would you like me to help you set that up?",
      "Test drives can be arranged at your convenience, including home test drives in select areas.",
      "Which vehicle would you like to test drive?",
    ],
    default: [
      "I'm here to help with your car buying journey. Could you provide more details about what you're looking for?",
      "I can assist with finding vehicles, financing options, or scheduling test drives. What do you need help with?",
      "Feel free to ask any questions about our vehicles or services.",
    ],
    askMake: [
      "What make of car are you interested in? For example, Toyota, Honda, BMW, etc.",
      "Do you have a preferred car manufacturer in mind?",
    ],
    askModel: [
      "What model are you looking for?",
      "Do you have a specific model in mind?",
    ],
    askBudget: [
      "What's your budget range for this purchase?",
      "How much are you looking to spend on your new car?",
    ],
    askCondition: [
      "Are you looking for a new or used vehicle?",
      "Do you prefer a new car or are you open to used vehicles?",
    ],
    askFuelType: [
      "What type of fuel do you prefer? Gasoline, hybrid, electric, or diesel?",
      "Do you have a preference for the fuel type?",
    ],
    askCategory: [
      "What type of vehicle are you looking for? SUV, sedan, truck, etc.",
      "Are you interested in a specific category like SUVs, sedans, or trucks?",
    ],
    searchResults: [
      "I found some vehicles that match your criteria. Would you like to see them?",
      "Based on your preferences, here are some cars you might be interested in.",
    ],
    noResults: [
      "I couldn't find any vehicles matching your exact criteria. Would you like to broaden your search?",
      "No matches found with those specific requirements. Let's try adjusting some parameters.",
    ],
  };

  // Initialize with bot welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          text: initialMessage,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [initialMessage, messages.length]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Helper function to get a random response from a category
  const getRandomResponse = (category: string[]) => {
    return category[Math.floor(Math.random() * category.length)];
  };

  // Function to extract car makes from user message
  const extractMake = (message: string): string | null => {
    const makes = [
      "toyota",
      "honda",
      "ford",
      "chevrolet",
      "bmw",
      "mercedes",
      "audi",
      "tesla",
      "nissan",
      "hyundai",
      "kia",
      "volkswagen",
      "mazda",
      "subaru",
      "lexus",
      "jeep",
      "dodge",
      "ram",
      "cadillac",
      "gmc",
    ];

    const lowerMessage = message.toLowerCase();
    for (const make of makes) {
      if (lowerMessage.includes(make)) {
        return make.charAt(0).toUpperCase() + make.slice(1);
      }
    }
    return null;
  };

  // Function to extract price range from user message
  const extractPriceRange = (message: string): [number, number] | null => {
    // Look for patterns like "under $30k", "$20,000 to $30,000", "between 20k and 30k", etc.
    const underPattern = /under\s+\$?([0-9,.]+)\s*k?/i;
    const rangePattern =
      /\$?([0-9,.]+)\s*k?\s*(?:to|-|and)\s*\$?([0-9,.]+)\s*k?/i;

    let match = message.match(underPattern);
    if (match) {
      const value = parseFloat(match[1].replace(/,/g, ""));
      return [0, value * (match[0].includes("k") ? 1000 : 1)];
    }

    match = message.match(rangePattern);
    if (match) {
      const min = parseFloat(match[1].replace(/,/g, ""));
      const max = parseFloat(match[2].replace(/,/g, ""));
      return [
        min * (match[0].includes("k") ? 1000 : 1),
        max * (match[0].includes("k") ? 1000 : 1),
      ];
    }

    return null;
  };

  // Function to extract condition from user message
  const extractCondition = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("new")) return "new";
    if (lowerMessage.includes("used") || lowerMessage.includes("second hand"))
      return "used";
    return null;
  };

  // Function to extract fuel type from user message
  const extractFuelType = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("electric") || lowerMessage.includes("ev"))
      return "Electric";
    if (lowerMessage.includes("hybrid")) return "Hybrid";
    if (lowerMessage.includes("gas") || lowerMessage.includes("gasoline"))
      return "Gasoline";
    if (lowerMessage.includes("diesel")) return "Diesel";
    return null;
  };

  // Function to extract vehicle category from user message
  const extractCategory = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("suv")) return "SUVs";
    if (lowerMessage.includes("sedan")) return "Sedan";
    if (lowerMessage.includes("truck")) return "Truck";
    if (lowerMessage.includes("luxury")) return "Luxury";
    if (lowerMessage.includes("sports") || lowerMessage.includes("performance"))
      return "Performance";
    if (lowerMessage.includes("family")) return "Family";
    return null;
  };

  // Function to perform search with current context
  const performSearch = async () => {
    setIsSearching(true);
    try {
      // Build search filters from context
      const filters: any = {};

      if (searchContext.make) filters.make = searchContext.make;
      if (searchContext.model) filters.model = searchContext.model;
      if (searchContext.priceRange)
        filters.priceRange = searchContext.priceRange;
      if (searchContext.condition) filters.condition = searchContext.condition;
      if (searchContext.fuelType || searchContext.category) {
        filters.keyword = searchContext.fuelType || searchContext.category;
      }

      // Call API service
      const response = await carApiService.searchCars(filters, 1, 3);
      setSearchResults(response.cars);
      setShowingResults(true);

      // Add bot message about search results
      const resultMessage = {
        id: `bot-${Date.now()}`,
        text:
          response.cars.length > 0
            ? getRandomResponse(botResponses.searchResults)
            : getRandomResponse(botResponses.noResults),
        sender: "bot" as const,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, resultMessage]);

      // Reset conversation state
      setConversationState({});
    } catch (error) {
      console.error("Error searching cars:", error);
      const errorMessage = {
        id: `bot-${Date.now()}`,
        text: "I'm sorry, I encountered an error while searching. Please try again later.",
        sender: "bot" as const,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSearching(false);
    }
  };

  // Process user message and determine next steps
  const processUserMessage = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let responseText = "";
    let newState = { ...conversationState };
    let newContext = { ...searchContext };

    // Check if we're expecting specific information
    if (conversationState.expectingMake) {
      const make = extractMake(userMessage);
      if (make) {
        newContext.make = make;
        responseText = `Great! You're looking for a ${make}. ${getRandomResponse(botResponses.askModel)}`;
        newState = { expectingMake: false, expectingModel: true };
      } else {
        responseText =
          "I didn't catch the make. Could you specify which car manufacturer you're interested in?";
        newState = { expectingMake: true };
      }
    } else if (conversationState.expectingModel) {
      // Any text can be a model
      newContext.model = userMessage.trim();
      responseText = `A ${searchContext.make} ${newContext.model}, nice choice! ${getRandomResponse(botResponses.askBudget)}`;
      newState = { expectingModel: false, expectingBudget: true };
    } else if (conversationState.expectingBudget) {
      const priceRange = extractPriceRange(userMessage);
      if (priceRange) {
        newContext.priceRange = priceRange;
        responseText = `Budget noted: ${priceRange[0].toLocaleString()} to ${priceRange[1].toLocaleString()}. ${getRandomResponse(botResponses.askCondition)}`;
        newState = { expectingBudget: false, expectingCondition: true };
      } else {
        responseText =
          "I'm not sure I understood your budget. Could you specify a price range, like 'under $30,000' or 'between $20,000 and $40,000'?";
        newState = { expectingBudget: true };
      }
    } else if (conversationState.expectingCondition) {
      const condition = extractCondition(userMessage);
      if (condition) {
        newContext.condition = condition;
        responseText = `Got it, you're looking for a ${condition} vehicle. ${getRandomResponse(botResponses.askFuelType)}`;
        newState = { expectingCondition: false, expectingFuelType: true };
      } else {
        responseText = "Would you prefer a new or used vehicle?";
        newState = { expectingCondition: true };
      }
    } else if (conversationState.expectingFuelType) {
      const fuelType = extractFuelType(userMessage);
      if (fuelType) {
        newContext.fuelType = fuelType;
        responseText = `${fuelType} it is! Let me search for vehicles matching your criteria.`;
        newState = { expectingFuelType: false, searchReady: true };
      } else {
        responseText =
          "Please specify a fuel type: gasoline, hybrid, electric, or diesel.";
        newState = { expectingFuelType: true };
      }
    } else if (conversationState.expectingCategory) {
      const category = extractCategory(userMessage);
      if (category) {
        newContext.category = category;
        responseText = `Looking for ${category}. Let me find some options for you.`;
        newState = { expectingCategory: false, searchReady: true };
      } else {
        responseText =
          "What type of vehicle are you interested in? SUV, sedan, truck, etc.";
        newState = { expectingCategory: true };
      }
    }
    // If not expecting specific info, analyze the message for intent
    else {
      // Check for greetings
      if (lowerCaseMessage.match(/hello|hi|hey|greetings/)) {
        responseText = getRandomResponse(botResponses.greetings);
      }
      // Check for search intent
      else if (lowerCaseMessage.match(/car|vehicle|search|find|looking for/)) {
        // Extract any information provided in the initial message
        const make = extractMake(userMessage);
        const priceRange = extractPriceRange(userMessage);
        const condition = extractCondition(userMessage);
        const fuelType = extractFuelType(userMessage);
        const category = extractCategory(userMessage);

        // Update context with any extracted info
        if (make) newContext.make = make;
        if (priceRange) newContext.priceRange = priceRange;
        if (condition) newContext.condition = condition;
        if (fuelType) newContext.fuelType = fuelType;
        if (category) newContext.category = category;

        // Determine what to ask next based on what's missing
        if (!newContext.make) {
          responseText = getRandomResponse(botResponses.askMake);
          newState = { expectingMake: true };
        } else if (!newContext.priceRange) {
          responseText = `I see you're interested in a ${newContext.make}. ${getRandomResponse(botResponses.askBudget)}`;
          newState = { expectingBudget: true };
        } else if (!newContext.condition) {
          responseText = getRandomResponse(botResponses.askCondition);
          newState = { expectingCondition: true };
        } else {
          responseText =
            "Great! Let me search for vehicles matching your criteria.";
          newState = { searchReady: true };
        }
      }
      // Check for financing questions
      else if (lowerCaseMessage.match(/finance|loan|payment|emi|calculator/)) {
        responseText = getRandomResponse(botResponses.financing);
        // Navigate to calculator page if they mention calculator specifically
        if (lowerCaseMessage.includes("calculator")) {
          setTimeout(() => {
            navigate("/price-predictor");
          }, 1000);
          responseText += " I'll take you to our calculator page.";
        }
      }
      // Check for test drive inquiries
      else if (lowerCaseMessage.match(/test drive|test|drive|try/)) {
        responseText = getRandomResponse(botResponses.testDrive);
      }
      // Default response
      else {
        responseText = getRandomResponse(botResponses.default);
      }
    }

    // Update state and context
    setConversationState(newState);
    setSearchContext(newContext);

    // If search is ready, perform search after sending response
    if (newState.searchReady) {
      setTimeout(() => {
        performSearch();
      }, 1000);
    }

    return responseText;
  };

  // Handle viewing a car from search results
  const handleViewCar = (carId: string) => {
    navigate(`/car/${carId}`);
  };

  // Handle viewing all search results
  const handleViewAllResults = () => {
    // Build search params from context
    const searchParams = new URLSearchParams();

    if (searchContext.make) searchParams.set("make", searchContext.make);
    if (searchContext.model) searchParams.set("model", searchContext.model);
    if (searchContext.priceRange) {
      searchParams.set("minPrice", searchContext.priceRange[0].toString());
      searchParams.set("maxPrice", searchContext.priceRange[1].toString());
    }
    if (searchContext.condition)
      searchParams.set("condition", searchContext.condition);
    if (searchContext.fuelType)
      searchParams.set("keyword", searchContext.fuelType);
    if (searchContext.category)
      searchParams.set("keyword", searchContext.category);

    navigate(`/search?${searchParams.toString()}`);
  };

  const getBotResponse = (userMessage: string) => {
    return processUserMessage(userMessage);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user" as const,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Reset search results display when sending a new message
    setShowingResults(false);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage = {
        id: `bot-${Date.now()}`,
        text: getBotResponse(userMessage.text),
        sender: "bot" as const,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        className="rounded-full h-14 w-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
        aria-label="Chat Support"
      >
        <MessageSquare size={24} />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card
          className={`absolute bottom-20 right-0 w-80 md:w-96 shadow-xl transition-all duration-300 ${isMinimized ? "h-14" : "h-[500px]"}`}
        >
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between bg-blue-600 text-white">
            <div className="flex items-center">
              {!isMinimized && (
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-white flex items-center justify-center">
                  <img
                    src={agentAvatar}
                    alt="Agent"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardTitle className="text-sm font-medium">{agentName}</CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-blue-700 rounded-full"
                onClick={toggleMinimize}
              >
                {isMinimized ? <Maximize size={14} /> : <Minimize size={14} />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-blue-700 rounded-full"
                onClick={toggleChat}
              >
                <X size={14} />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-3 overflow-y-auto h-[calc(100%-110px)]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Search Results */}
                  {showingResults && searchResults.length > 0 && (
                    <div className="flex justify-start">
                      <div className="max-w-[90%] rounded-lg p-3 bg-gray-100 text-gray-800">
                        <p className="text-sm font-medium mb-2">
                          Here are some vehicles that match your criteria:
                        </p>
                        <div className="space-y-3">
                          {searchResults.map((car) => (
                            <div
                              key={car.id}
                              className="bg-white rounded-md p-2 border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors"
                              onClick={() => handleViewCar(car.id)}
                            >
                              <div className="flex items-center">
                                <div className="w-12 h-12 rounded overflow-hidden mr-2 flex-shrink-0">
                                  <img
                                    src={car.image}
                                    alt={car.make}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">
                                    {car.year} {car.make} {car.model}
                                  </p>
                                  <p className="text-blue-600 text-sm font-bold">
                                    ${car.price.toLocaleString()}
                                  </p>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <span>
                                      {car.condition === "new"
                                        ? "New"
                                        : `${car.mileage.toLocaleString()} mi`}
                                    </span>
                                    <span className="mx-1">•</span>
                                    <span>{car.fuelType}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-blue-600 hover:bg-blue-50 mt-2"
                            onClick={handleViewAllResults}
                          >
                            View All Results
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* No Results Message */}
                  {showingResults && searchResults.length === 0 && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                        <p className="text-sm">
                          I couldn't find any vehicles matching your exact
                          criteria. Would you like to try a broader search?
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:bg-blue-50 mt-2"
                          onClick={handleViewAllResults}
                        >
                          View All Vehicles
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Loading Indicator */}
                  {isSearching && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                        <div className="flex items-center">
                          <div className="animate-spin mr-2">
                            <Loader2 className="h-4 w-4 text-blue-600" />
                          </div>
                          <p className="text-sm">Searching for vehicles...</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-3 border-t">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </div>
  );
};

export default ChatSupport;
