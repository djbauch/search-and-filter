import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TemporalFilterCard from './TemporalFilterCard';

describe('<TemporalFilterCard />', () => {
  test('it should mount', () => {
    render(<TemporalFilterCard />);
    
    const temporalFilterCard = screen.getByTestId('TemporalFilterCard');

    expect(temporalFilterCard).toBeInTheDocument();
  });
});