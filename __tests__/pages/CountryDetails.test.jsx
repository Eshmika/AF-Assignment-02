import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CountryDetails from '../../src/pages/CountryDetails';
import * as apiService from '../../src/services/api';

// Mock the API service and useParams
jest.mock('../../src/services/api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ code: 'DEU' }),
  useNavigate: () => jest.fn()
}));

describe('CountryDetails Page', () => {
  const mockCountry = {
    cca3: 'DEU',
    name: { 
      common: 'Germany',
      nativeName: { deu: { common: 'Deutschland' } }
    },
    population: 83240000,
    region: 'Europe',
    subregion: 'Central Europe',
    capital: ['Berlin'],
    flags: { svg: 'https://example.com/germany-flag.svg' },
    tld: ['.de'],
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    languages: { deu: 'German' },
    borders: ['FRA', 'POL', 'CZE']
  };

  const mockBorderCountries = [
    {
      cca3: 'FRA',
      name: { common: 'France' },
      flags: { svg: 'https://example.com/france-flag.svg' }
    },
    {
      cca3: 'POL',
      name: { common: 'Poland' },
      flags: { svg: 'https://example.com/poland-flag.svg' }
    },
    {
      cca3: 'CZE',
      name: { common: 'Czech Republic' },
      flags: { svg: 'https://example.com/czech-flag.svg' }
    }
  ];

  beforeEach(() => {
    apiService.getCountryByCode.mockResolvedValue(mockCountry);
    apiService.getCountryByCode.mockImplementation((code) => {
      if (code === 'DEU') return Promise.resolve(mockCountry);
      return Promise.resolve(mockBorderCountries.find(c => c.cca3 === code));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('handles country not found', async () => {
    apiService.getCountryByCode.mockRejectedValueOnce(new Error('Country not found'));
    
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<CountryDetails />} />
        </Routes>
      </BrowserRouter>
    );
    
    // Wait for error state
    await waitFor(() => {
      expect(screen.getByText('Country not found')).toBeInTheDocument();
    });
  });
});
