import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CoComFilterCard from './CoComFilterCard';

describe('<CoComFilterCard />', () => {
  test('it should mount', () => {
    render(<CoComFilterCard />);
    
    const coComFilterCard = screen.getByTestId('CoComFilterCard');

    expect(coComFilterCard).toBeInTheDocument();
  });
});