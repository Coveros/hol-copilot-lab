import { describe, it, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '../test/test-utils'
import AdminPage from './AdminPage'

describe('AdminPage', () => {
  it('should render admin portal heading', () => {
    render(<AdminPage />)
    expect(screen.getByText('Welcome to the admin portal.')).toBeInTheDocument()
  })

  it('should render sale percent input label', () => {
    render(<AdminPage />)
    expect(screen.getByText(/Set Sale Percent/i)).toBeInTheDocument()
  })

  it('should render sale percent input with initial value', () => {
    render(<AdminPage />)
    const input = screen.getByLabelText(/Set Sale Percent/i) as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('0')
  })

  it('should render submit and end sale buttons', () => {
    render(<AdminPage />)
    expect(screen.getByText('Submit')).toBeInTheDocument()
    expect(screen.getByText('End Sale')).toBeInTheDocument()
  })

  it('should render back to storefront button', () => {
    render(<AdminPage />)
    expect(screen.getByText('Back to Storefront')).toBeInTheDocument()
  })

  it('should update input value when user types', () => {
    render(<AdminPage />)
    const input = screen.getByLabelText(/Set Sale Percent/i) as HTMLInputElement
    
    fireEvent.change(input, { target: { value: '25' } })
    
    expect(input.value).toBe('25')
  })

  it('should display "No sale active" initially', () => {
    render(<AdminPage />)
    expect(screen.getByText('No sale active.')).toBeInTheDocument()
  })

  it('should display sale message when valid percentage is submitted', () => {
    render(<AdminPage />)
    const input = screen.getByLabelText(/Set Sale Percent/i)
    const submitButton = screen.getByText('Submit')
    
    fireEvent.change(input, { target: { value: '25' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('All products are 25% off!')).toBeInTheDocument()
  })

  it('should reset sale when end sale button is clicked', () => {
    render(<AdminPage />)
    const input = screen.getByLabelText(/Set Sale Percent/i) as HTMLInputElement
    const submitButton = screen.getByText('Submit')
    const endSaleButton = screen.getByText('End Sale')
    
    fireEvent.change(input, { target: { value: '25' } })
    fireEvent.click(submitButton)
    fireEvent.click(endSaleButton)
    
    expect(screen.getByText('No sale active.')).toBeInTheDocument()
    expect(input.value).toBe('0')
  })

  it('should show error message for invalid input', () => {
    render(<AdminPage />)
    const input = screen.getByLabelText(/Set Sale Percent/i)
    const submitButton = screen.getByText('Submit')
    
    fireEvent.change(input, { target: { value: 'abc' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Invalid input/i)).toBeInTheDocument()
    expect(screen.getByText(/"abc"/i)).toBeInTheDocument()
  })

  it('should handle zero percent sale', () => {
    render(<AdminPage />)
    const input = screen.getByLabelText(/Set Sale Percent/i)
    const submitButton = screen.getByText('Submit')
    
    fireEvent.change(input, { target: { value: '0' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('No sale active.')).toBeInTheDocument()
  })

  it('should handle negative numbers', () => {
    render(<AdminPage />)
    const input = screen.getByLabelText(/Set Sale Percent/i)
    const submitButton = screen.getByText('Submit')
    
    fireEvent.change(input, { target: { value: '-10' } })
    fireEvent.click(submitButton)
    
    // -10 is less than or equal to 0, so no sale active
    expect(screen.getByText('No sale active.')).toBeInTheDocument()
  })

  it('should handle decimal values', () => {
    render(<AdminPage />)
    const input = screen.getByLabelText(/Set Sale Percent/i)
    const submitButton = screen.getByText('Submit')
    
    fireEvent.change(input, { target: { value: '12.5' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('All products are 12.5% off!')).toBeInTheDocument()
  })

  it('should handle very large numbers', () => {
    render(<AdminPage />)
    const input = screen.getByLabelText(/Set Sale Percent/i)
    const submitButton = screen.getByText('Submit')
    
    fireEvent.change(input, { target: { value: '999' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('All products are 999% off!')).toBeInTheDocument()
  })

  it('should render Header component', () => {
    render(<AdminPage />)
    expect(screen.getByText('The Daily Harvest')).toBeInTheDocument()
  })

  it('should render Footer component', () => {
    render(<AdminPage />)
    expect(screen.getByText(/© 2025 The Daily Harvest/i)).toBeInTheDocument()
  })

  it('should have link to home page', () => {
    render(<AdminPage />)
    const backButton = screen.getByText('Back to Storefront').closest('a')
    expect(backButton).toHaveAttribute('href', '/')
  })

  it('should not clear error message when valid input is submitted', () => {
    render(<AdminPage />)
    const input = screen.getByLabelText(/Set Sale Percent/i)
    const submitButton = screen.getByText('Submit')
    
    // First submit invalid input
    fireEvent.change(input, { target: { value: 'abc' } })
    fireEvent.click(submitButton)
    expect(screen.getByText(/Invalid input/i)).toBeInTheDocument()
    
    // Then submit valid input - error message persists
    fireEvent.change(input, { target: { value: '20' } })
    fireEvent.click(submitButton)
    // Error message is NOT cleared in the current implementation
    expect(screen.getByText(/Invalid input/i)).toBeInTheDocument()
  })

  it('should handle empty string input as zero', () => {
    render(<AdminPage />)
    const input = screen.getByLabelText(/Set Sale Percent/i)
    const submitButton = screen.getByText('Submit')
    
    fireEvent.change(input, { target: { value: '' } })
    fireEvent.click(submitButton)
    
    // Empty string converts to 0 via Number(), which is valid
    expect(screen.getByText('No sale active.')).toBeInTheDocument()
  })

  it('should handle whitespace input as zero', () => {
    render(<AdminPage />)
    const input = screen.getByLabelText(/Set Sale Percent/i)
    const submitButton = screen.getByText('Submit')
    
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(submitButton)
    
    // Whitespace converts to 0 via Number(), which is valid
    expect(screen.getByText('No sale active.')).toBeInTheDocument()
  })
})
