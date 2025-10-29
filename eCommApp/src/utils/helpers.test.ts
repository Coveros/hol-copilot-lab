import { describe, it, expect } from 'vitest'
import { formatPrice, calculateTotal, validateEmail } from './helpers'

describe('formatPrice', () => {
  it('should format positive numbers as USD currency', () => {
    expect(formatPrice(29.99)).toBe('$29.99')
    expect(formatPrice(100)).toBe('$100.00')
    expect(formatPrice(1234.56)).toBe('$1,234.56')
  })

  it('should format zero as currency', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })

  it('should format small decimal amounts correctly', () => {
    expect(formatPrice(0.01)).toBe('$0.01')
    expect(formatPrice(0.99)).toBe('$0.99')
  })

  it('should format large numbers correctly', () => {
    expect(formatPrice(1000000)).toBe('$1,000,000.00')
    expect(formatPrice(999999.99)).toBe('$999,999.99')
  })

  it('should round to two decimal places', () => {
    expect(formatPrice(29.999)).toBe('$30.00')
    expect(formatPrice(29.994)).toBe('$29.99')
  })

  it('should handle negative numbers', () => {
    expect(formatPrice(-10.50)).toBe('-$10.50')
  })
})

describe('calculateTotal', () => {
  it('should calculate total for single item', () => {
    const items = [{ price: 10.00, quantity: 2 }]
    expect(calculateTotal(items)).toBe(20.00)
  })

  it('should calculate total for multiple items', () => {
    const items = [
      { price: 10.00, quantity: 2 },
      { price: 5.50, quantity: 3 },
      { price: 15.75, quantity: 1 }
    ]
    expect(calculateTotal(items)).toBe(52.25)
  })

  it('should return 0 for empty cart', () => {
    expect(calculateTotal([])).toBe(0)
  })

  it('should handle zero quantity', () => {
    const items = [{ price: 10.00, quantity: 0 }]
    expect(calculateTotal(items)).toBe(0)
  })

  it('should handle zero price', () => {
    const items = [{ price: 0, quantity: 5 }]
    expect(calculateTotal(items)).toBe(0)
  })

  it('should handle decimal quantities', () => {
    const items = [{ price: 10.00, quantity: 2.5 }]
    expect(calculateTotal(items)).toBe(25.00)
  })

  it('should handle large quantities', () => {
    const items = [{ price: 1.00, quantity: 1000 }]
    expect(calculateTotal(items)).toBe(1000.00)
  })

  it('should handle decimal prices correctly', () => {
    const items = [
      { price: 10.99, quantity: 3 },
      { price: 5.49, quantity: 2 }
    ]
    expect(calculateTotal(items)).toBeCloseTo(43.95, 2)
  })

  it('should handle negative prices', () => {
    const items = [{ price: -10.00, quantity: 2 }]
    expect(calculateTotal(items)).toBe(-20.00)
  })

  it('should handle negative quantities', () => {
    const items = [{ price: 10.00, quantity: -2 }]
    expect(calculateTotal(items)).toBe(-20.00)
  })
})

describe('validateEmail', () => {
  it('should validate correct email addresses', () => {
    expect(validateEmail('user@example.com')).toBe(true)
    expect(validateEmail('test.user@example.com')).toBe(true)
    expect(validateEmail('user+tag@example.co.uk')).toBe(true)
    expect(validateEmail('user_name@example-domain.com')).toBe(true)
  })

  it('should reject emails without @ symbol', () => {
    expect(validateEmail('userexample.com')).toBe(false)
    expect(validateEmail('user.example.com')).toBe(false)
  })

  it('should reject emails without domain', () => {
    expect(validateEmail('user@')).toBe(false)
    expect(validateEmail('user@.')).toBe(false)
  })

  it('should reject emails without username', () => {
    expect(validateEmail('@example.com')).toBe(false)
  })

  it('should reject emails without TLD', () => {
    expect(validateEmail('user@example')).toBe(false)
  })

  it('should reject emails with spaces', () => {
    expect(validateEmail('user @example.com')).toBe(false)
    expect(validateEmail('user@ example.com')).toBe(false)
    expect(validateEmail('user@example .com')).toBe(false)
  })

  it('should reject empty string', () => {
    expect(validateEmail('')).toBe(false)
  })

  it('should reject emails with multiple @ symbols', () => {
    expect(validateEmail('user@@example.com')).toBe(false)
    expect(validateEmail('user@name@example.com')).toBe(false)
  })

  it('should handle various email formats', () => {
    // The current regex is basic and allows some edge cases
    expect(validateEmail('user@example.com')).toBe(true)
    expect(validateEmail('user@test.co.uk')).toBe(true)
  })

  it('should handle edge case emails', () => {
    expect(validateEmail('a@b.c')).toBe(true)
    expect(validateEmail('1234567890@example.com')).toBe(true)
  })
})
