import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TopologicalFilterCard from './TopologicalFilterCard';

describe('<TopologicalFilterCard />', () => {
  test('it should mount', () => {
    render(<TopologicalFilterCard />);
    
    const topologicalFilterCard = screen.getByTestId('TopologicalFilterCard');

    expect(topologicalFilterCard).toBeInTheDocument();
  });
});