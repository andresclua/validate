/**
 * playground.js
 * Shared utilities for playground sections across all demo pages.
 *
 * CSS state classes used:
 *   .is-error  — applied to input when validation fails
 *   .is-valid  — applied to input when validation passes
 *   .is-visible — applied to .pg-error / .pg-valid elements to show them
 */

/**
 * Show an error state on a form field.
 *
 * @param {Element} inputEl  - The input/select/textarea element
 * @param {Element} errorEl  - The .pg-error element for this field
 * @param {string}  message  - The error message to display
 */
export function showError(inputEl, errorEl, message) {
  inputEl.classList.add('is-error')
  inputEl.classList.remove('is-valid')

  errorEl.textContent = message
  errorEl.classList.add('is-visible')
}

/**
 * Show a valid state on a form field.
 *
 * @param {Element} inputEl  - The input/select/textarea element
 * @param {Element} validEl  - The .pg-valid element for this field (optional)
 * @param {Element} [errorEl] - The .pg-error element to hide (optional)
 */
export function showValid(inputEl, validEl, errorEl) {
  inputEl.classList.add('is-valid')
  inputEl.classList.remove('is-error')

  if (validEl) {
    validEl.classList.add('is-visible')
  }
  if (errorEl) {
    errorEl.classList.remove('is-visible')
  }
}

/**
 * Clear all validation state from a form field.
 *
 * @param {Element} inputEl  - The input/select/textarea element
 * @param {Element} errorEl  - The .pg-error element for this field
 * @param {Element} [validEl] - The .pg-valid element for this field (optional)
 */
export function clearState(inputEl, errorEl, validEl) {
  inputEl.classList.remove('is-error', 'is-valid')

  if (errorEl) {
    errorEl.classList.remove('is-visible')
    errorEl.textContent = ''
  }
  if (validEl) {
    validEl.classList.remove('is-visible')
  }
}

/**
 * Initialize a reset button that clears all field states and input values.
 *
 * @param {Element}   resetBtn  - The reset/clear button element
 * @param {Element[]} inputs    - Array of input elements to clear
 * @param {Element[]} errorEls  - Array of .pg-error elements (parallel to inputs)
 * @param {Element[]} validEls  - Array of .pg-valid elements (parallel to inputs, may contain nulls)
 */
export function initReset(resetBtn, inputs, errorEls, validEls) {
  if (!resetBtn) return

  resetBtn.addEventListener('click', () => {
    inputs.forEach((input, i) => {
      clearState(input, errorEls[i] || null, validEls[i] || null)

      // Clear the field value depending on element type
      if (input.type === 'checkbox' || input.type === 'radio') {
        input.checked = false
      } else if (input.tagName === 'SELECT') {
        input.selectedIndex = 0
      } else {
        input.value = ''
      }
    })
  })
}
