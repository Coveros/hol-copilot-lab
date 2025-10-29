import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../test/test-utils'
import Footer from './Footer'

describe('Footer', () => {
  it('should render the footer element', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('should render copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2025 The Daily Harvest. All rights reserved./i)).toBeInTheDocument()
  })

  it('should have correct CSS class', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('.app-footer')).toBeInTheDocument()
  })

  it('should contain a paragraph element', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer?.querySelector('p')).toBeInTheDocument()
  })
})
