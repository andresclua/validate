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
        customValidation: (email) => {
          const allowed = ['company.com', 'company.org']
          const domain = email.split('@')[1]
          return {
            isValid: allowed.includes(domain),
            errorMessage: 'Only company.com and company.org addresses are accepted'
          }
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
