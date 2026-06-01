import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders welcome heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /welcome to (farmers mk|farmersmk)/i });
  expect(heading).toBeInTheDocument();
});
