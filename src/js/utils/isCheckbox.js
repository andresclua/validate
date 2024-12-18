import { handleDebug, handleValidationResult } from "@js/utils/helper.js";

/**
 * Validates that a minimum number of checkboxes are checked.
 * Utilizes centralized debugging and callback handling for consistent behavior across validations.
 *
 * @param {Object} options - Configuration parameters for the validation.
 *   @param {NodeList} options.elements - NodeList containing the checkbox elements to validate.
 *   @param {Object} [options.config={}] - Configuration options for validation rules.
 *     @param {number} [options.config.minRequired=1] - The minimum number of checkboxes that need to be checked.
 *     @param {Object} [options.config.customMessage] - Custom messages for validation failure cases.
 *   @param {Function|null} [options.callback=null] - Optional callback function to execute with the validation result.
 *   @param {boolean} [options.debug=false] - If true, enables debug mode that logs detailed debug information.
 *
 * @returns {Object} An object containing the validation results:
 *   - `isValid`: True if the validation is successful, false otherwise.
 *   - `errorMessage`: The custom error message if validation fails, or null if successful.
 */
export function isCheckbox({ elements, config = {}, callback = null, debug = false }) {
    const { minRequired = 1, customMessage = {} } = config;
    const checkedCount = Array.from(elements).filter(el => el.checked).length;
    let isValid = checkedCount >= minRequired;
    let errorMessage = isValid ? null : (customMessage.minRequired || `Please select at least ${minRequired} options.`);

    const result = { isValid, errorMessage };

    // Debugging output handled conditionally based on the 'debug' flag
    if (debug) {
        handleDebug({
            element: elements,  // Providing NodeList as 'element' for debugging context
            config: config,
            result: result,
            debug: debug
        });
    }

    // Utilize centralized callback handling to process the validation result
    return handleValidationResult(result, callback);
}
