import { isRadio } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'
import { showError, showValid } from '../playground.js'

document.addEventListener('DOMContentLoaded', () => {
  const radios = document.querySelectorAll('input[name="size"]')
  const errorEl = document.getElementById('radio-error')
  const validEl = document.getElementById('radio-valid')
  const validateBtn = document.getElementById('validate-btn')
  const resetBtn = document.getElementById('reset-btn')

  validateBtn.addEventListener('click', () => {
    const result = isRadio({
      elements: radios,
      config: {
        customValidation: () => {
          const selected = Array.from(radios).find(r => r.checked)
          return {
            isValid: selected?.value !== 's',
            errorMessage: 'Small size is currently out of stock'
          }
        }
      }
    })
    if (result.isValid) {
      validEl.classList.add('is-visible')
      errorEl.classList.remove('is-visible')
    } else {
      showError(null, errorEl, result.errorMessage)
      validEl.classList.remove('is-visible')
    }
  })

  resetBtn.addEventListener('click', () => {
    radios.forEach(r => r.checked = false)
    errorEl.textContent = ''
    errorEl.classList.remove('is-visible')
    validEl.classList.remove('is-visible')
  })
})
