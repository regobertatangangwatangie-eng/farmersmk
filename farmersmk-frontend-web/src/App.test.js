import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders welcome heading', () => {
  render(<App />);
  const heading = screen.getByText(/Welcome to Farmers MK/i);
  expect(heading).toBeInTheDocument();
});
