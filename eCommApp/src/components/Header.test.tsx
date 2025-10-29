import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../test/test-utils'
import Header from './Header'

describe('Header', () => {
  it('should render the application title', () => {
    render(<Header />)
    expect(screen.getByText('The Daily Harvest')).toBeInTheDocument()
  })

  it('should render all navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Cart')).toBeInTheDocument()
  })

  it('should render admin login button', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: 'Admin Login' })).toBeInTheDocument()
  })

  it('should have correct links to pages', () => {
    render(<Header />)
    const homeLink = screen.getByText('Home').closest('a')
    const productsLink = screen.getByText('Products').closest('a')
    const cartLink = screen.getByText('Cart').closest('a')
    const loginLink = screen.getByText('Admin Login').closest('a')

    expect(homeLink).toHaveAttribute('href', '/')
    expect(productsLink).toHaveAttribute('href', '/products')
    expect(cartLink).toHaveAttribute('href', '/cart')
    expect(loginLink).toHaveAttribute('href', '/login')
  })

  it('should render nav element', () => {
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should render header element', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('should have correct CSS class', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('.app-header')).toBeInTheDocument()
  })
})
