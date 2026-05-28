import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders welcome heading', () => {
  render(<App />);
  const heading = screen.getByText(/Welcome to farmersmk/i);
  expect(heading).toBeInTheDocument();
});
