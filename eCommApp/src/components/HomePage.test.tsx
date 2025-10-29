import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import HomePage from './HomePage';

// Mock components
vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

describe('HomePage', () => {
    it('displays the welcome message', () => {
        render(<HomePage />);
        expect(screen.getByText(/Welcome to the The Daily Harvest!/i)).toBeInTheDocument();
    });

    it('displays a cute cat image', () => {
        render(<HomePage />);
        const catImage = screen.getByAltText('Cute cat');
        expect(catImage).toBeInTheDocument();
        expect(catImage).toHaveAttribute('src', '/cute-cat.svg');
    });

    it('displays the products page message', () => {
        render(<HomePage />);
        expect(screen.getByText(/Check out our products page for some great deals./i)).toBeInTheDocument();
    });
});
