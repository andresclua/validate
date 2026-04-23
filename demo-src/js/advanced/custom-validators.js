import '../layout.js'
import '../../scss/demo.scss'
import { showError, showValid, initReset } from '../playground.js'

// Custom validator following the same signature as built-in validators
function isSpanishPhone(value) {
  const regex = /^(\+34|0034|34)?[6789]\d{8}$/
  return {
    isValid: regex.test(value.replace(/\s/g, '')),
    errorMessage: 'Please enter a valid Spanish phone number'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('adv-phone')
  const errorEl = document.getElementById('adv-phone-error')
  const validEl = document.getElementById('adv-phone-valid')
  const validateBtn = document.getElementById('validate-btn')
  const resetBtn = document.getElementById('reset-btn')

  validateBtn.addEventListener('click', () => {
    const result = isSpanishPhone(input.value)
    if (result.isValid) {
      showValid(input, validEl, errorEl)
    } else {
      showError(input, errorEl, result.errorMessage)
    }
  })

  initReset(resetBtn, [input], [errorEl], [validEl])
})
