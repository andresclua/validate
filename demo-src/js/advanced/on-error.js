import { isEmail, isString } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'
import { showValid, initReset, clearState } from '../playground.js'

document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('adv-name-cb')
  const emailInput = document.getElementById('adv-email-cb')
  const nameErrorEl = document.getElementById('adv-name-cb-error')
  const emailErrorEl = document.getElementById('adv-email-cb-error')
  const validEl = document.getElementById('adv-valid-cb')
  const validateBtn = document.getElementById('validate-btn')
  const resetBtn = document.getElementById('reset-btn')

  // Centralized error handler
  function onError(fieldId, errorMessage) {
    const errorEl = document.getElementById(fieldId + '-error')
    if (errorEl) {
      errorEl.textContent = errorMessage
      errorEl.classList.add('is-visible')
      // Add is-error class to the associated input
      const fieldInput = document.getElementById(fieldId)
      if (fieldInput) {
        fieldInput.classList.add('is-error')
        fieldInput.classList.remove('is-valid')
      }
    }
  }

  validateBtn.addEventListener('click', () => {
    // Clear previous validation states
    clearState(nameInput, nameErrorEl, null)
    clearState(emailInput, emailErrorEl, null)
    validEl.classList.remove('is-visible')

    let allValid = true

    // Use callback for each validator
    isEmail({
      element: emailInput.value,
      config: { required: true },
      callback: (result) => {
        if (!result.isValid) {
          onError('adv-email-cb', result.errorMessage)
          allValid = false
        }
      }
    })

    isString({
      element: nameInput.value,
      config: { required: true, minLength: 2 },
      callback: (result) => {
        if (!result.isValid) {
          onError('adv-name-cb', result.errorMessage)
          allValid = false
        }
      }
    })

    // Show valid state if all fields pass
    if (allValid) {
      showValid(nameInput, null, nameErrorEl)
      showValid(emailInput, null, emailErrorEl)
      validEl.classList.add('is-visible')
    }
  })

  initReset(resetBtn, [nameInput, emailInput], [nameErrorEl, emailErrorEl], [null, null])
})
