import axios from 'axios';
import { getAllCountries, getCountriesByName, getCountriesByRegion, getCountryByCode } from '../../src/services/api';

// Mock axios
jest.mock('axios');

describe('API Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCountries', () => {
    it('should fetch all countries successfully', async () => {
      const mockData = [{ name: { common: 'Germany' } }, { name: { common: 'France' } }];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getAllCountries();
      
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
      expect(result).toEqual(mockData);
    });

    it('should handle errors when fetching all countries', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getAllCountries()).rejects.toThrow(Error);
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
    });
  });

  describe('getCountriesByName', () => {
    it('should fetch countries by name successfully', async () => {
      const mockData = [{ name: { common: 'Germany' } }];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getCountriesByName('Germany');
      
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/Germany');
      expect(result).toEqual(mockData);
    });

    it('should return empty array when country not found', async () => {
      axios.get.mockRejectedValueOnce(new Error('Not Found'));

      const result = await getCountriesByName('NonExistentCountry');
      
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/NonExistentCountry');
      expect(result).toEqual([]);
    });
  });

  describe('getCountriesByRegion', () => {
    it('should fetch countries by region successfully', async () => {
      const mockData = [{ name: { common: 'Germany' } }, { name: { common: 'France' } }];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getCountriesByRegion('europe');
      
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/region/europe');
      expect(result).toEqual(mockData);
    });

    it('should handle errors when fetching countries by region', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getCountriesByRegion('europe')).rejects.toThrow(Error);
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/region/europe');
    });
  });

  describe('getCountryByCode', () => {
    it('should fetch country by code successfully', async () => {
      const mockData = [{ name: { common: 'Germany' } }];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getCountryByCode('DEU');
      
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/DEU');
      expect(result).toEqual(mockData[0]);
    });

    it('should handle errors when fetching country by code', async () => {
      const errorMessage = 'Not Found';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getCountryByCode('XYZ')).rejects.toThrow(Error);
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/XYZ');
    });
  });
});
