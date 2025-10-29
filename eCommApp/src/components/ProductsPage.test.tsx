import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { render } from '../test/test-utils'
import ProductsPage from './ProductsPage'

// Mock fetch globally
const mockFetch = vi.fn()
globalThis.fetch = mockFetch

const mockProducts = [
  {
    id: 1,
    name: 'Apple',
    description: 'Fresh apples',
    price: 2.99,
    image: '/products/productImages/apple.jpg',
    stock: 50,
    reviews: []
  },
  {
    id: 2,
    name: 'Grapes',
    description: 'Sweet grapes',
    price: 3.99,
    image: '/products/productImages/grapes.jpg',
    stock: 0,
    reviews: []
  }
]

describe('ProductsPage', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('should show loading state initially', () => {
    // Mock fetch to never resolve to keep loading state
    mockFetch.mockImplementation(() => new Promise(() => {}))
    
    render(<ProductsPage />)
    
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('should render Header and Footer', async () => {
    mockFetch.mockImplementation((url) => {
      return Promise.resolve({
        ok: true,
        json: async () => mockProducts[0]
      } as Response)
    })
    
    render(<ProductsPage />)
    
    expect(screen.getByText('The Daily Harvest')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText(/© 2025 The Daily Harvest/i)).toBeInTheDocument()
    })
  })

  it('should load and display products', async () => {
    mockFetch.mockImplementation((url) => {
      const urlStr = url.toString()
      if (urlStr.includes('apple.json')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockProducts[0]
        } as Response)
      }
      if (urlStr.includes('grapes.json')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockProducts[1]
        } as Response)
      }
      return Promise.resolve({
        ok: true,
        json: async () => ({ id: 3, name: 'Test', price: 1, stock: 10, reviews: [] })
      } as Response)
    })
    
    render(<ProductsPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Grapes')).toBeInTheDocument()
  })

  it('should handle fetch errors gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    mockFetch.mockRejectedValue(new Error('Network error'))
    
    render(<ProductsPage />)
    
    await waitFor(() => {
      expect(screen.queryByText('Loading products...')).not.toBeInTheDocument()
    })
    
    expect(consoleErrorSpy).toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })

  it('should render "Our Products" heading after loading', async () => {
    mockFetch.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: async () => mockProducts[0]
      } as Response)
    })
    
    render(<ProductsPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Our Products')).toBeInTheDocument()
    })
  })
})
