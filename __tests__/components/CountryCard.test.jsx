import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CountryCard from '../../src/components/CountryCard';

// Helper wrapper to provide router context
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('CountryCard Component', () => {
  const mockCountry = {
    name: { common: 'Germany' },
    population: 83240000,
    region: 'Europe',
    capital: ['Berlin'],
    flags: { svg: 'https://example.com/germany-flag.svg' },
    cca3: 'DEU'
  };

  test('renders country information correctly', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);
    
    // Check country name is displayed
    expect(screen.getByText('Germany')).toBeInTheDocument();
    
    // Check country details are displayed correctly
    expect(screen.getByText(/Population:/).textContent).toBe('Population: 83,240,000');
    expect(screen.getByText(/Region:/).textContent).toBe('Region: Europe');
    expect(screen.getByText(/Capital:/).textContent).toBe('Capital: Berlin');   
    
  });

  test('links to the correct country detail page', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);
    
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/country/DEU');
  });

  test('handles missing capital gracefully', () => {
    const countryWithoutCapital = {
      ...mockCountry,
      capital: undefined
    };
    
    renderWithRouter(<CountryCard country={countryWithoutCapital} />);
    expect(screen.getByText(/Capital:/).textContent).toBe('Capital: N/A');
  });

  test('handles missing population gracefully', () => {
    const countryWithoutPopulation = {
      ...mockCountry,
      population: undefined
    };
    
    renderWithRouter(<CountryCard country={countryWithoutPopulation} />);
    expect(screen.getByText(/Population:/).textContent).toBe('Population: N/A');
  });

  test('handles population of zero correctly', () => {
    const countryWithZeroPopulation = {
      ...mockCountry,
      population: 0
    };
    
    renderWithRouter(<CountryCard country={countryWithZeroPopulation} />);
    expect(screen.getByText(/Population:/).textContent).toBe('Population: 0');
  });

  test('applies hover styles with correct classes', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);
    
    const cardElement = screen.getByRole('link').firstChild;
    expect(cardElement).toHaveClass('hover:transform');
    expect(cardElement).toHaveClass('hover:scale-105');
    expect(cardElement).toHaveClass('transition-transform');
  });
});