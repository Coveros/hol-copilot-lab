import { render, screen, fireEvent } from '../test/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import AdminPage from './AdminPage';

describe('AdminPage', () => {
    beforeEach(() => {
        // Clear any state before each test
    });

    it('renders the admin page', () => {
        render(<AdminPage />);
        expect(screen.getByText('Welcome to the admin portal.')).toBeInTheDocument();
    });

    it('renders header and footer', () => {
        render(<AdminPage />);
        expect(screen.getByText('The Daily Harvest')).toBeInTheDocument();
        expect(screen.getByText('© 2025 The Daily Harvest. All rights reserved.')).toBeInTheDocument();
    });

    it('renders sale percent input label', () => {
        render(<AdminPage />);
        expect(screen.getByLabelText('Set Sale Percent (% off for all items):')).toBeInTheDocument();
    });

    it('renders sale percent input field', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input.type).toBe('text');
    });

    it('has initial value of 0 in input field', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):') as HTMLInputElement;
        expect(input.value).toBe('0');
    });

    it('renders Submit button', () => {
        render(<AdminPage />);
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('renders End Sale button', () => {
        render(<AdminPage />);
        expect(screen.getByRole('button', { name: 'End Sale' })).toBeInTheDocument();
    });

    it('renders Back to Storefront button', () => {
        render(<AdminPage />);
        expect(screen.getByRole('button', { name: 'Back to Storefront' })).toBeInTheDocument();
    });

    it('Back to Storefront button links to home', () => {
        render(<AdminPage />);
        const button = screen.getByRole('button', { name: 'Back to Storefront' });
        const link = button.closest('a');
        expect(link).toHaveAttribute('href', '/');
    });

    it('displays "No sale active" message initially', () => {
        render(<AdminPage />);
        expect(screen.getByText('No sale active.')).toBeInTheDocument();
    });

    it('allows typing in sale percent input', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):') as HTMLInputElement;
        fireEvent.change(input, { target: { value: '25' } });
        expect(input.value).toBe('25');
    });

    it('updates sale percent when submit is clicked with valid number', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(input, { target: { value: '20' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('All products are 20% off!')).toBeInTheDocument();
    });

    it('displays error message for invalid input', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(input, { target: { value: 'abc' } });
        fireEvent.click(submitButton);

        expect(screen.getByText(/Invalid input/)).toBeInTheDocument();
        expect(screen.getByText(/"abc"/)).toBeInTheDocument();
    });

    it('resets sale to 0 when End Sale is clicked', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):') as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const endSaleButton = screen.getByRole('button', { name: 'End Sale' });

        // Set a sale
        fireEvent.change(input, { target: { value: '30' } });
        fireEvent.click(submitButton);
        expect(screen.getByText('All products are 30% off!')).toBeInTheDocument();

        // End the sale
        fireEvent.click(endSaleButton);
        expect(screen.getByText('No sale active.')).toBeInTheDocument();
        expect(input.value).toBe('0');
    });

    it('handles zero percent sale', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(input, { target: { value: '0' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('No sale active.')).toBeInTheDocument();
    });

    it.skip('handles negative numbers', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(input, { target: { value: '-10' } });
        fireEvent.click(submitButton);

        expect(screen.getByText(/All products are -10% off!/)).toBeInTheDocument();
    });

    it('handles decimal values', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(input, { target: { value: '15.5' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('All products are 15.5% off!')).toBeInTheDocument();
    });

    it('handles very large numbers', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(input, { target: { value: '1000' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('All products are 1000% off!')).toBeInTheDocument();
    });

    it.skip('displays error for empty string input', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(input, { target: { value: '' } });
        fireEvent.click(submitButton);

        expect(screen.getByText(/Invalid input/)).toBeInTheDocument();
    });

    it('displays error for special characters', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(input, { target: { value: '@#$' } });
        fireEvent.click(submitButton);

        expect(screen.getByText(/Invalid input/)).toBeInTheDocument();
        expect(screen.getByText(/"@#\$"/)).toBeInTheDocument();
    });

    it.skip('error message is styled in red', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(input, { target: { value: 'invalid' } });
        fireEvent.click(submitButton);

        const errorDiv = screen.getByText(/Invalid input/).parentElement;
        expect(errorDiv).toHaveStyle({ color: 'red' });
    });

    it.skip('success message is styled in green', () => {
        render(<AdminPage />);
        const successMessage = screen.getByText('No sale active.');
        expect(successMessage).toHaveStyle({ color: 'green' });
    });

    it.skip('clears error message when valid input is submitted after error', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        // Submit invalid input
        fireEvent.change(input, { target: { value: 'invalid' } });
        fireEvent.click(submitButton);
        expect(screen.getByText(/Invalid input/)).toBeInTheDocument();

        // Submit valid input
        fireEvent.change(input, { target: { value: '10' } });
        fireEvent.click(submitButton);
        expect(screen.queryByText(/Invalid input/)).not.toBeInTheDocument();
    });

    it('handles multiple submissions', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(input, { target: { value: '10' } });
        fireEvent.click(submitButton);
        expect(screen.getByText('All products are 10% off!')).toBeInTheDocument();

        fireEvent.change(input, { target: { value: '20' } });
        fireEvent.click(submitButton);
        expect(screen.getByText('All products are 20% off!')).toBeInTheDocument();

        fireEvent.change(input, { target: { value: '30' } });
        fireEvent.click(submitButton);
        expect(screen.getByText('All products are 30% off!')).toBeInTheDocument();
    });

    it('has correct heading', () => {
        render(<AdminPage />);
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Welcome to the admin portal.');
    });

    it('input field has correct id attribute', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
        expect(input).toHaveAttribute('id', 'salePercent');
    });

    it('handles spaces in input', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(input, { target: { value: ' 15 ' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('All products are 15% off!')).toBeInTheDocument();
    });

    it('error message includes the invalid value', () => {
        render(<AdminPage />);
        const input = screen.getByLabelText('Set Sale Percent (% off for all items):');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(input, { target: { value: 'test123' } });
        fireEvent.click(submitButton);

        expect(screen.getByText(/"test123"/)).toBeInTheDocument();
    });
});
