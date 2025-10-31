import { describe, it, expect } from 'vitest';
import { formatPrice, calculateTotal, validateEmail } from './helpers';

describe('helpers', () => {
    describe('formatPrice', () => {
        it('formats price correctly with two decimal places', () => {
            expect(formatPrice(29.99)).toBe('$29.99');
            expect(formatPrice(100)).toBe('$100.00');
            expect(formatPrice(0.99)).toBe('$0.99');
        });

        it('handles zero price', () => {
            expect(formatPrice(0)).toBe('$0.00');
        });

        it('handles large prices', () => {
            expect(formatPrice(9999.99)).toBe('$9,999.99');
            expect(formatPrice(1000000)).toBe('$1,000,000.00');
        });

        it('handles decimal precision correctly', () => {
            expect(formatPrice(10.5)).toBe('$10.50');
            expect(formatPrice(10.005)).toBe('$10.01');
            expect(formatPrice(10.004)).toBe('$10.00');
        });

        it('handles negative prices', () => {
            expect(formatPrice(-10.99)).toBe('-$10.99');
        });

        it('handles very small prices', () => {
            expect(formatPrice(0.01)).toBe('$0.01');
            expect(formatPrice(0.001)).toBe('$0.00');
        });
    });

    describe('calculateTotal', () => {
        it('calculates total for single item', () => {
            const items = [{ price: 10.99, quantity: 1 }];
            expect(calculateTotal(items)).toBe(10.99);
        });

        it('calculates total for multiple items', () => {
            const items = [
                { price: 10.99, quantity: 2 },
                { price: 5.50, quantity: 3 }
            ];
            expect(calculateTotal(items)).toBeCloseTo(38.48, 2);
        });

        it('handles empty array', () => {
            expect(calculateTotal([])).toBe(0);
        });

        it('handles items with zero quantity', () => {
            const items = [
                { price: 10.99, quantity: 0 },
                { price: 5.50, quantity: 1 }
            ];
            expect(calculateTotal(items)).toBe(5.50);
        });

        it('handles items with zero price', () => {
            const items = [
                { price: 0, quantity: 5 },
                { price: 10, quantity: 2 }
            ];
            expect(calculateTotal(items)).toBe(20);
        });

        it('calculates total for large quantities', () => {
            const items = [{ price: 1.99, quantity: 100 }];
            expect(calculateTotal(items)).toBeCloseTo(199);
        });

        it('handles decimal quantities correctly', () => {
            const items = [{ price: 10, quantity: 2.5 }];
            expect(calculateTotal(items)).toBe(25);
        });

        it('handles negative quantities', () => {
            const items = [{ price: 10, quantity: -1 }];
            expect(calculateTotal(items)).toBe(-10);
        });

        it('handles complex scenarios with multiple items and quantities', () => {
            const items = [
                { price: 29.99, quantity: 2 },
                { price: 49.99, quantity: 1 },
                { price: 9.99, quantity: 5 },
                { price: 19.99, quantity: 3 }
            ];
            const expectedTotal = (29.99 * 2) + (49.99 * 1) + (9.99 * 5) + (19.99 * 3);
            expect(calculateTotal(items)).toBeCloseTo(expectedTotal, 2);
        });
    });

    describe('validateEmail', () => {
        it('validates correct email addresses', () => {
            expect(validateEmail('test@example.com')).toBe(true);
            expect(validateEmail('user.name@domain.com')).toBe(true);
            expect(validateEmail('user+tag@example.co.uk')).toBe(true);
            expect(validateEmail('user_name@example.com')).toBe(true);
            expect(validateEmail('user123@test-domain.com')).toBe(true);
        });

        it('rejects invalid email addresses', () => {
            expect(validateEmail('invalid')).toBe(false);
            expect(validateEmail('invalid@')).toBe(false);
            expect(validateEmail('@example.com')).toBe(false);
            expect(validateEmail('invalid@.com')).toBe(false);
            expect(validateEmail('invalid@domain')).toBe(false);
            expect(validateEmail('invalid @example.com')).toBe(false);
            expect(validateEmail('invalid@exam ple.com')).toBe(false);
        });

        it('rejects empty string', () => {
            expect(validateEmail('')).toBe(false);
        });

        it('rejects email without @', () => {
            expect(validateEmail('invalid.example.com')).toBe(false);
        });

        it('rejects email without domain extension', () => {
            expect(validateEmail('test@domain')).toBe(false);
        });

        it('rejects email with multiple @ symbols', () => {
            expect(validateEmail('test@@example.com')).toBe(false);
        });

        it('handles edge cases', () => {
            expect(validateEmail('a@b.c')).toBe(true);
            expect(validateEmail('test@subdomain.example.com')).toBe(true);
        });
    });
});
