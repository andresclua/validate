import { isEmail } from '@andresclua/validate'
import '../layout.js'
import '../../scss/demo.scss'
import { showError, showValid, initReset, clearState } from '../playground.js'

document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('adv-email-async')
  const errorEl = document.getElementById('adv-email-async-error')
  const validEl = document.getElementById('adv-email-async-valid')
  const validateBtn = document.getElementById('validate-btn')
  const resetBtn = document.getElementById('reset-btn')

  validateBtn.addEventListener('click', async () => {
    // Clear previous validation states
    clearState(emailInput, errorEl, validEl)

    // 1. Client-side validation first
    const emailResult = isEmail({
      element: emailInput.value,
      config: { required: true }
    })

    if (!emailResult.isValid) {
      showError(emailInput, errorEl, emailResult.errorMessage)
      return
    }

    // 2. beforeSubmit: async server check (example)
    try {
      validateBtn.disabled = true
      const originalText = validateBtn.textContent
      validateBtn.textContent = 'Checking...'

      // Simulate async check
      await new Promise(resolve => setTimeout(resolve, 1000))

      showValid(emailInput, validEl, errorEl)
    } catch (error) {
      showError(emailInput, errorEl, 'Server error — please try again')
    } finally {
      validateBtn.disabled = false
      validateBtn.textContent = 'Submit'
    }
  })

  initReset(resetBtn, [emailInput], [errorEl], [validEl])
})
