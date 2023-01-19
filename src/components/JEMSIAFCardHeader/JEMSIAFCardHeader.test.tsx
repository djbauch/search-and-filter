import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JEMSIAFCardHeader from './JEMSIAFCardHeader';

describe('<JEMSIAFCardHeader />', () => {
  test('it should mount', () => {
    render(<JEMSIAFCardHeader />);

    const jemsiafCardHeader = screen.getByTestId('JEMSIAFCardHeader');

    expect(jemsiafCardHeader).toBeInTheDocument();
  });
});