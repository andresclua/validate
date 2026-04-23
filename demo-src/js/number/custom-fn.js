import { isNumber } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'
import { showError, showValid, initReset } from '../playground.js'

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('number-input')
  const errorEl = document.getElementById('number-error')
  const validEl = document.getElementById('number-valid')
  const validateBtn = document.getElementById('validate-btn')
  const resetBtn = document.getElementById('reset-btn')

  validateBtn.addEventListener('click', () => {
    const result = isNumber({
      element: input.value,
      config: {
        required: true,
        customValidation: (num) => ({
          isValid: num % 2 === 0,
          errorMessage: 'The number must be even'
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
