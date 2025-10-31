import { render, screen, fireEvent } from '../test/test-utils';
import { describe, it, expect } from 'vitest';
import ContactUsPage from './ContactUsPage';

describe('ContactUsPage', () => {
    it('renders the contact us page', () => {
        render(<ContactUsPage />);
        expect(screen.getByRole('heading', { level: 2, name: 'Contact Us' })).toBeInTheDocument();
    });

    it('renders header with navigation', () => {
        render(<ContactUsPage />);
        expect(screen.getByText('The Daily Harvest')).toBeInTheDocument();
    });

    it('renders footer', () => {
        render(<ContactUsPage />);
        expect(screen.getByText(/© 2025 The Daily Harvest. All rights reserved./i)).toBeInTheDocument();
    });

    it('renders contact form with all required fields', () => {
        render(<ContactUsPage />);
        
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Request')).toBeInTheDocument();
    });

    it('renders submit button', () => {
        render(<ContactUsPage />);
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('allows typing in name field', () => {
        render(<ContactUsPage />);
        const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        
        expect(nameInput.value).toBe('John Doe');
    });

    it('allows typing in email field', () => {
        render(<ContactUsPage />);
        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        
        expect(emailInput.value).toBe('john@example.com');
    });

    it('allows typing in request field', () => {
        render(<ContactUsPage />);
        const requestInput = screen.getByLabelText('Request') as HTMLTextAreaElement;
        
        fireEvent.change(requestInput, { target: { value: 'I need help' } });
        
        expect(requestInput.value).toBe('I need help');
    });

    it('displays modal with thank you message when form is submitted', () => {
        render(<ContactUsPage />);
        
        const nameInput = screen.getByLabelText('Name');
        const emailInput = screen.getByLabelText('Email');
        const requestInput = screen.getByLabelText('Request');
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(requestInput, { target: { value: 'I need help' } });
        fireEvent.click(submitButton);
        
        expect(screen.getByText('Thank you for your message.')).toBeInTheDocument();
    });

    it('displays continue button in modal', () => {
        render(<ContactUsPage />);
        
        const nameInput = screen.getByLabelText('Name');
        const emailInput = screen.getByLabelText('Email');
        const requestInput = screen.getByLabelText('Request');
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(requestInput, { target: { value: 'I need help' } });
        fireEvent.click(submitButton);
        
        expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
    });

    it('clears form and closes modal when continue button is clicked', () => {
        render(<ContactUsPage />);
        
        const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        const requestInput = screen.getByLabelText('Request') as HTMLTextAreaElement;
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(requestInput, { target: { value: 'I need help' } });
        fireEvent.click(submitButton);
        
        const continueButton = screen.getByRole('button', { name: 'Continue' });
        fireEvent.click(continueButton);
        
        expect(screen.queryByText('Thank you for your message.')).not.toBeInTheDocument();
        expect(nameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(requestInput.value).toBe('');
    });

    it('does not show modal initially', () => {
        render(<ContactUsPage />);
        expect(screen.queryByText('Thank you for your message.')).not.toBeInTheDocument();
    });

    it('has required attribute on name field', () => {
        render(<ContactUsPage />);
        const nameInput = screen.getByLabelText('Name');
        expect(nameInput).toBeRequired();
    });

    it('has required attribute on email field', () => {
        render(<ContactUsPage />);
        const emailInput = screen.getByLabelText('Email');
        expect(emailInput).toBeRequired();
    });

    it('has required attribute on request field', () => {
        render(<ContactUsPage />);
        const requestInput = screen.getByLabelText('Request');
        expect(requestInput).toBeRequired();
    });

    it('has correct type for email field', () => {
        render(<ContactUsPage />);
        const emailInput = screen.getByLabelText('Email');
        expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('renders form element', () => {
        const { container } = render(<ContactUsPage />);
        const form = container.querySelector('form.contact-form');
        expect(form).toBeInTheDocument();
    });

    it('renders modal backdrop when modal is shown', () => {
        const { container } = render(<ContactUsPage />);
        
        const nameInput = screen.getByLabelText('Name');
        const emailInput = screen.getByLabelText('Email');
        const requestInput = screen.getByLabelText('Request');
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(requestInput, { target: { value: 'I need help' } });
        fireEvent.click(submitButton);
        
        const backdrop = container.querySelector('.modal-backdrop');
        expect(backdrop).toBeInTheDocument();
    });

    it('renders modal content when modal is shown', () => {
        const { container } = render(<ContactUsPage />);
        
        const nameInput = screen.getByLabelText('Name');
        const emailInput = screen.getByLabelText('Email');
        const requestInput = screen.getByLabelText('Request');
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(requestInput, { target: { value: 'I need help' } });
        fireEvent.click(submitButton);
        
        const content = container.querySelector('.modal-content');
        expect(content).toBeInTheDocument();
    });
});
