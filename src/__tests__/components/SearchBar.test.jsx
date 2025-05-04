import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../src/components/SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument();
  });

  it('calls onSearch when user types at least 3 characters', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search for a country...');
    
    // Type less than 3 characters
    fireEvent.change(input, { target: { value: 'ab' } });
    expect(mockOnSearch).not.toHaveBeenCalled();
    
    // Type 3 characters
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(mockOnSearch).toHaveBeenCalledWith('abc');
  });

  it('calls onSearch when input is cleared', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search for a country...');
    
    // First set some value
    fireEvent.change(input, { target: { value: 'Germany' } });
    expect(mockOnSearch).toHaveBeenCalledWith('Germany');
    
    // Clear the input
    fireEvent.change(input, { target: { value: '' } });
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
