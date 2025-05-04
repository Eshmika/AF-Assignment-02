import React from "react";
import CountryCard from "./CountryCard";

const CountryList = ({ countries, isLoading }) => {
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
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
};

export default CountryList;
