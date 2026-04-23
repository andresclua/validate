import { isEmail, isString } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'

document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('adv-name-cb')
    const nameWrapper = document.getElementById('adv-name-cb-wrapper')
    const nameError = document.getElementById('adv-name-cb-error')
    const emailInput = document.getElementById('adv-email-cb')
    const emailWrapper = document.getElementById('adv-email-cb-wrapper')
    const emailError = document.getElementById('adv-email-cb-error')

    function onError(wrapper, errorEl, message) {
        wrapper.classList.add('c--form-input-a--error')
        wrapper.classList.remove('c--form-input-a--valid')
        errorEl.textContent = message
    }

    document.getElementById('validate-btn').addEventListener('click', () => {
        nameWrapper.classList.remove('c--form-input-a--error', 'c--form-input-a--valid')
        emailWrapper.classList.remove('c--form-input-a--error', 'c--form-input-a--valid')
        nameError.textContent = ''
        emailError.textContent = ''

        let allValid = true

        isString({
            element: nameInput.value,
            config: { required: true, minLength: 2 },
            callback: (result) => {
                if (!result.isValid) {
                    onError(nameWrapper, nameError, result.errorMessage)
                    allValid = false
                }
            }
        })

        isEmail({
            element: emailInput.value,
            config: { required: true },
            callback: (result) => {
                if (!result.isValid) {
                    onError(emailWrapper, emailError, result.errorMessage)
                    allValid = false
                }
            }
        })

        if (allValid) {
            nameWrapper.classList.add('c--form-input-a--valid')
            emailWrapper.classList.add('c--form-input-a--valid')
        }
    })

    document.getElementById('reset-btn').addEventListener('click', () => {
        nameInput.value = ''
        nameWrapper.classList.remove('c--form-input-a--error', 'c--form-input-a--valid')
        nameError.textContent = ''
        emailInput.value = ''
        emailWrapper.classList.remove('c--form-input-a--error', 'c--form-input-a--valid')
        emailError.textContent = ''
    })
})
