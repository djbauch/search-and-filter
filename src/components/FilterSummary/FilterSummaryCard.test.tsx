import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilterSummaryCard from './FilterSummaryCard';

describe('<FilterSummaryCard />', () => {
  test('it should mount', () => {
    render(<FilterSummaryCard />);
    
    const filterSummaryCard = screen.getByTestId('FilterSummaryCard');

    expect(filterSummaryCard).toBeInTheDocument();
  });
});