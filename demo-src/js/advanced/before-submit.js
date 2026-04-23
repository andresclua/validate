import { isEmail } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('adv-email-async')
    const emailWrapper = document.getElementById('adv-email-async-wrapper')
    const errorEl = document.getElementById('adv-email-async-error')
    const validateBtn = document.getElementById('validate-btn')

    validateBtn.addEventListener('click', async () => {
        emailWrapper.classList.remove('c--form-input-a--error', 'c--form-input-a--valid')
        errorEl.textContent = ''

        const emailResult = isEmail({ element: emailInput.value, config: { required: true } })

        if (!emailResult.isValid) {
            emailWrapper.classList.add('c--form-input-a--error')
            errorEl.textContent = emailResult.errorMessage
            return
        }

        try {
            validateBtn.disabled = true
            validateBtn.textContent = 'Checking...'

            await new Promise(resolve => setTimeout(resolve, 1000))

            emailWrapper.classList.add('c--form-input-a--valid')
        } catch (error) {
            emailWrapper.classList.add('c--form-input-a--error')
            errorEl.textContent = 'Server error — please try again'
        } finally {
            validateBtn.disabled = false
            validateBtn.textContent = 'Submit'
        }
    })

    document.getElementById('reset-btn').addEventListener('click', () => {
        emailInput.value = ''
        emailWrapper.classList.remove('c--form-input-a--error', 'c--form-input-a--valid')
        errorEl.textContent = ''
        validateBtn.disabled = false
        validateBtn.textContent = 'Submit'
    })
})
