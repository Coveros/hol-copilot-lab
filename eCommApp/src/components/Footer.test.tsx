import { render, screen } from '../test/test-utils';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
    it('renders the footer', () => {
        const { container } = render(<Footer />);
        const footer = container.querySelector('footer');
        expect(footer).toBeInTheDocument();
    });

    it('displays copyright text', () => {
        render(<Footer />);
        expect(screen.getByText('© 2025 The Daily Harvest. All rights reserved.')).toBeInTheDocument();
    });

    it('has correct class name', () => {
        const { container } = render(<Footer />);
        const footer = container.querySelector('footer.app-footer');
        expect(footer).toBeInTheDocument();
    });

    it('contains a paragraph element', () => {
        const { container } = render(<Footer />);
        const paragraph = container.querySelector('footer p');
        expect(paragraph).toBeInTheDocument();
    });

    it('displays correct year', () => {
        render(<Footer />);
        expect(screen.getByText(/2025/)).toBeInTheDocument();
    });

    it('displays company name', () => {
        render(<Footer />);
        expect(screen.getByText(/The Daily Harvest/)).toBeInTheDocument();
    });
});
