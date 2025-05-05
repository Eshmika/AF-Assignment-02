import React from 'react';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  // Helper function to format population
  const formatPopulation = (population) => {
    if (population === undefined || population === null) {
      return 'N/A';
    }
    return population.toLocaleString();
  };

  // Helper function to get capital
  const getCapital = (capital) => {
    if (!capital || capital.length === 0) {
      return 'N/A';
    }
    return capital[0];
  };

  return (
    <Link to={`/country/${country.cca3}`} className="block group">
      <div className="bg-gray-900 rounded-lg shadow-md border-2 border-gray-900 overflow-hidden h-full hover:transform hover:scale-105 transition-transform duration-300 hover:bg-gray-900 hover:shadow-gray-900 hover:shadow-lg relative">
        <img 
          src={country.flags.svg} 
          alt={`Flag of ${country.name.common}`}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2 text-white">
            {country.name.common}
          </h2>
          <div className="text-sm text-gray-300">
            <p className="font-semibold">Population: <span className="font-normal">{formatPopulation(country.population)}</span></p>
            <p className="font-semibold">Region: <span className="font-normal">{country.region}</span></p>
            <p className="font-semibold">Capital: <span className="font-normal">{getCapital(country.capital)}</span></p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 transition-all duration-300 group-hover:w-full"></div>
      </div>
    </Link>
  );
};

export default CountryCard;
