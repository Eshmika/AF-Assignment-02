import React from 'react';

const FilterDropdown = ({ onRegionChange }) => {
    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
    const handleChange = (e) => {
      onRegionChange(e.target.value);
    };
  
    return (
      <div className="relative w-full md:w-48">
        <select
          onChange={handleChange}
          className="bg-gray-900 border border-gray-900 text-white text-sm rounded-lg block w-full p-2.5 shadow-md"
        >
          <option value="">Filter by Region</option>
          {regions.map((region) => (
            <option key={region} value={region.toLowerCase()}>
              {region}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default FilterDropdown;
  