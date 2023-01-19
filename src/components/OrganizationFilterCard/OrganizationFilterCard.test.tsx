import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrganizationFilterCard from './OrganizationFilterCard';

describe('<OrganizationFilterCard />', () => {
  test('it should mount', () => {
    render(<OrganizationFilterCard />);
    
    const organizationFilterCard = screen.getByTestId('OrganizationFilterCard');

    expect(organizationFilterCard).toBeInTheDocument();
  });
});