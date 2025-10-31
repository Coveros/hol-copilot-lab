import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CheckoutModal from './CheckoutModal';

describe('CheckoutModal', () => {
    const mockOnConfirm = vi.fn();
    const mockOnCancel = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the modal', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    });

    it('displays confirmation message', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        expect(screen.getByText('Do you want to proceed with the checkout?')).toBeInTheDocument();
    });

    it('renders continue checkout button', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        expect(screen.getByRole('button', { name: 'Continue Checkout' })).toBeInTheDocument();
    });

    it('renders return to cart button', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        expect(screen.getByRole('button', { name: 'Return to cart' })).toBeInTheDocument();
    });

    it('calls onConfirm when continue button is clicked', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        const confirmButton = screen.getByRole('button', { name: 'Continue Checkout' });
        fireEvent.click(confirmButton);
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel when return button is clicked', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        const cancelButton = screen.getByRole('button', { name: 'Return to cart' });
        fireEvent.click(cancelButton);
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('does not call onCancel when confirm button is clicked', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        const confirmButton = screen.getByRole('button', { name: 'Continue Checkout' });
        fireEvent.click(confirmButton);
        expect(mockOnCancel).not.toHaveBeenCalled();
    });

    it('does not call onConfirm when cancel button is clicked', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        const cancelButton = screen.getByRole('button', { name: 'Return to cart' });
        fireEvent.click(cancelButton);
        expect(mockOnConfirm).not.toHaveBeenCalled();
    });

    it('renders modal backdrop', () => {
        const { container } = render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        const backdrop = container.querySelector('.modal-backdrop');
        expect(backdrop).toBeInTheDocument();
    });

    it('renders modal content container', () => {
        const { container } = render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        const content = container.querySelector('.modal-content');
        expect(content).toBeInTheDocument();
    });

    it('renders h2 heading', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Are you sure?');
    });

    it('has correct class on cancel button', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        const cancelButton = screen.getByRole('button', { name: 'Return to cart' });
        expect(cancelButton).toHaveClass('cancel-btn');
    });

    it('handles multiple clicks on confirm button', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        const confirmButton = screen.getByRole('button', { name: 'Continue Checkout' });
        fireEvent.click(confirmButton);
        fireEvent.click(confirmButton);
        fireEvent.click(confirmButton);
        expect(mockOnConfirm).toHaveBeenCalledTimes(3);
    });

    it('handles multiple clicks on cancel button', () => {
        render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
        const cancelButton = screen.getByRole('button', { name: 'Return to cart' });
        fireEvent.click(cancelButton);
        fireEvent.click(cancelButton);
        expect(mockOnCancel).toHaveBeenCalledTimes(2);
    });
});
