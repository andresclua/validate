import '../layout.js'
import '../../scss/demo.scss'

function isSpanishPhone(value) {
    const regex = /^(\+34|0034|34)?[6789]\d{8}$/
    return {
        isValid: regex.test(value.replace(/\s/g, '')),
        errorMessage: 'Please enter a valid Spanish phone number'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('adv-phone')
    const wrapper = document.getElementById('adv-phone-wrapper')
    const errorEl = document.getElementById('adv-phone-error')

    document.getElementById('validate-btn').addEventListener('click', () => {
        const result = isSpanishPhone(input.value)
        if (result.isValid) {
            wrapper.classList.remove('c--form-input-a--error')
            wrapper.classList.add('c--form-input-a--valid')
            errorEl.textContent = ''
        } else {
            wrapper.classList.add('c--form-input-a--error')
            wrapper.classList.remove('c--form-input-a--valid')
            errorEl.textContent = result.errorMessage
        }
    })

    document.getElementById('reset-btn').addEventListener('click', () => {
        input.value = ''
        wrapper.classList.remove('c--form-input-a--error', 'c--form-input-a--valid')
        errorEl.textContent = ''
    })
})
