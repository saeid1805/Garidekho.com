import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import NewsArticle from "./NewsArticle";
import CarComparison from "./CarComparison";
import { Button } from "./ui/button";
import {
  ChevronRight,
  Newspaper,
  BarChart2,
  Loader2,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";
import carApiService, {
  NewsArticle as NewsArticleType,
  CarComparison as CarComparisonType,
} from "../services/api";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

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

  // Pagination state
  const [newsCurrentPage, setNewsCurrentPage] = useState(1);
  const [comparisonCurrentPage, setComparisonCurrentPage] = useState(1);
  const [newsItemsPerPage] = useState(6);
  const [comparisonItemsPerPage] = useState(2);
  const [newsTotalPages, setNewsTotalPages] = useState(1);
  const [comparisonTotalPages, setComparisonTotalPages] = useState(1);

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
          setNewsTotalPages(Math.ceil(articles.length / newsItemsPerPage));
        } else if (activeTab === "comparisons") {
          const comparisons = await carApiService.getCarComparisons();
          setLoadedCarComparisons(comparisons);
          setComparisonTotalPages(
            Math.ceil(comparisons.length / comparisonItemsPerPage),
          );
        }
      } catch (err) {
        console.error(`Error fetching ${activeTab} data:`, err);
        setError(`Failed to load ${activeTab}. Please try again later.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab, newsItemsPerPage, comparisonItemsPerPage]);

  // Initial data load for both tabs to have data ready when switching
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load news articles if not already loaded
        if (loadedNewsArticles.length === 0) {
          const articles = await carApiService.getNewsArticles();
          setLoadedNewsArticles(articles);
          setNewsTotalPages(Math.ceil(articles.length / newsItemsPerPage));
        }

        // Load comparisons if not already loaded
        if (loadedCarComparisons.length === 0) {
          const comparisons = await carApiService.getCarComparisons();
          setLoadedCarComparisons(comparisons);
          setComparisonTotalPages(
            Math.ceil(comparisons.length / comparisonItemsPerPage),
          );
        }
      } catch (err) {
        console.error("Error loading initial data:", err);
        // Don't set error here as it will be handled by the tab-specific loading
      }
    };

    loadInitialData();
  }, [newsItemsPerPage, comparisonItemsPerPage]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // Reset to first page when changing tabs
    if (value === "news") {
      setNewsCurrentPage(1);
    } else if (value === "comparisons") {
      setComparisonCurrentPage(1);
    }

    // If we're switching to a tab and don't have data yet, but we're not in an error state,
    // trigger a load
    if (value === "news" && loadedNewsArticles.length === 0 && !error) {
      setIsLoading(true);
      carApiService
        .getNewsArticles()
        .then((articles) => {
          setLoadedNewsArticles(articles);
          setNewsTotalPages(Math.ceil(articles.length / newsItemsPerPage));
        })
        .catch((err) => {
          console.error("Error fetching news articles:", err);
          setError("Failed to load news articles. Please try again later.");
        })
        .finally(() => setIsLoading(false));
    } else if (
      value === "comparisons" &&
      loadedCarComparisons.length === 0 &&
      !error
    ) {
      setIsLoading(true);
      carApiService
        .getCarComparisons()
        .then((comparisons) => {
          setLoadedCarComparisons(comparisons);
          setComparisonTotalPages(
            Math.ceil(comparisons.length / comparisonItemsPerPage),
          );
        })
        .catch((err) => {
          console.error("Error fetching car comparisons:", err);
          setError("Failed to load car comparisons. Please try again later.");
        })
        .finally(() => setIsLoading(false));
    }
  };

  // Get paginated news articles
  const getPaginatedNews = () => {
    const startIndex = (newsCurrentPage - 1) * newsItemsPerPage;
    const endIndex = startIndex + newsItemsPerPage;
    return loadedNewsArticles.slice(startIndex, endIndex);
  };

  // Get paginated comparisons
  const getPaginatedComparisons = () => {
    const startIndex = (comparisonCurrentPage - 1) * comparisonItemsPerPage;
    const endIndex = startIndex + comparisonItemsPerPage;
    return loadedCarComparisons.slice(startIndex, endIndex);
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
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-500 mb-4">{error}</p>
                <Button
                  onClick={() => {
                    setIsLoading(true);
                    carApiService
                      .getNewsArticles()
                      .then((articles) => {
                        setLoadedNewsArticles(articles);
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
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Retry
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loadedNewsArticles.length > 0
                    ? getPaginatedNews().map((article) => (
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
                    : // Fallback to mock data if API fails but doesn't throw an error
                      newsArticles
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

                {/* News Pagination */}
                {loadedNewsArticles.length > 0 && newsTotalPages > 1 && (
                  <Pagination className="my-6">
                    <PaginationContent>
                      {newsCurrentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setNewsCurrentPage(newsCurrentPage - 1)
                            }
                          />
                        </PaginationItem>
                      )}

                      {Array.from(
                        { length: newsTotalPages },
                        (_, i) => i + 1,
                      ).map((page) => {
                        // Show first page, last page, and pages around current page
                        if (
                          page === 1 ||
                          page === newsTotalPages ||
                          (page >= newsCurrentPage - 1 &&
                            page <= newsCurrentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                isActive={page === newsCurrentPage}
                                onClick={() => setNewsCurrentPage(page)}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }

                        // Show ellipsis for gaps
                        if (page === 2 && newsCurrentPage > 3) {
                          return (
                            <PaginationItem key="ellipsis-start">
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }

                        if (
                          page === newsTotalPages - 1 &&
                          newsCurrentPage < newsTotalPages - 2
                        ) {
                          return (
                            <PaginationItem key="ellipsis-end">
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }

                        return null;
                      })}

                      {newsCurrentPage < newsTotalPages && (
                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setNewsCurrentPage(newsCurrentPage + 1)
                            }
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                )}

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
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-500 mb-4">{error}</p>
                <Button
                  onClick={() => {
                    setIsLoading(true);
                    carApiService
                      .getCarComparisons()
                      .then((comparisons) => {
                        setLoadedCarComparisons(comparisons);
                        setError(null);
                      })
                      .catch((err) => {
                        console.error("Error retrying comparisons fetch:", err);
                        setError(
                          "Failed to load car comparisons. Please try again later.",
                        );
                      })
                      .finally(() => setIsLoading(false));
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Retry
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
                  {loadedCarComparisons.length > 0
                    ? getPaginatedComparisons().map((comparison) => (
                        <CarComparison
                          key={comparison.id}
                          car1={comparison.car1}
                          car2={comparison.car2}
                          specs={comparison.specs}
                          comparisonLink={comparison.comparisonLink}
                        />
                      ))
                    : // Fallback to mock data if API fails but doesn't throw an error
                      carComparisons
                        .slice(0, 2)
                        .map((comparison) => (
                          <CarComparison
                            key={comparison.id}
                            car1={comparison.car1}
                            car2={comparison.car2}
                            specs={comparison.specs}
                            comparisonLink={comparison.comparisonLink}
                          />
                        ))}
                </div>

                {/* Comparisons Pagination */}
                {loadedCarComparisons.length > 0 &&
                  comparisonTotalPages > 1 && (
                    <Pagination className="my-6">
                      <PaginationContent>
                        {comparisonCurrentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                setComparisonCurrentPage(
                                  comparisonCurrentPage - 1,
                                )
                              }
                            />
                          </PaginationItem>
                        )}

                        {Array.from(
                          { length: comparisonTotalPages },
                          (_, i) => i + 1,
                        ).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              isActive={page === comparisonCurrentPage}
                              onClick={() => setComparisonCurrentPage(page)}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        {comparisonCurrentPage < comparisonTotalPages && (
                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                setComparisonCurrentPage(
                                  comparisonCurrentPage + 1,
                                )
                              }
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  )}

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
