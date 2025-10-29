import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { render } from '../test/test-utils'
import LoginPage from './LoginPage'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('LoginPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('should render login form', () => {
    render(<LoginPage />)
    expect(screen.getByRole('heading', { name: 'Admin Login' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  it('should render Header and Footer', () => {
    render(<LoginPage />)
    expect(screen.getByText('The Daily Harvest')).toBeInTheDocument()
    expect(screen.getByText(/© 2025 The Daily Harvest/i)).toBeInTheDocument()
  })

  it('should update username field when typing', () => {
    render(<LoginPage />)
    const usernameInput = screen.getByPlaceholderText('Username') as HTMLInputElement
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    
    expect(usernameInput.value).toBe('testuser')
  })

  it('should update password field when typing', () => {
    render(<LoginPage />)
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement
    
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    
    expect(passwordInput.value).toBe('testpass')
  })

  it('should navigate to admin page on successful login', async () => {
    render(<LoginPage />)
    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginButton = screen.getByRole('button', { name: 'Login' })
    
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: 'admin' } })
    fireEvent.click(loginButton)
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin')
    })
  })

  it('should clear form fields on successful login', async () => {
    render(<LoginPage />)
    const usernameInput = screen.getByPlaceholderText('Username') as HTMLInputElement
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement
    const loginButton = screen.getByRole('button', { name: 'Login' })
    
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: 'admin' } })
    fireEvent.click(loginButton)
    
    await waitFor(() => {
      expect(usernameInput.value).toBe('')
      expect(passwordInput.value).toBe('')
    })
  })

  it('should show error message on invalid credentials', () => {
    render(<LoginPage />)
    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginButton = screen.getByRole('button', { name: 'Login' })
    
    fireEvent.change(usernameInput, { target: { value: 'wrong' } })
    fireEvent.change(passwordInput, { target: { value: 'wrong' } })
    fireEvent.click(loginButton)
    
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
  })

  it('should show error for wrong username but correct password', () => {
    render(<LoginPage />)
    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginButton = screen.getByRole('button', { name: 'Login' })
    
    fireEvent.change(usernameInput, { target: { value: 'wrong' } })
    fireEvent.change(passwordInput, { target: { value: 'admin' } })
    fireEvent.click(loginButton)
    
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
  })

  it('should show error for correct username but wrong password', () => {
    render(<LoginPage />)
    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginButton = screen.getByRole('button', { name: 'Login' })
    
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: 'wrong' } })
    fireEvent.click(loginButton)
    
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
  })

  it('should not show error message initially', () => {
    render(<LoginPage />)
    expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument()
  })

  it('should clear error message on successful login', async () => {
    render(<LoginPage />)
    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginButton = screen.getByRole('button', { name: 'Login' })
    
    // First fail
    fireEvent.change(usernameInput, { target: { value: 'wrong' } })
    fireEvent.change(passwordInput, { target: { value: 'wrong' } })
    fireEvent.click(loginButton)
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    
    // Then succeed
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: 'admin' } })
    fireEvent.click(loginButton)
    
    await waitFor(() => {
      expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument()
    })
  })

  it('should handle empty credentials', () => {
    render(<LoginPage />)
    const loginButton = screen.getByRole('button', { name: 'Login' })
    
    fireEvent.click(loginButton)
    
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
  })

  it('should have password field with type password', () => {
    render(<LoginPage />)
    const passwordInput = screen.getByPlaceholderText('Password')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should submit form on enter key', async () => {
    render(<LoginPage />)
    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: 'admin' } })
    fireEvent.submit(passwordInput.closest('form')!)
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin')
    })
  })

  it('should have login container with correct class', () => {
    const { container } = render(<LoginPage />)
    expect(container.querySelector('.login-container')).toBeInTheDocument()
  })
})
