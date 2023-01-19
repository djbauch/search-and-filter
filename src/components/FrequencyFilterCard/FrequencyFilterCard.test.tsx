import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FrequencyFilterCard from './FrequencyFilterCard';

describe('<FrequencyFilterCard />', () => {
  test('it should mount', () => {
    render(<FrequencyFilterCard />);
    
    const frequencyFilterCard = screen.getByTestId('FrequencyFilterCard');

    expect(frequencyFilterCard).toBeInTheDocument();
  });
});