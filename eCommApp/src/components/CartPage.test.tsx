import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CartPage from './CartPage';
import { CartContext, CartItem } from '../context/CartContext';

// Mock child components
vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

vi.mock('./CheckoutModal', () => ({
    default: ({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) => (
        <div data-testid="checkout-modal">
            <button onClick={onConfirm} data-testid="confirm-btn">Confirm</button>
            <button onClick={onCancel} data-testid="cancel-btn">Cancel</button>
        </div>
    )
}));

describe('CartPage', () => {
    const mockClearCart = vi.fn();
    
    const createMockCartItem = (overrides?: Partial<CartItem>): CartItem => ({
        id: 1,
        name: 'Test Product',
        price: 29.99,
        quantity: 2,
        image: 'test-product.jpg',
        ...overrides
    });

    const renderWithContext = (cartItems: CartItem[] = []) => {
        return render(
            <CartContext.Provider value={{ cartItems, clearCart: mockClearCart, addToCart: vi.fn(), removeFromCart: vi.fn(), updateQuantity: vi.fn() }}>
                <CartPage />
            </CartContext.Provider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Rendering', () => {
        it('should render header and footer', () => {
            renderWithContext();
            expect(screen.getByTestId('header')).toBeInTheDocument();
            expect(screen.getByTestId('footer')).toBeInTheDocument();
        });

        it('should display empty cart message when cart is empty', () => {
            renderWithContext([]);
            expect(screen.getByText('Your Cart')).toBeInTheDocument();
            expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
        });

        it('should not show checkout button when cart is empty', () => {
            renderWithContext([]);
            expect(screen.queryByText('Checkout')).not.toBeInTheDocument();
        });

        it('should render cart items when cart has items', () => {
            const items = [createMockCartItem()];
            renderWithContext(items);
            
            expect(screen.getByText('Test Product')).toBeInTheDocument();
            expect(screen.getByText('Price: $29.99')).toBeInTheDocument();
            expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
        });

        it('should render multiple cart items', () => {
            const items = [
                createMockCartItem({ id: 1, name: 'Product 1' }),
                createMockCartItem({ id: 2, name: 'Product 2' }),
                createMockCartItem({ id: 3, name: 'Product 3' })
            ];
            renderWithContext(items);
            
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('Product 2')).toBeInTheDocument();
            expect(screen.getByText('Product 3')).toBeInTheDocument();
        });

        it('should render correct image paths', () => {
            const items = [createMockCartItem({ image: 'test-image.png' })];
            renderWithContext(items);
            
            const img = screen.getByAltText('Test Product') as HTMLImageElement;
            expect(img.src).toContain('products/productImages/test-image.png');
        });

        it('should display checkout button when cart has items', () => {
            const items = [createMockCartItem()];
            renderWithContext(items);
            expect(screen.getByText('Checkout')).toBeInTheDocument();
        });
    });

    describe('Edge Cases - Pricing', () => {
        it('should handle zero price', () => {
            const items = [createMockCartItem({ price: 0 })];
            renderWithContext(items);
            expect(screen.getByText('Price: $0.00')).toBeInTheDocument();
        });

        it('should handle very small prices', () => {
            const items = [createMockCartItem({ price: 0.01 })];
            renderWithContext(items);
            expect(screen.getByText('Price: $0.01')).toBeInTheDocument();
        });

        it('should handle very large prices', () => {
            const items = [createMockCartItem({ price: 999999.99 })];
            renderWithContext(items);
            expect(screen.getByText('Price: $999999.99')).toBeInTheDocument();
        });

        it('should handle prices with many decimal places', () => {
            const items = [createMockCartItem({ price: 19.999999 })];
            renderWithContext(items);
            expect(screen.getByText('Price: $20.00')).toBeInTheDocument();
        });

        it('should handle negative prices', () => {
            const items = [createMockCartItem({ price: -10.00 })];
            renderWithContext(items);
            expect(screen.getByText('Price: $-10.00')).toBeInTheDocument();
        });
    });

    describe('Edge Cases - Quantity', () => {
        it('should handle zero quantity', () => {
            const items = [createMockCartItem({ quantity: 0 })];
            renderWithContext(items);
            expect(screen.getByText('Quantity: 0')).toBeInTheDocument();
        });

        it('should handle very large quantity', () => {
            const items = [createMockCartItem({ quantity: 999999 })];
            renderWithContext(items);
            expect(screen.getByText('Quantity: 999999')).toBeInTheDocument();
        });

        it('should handle negative quantity', () => {
            const items = [createMockCartItem({ quantity: -5 })];
            renderWithContext(items);
            expect(screen.getByText('Quantity: -5')).toBeInTheDocument();
        });
    });

    describe('Edge Cases - Product Names and Images', () => {
        it('should handle very long product names', () => {
            const longName = 'A'.repeat(500);
            const items = [createMockCartItem({ name: longName })];
            renderWithContext(items);
            expect(screen.getByText(longName)).toBeInTheDocument();
        });

        it('should handle empty product name', () => {
            const items = [createMockCartItem({ name: '' })];
            renderWithContext(items);
            expect(screen.getByText('Price: $29.99')).toBeInTheDocument();
        });

        it('should handle special characters in product name', () => {
            const items = [createMockCartItem({ name: '<script>alert("xss")</script>' })];
            renderWithContext(items);
            expect(screen.getByText('<script>alert("xss")</script>')).toBeInTheDocument();
        });

        it('should handle empty image path', () => {
            const items = [createMockCartItem({ image: '' })];
            renderWithContext(items);
            const img = screen.getByAltText('Test Product') as HTMLImageElement;
            expect(img.src).toContain('products/productImages/');
        });
    });

    describe('Checkout Flow', () => {
        it('should show checkout modal when checkout button is clicked', () => {
            const items = [createMockCartItem()];
            renderWithContext(items);
            
            const checkoutBtn = screen.getByText('Checkout');
            fireEvent.click(checkoutBtn);
            
            expect(screen.getByTestId('checkout-modal')).toBeInTheDocument();
        });

        it('should hide checkout modal when cancel is clicked', () => {
            const items = [createMockCartItem()];
            renderWithContext(items);
            
            fireEvent.click(screen.getByText('Checkout'));
            expect(screen.getByTestId('checkout-modal')).toBeInTheDocument();
            
            fireEvent.click(screen.getByTestId('cancel-btn'));
            expect(screen.queryByTestId('checkout-modal')).not.toBeInTheDocument();
        });

        it('should process order when confirm is clicked', () => {
            const items = [createMockCartItem()];
            renderWithContext(items);
            
            fireEvent.click(screen.getByText('Checkout'));
            fireEvent.click(screen.getByTestId('confirm-btn'));
            
            expect(mockClearCart).toHaveBeenCalledTimes(1);
            expect(screen.getByText('Your order has been processed!')).toBeInTheDocument();
        });

        it('should display processed items after checkout', () => {
            const items = [
                createMockCartItem({ id: 1, name: 'Product 1' }),
                createMockCartItem({ id: 2, name: 'Product 2' })
            ];
            renderWithContext(items);
            
            fireEvent.click(screen.getByText('Checkout'));
            fireEvent.click(screen.getByTestId('confirm-btn'));
            
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('Product 2')).toBeInTheDocument();
        });

        it('should not show checkout button on order processed page', () => {
            const items = [createMockCartItem()];
            renderWithContext(items);
            
            fireEvent.click(screen.getByText('Checkout'));
            fireEvent.click(screen.getByTestId('confirm-btn'));
            
            expect(screen.queryByText('Checkout')).not.toBeInTheDocument();
        });

        it('should handle checkout with single item', () => {
            const items = [createMockCartItem()];
            renderWithContext(items);
            
            fireEvent.click(screen.getByText('Checkout'));
            fireEvent.click(screen.getByTestId('confirm-btn'));
            
            expect(mockClearCart).toHaveBeenCalled();
            expect(screen.getByText('Your order has been processed!')).toBeInTheDocument();
        });

        it('should handle checkout with many items', () => {
            const items = Array.from({ length: 50 }, (_, i) => 
                createMockCartItem({ id: i, name: `Product ${i}` })
            );
            renderWithContext(items);
            
            fireEvent.click(screen.getByText('Checkout'));
            fireEvent.click(screen.getByTestId('confirm-btn'));
            
            expect(mockClearCart).toHaveBeenCalled();
            expect(screen.getByText('Your order has been processed!')).toBeInTheDocument();
        });
    });

    describe('Error Handling', () => {
        it('should throw error when CartContext is not provided', () => {
            // Suppress console.error for this test
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            
            expect(() => render(<CartPage />)).toThrow('CartContext must be used within a CartProvider');
            
            consoleSpy.mockRestore();
        });

        it('should throw error with correct message when context is missing', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            
            try {
                render(<CartPage />);
            } catch (error) {
                expect((error as Error).message).toBe('CartContext must be used within a CartProvider');
            }
            
            consoleSpy.mockRestore();
        });
    });

    describe('State Management', () => {
        it('should maintain separate state for different checkout sessions', () => {
            const items = [createMockCartItem()];
            const { rerender } = renderWithContext(items);
            
            fireEvent.click(screen.getByText('Checkout'));
            fireEvent.click(screen.getByTestId('cancel-btn'));
            
            expect(screen.queryByTestId('checkout-modal')).not.toBeInTheDocument();
            expect(screen.queryByText('Your order has been processed!')).not.toBeInTheDocument();
        });

        it('should preserve processed items after order completion', () => {
            const items = [createMockCartItem({ name: 'Original Product' })];
            renderWithContext(items);
            
            fireEvent.click(screen.getByText('Checkout'));
            fireEvent.click(screen.getByTestId('confirm-btn'));
            
            expect(screen.getByText('Original Product')).toBeInTheDocument();
        });
    });

    describe('UI Consistency', () => {
        it('should maintain header and footer on order processed page', () => {
            const items = [createMockCartItem()];
            renderWithContext(items);
            
            fireEvent.click(screen.getByText('Checkout'));
            fireEvent.click(screen.getByTestId('confirm-btn'));
            
            expect(screen.getByTestId('header')).toBeInTheDocument();
            expect(screen.getByTestId('footer')).toBeInTheDocument();
        });

        it('should use correct CSS classes for cart items', () => {
            const items = [createMockCartItem()];
            renderWithContext(items);
            
            expect(screen.getByText('Test Product').closest('.cart-item-info')).toBeInTheDocument();
        });

        it('should use correct CSS classes for order processed items', () => {
            const items = [createMockCartItem()];
            renderWithContext(items);
            
            fireEvent.click(screen.getByText('Checkout'));
            fireEvent.click(screen.getByTestId('confirm-btn'));
            
            expect(screen.getByText('Test Product').closest('.cart-item-info')).toBeInTheDocument();
        });
    });

    describe('Duplicate Items', () => {
        it('should handle duplicate item IDs correctly', () => {
            const items = [
                createMockCartItem({ id: 1, name: 'Product 1' }),
                createMockCartItem({ id: 1, name: 'Product 1 Duplicate' })
            ];
            renderWithContext(items);
            
            const products = screen.getAllByText(/Product 1/);
            expect(products.length).toBeGreaterThanOrEqual(2);
        });
    });
});
