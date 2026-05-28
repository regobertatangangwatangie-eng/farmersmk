import { render, screen, fireEvent } from '@testing-library/react';
import { SignupButton, SigninButton } from './AuthButtons';
import '@testing-library/jest-dom';

describe('AuthButtons', () => {
  test('renders Sign Up button and handles click', () => {
    const handleClick = jest.fn();
    render(<SignupButton onClick={handleClick} />);
    const button = screen.getByText(/Sign Up/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders Sign In button and handles click', () => {
    const handleClick = jest.fn();
    render(<SigninButton onClick={handleClick} />);
    const button = screen.getByText(/Sign In/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
