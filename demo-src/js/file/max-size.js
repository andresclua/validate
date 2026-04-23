import { isFile } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'
import { showError, showValid, initReset } from '../playground.js'

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('file-input')
  const errorEl = document.getElementById('file-error')
  const validEl = document.getElementById('file-valid')
  const validateBtn = document.getElementById('validate-btn')
  const resetBtn = document.getElementById('reset-btn')

  validateBtn.addEventListener('click', () => {
    const result = isFile({
      element: input.files[0],
      config: {
        required: true,
        maxSize: 1 * 1024 * 1024,
        customMessage: {
          size: 'File must be smaller than 1MB'
        }
      }
    })
    if (result.isValid) {
      showValid(input, validEl, errorEl)
    } else {
      showError(input, errorEl, result.errorMessage)
    }
  })

  initReset(resetBtn, [input], [errorEl], [validEl])
})
