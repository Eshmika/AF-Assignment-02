import React, { useState, useRef } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Only trigger search if there are at least 3 characters or if the field is empty
    if (value.length >= 3 || value === '') {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    inputRef.current.focus();
  };

  return (
    <div className="relative w-full group">
      {/* Search icon with pulse animation on focus */}
      <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-all duration-300 
                      ${isFocused ? 'text-blue-500' : 'text-gray-400'}`}>
        <svg 
          className={`w-5 h-5 ${isFocused && searchTerm ? 'animate-pulse' : ''}`} 
          aria-hidden="true" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 20 20"
        >
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>

      {/* Input with enhanced styling and animations */}
      <input
        ref={inputRef}
        type="text"
        className="bg-gray-900 border border-gray-800 text-white text-sm rounded-lg block w-full pl-12 pr-10 py-3.5
                  shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  hover:border-gray-700"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Animated border bottom effect */}
      <div className={`absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300 ease-out ${isFocused ? 'w-full' : 'w-0'}`}></div>
      
      {/* Clear button that appears when there's text */}
      {searchTerm && (
        <button 
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors duration-200"
          type="button"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
