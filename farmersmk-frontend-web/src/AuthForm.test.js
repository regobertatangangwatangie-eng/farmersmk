import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from './AuthForm';
import '@testing-library/jest-dom';

describe('AuthForm', () => {
  test('renders Sign Up form and submits', () => {
    const handleSubmit = jest.fn();
    render(<AuthForm mode="signup" onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser', name: 'username' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com', name: 'email' } });
      const [passwordInput, confirmPasswordInput] = screen.getAllByPlaceholderText(/Password/i);
      fireEvent.change(passwordInput, { target: { value: 'password', name: 'password' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password', name: 'confirmPassword' } });
      fireEvent.click(screen.getByRole('button', { name: /enter/i }));
    expect(handleSubmit).toHaveBeenCalled();
  });

  test('renders Sign In form and submits', () => {
    const handleSubmit = jest.fn();
    render(<AuthForm mode="signin" onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser', name: 'username' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password', name: 'password' } });
      fireEvent.click(screen.getByRole('button', { name: /enter/i }));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
