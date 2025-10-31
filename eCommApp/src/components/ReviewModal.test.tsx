import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ReviewModal from './ReviewModal';
import { Product } from '../types';

describe('ReviewModal', () => {
    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();

    const mockProduct: Product = {
        id: '1',
        name: 'Test Product',
        price: 10.99,
        image: 'test.jpg',
        reviews: [
            { author: 'John Doe', comment: 'Great product!', date: '2024-01-15' },
            { author: 'Jane Smith', comment: 'Excellent quality', date: '2024-01-20' }
        ],
        inStock: true
    };

    const emptyProduct: Product = {
        id: '2',
        name: 'Empty Reviews Product',
        price: 5.99,
        image: 'empty.jpg',
        reviews: [],
        inStock: true
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns null when product is null', () => {
        const { container } = render(
            <ReviewModal product={null} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders modal when product is provided', () => {
        render(<ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        expect(screen.getByText('Reviews for Test Product')).toBeInTheDocument();
    });

    it('displays existing reviews', () => {
        render(<ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Great product!')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Excellent quality')).toBeInTheDocument();
    });

    it('displays "No reviews yet" when product has no reviews', () => {
        render(<ReviewModal product={emptyProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
    });

    it('renders review form', () => {
        render(<ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        expect(screen.getByText('Leave a Review')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Your review')).toBeInTheDocument();
    });

    it('renders submit button', () => {
        render(<ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('renders close button', () => {
        render(<ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        render(<ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        const closeButton = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when backdrop is clicked', () => {
        const { container } = render(
            <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        const backdrop = container.querySelector('.modal-backdrop');
        fireEvent.click(backdrop!);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when modal content is clicked', () => {
        const { container } = render(
            <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        const content = container.querySelector('.modal-content');
        fireEvent.click(content!);
        expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('submits review with correct data', () => {
        render(<ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        
        const nameInput = screen.getByPlaceholderText('Your name');
        const commentTextarea = screen.getByPlaceholderText('Your review');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(nameInput, { target: { value: 'Test User' } });
        fireEvent.change(commentTextarea, { target: { value: 'Test comment' } });
        fireEvent.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
                author: 'Test User',
                comment: 'Test comment',
                date: expect.any(String)
            })
        );
    });

    it('includes ISO date string in submitted review', () => {
        render(<ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        
        const nameInput = screen.getByPlaceholderText('Your name');
        const commentTextarea = screen.getByPlaceholderText('Your review');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(nameInput, { target: { value: 'Test User' } });
        fireEvent.change(commentTextarea, { target: { value: 'Test comment' } });
        fireEvent.click(submitButton);

        const submittedReview = mockOnSubmit.mock.calls[0][0];
        expect(new Date(submittedReview.date)).toBeInstanceOf(Date);
    });

    it('displays review dates in localized format', () => {
        render(<ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        const dateText = screen.getAllByText(/\d{1,2}\/\d{1,2}\/\d{4}/);
        expect(dateText.length).toBeGreaterThan(0);
    });

    it('handles special characters in reviews', () => {
        const productWithSpecialChars: Product = {
            ...mockProduct,
            reviews: [
                { author: 'Test & User', comment: '<script>alert("test")</script>', date: '2024-01-01' }
            ]
        };

        render(<ReviewModal product={productWithSpecialChars} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        expect(screen.getByText('Test & User')).toBeInTheDocument();
    });

    it('form has correct input types and attributes', () => {
        render(<ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        
        const nameInput = screen.getByPlaceholderText('Your name') as HTMLInputElement;
        const commentTextarea = screen.getByPlaceholderText('Your review') as HTMLTextAreaElement;

        expect(nameInput.type).toBe('text');
        expect(nameInput.required).toBe(true);
        expect(commentTextarea.required).toBe(true);
    });

    it('has correct heading hierarchy', () => {
        render(<ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        
        const mainHeading = screen.getByRole('heading', { level: 2 });
        const formHeading = screen.getByRole('heading', { level: 3 });
        
        expect(mainHeading).toHaveTextContent('Reviews for Test Product');
        expect(formHeading).toHaveTextContent('Leave a Review');
    });

    it('renders multiple reviews correctly', () => {
        const productWithManyReviews: Product = {
            ...mockProduct,
            reviews: [
                { author: 'User 1', comment: 'Review 1', date: '2024-01-01' },
                { author: 'User 2', comment: 'Review 2', date: '2024-01-02' },
                { author: 'User 3', comment: 'Review 3', date: '2024-01-03' },
            ]
        };

        render(<ReviewModal product={productWithManyReviews} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        
        expect(screen.getByText('User 1')).toBeInTheDocument();
        expect(screen.getByText('User 2')).toBeInTheDocument();
        expect(screen.getByText('User 3')).toBeInTheDocument();
    });

    it('renders modal with correct class names', () => {
        const { container } = render(
            <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />
        );
        
        expect(container.querySelector('.modal-backdrop')).toBeInTheDocument();
        expect(container.querySelector('.modal-content')).toBeInTheDocument();
        expect(container.querySelector('.reviews-list')).toBeInTheDocument();
        expect(container.querySelector('.review-form')).toBeInTheDocument();
    });

    it('handles long product names', () => {
        const longNameProduct: Product = {
            ...mockProduct,
            name: 'This is a very long product name that should still display correctly in the modal'
        };

        render(<ReviewModal product={longNameProduct} onClose={mockOnClose} onSubmit={mockOnSubmit} />);
        expect(screen.getByText(/This is a very long product name/)).toBeInTheDocument();
    });
});
