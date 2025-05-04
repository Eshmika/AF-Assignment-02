import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterDropdown from '../../src/components/FilterDropdown';

describe('FilterDropdown Component', () => {
  const mockOnRegionChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all regions', () => {
    render(<FilterDropdown onRegionChange={mockOnRegionChange} />);
    
    expect(screen.getByText('Filter by Region')).toBeInTheDocument();
    
    // Open the dropdown
    fireEvent.click(screen.getByRole('combobox'));
    
    // Check if all regions are present
    expect(screen.getByText('Africa')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('Oceania')).toBeInTheDocument();
  });

  it('calls onRegionChange when a region is selected', () => {
    render(<FilterDropdown onRegionChange={mockOnRegionChange} />);
    
    const select = screen.getByRole('combobox');
    
    // Select Europe
    fireEvent.change(select, { target: { value: 'europe' } });
    
    expect(mockOnRegionChange).toHaveBeenCalledWith('europe');
  });
});
