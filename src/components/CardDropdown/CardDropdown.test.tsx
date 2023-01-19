import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardDropdown from './CardDropdown';

describe('<CardDropdown />', () => {
  test('it should mount', () => {
    render(<CardDropdown />);
    
    const cardDropdown = screen.getByTestId('CardDropdown');

    expect(cardDropdown).toBeInTheDocument();
  });
});