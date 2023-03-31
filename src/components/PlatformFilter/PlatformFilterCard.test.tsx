import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PlatformFilterCard from './PlatformFilterCard';

describe('<PlatformFilterCard />', () => {
  test('it should mount', () => {
    render(<PlatformFilterCard />);
    
    const platformFilterCard = screen.getByTestId('PlatformFilterCard');

    expect(platformFilterCard).toBeInTheDocument();
  });
});