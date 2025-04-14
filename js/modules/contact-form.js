/**
 * Contact Form Module
 * 
 * Handles contact form validation and submission using EmailJS
 */

'use strict';

/**
 * Initialize contact form functionality
 */
export function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        setupFormValidation(contactForm);
        setupFormSubmission(contactForm);
    }
}

/**
 * Setup form validation
 * @param {HTMLFormElement} form - The contact form element
 */
function setupFormValidation(form) {
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const subjectInput = form.querySelector('input[name="subject"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    
    // Add blur event listeners to validate fields when user leaves them
    if (nameInput) {
        nameInput.addEventListener('blur', () => validateField(nameInput, 'Name is required'));
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => validateEmail(emailInput));
    }
    
    if (subjectInput) {
        subjectInput.addEventListener('blur', () => validateField(subjectInput, 'Subject is required'));
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', () => validateField(messageInput, 'Message is required', 10));
    }
}

/**
 * Validate a form field
 * @param {HTMLInputElement|HTMLTextAreaElement} field - The field to validate
 * @param {string} errorMessage - The error message to display
 * @param {number} minLength - Minimum required length (default: 3)
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field, errorMessage, minLength = 3) {
    const value = field.value.trim();
    const formGroup = field.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || createErrorElement(formGroup);
    
    if (value === '' || value.length < minLength) {
        field.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
        return false;
    } else {
        field.classList.remove('error');
        errorElement.style.display = 'none';
        return true;
    }
}

/**
 * Validate email field
 * @param {HTMLInputElement} emailField - The email input field
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(emailField) {
    const email = emailField.value.trim();
    const formGroup = emailField.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || createErrorElement(formGroup);
    
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        emailField.classList.add('error');
        errorElement.textContent = 'Email is required';
        errorElement.style.display = 'block';
        return false;
    } else if (!emailRegex.test(email)) {
        emailField.classList.add('error');
        errorElement.textContent = 'Please enter a valid email address';
        errorElement.style.display = 'block';
        return false;
    } else {
        emailField.classList.remove('error');
        errorElement.style.display = 'none';
        return true;
    }
}

/**
 * Create error message element
 * @param {HTMLElement} formGroup - The parent form group
 * @returns {HTMLElement} - The created error element
 */
function createErrorElement(formGroup) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    formGroup.appendChild(errorElement);
    return errorElement;
}

/**
 * Setup form submission with EmailJS
 * @param {HTMLFormElement} form - The contact form element
 */
function setupFormSubmission(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const nameInput = form.querySelector('input[name="name"]');
        const emailInput = form.querySelector('input[name="email"]');
        const subjectInput = form.querySelector('input[name="subject"]');
        const messageInput = form.querySelector('textarea[name="message"]');
        const submitButton = form.querySelector('button[type="submit"]');
        const successMsg = document.querySelector('.success-msg');
        
        // Validate all fields
        const isNameValid = validateField(nameInput, 'Name is required');
        const isEmailValid = validateEmail(emailInput);
        const isSubjectValid = validateField(subjectInput, 'Subject is required');
        const isMessageValid = validateField(messageInput, 'Message is required', 10);
        
        // If all fields are valid, submit the form
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Show loading state
            const buttonText = submitButton.textContent;
            submitButton.innerHTML = '<span class="spinner"></span>Sending...';
            submitButton.disabled = true;
            
            // Check if EmailJS is available
            if (typeof emailjs !== 'undefined') {
                // Prepare template parameters for EmailJS
                const templateParams = {
                    name: nameInput.value,
                    email: emailInput.value,
                    subject: subjectInput.value,
                    message: messageInput.value
                };
                
                // Send email using EmailJS
                emailjs.send('service_id', 'template_id', templateParams)
                    .then(function() {
                        // Show success message
                        if (successMsg) {
                            successMsg.style.display = 'inline-block';
                            successMsg.textContent = 'Message sent successfully!';
                        }
                        
                        // Reset form
                        form.reset();
                        
                        // Reset button state after 3 seconds
                        setTimeout(() => {
                            submitButton.innerHTML = buttonText;
                            submitButton.disabled = false;
                            
                            // Hide success message after 5 seconds
                            if (successMsg) {
                                setTimeout(() => {
                                    successMsg.style.display = 'none';
                                }, 5000);
                            }
                        }, 3000);
                    })
                    .catch(function(error) {
                        console.error('Email sending failed:', error);
                        
                        // Show error in success message area
                        if (successMsg) {
                            successMsg.style.display = 'inline-block';
                            successMsg.textContent = 'Failed to send message. Please try again.';
                            successMsg.style.color = '#ff3366';
                        }
                        
                        // Reset button state
                        submitButton.innerHTML = buttonText;
                        submitButton.disabled = false;
                    });
            } else {
                // EmailJS not available - provide fallback
                console.warn('EmailJS not loaded. Form submission simulation only.');
                
                // Simulate successful submission after 2 seconds
                setTimeout(() => {
                    // Show success message
                    if (successMsg) {
                        successMsg.style.display = 'inline-block';
                        successMsg.textContent = 'Message sent successfully! (Demo mode)';
                    }
                    
                    // Reset form
                    form.reset();
                    
                    // Reset button state
                    submitButton.innerHTML = buttonText;
                    submitButton.disabled = false;
                    
                    // Hide success message after 5 seconds
                    if (successMsg) {
                        setTimeout(() => {
                            successMsg.style.display = 'none';
                        }, 5000);
                    }
                }, 2000);
            }
        }
    });
}
