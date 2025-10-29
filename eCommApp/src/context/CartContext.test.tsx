import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, CartContext } from './CartContext'
import { useContext } from 'react'
import { Product } from '../types'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  price: 29.99,
  description: 'A test product',
  image: 'test.jpg',
  inStock: true,
  reviews: []
}

const mockProduct2: Product = {
  id: '2',
  name: 'Another Product',
  price: 19.99,
  description: 'Another test product',
  image: 'test2.jpg',
  inStock: true,
  reviews: []
}

describe('CartContext', () => {
  describe('Initial State', () => {
    it('should start with an empty cart', () => {
      const { result } = renderHook(() => useContext(CartContext), { wrapper })
      expect(result.current?.cartItems).toEqual([])
    })
  })

  describe('addToCart', () => {
    it('should add a new product to cart with quantity 1', () => {
      const { result } = renderHook(() => useContext(CartContext), { wrapper })
      
      act(() => {
        result.current?.addToCart(mockProduct)
      })

      expect(result.current?.cartItems).toHaveLength(1)
      expect(result.current?.cartItems[0]).toEqual({ ...mockProduct, quantity: 1 })
    })

    it('should increment quantity when adding existing product', () => {
      const { result } = renderHook(() => useContext(CartContext), { wrapper })
      
      act(() => {
        result.current?.addToCart(mockProduct)
        result.current?.addToCart(mockProduct)
      })

      expect(result.current?.cartItems).toHaveLength(1)
      expect(result.current?.cartItems[0].quantity).toBe(2)
    })

    it('should add multiple different products to cart', () => {
      const { result } = renderHook(() => useContext(CartContext), { wrapper })
      
      act(() => {
        result.current?.addToCart(mockProduct)
        result.current?.addToCart(mockProduct2)
      })

      expect(result.current?.cartItems).toHaveLength(2)
      expect(result.current?.cartItems[0].id).toBe('1')
      expect(result.current?.cartItems[1].id).toBe('2')
    })

    it('should increment quantity multiple times for same product', () => {
      const { result } = renderHook(() => useContext(CartContext), { wrapper })
      
      act(() => {
        result.current?.addToCart(mockProduct)
        result.current?.addToCart(mockProduct)
        result.current?.addToCart(mockProduct)
      })

      expect(result.current?.cartItems[0].quantity).toBe(3)
    })

    it('should preserve product properties when adding to cart', () => {
      const { result } = renderHook(() => useContext(CartContext), { wrapper })
      
      act(() => {
        result.current?.addToCart(mockProduct)
      })

      const cartItem = result.current?.cartItems[0]
      expect(cartItem?.name).toBe(mockProduct.name)
      expect(cartItem?.price).toBe(mockProduct.price)
      expect(cartItem?.description).toBe(mockProduct.description)
      expect(cartItem?.image).toBe(mockProduct.image)
      expect(cartItem?.inStock).toBe(mockProduct.inStock)
    })

    it('should handle adding products with same id but different properties', () => {
      const { result } = renderHook(() => useContext(CartContext), { wrapper })
      const modifiedProduct = { ...mockProduct, name: 'Modified Name' }
      
      act(() => {
        result.current?.addToCart(mockProduct)
        result.current?.addToCart(modifiedProduct)
      })

      // Should increment quantity, not add as new item
      expect(result.current?.cartItems).toHaveLength(1)
      expect(result.current?.cartItems[0].quantity).toBe(2)
    })
  })

  describe('clearCart', () => {
    it('should empty the cart', () => {
      const { result } = renderHook(() => useContext(CartContext), { wrapper })
      
      act(() => {
        result.current?.addToCart(mockProduct)
        result.current?.addToCart(mockProduct2)
      })

      expect(result.current?.cartItems).toHaveLength(2)

      act(() => {
        result.current?.clearCart()
      })

      expect(result.current?.cartItems).toEqual([])
    })

    it('should handle clearing an already empty cart', () => {
      const { result } = renderHook(() => useContext(CartContext), { wrapper })
      
      act(() => {
        result.current?.clearCart()
      })

      expect(result.current?.cartItems).toEqual([])
    })

    it('should allow adding items after clearing', () => {
      const { result } = renderHook(() => useContext(CartContext), { wrapper })
      
      act(() => {
        result.current?.addToCart(mockProduct)
        result.current?.clearCart()
        result.current?.addToCart(mockProduct2)
      })

      expect(result.current?.cartItems).toHaveLength(1)
      expect(result.current?.cartItems[0].id).toBe('2')
    })
  })

  describe('Cart State Management', () => {
    it('should maintain correct state after multiple operations', () => {
      const { result } = renderHook(() => useContext(CartContext), { wrapper })
      
      act(() => {
        result.current?.addToCart(mockProduct)
        result.current?.addToCart(mockProduct)
        result.current?.addToCart(mockProduct2)
        result.current?.clearCart()
        result.current?.addToCart(mockProduct)
      })

      expect(result.current?.cartItems).toHaveLength(1)
      expect(result.current?.cartItems[0].id).toBe('1')
      expect(result.current?.cartItems[0].quantity).toBe(1)
    })

    it('should handle rapid sequential additions', () => {
      const { result } = renderHook(() => useContext(CartContext), { wrapper })
      
      act(() => {
        for (let i = 0; i < 10; i++) {
          result.current?.addToCart(mockProduct)
        }
      })

      expect(result.current?.cartItems[0].quantity).toBe(10)
    })
  })

  describe('Context Provider', () => {
    it('should provide all required context values', () => {
      const { result } = renderHook(() => useContext(CartContext), { wrapper })
      
      expect(result.current).toHaveProperty('cartItems')
      expect(result.current).toHaveProperty('addToCart')
      expect(result.current).toHaveProperty('clearCart')
    })

    it('should have functions that are callable', () => {
      const { result } = renderHook(() => useContext(CartContext), { wrapper })
      
      expect(typeof result.current?.addToCart).toBe('function')
      expect(typeof result.current?.clearCart).toBe('function')
    })
  })
})
