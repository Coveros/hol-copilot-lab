import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import CartPage from './CartPage';
import { CartContext, CartItem } from '../context/CartContext';

// Mock components
vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

vi.mock('./CheckoutModal', () => ({
    default: ({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) => (
        <div data-testid="checkout-modal">
            <button onClick={onConfirm} data-testid="confirm-checkout">Confirm</button>
            <button onClick={onCancel} data-testid="cancel-checkout">Cancel</button>
        </div>
    )
}));

const mockCartItems: CartItem[] = [
    {
        id: '1',
        name: 'Test Product 1',
        price: 29.99,
        quantity: 2,
        image: 'test1.jpg',
        reviews: [
            { author: 'John Doe', comment: 'Great product!', date: '2024-01-15' },
            { author: 'Jane Smith', comment: 'Excellent quality', date: '2024-01-20' }
        ],
        inStock: true
    },
    {
        id: '2',
        name: 'Test Product 2',
        price: 49.99,
        quantity: 1,
        image: 'test2.jpg',
        reviews: [
            { author: 'Bob Johnson', comment: 'Good value for money', date: '2024-01-10' }
        ],
        inStock: true
    }
];

const mockCartContext = {
    cartItems: mockCartItems,
    addToCart: vi.fn(),
    clearCart: vi.fn()
};

const renderWithCartContext = (cartContext = mockCartContext) => {
    return render(
        <CartContext.Provider value={cartContext}>
            <CartPage />
        </CartContext.Provider>
    );
};

describe('CartPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('displays cart items when cart has items', () => {
        renderWithCartContext();
        
        expect(screen.getByText('Your Cart')).toBeInTheDocument();
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
        expect(screen.getByText('Price: $29.99')).toBeInTheDocument();
        expect(screen.getByText('Price: $49.99')).toBeInTheDocument();
        expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
        expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
    });

    // Verify that an empty cart message is displayed when the cart is empty.
    it('displays empty cart message when cart is empty', () => {
        renderWithCartContext({ ...mockCartContext, cartItems: [] });
        expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });

    describe('Checkout Flow', () => {
        it('opens checkout modal when checkout button is clicked', () => {
            renderWithCartContext();
            
            const checkoutButton = screen.getByText('Checkout');
            fireEvent.click(checkoutButton);
            
            expect(screen.getByTestId('checkout-modal')).toBeInTheDocument();
        });

        it('closes checkout modal when cancel button is clicked', () => {
            renderWithCartContext();
            
            fireEvent.click(screen.getByText('Checkout'));
            expect(screen.getByTestId('checkout-modal')).toBeInTheDocument();
            
            fireEvent.click(screen.getByTestId('cancel-checkout'));
            expect(screen.queryByTestId('checkout-modal')).not.toBeInTheDocument();
        });

        it('processes order when confirm button is clicked', () => {
            renderWithCartContext();
            
            fireEvent.click(screen.getByText('Checkout'));
            fireEvent.click(screen.getByTestId('confirm-checkout'));
            
            expect(mockCartContext.clearCart).toHaveBeenCalledTimes(1);
            expect(screen.getByText('Your order has been processed!')).toBeInTheDocument();
        });

        it('displays processed items after order confirmation', () => {
            renderWithCartContext();
            
            fireEvent.click(screen.getByText('Checkout'));
            fireEvent.click(screen.getByTestId('confirm-checkout'));
            
            // Items should still be displayed in the processed order view
            expect(screen.getByText('Test Product 1')).toBeInTheDocument();
            expect(screen.getByText('Test Product 2')).toBeInTheDocument();
            expect(screen.queryByText('Checkout')).not.toBeInTheDocument();
        });

        it('does not show checkout button when cart is empty', () => {
            renderWithCartContext({ ...mockCartContext, cartItems: [] });
            
            expect(screen.queryByText('Checkout')).not.toBeInTheDocument();
        });

        it('does not clear cart when checkout is cancelled', () => {
            renderWithCartContext();
            
            fireEvent.click(screen.getByText('Checkout'));
            fireEvent.click(screen.getByTestId('cancel-checkout'));
            
            expect(mockCartContext.clearCart).not.toHaveBeenCalled();
        });
    });

    describe('Error Handling', () => {
        it('throws error when CartContext is not provided', () => {
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
            
            expect(() => render(<CartPage />)).toThrow('CartContext must be used within a CartProvider');
            
            consoleError.mockRestore();
        });

        it('handles null context gracefully', () => {
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
            
            expect(() => 
                render(
                    <CartContext.Provider value={null as any}>
                        <CartPage />
                    </CartContext.Provider>
                )
            ).toThrow('CartContext must be used within a CartProvider');
            
            consoleError.mockRestore();
        });
    });

    describe('Edge Cases', () => {
        it('handles single item in cart', () => {
            const singleItem: CartItem[] = [
                { id: '1', name: 'Single Item', price: 9.99, quantity: 1, image: 'single.jpg', reviews: [{ author: 'User1', comment: 'Nice', date: '2024-01-01' }], inStock: true }
            ];
            renderWithCartContext({ ...mockCartContext, cartItems: singleItem });
            
            expect(screen.getByText('Single Item')).toBeInTheDocument();
            expect(screen.getByText('Price: $9.99')).toBeInTheDocument();
        });

        it('handles large quantity values', () => {
            const largeQuantity: CartItem[] = [
                { id: '1', name: 'Bulk Item', price: 1.99, quantity: 9999, image: 'bulk.jpg', reviews: [], inStock: true }
            ];
            renderWithCartContext({ ...mockCartContext, cartItems: largeQuantity });
            
            expect(screen.getByText('Quantity: 9999')).toBeInTheDocument();
        });

        it('handles zero price items', () => {
            const freeItem: CartItem[] = [
                { id: '1', name: 'Free Sample', price: 0, quantity: 1, image: 'free.jpg', reviews: [{ author: 'Tester', comment: 'Free is good!', date: '2024-01-05' }], inStock: true }
            ];
            renderWithCartContext({ ...mockCartContext, cartItems: freeItem });
            
            expect(screen.getByText('Price: $0.00')).toBeInTheDocument();
        });

        it('handles very high price items', () => {
            const expensiveItem: CartItem[] = [
                { id: '1', name: 'Luxury Item', price: 999999.99, quantity: 1, image: 'luxury.jpg', reviews: [{ author: 'Rich User', comment: 'Worth every penny', date: '2024-01-25' }], inStock: false }
            ];
            renderWithCartContext({ ...mockCartContext, cartItems: expensiveItem });
            
            expect(screen.getByText('Price: $999999.99')).toBeInTheDocument();
        });

        it('handles items with very long names', () => {
            const longNameItem: CartItem[] = [
                { 
                    id: '1', 
                    name: 'This is an extremely long product name that might cause layout issues in the cart display component and should be handled gracefully', 
                    price: 10.00, 
                    quantity: 1, 
                    image: 'long.jpg',
                    reviews: [],
                    inStock: true
                }
            ];
            renderWithCartContext({ ...mockCartContext, cartItems: longNameItem });
            
            expect(screen.getByText(/This is an extremely long product name/)).toBeInTheDocument();
        });

        it('handles special characters in product names', () => {
            const specialCharsItem: CartItem[] = [
                { 
                    id: '1', 
                    name: 'Product™ & Co. © <Special> "Edition" 50% Off!', 
                    price: 25.00, 
                    quantity: 1, 
                    image: 'special.jpg',
                    reviews: [
                        { author: 'Special User', comment: 'Love the special characters!', date: '2024-01-18' }
                    ],
                    inStock: true
                }
            ];
            renderWithCartContext({ ...mockCartContext, cartItems: specialCharsItem });
            
            expect(screen.getByText(/Product™ & Co/)).toBeInTheDocument();
        });

        it('handles empty image paths', () => {
            const noImageItem: CartItem[] = [
                { id: '1', name: 'No Image', price: 5.00, quantity: 1, image: '', reviews: [], inStock: true }
            ];
            renderWithCartContext({ ...mockCartContext, cartItems: noImageItem });
            
            const img = screen.getByAltText('No Image');
            expect(img).toHaveAttribute('src', 'products/productImages/');
        });

        it('handles decimal quantities if provided', () => {
            const decimalQuantity: CartItem[] = [
                { id: '1', name: 'Fractional Item', price: 3.50, quantity: 2.5 as any, image: 'decimal.jpg', reviews: [], inStock: true }
            ];
            renderWithCartContext({ ...mockCartContext, cartItems: decimalQuantity });
            
            expect(screen.getByText('Quantity: 2.5')).toBeInTheDocument();
        });

        it('handles negative quantities gracefully', () => {
            const negativeQuantity: CartItem[] = [
                { id: '1', name: 'Invalid Item', price: 10.00, quantity: -1 as any, image: 'invalid.jpg', reviews: [], inStock: false }
            ];
            renderWithCartContext({ ...mockCartContext, cartItems: negativeQuantity });
            
            expect(screen.getByText('Quantity: -1')).toBeInTheDocument();
        });

        it('preserves item order in processed view', () => {
            const orderedItems: CartItem[] = [
                { id: '3', name: 'Third', price: 30.00, quantity: 1, image: 'three.jpg', reviews: [{ author: 'User3', comment: 'Third!', date: '2024-01-03' }], inStock: true },
                { id: '1', name: 'First', price: 10.00, quantity: 1, image: 'one.jpg', reviews: [{ author: 'User1', comment: 'First!', date: '2024-01-01' }], inStock: true },
                { id: '2', name: 'Second', price: 20.00, quantity: 1, image: 'two.jpg', reviews: [], inStock: false }
            ];
            renderWithCartContext({ ...mockCartContext, cartItems: orderedItems });
            
            fireEvent.click(screen.getByText('Checkout'));
            fireEvent.click(screen.getByTestId('confirm-checkout'));
            
            const items = screen.getAllByRole('heading', { level: 3 });
            expect(items[0]).toHaveTextContent('Third');
            expect(items[1]).toHaveTextContent('First');
            expect(items[2]).toHaveTextContent('Second');
        });

        it('handles many items in cart', () => {
            const manyItems: CartItem[] = Array.from({ length: 50 }, (_, i) => ({
                id: String(i + 1),
                name: `Product ${i + 1}`,
                price: (i + 1) * 10,
                quantity: 1,
                image: `product${i + 1}.jpg`,
                reviews: i % 3 === 0 ? [{ author: `User${i}`, comment: `Comment ${i}`, date: `2024-01-${String(i + 1).padStart(2, '0')}` }] : [],
                inStock: i % 2 === 0
            }));
            renderWithCartContext({ ...mockCartContext, cartItems: manyItems });
            
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('Product 50')).toBeInTheDocument();
        });
    });

    describe('Component Structure', () => {
        it('renders header and footer components', () => {
            renderWithCartContext();
            
            expect(screen.getByTestId('header')).toBeInTheDocument();
            expect(screen.getByTestId('footer')).toBeInTheDocument();
        });

        it('maintains proper component structure in empty state', () => {
            renderWithCartContext({ ...mockCartContext, cartItems: [] });
            
            expect(screen.getByTestId('header')).toBeInTheDocument();
            expect(screen.getByTestId('footer')).toBeInTheDocument();
            expect(screen.getByText('Your Cart')).toBeInTheDocument();
        });

        it('maintains proper component structure in processed state', () => {
            renderWithCartContext();
            
            fireEvent.click(screen.getByText('Checkout'));
            fireEvent.click(screen.getByTestId('confirm-checkout'));
            
            expect(screen.getByTestId('header')).toBeInTheDocument();
            expect(screen.getByTestId('footer')).toBeInTheDocument();
            expect(screen.getByText('Your order has been processed!')).toBeInTheDocument();
        });
    });

    describe('Image Rendering', () => {
        it('renders images with correct src and alt attributes', () => {
            renderWithCartContext();
            
            const images = screen.getAllByRole('img');
            expect(images[0]).toHaveAttribute('src', 'products/productImages/test1.jpg');
            expect(images[0]).toHaveAttribute('alt', 'Test Product 1');
            expect(images[1]).toHaveAttribute('src', 'products/productImages/test2.jpg');
            expect(images[1]).toHaveAttribute('alt', 'Test Product 2');
        });

        it('handles invalid image extensions', () => {
            const invalidImageItems: CartItem[] = [
                { id: '1', name: 'Bad Image', price: 10.00, quantity: 1, image: 'product.xyz', reviews: [], inStock: true }
            ];
            renderWithCartContext({ ...mockCartContext, cartItems: invalidImageItems });
            
            const img = screen.getByAltText('Bad Image');
            expect(img).toHaveAttribute('src', 'products/productImages/product.xyz');
        });
    });

    describe('State Management', () => {
        it('does not lose cart items when modal is opened', () => {
            renderWithCartContext();
            
            fireEvent.click(screen.getByText('Checkout'));
            
            // Items should still be visible in background
            expect(screen.getByText('Test Product 1')).toBeInTheDocument();
            expect(screen.getByText('Test Product 2')).toBeInTheDocument();
        });

        it('handles rapid checkout button clicks', () => {
            renderWithCartContext();
            
            const checkoutButton = screen.getByText('Checkout');
            fireEvent.click(checkoutButton);
            fireEvent.click(checkoutButton);
            fireEvent.click(checkoutButton);
            
            // Should only have one modal open
            expect(screen.getAllByTestId('checkout-modal')).toHaveLength(1);
        });

        it('handles rapid confirm clicks', () => {
            renderWithCartContext();
            
            fireEvent.click(screen.getByText('Checkout'));
            const confirmButton = screen.getByTestId('confirm-checkout');
            
            fireEvent.click(confirmButton);
            fireEvent.click(confirmButton);
            
            // clearCart should only be called once
            expect(mockCartContext.clearCart).toHaveBeenCalledTimes(1);
        });
    });
});
