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
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
        customMessage: {
          type: 'Only JPEG, PNG, and GIF images are allowed'
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
