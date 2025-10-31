import { render, screen } from '../test/test-utils';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Header', () => {
    it('renders the header with title', () => {
        render(<Header />);
        expect(screen.getByText('The Daily Harvest')).toBeInTheDocument();
    });

    it('renders all navigation links', () => {
        render(<Header />);
        
        const homeLink = screen.getByRole('link', { name: 'Home' });
        const productsLink = screen.getByRole('link', { name: 'Products' });
        const cartLink = screen.getByRole('link', { name: 'Cart' });
        
        expect(homeLink).toBeInTheDocument();
        expect(productsLink).toBeInTheDocument();
        expect(cartLink).toBeInTheDocument();
    });

    it('has correct href attributes for navigation links', () => {
        render(<Header />);
        
        const homeLink = screen.getByRole('link', { name: 'Home' });
        const productsLink = screen.getByRole('link', { name: 'Products' });
        const cartLink = screen.getByRole('link', { name: 'Cart' });
        
        expect(homeLink).toHaveAttribute('href', '/');
        expect(productsLink).toHaveAttribute('href', '/products');
        expect(cartLink).toHaveAttribute('href', '/cart');
    });

    it('renders admin login button', () => {
        render(<Header />);
        expect(screen.getByRole('button', { name: 'Admin Login' })).toBeInTheDocument();
    });

    it('admin login button is wrapped in a link to /login', () => {
        render(<Header />);
        const adminButton = screen.getByRole('button', { name: 'Admin Login' });
        const linkElement = adminButton.closest('a');
        expect(linkElement).toHaveAttribute('href', '/login');
    });

    it('renders header element with correct class', () => {
        const { container } = render(<Header />);
        const header = container.querySelector('header.app-header');
        expect(header).toBeInTheDocument();
    });

    it('renders nav element', () => {
        const { container } = render(<Header />);
        const nav = container.querySelector('nav');
        expect(nav).toBeInTheDocument();
    });

    it('renders h1 with correct text', () => {
        render(<Header />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent('The Daily Harvest');
    });
});
