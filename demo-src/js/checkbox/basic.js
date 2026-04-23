import { isCheckbox } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'

document.addEventListener('DOMContentLoaded', () => {
    const config = { minRequired: 1 }

    const changeCheckboxes = document.querySelectorAll('#change-group .c--form-checkbox-a__item')
    const changeError = document.getElementById('change-error')

    changeCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const result = isCheckbox({ elements: changeCheckboxes, config })
            changeError.textContent = result.isValid ? '' : result.errorMessage
        })
    })

    const submitCheckboxes = document.querySelectorAll('#submit-group .c--form-checkbox-a__item')
    const submitError = document.getElementById('submit-error')

    document.getElementById('validate-btn').addEventListener('click', () => {
        const result = isCheckbox({ elements: submitCheckboxes, config })
        submitError.textContent = result.isValid ? '' : result.errorMessage
    })

    document.getElementById('reset-btn').addEventListener('click', () => {
        changeCheckboxes.forEach(cb => cb.checked = false)
        changeError.textContent = ''
        submitCheckboxes.forEach(cb => cb.checked = false)
        submitError.textContent = ''
    })
})
