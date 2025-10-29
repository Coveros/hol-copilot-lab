import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Global test setup for all tests

// Cleanup after each test
afterEach(() => {
  cleanup()
})