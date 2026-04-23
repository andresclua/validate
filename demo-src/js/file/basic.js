import { isFile } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'

document.addEventListener('DOMContentLoaded', () => {
    const config = { required: true }

    const changeInput = document.getElementById('change-file')
    const changeError = document.getElementById('change-error')

    changeInput.addEventListener('change', () => {
        const result = isFile({ element: changeInput.files[0], config })
        if (result.isValid) {
            changeInput.classList.remove('c--form-file-a--error')
            changeInput.classList.add('c--form-file-a--valid')
            changeError.textContent = ''
        } else {
            changeInput.classList.add('c--form-file-a--error')
            changeInput.classList.remove('c--form-file-a--valid')
            changeError.textContent = result.errorMessage
        }
    })

    const submitInput = document.getElementById('submit-file')
    const submitError = document.getElementById('submit-error')

    document.getElementById('validate-btn').addEventListener('click', () => {
        const result = isFile({ element: submitInput.files[0], config })
        if (result.isValid) {
            submitInput.classList.remove('c--form-file-a--error')
            submitInput.classList.add('c--form-file-a--valid')
            submitError.textContent = ''
        } else {
            submitInput.classList.add('c--form-file-a--error')
            submitInput.classList.remove('c--form-file-a--valid')
            submitError.textContent = result.errorMessage
        }
    })

    document.getElementById('reset-btn').addEventListener('click', () => {
        changeInput.value = ''
        changeInput.classList.remove('c--form-file-a--error', 'c--form-file-a--valid')
        changeError.textContent = ''
        submitInput.value = ''
        submitInput.classList.remove('c--form-file-a--error', 'c--form-file-a--valid')
        submitError.textContent = ''
    })
})
