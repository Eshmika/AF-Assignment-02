import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import CountryList from '../components/CountryList';
import { getAllCountries, getCountriesByName, getCountriesByRegion } from '../services/api';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  // Fetch all countries on initial load
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Handle search by name
  const handleSearch = async (term) => {
    setSearchTerm(term);
    setIsLoading(true);

    try {
      let results;
      
      if (term === '') {
        // If search is cleared, show all countries (with region filter if applied)
        results = selectedRegion 
          ? await getCountriesByRegion(selectedRegion) 
          : await getAllCountries();
      } else {
        // Search by name
        results = await getCountriesByName(term);
        
        // Apply region filter if selected
        if (selectedRegion) {
          results = results.filter(country => 
            country.region.toLowerCase() === selectedRegion.toLowerCase()
          );
        }
      }
      
      setFilteredCountries(results);
    } catch (error) {
      console.error('Error searching countries:', error);
      setFilteredCountries([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle region filter
  const handleRegionChange = async (region) => {
    setSelectedRegion(region);
    setIsLoading(true);

    try {
      let results;
      
      if (region === '') {
        // If region filter is cleared, show all countries (with search term if applied)
        results = searchTerm 
          ? await getCountriesByName(searchTerm) 
          : await getAllCountries();
      } else {
        // Filter by region
        results = await getCountriesByRegion(region);
        
        // Apply search term if entered
        if (searchTerm) {
          results = results.filter(country => 
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
      }
      
      setFilteredCountries(results);
    } catch (error) {
      console.error('Error filtering countries by region:', error);
      setFilteredCountries([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex m-auto flex-col px-5">
      <div className="flex flex-col md:flex-row justify-between py-15 gap-5">
        <SearchBar onSearch={handleSearch} />
        <FilterDropdown onRegionChange={handleRegionChange} />
      </div>
      <CountryList countries={filteredCountries} isLoading={isLoading} />
    </div>
  );
};

export default Home;
