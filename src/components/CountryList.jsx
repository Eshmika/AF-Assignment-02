import React, { useState, useEffect } from "react";
import CountryCard from "./CountryCard";

const CountryList = ({ countries, isLoading }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a small delay before showing the cards for a better transition effect
    if (!isLoading && countries.length > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
    return () => setIsVisible(false);
  }, [countries, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div
          className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
          role="status"
          aria-label="Loading"
        ></div>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl text-gray-900">
          No countries found matching your criteria
        </h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {countries.map((country, index) => (
        <div 
          key={country.cca3}
          className={`transform transition-all duration-1000 ease-in-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <CountryCard country={country} />
        </div>
      ))}
    </div>
  );
};

export default CountryList;
