import { isString } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'
import { showError, showValid, initReset } from '../playground.js'

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('string-input')
  const errorEl = document.getElementById('string-error')
  const validEl = document.getElementById('string-valid')
  const validateBtn = document.getElementById('validate-btn')
  const resetBtn = document.getElementById('reset-btn')

  validateBtn.addEventListener('click', () => {
    const result = isString({
      element: input.value,
      config: {
        required: true,
        customValidation: (str) => ({
          isValid: !str.includes(' '),
          errorMessage: 'The value must not contain spaces'
        })
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
