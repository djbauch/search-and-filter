import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardCloseButton from './CardCloseButton';

describe('<CardCloseButton />', () => {
  test('it should mount', () => {
    render(<CardCloseButton />);
    
    const cardCloseButton = screen.getByTestId('CardCloseButton');

    expect(cardCloseButton).toBeInTheDocument();
  });
});