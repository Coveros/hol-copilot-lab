import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartProvider, CartContext } from './CartContext';
import { Product } from '../types';
import { useContext } from 'react';

const mockProduct1: Product = {
    id: '1',
    name: 'Apple',
    price: 1.99,
    image: 'apple.jpg',
    reviews: [],
    inStock: true
};

const mockProduct2: Product = {
    id: '2',
    name: 'Orange',
    price: 2.49,
    image: 'orange.jpg',
    reviews: [],
    inStock: true
};

describe('CartContext', () => {
    describe('CartProvider', () => {
        it('provides initial empty cart', () => {
            const { result } = renderHook(() => useContext(CartContext), {
                wrapper: CartProvider
            });

            expect(result.current?.cartItems).toEqual([]);
        });

        it('adds new product to cart', () => {
            const { result } = renderHook(() => useContext(CartContext), {
                wrapper: CartProvider
            });

            act(() => {
                result.current?.addToCart(mockProduct1);
            });

            expect(result.current?.cartItems).toHaveLength(1);
            expect(result.current?.cartItems[0]).toEqual({
                ...mockProduct1,
                quantity: 1
            });
        });

        it('increments quantity when adding existing product', () => {
            const { result } = renderHook(() => useContext(CartContext), {
                wrapper: CartProvider
            });

            act(() => {
                result.current?.addToCart(mockProduct1);
                result.current?.addToCart(mockProduct1);
            });

            expect(result.current?.cartItems).toHaveLength(1);
            expect(result.current?.cartItems[0].quantity).toBe(2);
        });

        it('adds multiple different products to cart', () => {
            const { result } = renderHook(() => useContext(CartContext), {
                wrapper: CartProvider
            });

            act(() => {
                result.current?.addToCart(mockProduct1);
                result.current?.addToCart(mockProduct2);
            });

            expect(result.current?.cartItems).toHaveLength(2);
            expect(result.current?.cartItems[0].id).toBe('1');
            expect(result.current?.cartItems[1].id).toBe('2');
        });

        it('clears all items from cart', () => {
            const { result } = renderHook(() => useContext(CartContext), {
                wrapper: CartProvider
            });

            act(() => {
                result.current?.addToCart(mockProduct1);
                result.current?.addToCart(mockProduct2);
            });

            expect(result.current?.cartItems).toHaveLength(2);

            act(() => {
                result.current?.clearCart();
            });

            expect(result.current?.cartItems).toEqual([]);
        });

        it('handles clearing empty cart', () => {
            const { result } = renderHook(() => useContext(CartContext), {
                wrapper: CartProvider
            });

            act(() => {
                result.current?.clearCart();
            });

            expect(result.current?.cartItems).toEqual([]);
        });

        it('maintains product properties when adding to cart', () => {
            const productWithReviews: Product = {
                ...mockProduct1,
                reviews: [
                    { author: 'John', comment: 'Great!', date: '2024-01-01' }
                ]
            };

            const { result } = renderHook(() => useContext(CartContext), {
                wrapper: CartProvider
            });

            act(() => {
                result.current?.addToCart(productWithReviews);
            });

            expect(result.current?.cartItems[0].reviews).toEqual(productWithReviews.reviews);
            expect(result.current?.cartItems[0].name).toBe(productWithReviews.name);
            expect(result.current?.cartItems[0].price).toBe(productWithReviews.price);
        });

        it('handles adding same product multiple times separately', () => {
            const { result } = renderHook(() => useContext(CartContext), {
                wrapper: CartProvider
            });

            act(() => {
                result.current?.addToCart(mockProduct1);
            });
            expect(result.current?.cartItems[0].quantity).toBe(1);

            act(() => {
                result.current?.addToCart(mockProduct1);
            });
            expect(result.current?.cartItems[0].quantity).toBe(2);

            act(() => {
                result.current?.addToCart(mockProduct1);
            });
            expect(result.current?.cartItems[0].quantity).toBe(3);
        });

        it('preserves existing items when adding new product', () => {
            const { result } = renderHook(() => useContext(CartContext), {
                wrapper: CartProvider
            });

            act(() => {
                result.current?.addToCart(mockProduct1);
                result.current?.addToCart(mockProduct1);
            });

            expect(result.current?.cartItems[0].quantity).toBe(2);

            act(() => {
                result.current?.addToCart(mockProduct2);
            });

            expect(result.current?.cartItems).toHaveLength(2);
            expect(result.current?.cartItems[0].quantity).toBe(2);
            expect(result.current?.cartItems[1].quantity).toBe(1);
        });

        it('handles products with special characters in names', () => {
            const specialProduct: Product = {
                id: '3',
                name: 'Apple & Orange Mix (Special)',
                price: 5.99,
                image: 'mix.jpg',
                reviews: [],
                inStock: true
            };

            const { result } = renderHook(() => useContext(CartContext), {
                wrapper: CartProvider
            });

            act(() => {
                result.current?.addToCart(specialProduct);
            });

            expect(result.current?.cartItems[0].name).toBe('Apple & Orange Mix (Special)');
        });

        it('handles products with zero price', () => {
            const freeProduct: Product = {
                ...mockProduct1,
                price: 0
            };

            const { result } = renderHook(() => useContext(CartContext), {
                wrapper: CartProvider
            });

            act(() => {
                result.current?.addToCart(freeProduct);
            });

            expect(result.current?.cartItems[0].price).toBe(0);
            expect(result.current?.cartItems[0].quantity).toBe(1);
        });

        it('handles products with out of stock status', () => {
            const outOfStockProduct: Product = {
                ...mockProduct1,
                inStock: false
            };

            const { result } = renderHook(() => useContext(CartContext), {
                wrapper: CartProvider
            });

            act(() => {
                result.current?.addToCart(outOfStockProduct);
            });

            expect(result.current?.cartItems[0].inStock).toBe(false);
        });
    });

    describe('CartContext without Provider', () => {
        it('returns undefined when used outside provider', () => {
            const { result } = renderHook(() => useContext(CartContext));
            expect(result.current).toBeUndefined();
        });
    });
});
