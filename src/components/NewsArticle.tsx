import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { CalendarIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../components/ui/button";

interface NewsArticleProps {
  title?: string;
  description?: string;
  date?: string;
  category?: string;
  imageUrl?: string;
  url?: string;
}

const NewsArticle = ({
  title = "2023 Electric Vehicle Comparison: Top Models Reviewed",
  description = "Our experts compare the latest electric vehicles on the market, evaluating range, performance, and value to help you make an informed decision.",
  date = "May 15, 2023",
  category = "Electric Vehicles",
  imageUrl = "https://images.unsplash.com/photo-1593941707882-a56bbc8427f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  url = "#",
}: NewsArticleProps) => {
  return (
    <Card className="w-full max-w-md overflow-hidden transition-all duration-200 hover:shadow-lg bg-white">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-700">
          {category}
        </Badge>
      </div>

      <CardHeader className="pb-2 pt-4">
        <h3 className="text-xl font-bold line-clamp-2 text-gray-900">
          {title}
        </h3>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 line-clamp-3 text-sm">{description}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="mr-1 h-4 w-4" />
          {date}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-0"
          asChild
        >
          <a href={url} className="flex items-center">
            Read more <ChevronRightIcon className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsArticle;
