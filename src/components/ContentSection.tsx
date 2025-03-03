import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import NewsArticle from "./NewsArticle";
import CarComparison from "./CarComparison";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface ContentSectionProps {
  newsArticles?: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    category: string;
    imageUrl: string;
    url: string;
  }>;
  carComparisons?: Array<{
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
  }>;
}

const ContentSection = ({
  newsArticles = [
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
    },
    {
      id: "2",
      title: "SUV Safety Ratings: Which Models Lead the Pack in 2023",
      description:
        "We analyze the latest safety ratings for popular SUVs, highlighting top performers in crash tests and advanced safety features.",
      date: "June 2, 2023",
      category: "Safety",
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      url: "/news/suv-safety-ratings-2023",
    },
    {
      id: "3",
      title: "The Future of Autonomous Driving: What to Expect in 2024",
      description:
        "Industry experts weigh in on upcoming autonomous driving technologies and what consumers can expect to see in production vehicles next year.",
      date: "June 10, 2023",
      category: "Technology",
      imageUrl:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      url: "/news/autonomous-driving-future",
    },
  ],
  carComparisons = [
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
    },
    {
      id: "2",
      car1: {
        id: "3",
        name: "Toyota RAV4 Hybrid",
        image:
          "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?q=80&w=2071&auto=format&fit=crop",
        price: 30790,
        year: 2023,
      },
      car2: {
        id: "4",
        name: "Honda CR-V Hybrid",
        image:
          "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2071&auto=format&fit=crop",
        price: 32450,
        year: 2023,
      },
      specs: [
        {
          name: "Fuel Economy",
          car1Value: "41 mpg",
          car2Value: "38 mpg",
          winner: 1,
        },
        {
          name: "Cargo Space",
          car1Value: "37.6 cu ft",
          car2Value: "39.3 cu ft",
          winner: 2,
        },
        {
          name: "Horsepower",
          car1Value: "219 hp",
          car2Value: "204 hp",
          winner: 1,
        },
        {
          name: "Starting Price",
          car1Value: "$30,790",
          car2Value: "$32,450",
          winner: 1,
        },
      ],
      comparisonLink: "/comparisons/toyota-rav4-hybrid-vs-honda-crv-hybrid",
    },
  ],
}: ContentSectionProps) => {
  return (
    <section className="w-full py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Automotive Insights
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Stay informed with the latest automotive news and detailed
            comparisons to help you make the best decisions for your next
            vehicle purchase.
          </p>
        </div>

        <Tabs defaultValue="news" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-slate-100">
              <TabsTrigger value="news" className="px-6">
                Latest News
              </TabsTrigger>
              <TabsTrigger value="comparisons" className="px-6">
                Car Comparisons
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="news" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsArticles.map((article) => (
                <NewsArticle
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  date={article.date}
                  category={article.category}
                  imageUrl={article.imageUrl}
                  url={article.url}
                />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline" asChild>
                <a href="/news" className="flex items-center gap-1">
                  View All News <ArrowRight size={16} />
                </a>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="comparisons" className="space-y-8">
            <div className="flex flex-col items-center gap-10">
              {carComparisons.map((comparison) => (
                <CarComparison
                  key={comparison.id}
                  car1={comparison.car1}
                  car2={comparison.car2}
                  specs={comparison.specs}
                  comparisonLink={comparison.comparisonLink}
                />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline" asChild>
                <a href="/comparisons" className="flex items-center gap-1">
                  View All Comparisons <ArrowRight size={16} />
                </a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-16" />

        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Expert Automotive Analysis
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto mb-6">
            Our team of automotive experts provides in-depth analysis and
            reviews to help you navigate the complex world of car buying.
          </p>
          <Button asChild>
            <a href="/experts">Meet Our Experts</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
