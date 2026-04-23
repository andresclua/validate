import { isEmail, isString } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'

document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('adv-name')
    const nameWrapper = document.getElementById('adv-name-wrapper')
    const nameError = document.getElementById('adv-name-error')
    const emailInput = document.getElementById('adv-email')
    const emailWrapper = document.getElementById('adv-email-wrapper')
    const emailError = document.getElementById('adv-email-error')

    document.getElementById('validate-btn').addEventListener('click', () => {
        nameWrapper.classList.remove('c--form-input-a--error', 'c--form-input-a--valid')
        emailWrapper.classList.remove('c--form-input-a--error', 'c--form-input-a--valid')
        nameError.textContent = ''
        emailError.textContent = ''

        const nameResult = isString({ element: nameInput.value, config: { required: true, minLength: 2 } })
        const emailResult = isEmail({ element: emailInput.value, config: { required: true } })

        if (nameResult.isValid) {
            nameWrapper.classList.add('c--form-input-a--valid')
        } else {
            nameWrapper.classList.add('c--form-input-a--error')
            nameError.textContent = nameResult.errorMessage
        }

        if (emailResult.isValid) {
            emailWrapper.classList.add('c--form-input-a--valid')
        } else {
            emailWrapper.classList.add('c--form-input-a--error')
            emailError.textContent = emailResult.errorMessage
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
