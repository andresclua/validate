import { isSelect } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'

document.addEventListener('DOMContentLoaded', () => {
    const config = {
        required: true,
        customValidation: (value) => ({
            isValid: value !== 'es',
            errorMessage: 'Spain is not available in your region'
        })
    }

    const changeSelect = document.getElementById('change-select')
    const changeWrapper = document.getElementById('change-wrapper')
    const changeError = document.getElementById('change-error')

    changeSelect.addEventListener('change', () => {
        const result = isSelect({ element: changeSelect.value, config })
        if (result.isValid) {
            changeWrapper.classList.remove('c--form-input-a--error')
            changeWrapper.classList.add('c--form-input-a--valid')
            changeError.textContent = ''
        } else {
            changeWrapper.classList.add('c--form-input-a--error')
            changeWrapper.classList.remove('c--form-input-a--valid')
            changeError.textContent = result.errorMessage
        }
    })

    const submitSelect = document.getElementById('submit-select')
    const submitWrapper = document.getElementById('submit-wrapper')
    const submitError = document.getElementById('submit-error')

    document.getElementById('validate-btn').addEventListener('click', () => {
        const result = isSelect({ element: submitSelect.value, config })
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
        changeSelect.value = ''
        changeWrapper.classList.remove('c--form-input-a--error', 'c--form-input-a--valid')
        changeError.textContent = ''
        submitSelect.value = ''
        submitWrapper.classList.remove('c--form-input-a--error', 'c--form-input-a--valid')
        submitError.textContent = ''
    })
})
