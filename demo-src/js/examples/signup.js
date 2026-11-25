import Form from '../Form.js'
import { resetForm, setupDemo } from './shared.js'
import src from './signup.js?raw'

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form')
    const status = document.getElementById('su-status')
    const password = document.getElementById('su-password')
    setupDemo(src, form)

    // Custom validator: any function that returns { isValid, errorMessage } works.
    const matchesPassword = ({ element: value }) => ({
        isValid: !!value && value === password.value,
        errorMessage: value ? 'Passwords do not match.' : 'Please confirm your password.',
    })

    new Form({
        element: form,
        fields: [
            { element: document.getElementById('su-first'), validationFunction: 'isString', on: 'blur',
              config: { required: true, minLength: 2, customMessage: { required: 'First name is required.', minLength: 'At least 2 characters.' } } },
            { element: document.getElementById('su-last'), validationFunction: 'isString', on: 'blur',
              config: { required: true, minLength: 2, customMessage: { required: 'Last name is required.', minLength: 'At least 2 characters.' } } },
            { element: document.getElementById('su-email'), validationFunction: 'isEmail', on: 'blur',
              config: { required: true, customMessage: { required: 'Email is required.', invalid: 'Enter a valid email, e.g. jane@example.com' } } },
            { element: password, validationFunction: 'isString', on: 'blur',
              config: { required: true, minLength: 8, pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                        customMessage: { required: 'Password is required.', minLength: 'At least 8 characters.', pattern: 'Use letters and at least one number.' } } },
            { element: document.getElementById('su-confirm'), validationFunction: matchesPassword, config: {}, on: 'blur' },
            { element: document.getElementById('su-country'), validationFunction: 'isSelect', on: 'change',
              config: { required: true, customMessage: { required: 'Pick your country.' } } },
            { elements: form.querySelectorAll('input[name="role"]'), validationFunction: 'isRadio', on: 'change',
              config: { customMessage: { required: 'Tell us what you do.' } } },
            { elements: form.querySelectorAll('#su-terms'), validationFunction: 'isCheckbox', on: 'change',
              config: { minRequired: 1, customMessage: { minRequired: 'You must accept the terms.' } } },
        ],
        submitButtonSelector: '#su-submit',
        onSubmit: () => status.classList.add('is-visible'),
        onError: () => status.classList.remove('is-visible'),
    })

    document.getElementById('su-reset').addEventListener('click', () => resetForm(form, status))
})
