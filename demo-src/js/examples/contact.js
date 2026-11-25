import Form from '../Form.js'
import { isFile } from '@andresclua/validate'
import { resetForm, setupDemo } from './shared.js'
import src from './contact.js?raw'

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form')
    const status = document.getElementById('ct-status')
    setupDemo(src, form)

    // isFile reads element.type / element.size, so an empty optional field is skipped here.
    const optionalImage = ({ element, config }) =>
        element ? isFile({ element, config }) : { isValid: true, errorMessage: null }

    new Form({
        element: form,
        fields: [
            { element: document.getElementById('ct-name'), validationFunction: 'isString', on: 'blur',
              config: { required: true, minLength: 2, customMessage: { required: 'Your name is required.', minLength: 'At least 2 characters.' } } },
            { element: document.getElementById('ct-email'), validationFunction: 'isEmail', on: 'blur',
              config: { required: true, type: 'corporate',
                        customMessage: { required: 'Email is required.', invalid: 'Enter a valid email.', corporate: 'Please use your work email.' } } },
            { element: document.getElementById('ct-subject'), validationFunction: 'isSelect', on: 'change',
              config: { required: true, customMessage: { required: 'Choose a subject.' } } },
            { element: document.getElementById('ct-message'), validationFunction: 'isString', on: 'blur',
              config: { required: true, minLength: 20, maxLength: 500,
                        customMessage: { required: 'Please write a message.', minLength: 'Give us at least 20 characters.', maxLength: 'Keep it under 500 characters.' } } },
            { element: document.getElementById('ct-file'), validationFunction: optionalImage, on: 'change',
              config: { allowedTypes: ['image/png', 'image/jpeg'], maxSize: 2 * 1024 * 1024,
                        customMessage: { type: 'Only PNG or JPG images.', size: 'Max file size is 2MB.' } } },
            { elements: form.querySelectorAll('#ct-consent'), validationFunction: 'isCheckbox', on: 'change',
              config: { minRequired: 1, customMessage: { minRequired: 'We need your consent to reply.' } } },
        ],
        submitButtonSelector: '#ct-submit',
        onSubmit: () => status.classList.add('is-visible'),
        onError: () => status.classList.remove('is-visible'),
    })

    document.getElementById('ct-reset').addEventListener('click', () => resetForm(form, status))
})
