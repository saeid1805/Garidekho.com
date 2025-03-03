import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import NewsArticle from "./NewsArticle";
import CarComparison from "./CarComparison";
import { Button } from "./ui/button";
import { ChevronRight, Newspaper, BarChart2, Loader2 } from "lucide-react";
import carApiService, {
  NewsArticle as NewsArticleType,
  CarComparison as CarComparisonType,
} from "../services/api";

interface NewsAndComparisonsSectionProps {
  title?: string;
  description?: string;
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
  onNewsClick?: (articleId: string) => void;
  onComparisonClick?: (comparisonId: string) => void;
}

const NewsAndComparisonsSection = ({
  title = "Automotive News & Comparisons",
  description = "Stay informed with the latest automotive news and detailed vehicle comparisons to help you make the right choice.",
  newsArticles = [],
  carComparisons = [],
  onNewsClick = () => {},
  onComparisonClick = () => {},
}: NewsAndComparisonsSectionProps) => {
  const [activeTab, setActiveTab] = useState("news");
  const [loadedNewsArticles, setLoadedNewsArticles] = useState<
    NewsArticleType[]
  >([]);
  const [loadedCarComparisons, setLoadedCarComparisons] = useState<
    CarComparisonType[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch news articles and car comparisons on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch data based on active tab
        if (activeTab === "news") {
          const articles = await carApiService.getNewsArticles();
          setLoadedNewsArticles(articles);
        } else if (activeTab === "comparisons") {
          const comparisons = await carApiService.getCarComparisons();
          setLoadedCarComparisons(comparisons);
        }
      } catch (err) {
        console.error(`Error fetching ${activeTab} data:`, err);
        setError(`Failed to load ${activeTab}. Please try again later.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <Tabs
          defaultValue="news"
          className="w-full"
          onValueChange={handleTabChange}
        >
          <div className="flex justify-center mb-6">
            <TabsList className="bg-slate-100">
              <TabsTrigger
                value="news"
                className="text-sm md:text-base px-4 py-2 flex items-center gap-2"
              >
                <Newspaper className="h-4 w-4" />
                Latest News
              </TabsTrigger>
              <TabsTrigger
                value="comparisons"
                className="text-sm md:text-base px-4 py-2 flex items-center gap-2"
              >
                <BarChart2 className="h-4 w-4" />
                Car Comparisons
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="news" className="space-y-8">
            {isLoading && activeTab === "news" ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500">Loading articles...</p>
              </div>
            ) : error && activeTab === "news" ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={() => handleTabChange("news")}>Retry</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(loadedNewsArticles.length > 0
                    ? loadedNewsArticles
                    : newsArticles
                  )
                    .slice(0, 6)
                    .map((article) => (
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
                  <Button variant="outline" className="group">
                    View All Articles
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="comparisons" className="space-y-8">
            {isLoading && activeTab === "comparisons" ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500">Loading comparisons...</p>
              </div>
            ) : error && activeTab === "comparisons" ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={() => handleTabChange("comparisons")}>
                  Retry
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
                  {(loadedCarComparisons.length > 0
                    ? loadedCarComparisons
                    : carComparisons
                  ).map((comparison) => (
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
                  <Button variant="outline" className="group">
                    View All Comparisons
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default NewsAndComparisonsSection;
