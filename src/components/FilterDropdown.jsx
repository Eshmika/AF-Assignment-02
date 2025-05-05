import React, { useState } from 'react';

const FilterDropdown = ({ onRegionChange }) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  
  const handleRegionSelect = (region) => {
    const value = region || '';
    setSelectedRegion(region || '');
    onRegionChange(value.toLowerCase());
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-64">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full bg-gray-900 border border-gray-800 text-white py-3 px-4 rounded-lg shadow-md
                   flex items-center justify-between group transition-all duration-300
                   hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="block truncate">
          {selectedRegion || 'Filter by Region'}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <svg 
            className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
        
        {/* Animated bottom border */}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-gray-900 shadow-lg border border-gray-800 animate-fadeIn">
          <div className="py-1 max-h-60 overflow-auto">
            <button
              onClick={() => handleRegionSelect('')}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors duration-150"
            >
              All Regions
            </button>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => handleRegionSelect(region)}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150 
                  ${selectedRegion === region ? 'bg-blue-600 text-white' : 'text-white hover:bg-gray-800'}`}
              >
                <span className="flex items-center">
                  {selectedRegion === region && (
                    <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {region}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
