import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../src/pages/Home';
import * as apiService from '../../src/services/api';

// Mock the API service
jest.mock('../../src/services/api');

describe('Home Page', () => {
  const mockCountries = [
    {
      cca3: 'DEU',
      name: { common: 'Germany' },
      population: 83240000,
      region: 'Europe',
      capital: ['Berlin'],
      flags: { svg: 'https://example.com/germany-flag.svg' }
    },
    {
      cca3: 'FRA',
      name: { common: 'France' },
      population: 67390000,
      region: 'Europe',
      capital: ['Paris'],
      flags: { svg: 'https://example.com/france-flag.svg' }
    },
    {
      cca3: 'JPN',
      name: { common: 'Japan' },
      population: 126500000,
      region: 'Asia',
      capital: ['Tokyo'],
      flags: { svg: 'https://example.com/japan-flag.svg' }
    }
  ];

  beforeEach(() => {
    apiService.getAllCountries.mockResolvedValue(mockCountries);
    apiService.getCountriesByName.mockImplementation((name) => {
      return Promise.resolve(mockCountries.filter(country => 
        country.name.common.toLowerCase().includes(name.toLowerCase())
      ));
    });
    apiService.getCountriesByRegion.mockImplementation((region) => {
      return Promise.resolve(mockCountries.filter(country => 
        country.region.toLowerCase() === region.toLowerCase()
      ));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders and fetches countries on initial load', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    // Check loading state
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    // Wait for countries to load
    await waitFor(() => {
      expect(apiService.getAllCountries).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Germany')).toBeInTheDocument();
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.getByText('Japan')).toBeInTheDocument();
    });
  });

  it('filters countries by search term', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    // Wait for initial countries to load
    await waitFor(() => {
      expect(screen.getByText('Germany')).toBeInTheDocument();
    });
    
    // Search for 'Ger'
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Ger' } });
    
    await waitFor(() => {
      expect(apiService.getCountriesByName).toHaveBeenCalledWith('Ger');
      expect(screen.getByText('Germany')).toBeInTheDocument();
      expect(screen.queryByText('France')).not.toBeInTheDocument();
      expect(screen.queryByText('Japan')).not.toBeInTheDocument();
    });
  });

  it('filters countries by region', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    // Wait for initial countries to load
    await waitFor(() => {
      expect(screen.getByText('Germany')).toBeInTheDocument();
    });
    
    // Filter by Asia region
    const regionSelect = screen.getByRole('combobox');
    fireEvent.change(regionSelect, { target: { value: 'asia' } });
    
    await waitFor(() => {
      expect(apiService.getCountriesByRegion).toHaveBeenCalledWith('asia');
      expect(screen.queryByText('Germany')).not.toBeInTheDocument();
      expect(screen.queryByText('France')).not.toBeInTheDocument();
      expect(screen.getByText('Japan')).toBeInTheDocument();
    });
  });

  it('combines search and region filters', async () => {
    // Mock implementation for combined filters
    apiService.getCountriesByName.mockImplementation((name) => {
      const filtered = mockCountries.filter(country => 
        country.name.common.toLowerCase().includes(name.toLowerCase())
      );
      return Promise.resolve(filtered);
    });
    
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    // Wait for initial countries to load
    await waitFor(() => {
      expect(screen.getByText('Germany')).toBeInTheDocument();
    });
    
    // Filter by Europe region
    const regionSelect = screen.getByRole('combobox');
    fireEvent.change(regionSelect, { target: { value: 'europe' } });
    
    await waitFor(() => {
      expect(screen.getByText('Germany')).toBeInTheDocument();
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.queryByText('Japan')).not.toBeInTheDocument();
    });
    
    // Then search for 'Fra'
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Fra' } });
    
    await waitFor(() => {
      expect(screen.queryByText('Germany')).not.toBeInTheDocument();
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.queryByText('Japan')).not.toBeInTheDocument();
    });
  });
});
