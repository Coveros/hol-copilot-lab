import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../test/test-utils'
import HomePage from './HomePage'

describe('HomePage', () => {
  it('should render the welcome message', () => {
    render(<HomePage />)
    expect(screen.getByText(/Welcome to the The Daily Harvest!/i)).toBeInTheDocument()
  })

  it('should render the call to action text', () => {
    render(<HomePage />)
    expect(screen.getByText(/Check out our products page for some great deals./i)).toBeInTheDocument()
  })

  it('should render Header component', () => {
    render(<HomePage />)
    expect(screen.getByText('The Daily Harvest')).toBeInTheDocument()
  })

  it('should render Footer component', () => {
    render(<HomePage />)
    expect(screen.getByText(/© 2025 The Daily Harvest. All rights reserved./i)).toBeInTheDocument()
  })

  it('should have main content area', () => {
    const { container } = render(<HomePage />)
    expect(container.querySelector('.main-content')).toBeInTheDocument()
  })

  it('should have app wrapper div', () => {
    const { container } = render(<HomePage />)
    expect(container.querySelector('.app')).toBeInTheDocument()
  })

  it('should have proper structure with header, main, and footer', () => {
    const { container } = render(<HomePage />)
    const app = container.querySelector('.app')
    expect(app?.querySelector('header')).toBeInTheDocument()
    expect(app?.querySelector('main')).toBeInTheDocument()
    expect(app?.querySelector('footer')).toBeInTheDocument()
  })
})
