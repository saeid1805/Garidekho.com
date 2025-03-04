import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import NewsArticle from "./NewsArticle";
import { Button } from "./ui/button";
import {
  ChevronRight,
  Newspaper,
  BarChart2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import carApiService, { NewsArticle as NewsArticleType } from "../services/api";

interface NewsAndComparisonsSectionProps {
  title?: string;
  description?: string;
  onNewsClick?: (articleId: string) => void;
  onComparisonClick?: (comparisonId: string) => void;
}

const NewsAndComparisonsSection = ({
  title = "Automotive News & Comparisons",
  description = "Stay informed with the latest automotive news and detailed vehicle comparisons to help you make the right choice.",
  onNewsClick = () => {},
  onComparisonClick = () => {},
}: NewsAndComparisonsSectionProps) => {
  const [activeTab, setActiveTab] = useState("news");
  const [newsArticles, setNewsArticles] = useState<NewsArticleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch news articles on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch data based on active tab
        if (activeTab === "news") {
          const articles = await carApiService.getNewsArticles();
          setNewsArticles(articles);
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

  // Sample comparison data (since we don't have a real API for this yet)
  const sampleComparisons = [
    {
      id: "comp-1",
      title: "2023 Tesla Model 3 vs. 2023 BMW i4",
      description:
        "Comparing two of the most popular electric sedans on the market today.",
      imageUrl:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "June 12, 2023",
      category: "Electric Vehicles",
      url: "/comparisons/tesla-model-3-vs-bmw-i4",
    },
    {
      id: "comp-2",
      title: "SUV Showdown: Toyota RAV4 vs. Honda CR-V",
      description:
        "Which popular compact SUV offers the best value and features for families?",
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "May 28, 2023",
      category: "SUVs",
      url: "/comparisons/toyota-rav4-vs-honda-crv",
    },
    {
      id: "comp-3",
      title: "Luxury Sedan Battle: Mercedes E-Class vs. BMW 5 Series",
      description:
        "We compare these two German luxury sedans to see which offers the best driving experience.",
      imageUrl:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "April 15, 2023",
      category: "Luxury",
      url: "/comparisons/mercedes-e-class-vs-bmw-5-series",
    },
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <Tabs
          defaultValue="news"
          className="w-full"
          onValueChange={setActiveTab}
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
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-500 mb-4">{error}</p>
                <Button
                  onClick={() => {
                    setIsLoading(true);
                    carApiService
                      .getNewsArticles()
                      .then((articles) => {
                        setNewsArticles(articles);
                        setError(null);
                      })
                      .catch((err) => {
                        console.error("Error retrying news fetch:", err);
                        setError(
                          "Failed to load news articles. Please try again later.",
                        );
                      })
                      .finally(() => setIsLoading(false));
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Retry
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newsArticles.length > 0
                    ? newsArticles
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
                        ))
                    : // Fallback to sample data if API fails
                      [
                        {
                          id: "news-1",
                          title:
                            "The Future of Electric Vehicles: What to Expect in 2024",
                          description:
                            "Electric vehicles are rapidly evolving with longer ranges, faster charging times, and more affordable options. Here's what industry experts predict for the coming year.",
                          date: "December 15, 2023",
                          category: "Electric",
                          imageUrl:
                            "https://images.unsplash.com/photo-1593941707882-a56bbc8427f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                          url: "/news/future-of-evs-2024",
                        },
                        {
                          id: "news-2",
                          title: "Top 10 Most Fuel-Efficient SUVs of 2023",
                          description:
                            "SUVs don't have to be gas guzzlers. We've compiled a list of the most fuel-efficient SUVs on the market, including hybrids and plug-in options.",
                          date: "November 28, 2023",
                          category: "SUVs",
                          imageUrl:
                            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                          url: "/news/fuel-efficient-suvs-2023",
                        },
                        {
                          id: "news-3",
                          title:
                            "New Safety Features Becoming Standard in 2024 Models",
                          description:
                            "Automakers are adding more advanced safety features as standard equipment. Learn about the latest technologies that are becoming commonplace in new vehicles.",
                          date: "October 15, 2023",
                          category: "Safety",
                          imageUrl:
                            "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                          url: "/news/standard-safety-features-2024",
                        },
                        {
                          id: "news-4",
                          title:
                            "The Rise of Subscription Services in the Auto Industry",
                          description:
                            "From feature upgrades to vehicle swapping, subscription services are changing how consumers interact with their vehicles. Is this the future of car ownership?",
                          date: "September 22, 2023",
                          category: "Industry",
                          imageUrl:
                            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                          url: "/news/auto-subscription-services",
                        },
                        {
                          id: "news-5",
                          title:
                            "Best Time to Buy: When to Get the Best Deals on New Cars",
                          description:
                            "Timing your purchase can save you thousands. Our experts break down the best times of year to buy a new car and how to negotiate the best price.",
                          date: "August 10, 2023",
                          category: "Buying Guide",
                          imageUrl:
                            "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                          url: "/news/best-time-to-buy-new-car",
                        },
                        {
                          id: "news-6",
                          title:
                            "How Chip Shortages Continue to Impact the Auto Market",
                          description:
                            "The global semiconductor shortage is still affecting vehicle production and prices. Here's the latest on how it's impacting consumers and when experts expect relief.",
                          date: "July 5, 2023",
                          category: "Industry",
                          imageUrl:
                            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                          url: "/news/chip-shortage-auto-market-impact",
                        },
                      ].map((article) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleComparisons.map((comparison) => (
                <NewsArticle
                  key={comparison.id}
                  title={comparison.title}
                  description={comparison.description}
                  date={comparison.date}
                  category={comparison.category}
                  imageUrl={comparison.imageUrl}
                  url={comparison.url}
                />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button variant="outline" className="group">
                View All Comparisons
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default NewsAndComparisonsSection;
