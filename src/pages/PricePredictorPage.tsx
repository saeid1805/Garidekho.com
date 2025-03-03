import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PricePredictor from "../components/PricePredictor";
import ChatSupport from "../components/ChatSupport";

const PricePredictorPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI-Powered Car Value Estimator
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get an accurate estimate of your car's value based on current
              market data, vehicle condition, and regional trends.
            </p>
          </div>

          <PricePredictor />

          <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Why Our AI Price Predictor?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Real-Time Market Data
                </h3>
                <p className="text-sm text-gray-600">
                  Our AI analyzes thousands of similar listings to provide the
                  most accurate valuation.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Regional Pricing
                </h3>
                <p className="text-sm text-gray-600">
                  Get location-specific pricing based on your ZIP code and local
                  market conditions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Sell With Confidence
                </h3>
                <p className="text-sm text-gray-600">
                  Use our estimate to set the right price or negotiate better
                  when selling or trading in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* AI Chat Support */}
      <ChatSupport initialMessage="Hello! I can help you get an accurate estimate for your vehicle. Need any assistance with the price predictor?" />
    </div>
  );
};

export default PricePredictorPage;
