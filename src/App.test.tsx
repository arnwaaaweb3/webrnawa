import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Nawa welcome text on homepage', () => {
  render(<App />);
  // Kita mencari teks 'Hello! My Name is Nawa' yang ada di HomePage.tsx
  const headingElement = screen.getByText(/Hello! My Name is Nawa/i);
  expect(headingElement).toBeInTheDocument();
});