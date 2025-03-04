import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface CarComparisonPreviewProps {
  title?: string;
  description?: string;
  image?: string;
  compareUrl?: string;
}

const CarComparisonPreview = ({
  title = "Compare Cars Side by Side",
  description = "Not sure which car to choose? Compare up to 4 cars side by side and find the perfect match for your needs and budget.",
  image = "https://images.unsplash.com/photo-1600661653561-629509216228?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  compareUrl = "/compare",
}: CarComparisonPreviewProps) => {
  return (
    <section className="w-full py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl overflow-hidden shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
              <p className="text-gray-600 mb-6">{description}</p>
              <Link to={compareUrl}>
                <Button className="bg-[#FF6B3A] hover:bg-[#e55a2a] text-white px-6 py-3 rounded-md flex items-center">
                  Compare Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src={image}
                alt="Car Comparison"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarComparisonPreview;
