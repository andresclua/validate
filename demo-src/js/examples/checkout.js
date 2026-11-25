import Form from '../Form.js'
import { resetForm, setupDemo } from './shared.js'
import src from './checkout.js?raw'

// Luhn checksum: the standard sanity check for card numbers.
const luhn = (digits) => {
    let sum = 0
    for (let i = 0; i < digits.length; i++) {
        let d = +digits[digits.length - 1 - i]
        if (i % 2) { d *= 2; if (d > 9) d -= 9 }
        sum += d
    }
    return sum % 10 === 0
}

const cardNumber = ({ element: value }) => {
    const digits = (value || '').replace(/\s/g, '')
    if (!digits) return { isValid: false, errorMessage: 'Card number is required.' }
    return { isValid: /^\d{13,19}$/.test(digits) && luhn(digits), errorMessage: 'This card number looks invalid.' }
}

const notExpired = ({ element: value }) => {
    const m = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(value || '')
    if (!m) return { isValid: false, errorMessage: 'Use the format MM/YY.' }
    const endOfMonth = new Date(2000 + +m[2], +m[1], 1) // first day of the following month
    return { isValid: endOfMonth > new Date(), errorMessage: 'This card has expired.' }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form')
    const status = document.getElementById('co-status')
    setupDemo(src, form)

    new Form({
        element: form,
        fields: [
            { element: document.getElementById('co-name'), validationFunction: 'isString', on: 'blur',
              config: { required: true, minLength: 2, customMessage: { required: 'Name is required.', minLength: 'At least 2 characters.' } } },
            { element: document.getElementById('co-address'), validationFunction: 'isString', on: 'blur',
              config: { required: true, minLength: 5, customMessage: { required: 'Address is required.', minLength: 'Enter the full address.' } } },
            { element: document.getElementById('co-city'), validationFunction: 'isString', on: 'blur',
              config: { required: true, customMessage: { required: 'City is required.' } } },
            { element: document.getElementById('co-zip'), validationFunction: 'isString', on: 'blur',
              config: { required: true, pattern: /^\d{5}$/, customMessage: { required: 'ZIP code is required.', pattern: 'ZIP must be 5 digits.' } } },
            { element: document.getElementById('co-country'), validationFunction: 'isSelect', on: 'change',
              config: { required: true, customMessage: { required: 'Select a country.' } } },
            { elements: form.querySelectorAll('input[name="shipping"]'), validationFunction: 'isRadio', on: 'change',
              config: { customMessage: { required: 'Choose a delivery option.' } } },
            { element: document.getElementById('co-card'), validationFunction: cardNumber, config: {}, on: 'blur' },
            { element: document.getElementById('co-exp'), validationFunction: notExpired, config: {}, on: 'blur' },
            { element: document.getElementById('co-cvc'), validationFunction: 'isString', on: 'blur',
              config: { required: true, pattern: /^\d{3,4}$/, customMessage: { required: 'CVC is required.', pattern: '3 or 4 digits.' } } },
            { elements: form.querySelectorAll('#co-terms'), validationFunction: 'isCheckbox', on: 'change',
              config: { minRequired: 1, customMessage: { minRequired: 'Accept the terms to continue.' } } },
        ],
        submitButtonSelector: '#co-submit',
        onSubmit: () => status.classList.add('is-visible'),
        onError: () => status.classList.remove('is-visible'),
    })

    document.getElementById('co-reset').addEventListener('click', () => resetForm(form, status))
})
