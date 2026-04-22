import { isEmail } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'
import { showError, showValid, initReset } from '../playground.js'

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('email-input')
  const errorEl = document.getElementById('email-error')
  const validEl = document.getElementById('email-valid')
  const validateBtn = document.getElementById('validate-btn')
  const resetBtn = document.getElementById('reset-btn')

  validateBtn.addEventListener('click', () => {
    const result = isEmail({
      element: input.value,
      config: {
        required: true,
        customMessage: {
          required: 'Please enter your email address',
          invalid: 'That doesn\'t look like a valid email'
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
