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
import { MessageSquare, Send, X, Minimize, Maximize, Bot } from "lucide-react";

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
}

const ChatSupport = ({
  initialMessage = "Hello! I'm your virtual assistant. How can I help you with your car search today?",
  agentName = "AutoMarket AI",
  agentAvatar = "https://api.dicebear.com/7.x/bottts/svg?seed=AutoBot",
}: ChatSupportProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const getBotResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Simple keyword matching for demo purposes
    if (lowerCaseMessage.match(/hello|hi|hey|greetings/)) {
      return botResponses.greetings[
        Math.floor(Math.random() * botResponses.greetings.length)
      ];
    } else if (lowerCaseMessage.match(/car|vehicle|search|find|looking for/)) {
      return botResponses.carSearch[
        Math.floor(Math.random() * botResponses.carSearch.length)
      ];
    } else if (lowerCaseMessage.match(/finance|loan|payment|emi|calculator/)) {
      return botResponses.financing[
        Math.floor(Math.random() * botResponses.financing.length)
      ];
    } else if (lowerCaseMessage.match(/test drive|test|drive|try/)) {
      return botResponses.testDrive[
        Math.floor(Math.random() * botResponses.testDrive.length)
      ];
    } else {
      return botResponses.default[
        Math.floor(Math.random() * botResponses.default.length)
      ];
    }
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
