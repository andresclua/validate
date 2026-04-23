import { isEmail, isString } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'
import { showError, showValid, initReset, clearState } from '../playground.js'

document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('adv-name')
  const emailInput = document.getElementById('adv-email')
  const nameErrorEl = document.getElementById('adv-name-error')
  const emailErrorEl = document.getElementById('adv-email-error')
  const validEl = document.getElementById('adv-valid')
  const validateBtn = document.getElementById('validate-btn')
  const resetBtn = document.getElementById('reset-btn')

  validateBtn.addEventListener('click', () => {
    // Clear previous validation states
    clearState(nameInput, nameErrorEl, null)
    clearState(emailInput, emailErrorEl, null)
    validEl.classList.remove('is-visible')

    const nameResult = isString({
      element: nameInput.value,
      config: { required: true, minLength: 2 }
    })

    const emailResult = isEmail({
      element: emailInput.value,
      config: { required: true }
    })

    if (nameResult.isValid && emailResult.isValid) {
      showValid(nameInput, null, nameErrorEl)
      showValid(emailInput, null, emailErrorEl)
      validEl.classList.add('is-visible')
    } else {
      if (!nameResult.isValid) {
        showError(nameInput, nameErrorEl, nameResult.errorMessage)
      }
      if (!emailResult.isValid) {
        showError(emailInput, emailErrorEl, emailResult.errorMessage)
      }
    }
  })

  initReset(resetBtn, [nameInput, emailInput], [nameErrorEl, emailErrorEl], [null, null])
})
