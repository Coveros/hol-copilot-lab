import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '../test/test-utils'
import ReviewModal from './ReviewModal'
import { Product } from '../types'

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  price: 29.99,
  description: 'Test Description',
  image: 'test.jpg',
  inStock: true,
  reviews: [
    { author: 'John Doe', comment: 'Great product!', date: '2025-01-01T00:00:00.000Z' },
    { author: 'Jane Smith', comment: 'Love it!', date: '2025-01-02T00:00:00.000Z' }
  ]
}

const mockProductNoReviews: Product = {
  ...mockProduct,
  reviews: []
}

describe('ReviewModal', () => {
  it('should not render when product is null', () => {
    const { container } = render(
      <ReviewModal product={null} onClose={vi.fn()} onSubmit={vi.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('should render modal when product is provided', () => {
    render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={vi.fn()} />
    )
    expect(screen.getByText('Reviews for Test Product')).toBeInTheDocument()
  })

  it('should display existing reviews', () => {
    render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={vi.fn()} />
    )
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Great product!')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Love it!')).toBeInTheDocument()
  })

  it('should display "No reviews yet" when there are no reviews', () => {
    render(
      <ReviewModal product={mockProductNoReviews} onClose={vi.fn()} onSubmit={vi.fn()} />
    )
    expect(screen.getByText('No reviews yet.')).toBeInTheDocument()
  })

  it('should render review form', () => {
    render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={vi.fn()} />
    )
    expect(screen.getByText('Leave a Review')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your review')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('should render close button', () => {
    render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={vi.fn()} />
    )
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    const mockOnClose = vi.fn()
    render(
      <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={vi.fn()} />
    )
    
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when backdrop is clicked', () => {
    const mockOnClose = vi.fn()
    const { container } = render(
      <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={vi.fn()} />
    )
    
    const backdrop = container.querySelector('.modal-backdrop')
    fireEvent.click(backdrop!)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should not call onClose when modal content is clicked', () => {
    const mockOnClose = vi.fn()
    const { container } = render(
      <ReviewModal product={mockProduct} onClose={mockOnClose} onSubmit={vi.fn()} />
    )
    
    const modalContent = container.querySelector('.modal-content')
    fireEvent.click(modalContent!)
    
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('should submit review with author and comment', () => {
    const mockOnSubmit = vi.fn()
    render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={mockOnSubmit} />
    )
    
    fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByPlaceholderText('Your review'), { target: { value: 'Test Review' } })
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    const submittedReview = mockOnSubmit.mock.calls[0][0]
    expect(submittedReview.author).toBe('Test User')
    expect(submittedReview.comment).toBe('Test Review')
    expect(submittedReview.date).toBeDefined()
  })

  it('should include current date in submitted review', () => {
    const mockOnSubmit = vi.fn()
    render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={mockOnSubmit} />
    )
    
    fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByPlaceholderText('Your review'), { target: { value: 'Test Review' } })
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    
    const submittedReview = mockOnSubmit.mock.calls[0][0]
    expect(submittedReview.date).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  it('should reset form after submission', () => {
    const mockOnSubmit = vi.fn()
    render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={mockOnSubmit} />
    )
    
    const nameInput = screen.getByPlaceholderText('Your name') as HTMLInputElement
    const reviewInput = screen.getByPlaceholderText('Your review') as HTMLTextAreaElement
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(reviewInput, { target: { value: 'Test Review' } })
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    
    expect(nameInput.value).toBe('')
    expect(reviewInput.value).toBe('')
  })

  it('should format review dates correctly', () => {
    render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={vi.fn()} />
    )
    
    // Dates should be formatted with toLocaleDateString
    expect(screen.getByText(/1\/1\/2025|2025\/1\/1|01\/01\/2025/)).toBeInTheDocument()
  })

  it('should have required fields in form', () => {
    render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={vi.fn()} />
    )
    
    const nameInput = screen.getByPlaceholderText('Your name')
    const reviewInput = screen.getByPlaceholderText('Your review')
    
    expect(nameInput).toHaveAttribute('required')
    expect(reviewInput).toHaveAttribute('required')
  })

  it('should prevent default form submission', () => {
    const mockOnSubmit = vi.fn()
    render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={mockOnSubmit} />
    )
    
    const form = screen.getByPlaceholderText('Your name').closest('form')!
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    form.dispatchEvent(submitEvent)
    
    expect(submitEvent.defaultPrevented).toBe(true)
  })

  it('should have modal backdrop class', () => {
    const { container } = render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={vi.fn()} />
    )
    expect(container.querySelector('.modal-backdrop')).toBeInTheDocument()
  })

  it('should have modal content class', () => {
    const { container } = render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={vi.fn()} />
    )
    expect(container.querySelector('.modal-content')).toBeInTheDocument()
  })

  it('should have reviews list class', () => {
    const { container } = render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={vi.fn()} />
    )
    expect(container.querySelector('.reviews-list')).toBeInTheDocument()
  })

  it('should have review form class', () => {
    const { container } = render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={vi.fn()} />
    )
    expect(container.querySelector('.review-form')).toBeInTheDocument()
  })

  it('should have close button class', () => {
    render(
      <ReviewModal product={mockProduct} onClose={vi.fn()} onSubmit={vi.fn()} />
    )
    const closeButton = screen.getByRole('button', { name: 'Close' })
    expect(closeButton).toHaveClass('close-button')
  })
})
