import { render, screen } from '../test/test-utils';
import { describe, it, expect } from 'vitest';
import HomePage from './HomePage';

describe('HomePage', () => {
    it('renders the home page', () => {
        render(<HomePage />);
        expect(screen.getByText('Welcome to the The Daily Harvest!')).toBeInTheDocument();
    });

    it('displays welcome message', () => {
        render(<HomePage />);
        const welcomeHeading = screen.getByRole('heading', { level: 2 });
        expect(welcomeHeading).toHaveTextContent('Welcome to the The Daily Harvest!');
    });

    it('displays promotional text', () => {
        render(<HomePage />);
        expect(screen.getByText('Check out our products page for some great deals.')).toBeInTheDocument();
    });

    it('renders header component', () => {
        render(<HomePage />);
        expect(screen.getByText('The Daily Harvest')).toBeInTheDocument();
    });

    it('renders footer component', () => {
        render(<HomePage />);
        expect(screen.getByText('© 2025 The Daily Harvest. All rights reserved.')).toBeInTheDocument();
    });

    it('has main content area with correct class', () => {
        const { container } = render(<HomePage />);
        const main = container.querySelector('main.main-content');
        expect(main).toBeInTheDocument();
    });

    it('contains app wrapper div', () => {
        const { container } = render(<HomePage />);
        const appDiv = container.querySelector('div.app');
        expect(appDiv).toBeInTheDocument();
    });

    it('renders all navigation links from header', () => {
        render(<HomePage />);
        expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Cart' })).toBeInTheDocument();
    });

    it('renders complete structure', () => {
        const { container } = render(<HomePage />);
        
        const appDiv = container.querySelector('div.app');
        const header = container.querySelector('header');
        const main = container.querySelector('main');
        const footer = container.querySelector('footer');
        
        expect(appDiv).toBeInTheDocument();
        expect(header).toBeInTheDocument();
        expect(main).toBeInTheDocument();
        expect(footer).toBeInTheDocument();
    });
});
