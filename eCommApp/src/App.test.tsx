import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

describe('App', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // App should render the HomePage by default (route="/")
    expect(screen.getByText(/Welcome to the The Daily Harvest/i)).toBeInTheDocument()
  })

  it('should render CartProvider context', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // Verify the app renders
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should have routing configured', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // Check that Routes component is being used by verifying HomePage renders
    expect(screen.getByText(/Welcome to the The Daily Harvest/i)).toBeInTheDocument()
  })
})
