import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '../test/test-utils'
import CheckoutModal from './CheckoutModal'

describe('CheckoutModal', () => {
  it('should render the modal with confirmation text', () => {
    const mockOnConfirm = vi.fn()
    const mockOnCancel = vi.fn()
    
    render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />)
    
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    expect(screen.getByText('Do you want to proceed with the checkout?')).toBeInTheDocument()
  })

  it('should render continue checkout button', () => {
    const mockOnConfirm = vi.fn()
    const mockOnCancel = vi.fn()
    
    render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />)
    
    expect(screen.getByText('Continue Checkout')).toBeInTheDocument()
  })

  it('should render return to cart button', () => {
    const mockOnConfirm = vi.fn()
    const mockOnCancel = vi.fn()
    
    render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />)
    
    expect(screen.getByText('Return to cart')).toBeInTheDocument()
  })

  it('should call onConfirm when continue checkout button is clicked', () => {
    const mockOnConfirm = vi.fn()
    const mockOnCancel = vi.fn()
    
    render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />)
    
    fireEvent.click(screen.getByText('Continue Checkout'))
    
    expect(mockOnConfirm).toHaveBeenCalledTimes(1)
  })

  it('should call onCancel when return to cart button is clicked', () => {
    const mockOnConfirm = vi.fn()
    const mockOnCancel = vi.fn()
    
    render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />)
    
    fireEvent.click(screen.getByText('Return to cart'))
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1)
  })

  it('should not call onCancel when continue button is clicked', () => {
    const mockOnConfirm = vi.fn()
    const mockOnCancel = vi.fn()
    
    render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />)
    
    fireEvent.click(screen.getByText('Continue Checkout'))
    
    expect(mockOnCancel).not.toHaveBeenCalled()
  })

  it('should not call onConfirm when cancel button is clicked', () => {
    const mockOnConfirm = vi.fn()
    const mockOnCancel = vi.fn()
    
    render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />)
    
    fireEvent.click(screen.getByText('Return to cart'))
    
    expect(mockOnConfirm).not.toHaveBeenCalled()
  })

  it('should have modal backdrop', () => {
    const mockOnConfirm = vi.fn()
    const mockOnCancel = vi.fn()
    
    const { container } = render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />)
    
    expect(container.querySelector('.modal-backdrop')).toBeInTheDocument()
  })

  it('should have modal content', () => {
    const mockOnConfirm = vi.fn()
    const mockOnCancel = vi.fn()
    
    const { container } = render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />)
    
    expect(container.querySelector('.modal-content')).toBeInTheDocument()
  })

  it('should have checkout modal actions container', () => {
    const mockOnConfirm = vi.fn()
    const mockOnCancel = vi.fn()
    
    const { container } = render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />)
    
    expect(container.querySelector('.checkout-modal-actions')).toBeInTheDocument()
  })

  it('should have cancel button with correct class', () => {
    const mockOnConfirm = vi.fn()
    const mockOnCancel = vi.fn()
    
    render(<CheckoutModal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />)
    
    const cancelButton = screen.getByText('Return to cart')
    expect(cancelButton).toHaveClass('cancel-btn')
  })
})
