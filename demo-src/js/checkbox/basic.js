import { isCheckbox } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'
import { showError, showValid } from '../playground.js'

document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[name="interests"]')
  const errorEl = document.getElementById('checkbox-error')
  const validEl = document.getElementById('checkbox-valid')
  const validateBtn = document.getElementById('validate-btn')
  const resetBtn = document.getElementById('reset-btn')

  validateBtn.addEventListener('click', () => {
    const result = isCheckbox({
      elements: checkboxes,
      config: { minRequired: 1 }
    })
    if (result.isValid) {
      showValid(null, validEl, errorEl)
      validEl.classList.add('is-visible')
    } else {
      showError(null, errorEl, result.errorMessage)
    }
  })

  resetBtn.addEventListener('click', () => {
    checkboxes.forEach(cb => cb.checked = false)
    errorEl.textContent = ''
    errorEl.classList.remove('is-visible')
    validEl.classList.remove('is-visible')
  })
})
