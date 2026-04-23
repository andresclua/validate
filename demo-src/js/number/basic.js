import { isNumber } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'

document.addEventListener('DOMContentLoaded', () => {
    const config = { required: true }

    const blurInput = document.getElementById('blur-number')
    const blurWrapper = document.getElementById('blur-wrapper')
    const blurError = document.getElementById('blur-error')

    blurInput.addEventListener('blur', () => {
        const result = isNumber({ element: blurInput.value, config })
        if (result.isValid) {
            blurWrapper.classList.remove('c--form-input-a--error')
            blurWrapper.classList.add('c--form-input-a--valid')
            blurError.textContent = ''
        } else {
            blurWrapper.classList.add('c--form-input-a--error')
            blurWrapper.classList.remove('c--form-input-a--valid')
            blurError.textContent = result.errorMessage
        }
    })

    const submitInput = document.getElementById('submit-number')
    const submitWrapper = document.getElementById('submit-wrapper')
    const submitError = document.getElementById('submit-error')

    document.getElementById('validate-btn').addEventListener('click', () => {
        const result = isNumber({ element: submitInput.value, config })
        if (result.isValid) {
            submitWrapper.classList.remove('c--form-input-a--error')
            submitWrapper.classList.add('c--form-input-a--valid')
            submitError.textContent = ''
        } else {
            submitWrapper.classList.add('c--form-input-a--error')
            submitWrapper.classList.remove('c--form-input-a--valid')
            submitError.textContent = result.errorMessage
        }
    })

    document.getElementById('reset-btn').addEventListener('click', () => {
        blurInput.value = ''
        blurWrapper.classList.remove('c--form-input-a--error', 'c--form-input-a--valid')
        blurError.textContent = ''
        submitInput.value = ''
        submitWrapper.classList.remove('c--form-input-a--error', 'c--form-input-a--valid')
        submitError.textContent = ''
    })
})
