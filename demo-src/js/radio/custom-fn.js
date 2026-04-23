import { isRadio } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'

document.addEventListener('DOMContentLoaded', () => {
    const config = {
        customValidation: (radios) => {
            const selected = Array.from(radios).find(r => r.checked)
            return {
                isValid: selected?.value !== 's',
                errorMessage: 'Small size is currently out of stock'
            }
        }
    }

    const changeRadios = document.querySelectorAll('#change-group .c--form-radio-a__item')
    const changeError = document.getElementById('change-error')

    changeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const result = isRadio({ elements: changeRadios, config })
            changeError.textContent = result.isValid ? '' : result.errorMessage
        })
    })

    const submitRadios = document.querySelectorAll('#submit-group .c--form-radio-a__item')
    const submitError = document.getElementById('submit-error')

    document.getElementById('validate-btn').addEventListener('click', () => {
        const result = isRadio({ elements: submitRadios, config })
        submitError.textContent = result.isValid ? '' : result.errorMessage
    })

    document.getElementById('reset-btn').addEventListener('click', () => {
        changeRadios.forEach(r => r.checked = false)
        changeError.textContent = ''
        submitRadios.forEach(r => r.checked = false)
        submitError.textContent = ''
    })
})
