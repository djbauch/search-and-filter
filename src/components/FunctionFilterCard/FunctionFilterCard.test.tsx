import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FunctionFilterCard from './FunctionFilterCard';

describe('<FunctionFilterCard />', () => {
  test('it should mount', () => {
    render(<FunctionFilterCard />);
    
    const functionFilterCard = screen.getByTestId('FunctionFilterCard');

    expect(functionFilterCard).toBeInTheDocument();
  });
});