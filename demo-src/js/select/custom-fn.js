import { isSelect } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'
import { showError, showValid, initReset } from '../playground.js'

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('select-input')
  const errorEl = document.getElementById('select-error')
  const validEl = document.getElementById('select-valid')
  const validateBtn = document.getElementById('validate-btn')
  const resetBtn = document.getElementById('reset-btn')

  validateBtn.addEventListener('click', () => {
    const result = isSelect({
      element: input.value,
      config: {
        required: true,
        customValidation: (value) => ({
          isValid: value !== 'es',
          errorMessage: 'Spain is not available in your region'
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
