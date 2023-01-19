import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoadingDots from './LoadingDots';

describe('<LoadingDots />', () => {
  test('it should mount', () => {
    render(<LoadingDots />);
    
    const loadingDots = screen.getByTestId('LoadingDots');

    expect(loadingDots).toBeInTheDocument();
  });
});