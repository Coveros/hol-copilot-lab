import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor, fireEvent } from '@testing-library/react'
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

  it('should render category filter dropdown', async () => {
    mockFetch.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: async () => ({ ...mockProducts[0], category: 'fruits', inStock: true })
      } as Response)
    })
    
    render(<ProductsPage />)
    
    await waitFor(() => {
      expect(screen.getByLabelText(/filter by category/i)).toBeInTheDocument()
    })
    
    const dropdown = screen.getByRole('combobox', { name: /filter by category/i })
    expect(dropdown).toBeInTheDocument()
  })

  it('should display all products when "all" category is selected', async () => {
    const mockProductsWithCategories = [
      { id: '1', name: 'Apple', price: 2.99, category: 'fruits', inStock: true, reviews: [] },
      { id: '2', name: 'Grapes', price: 3.99, category: 'fruits', inStock: true, reviews: [] },
      { id: '3', name: 'Orange', price: 1.99, category: 'fruits', inStock: false, reviews: [] },
      { id: '4', name: 'Pear', price: 2.49, category: 'fruits', inStock: true, reviews: [] },
      { id: '5', name: 'Carrot', price: 0.99, category: 'vegetables', inStock: true, reviews: [] },
      { id: '6', name: 'Chips', price: 2.49, category: 'snacks', inStock: true, reviews: [] }
    ]
    
    let callCount = 0
    mockFetch.mockImplementation(() => {
      const product = mockProductsWithCategories[callCount % 6]
      callCount++
      return Promise.resolve({
        ok: true,
        json: async () => product
      } as Response)
    })
    
    render(<ProductsPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Grapes')).toBeInTheDocument()
    expect(screen.getByText('Carrot')).toBeInTheDocument()
  })

  it('should filter products by selected category', async () => {
    const mockProductsWithCategories = [
      { id: '1', name: 'Apple', price: 2.99, category: 'fruits', inStock: true, reviews: [] },
      { id: '2', name: 'Grapes', price: 3.99, category: 'fruits', inStock: true, reviews: [] },
      { id: '3', name: 'Orange', price: 1.99, category: 'fruits', inStock: false, reviews: [] },
      { id: '4', name: 'Pear', price: 2.49, category: 'fruits', inStock: true, reviews: [] },
      { id: '5', name: 'Carrot', price: 0.99, category: 'vegetables', inStock: true, reviews: [] },
      { id: '6', name: 'Chips', price: 2.49, category: 'snacks', inStock: true, reviews: [] }
    ]
    
    let callCount = 0
    mockFetch.mockImplementation(() => {
      const product = mockProductsWithCategories[callCount % 6]
      callCount++
      return Promise.resolve({
        ok: true,
        json: async () => product
      } as Response)
    })
    
    render(<ProductsPage />)
    
    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })
    
    // Initially all products should be visible
    expect(screen.getByText('Carrot')).toBeInTheDocument()
    expect(screen.getByText('Chips')).toBeInTheDocument()
    
    // Find the category dropdown
    const dropdown = screen.getByRole('combobox', { name: /filter by category/i })
    expect(dropdown).toBeInTheDocument()
    
    // Change to 'fruits' category
    fireEvent.change(dropdown, { target: { value: 'fruits' } })
    
    // Wait for filtering to take effect
    await waitFor(() => {
      expect(screen.queryByText('Carrot')).not.toBeInTheDocument()
    })
    
    // Fruits should still be visible, vegetables and snacks should not
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Grapes')).toBeInTheDocument()
    expect(screen.queryByText('Chips')).not.toBeInTheDocument()
  })
})
