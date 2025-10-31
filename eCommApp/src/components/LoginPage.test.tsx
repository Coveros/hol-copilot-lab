import { render, screen, fireEvent, waitFor } from '../test/test-utils';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from './LoginPage';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn()
    };
});

describe('LoginPage', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useNavigate as any).mockReturnValue(mockNavigate);
    });

    it('renders the login page', () => {
        render(<LoginPage />);
        expect(screen.getByRole('heading', { name: 'Admin Login' })).toBeInTheDocument();
    });

    it('renders header and footer', () => {
        render(<LoginPage />);
        expect(screen.getByText('The Daily Harvest')).toBeInTheDocument();
        expect(screen.getByText('© 2025 The Daily Harvest. All rights reserved.')).toBeInTheDocument();
    });

    it('renders username input field', () => {
        render(<LoginPage />);
        const usernameInput = screen.getByPlaceholderText('Username');
        expect(usernameInput).toBeInTheDocument();
        expect(usernameInput).toHaveAttribute('type', 'text');
    });

    it('renders password input field', () => {
        render(<LoginPage />);
        const passwordInput = screen.getByPlaceholderText('Password');
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('renders login button', () => {
        render(<LoginPage />);
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('allows typing in username field', () => {
        render(<LoginPage />);
        const usernameInput = screen.getByPlaceholderText('Username') as HTMLInputElement;
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        expect(usernameInput.value).toBe('testuser');
    });

    it('allows typing in password field', () => {
        render(<LoginPage />);
        const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
        fireEvent.change(passwordInput, { target: { value: 'testpass' } });
        expect(passwordInput.value).toBe('testpass');
    });

    it('navigates to admin page on successful login', async () => {
        render(<LoginPage />);
        
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'admin' } });
        fireEvent.change(passwordInput, { target: { value: 'admin' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/admin');
        });
    });

    it('displays error message on invalid credentials', () => {
        render(<LoginPage />);
        
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'wrong' } });
        fireEvent.change(passwordInput, { target: { value: 'wrong' } });
        fireEvent.click(loginButton);

        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    it('does not navigate on invalid credentials', () => {
        render(<LoginPage />);
        
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'wrong' } });
        fireEvent.change(passwordInput, { target: { value: 'wrong' } });
        fireEvent.click(loginButton);

        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('clears input fields on successful login', async () => {
        render(<LoginPage />);
        
        const usernameInput = screen.getByPlaceholderText('Username') as HTMLInputElement;
        const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'admin' } });
        fireEvent.change(passwordInput, { target: { value: 'admin' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(usernameInput.value).toBe('');
            expect(passwordInput.value).toBe('');
        });
    });

    it('clears error message on successful login', async () => {
        render(<LoginPage />);
        
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        // First, fail login
        fireEvent.change(usernameInput, { target: { value: 'wrong' } });
        fireEvent.change(passwordInput, { target: { value: 'wrong' } });
        fireEvent.click(loginButton);
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();

        // Then, successful login
        fireEvent.change(usernameInput, { target: { value: 'admin' } });
        fireEvent.change(passwordInput, { target: { value: 'admin' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument();
        });
    });

    it('does not display error message initially', () => {
        render(<LoginPage />);
        expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument();
    });

    it('handles empty username', () => {
        render(<LoginPage />);
        
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(passwordInput, { target: { value: 'admin' } });
        fireEvent.click(loginButton);

        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('handles empty password', () => {
        render(<LoginPage />);
        
        const usernameInput = screen.getByPlaceholderText('Username');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'admin' } });
        fireEvent.click(loginButton);

        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('handles correct username but wrong password', () => {
        render(<LoginPage />);
        
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'admin' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(loginButton);

        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    it('handles wrong username but correct password', () => {
        render(<LoginPage />);
        
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
        fireEvent.change(passwordInput, { target: { value: 'admin' } });
        fireEvent.click(loginButton);

        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    it('is case sensitive for credentials', () => {
        render(<LoginPage />);
        
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'Admin' } });
        fireEvent.change(passwordInput, { target: { value: 'Admin' } });
        fireEvent.click(loginButton);

        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    it.skip('username input has autofocus', () => {
        render(<LoginPage />);
        const usernameInput = screen.getByPlaceholderText('Username');
        expect(usernameInput).toHaveAttribute('autoFocus');
    });

    it('has correct heading', () => {
        render(<LoginPage />);
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Admin Login');
    });

    it('form submits on button click', () => {
        render(<LoginPage />);
        
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'admin' } });
        fireEvent.change(passwordInput, { target: { value: 'admin' } });
        fireEvent.click(loginButton);

        expect(mockNavigate).toHaveBeenCalled();
    });

    it.skip('error message is styled in red', () => {
        render(<LoginPage />);
        
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'wrong' } });
        fireEvent.change(passwordInput, { target: { value: 'wrong' } });
        fireEvent.click(loginButton);

        const errorMessage = screen.getByText('Invalid credentials');
        expect(errorMessage).toHaveStyle({ color: 'red' });
    });
});
