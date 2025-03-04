import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { colors } from "./CardekhoStyle";

interface FeatureCardProps {
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
  url: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  subtitle,
  image,
  bgColor,
  url,
}) => {
  return (
    <Link
      to={url}
      className="block rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
    >
      <div
        className="p-6 h-48 flex flex-col justify-between"
        style={{ backgroundColor: bgColor }}
      >
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-white/80 text-sm flex items-center">
            {subtitle} <ArrowRight className="ml-1 h-3 w-3" />
          </p>
        </div>
        <div className="flex justify-center">
          <img src={image} alt={title} className="h-24 object-contain mt-2" />
        </div>
      </div>
    </Link>
  );
};

const CardekhoFeatureCards: React.FC = () => {
  const features = [
    {
      title: "New Cars",
      subtitle: "with exciting offers",
      image: "/src/assets/new-car.png", // You'll need to add these images to your assets folder
      bgColor: colors.categoryCards.newCars,
      url: "/new-cars",
    },
    {
      title: "Buy Used Car",
      subtitle: "pre-owned cars for sale",
      image: "/src/assets/used-car.png",
      bgColor: colors.categoryCards.usedCars,
      url: "/used-cars",
    },
    {
      title: "Sell Car",
      subtitle: "at the best price",
      image: "/src/assets/sell-car.png",
      bgColor: colors.categoryCards.sellCar,
      url: "/sell",
    },
    {
      title: "Compare",
      subtitle: "and find the right car",
      image: "/src/assets/compare-car.png",
      bgColor: colors.categoryCards.compare,
      url: "/compare",
    },
  ];

  return (
    <section className="w-full py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardekhoFeatureCards;
