import { handleDebug, handleValidationResult } from "@js/utils/helper.js";

/**
 * Validates that at least one radio button is selected.
 * Utilizes centralized debugging and callback handling for consistent behavior across validations.
 *
 * @param {Object} options - Configuration parameters for the validation.
 *   @param {NodeList} options.elements - NodeList containing the radio button elements to validate.
 *   @param {Object} [options.config={}] - Configuration options for validation rules.
 *     @param {Object} [options.config.customMessage] - Custom messages for validation failure cases.
 *   @param {Function|null} [options.callback=null] - Optional callback function to execute with the validation result.
 *   @param {boolean} [options.debug=false] - If true, enables debug mode that logs detailed debug information.
 *
 * @returns {Object} An object containing the validation results:
 *   - `isValid`: True if the validation is successful, false otherwise.
 *   - `errorMessage`: The custom error message if validation fails, or null if successful.
 */
export function isRadio({ elements, config = {}, callback = null, debug = false }) {
    const { customMessage = {} } = config;
    const selectedCount = Array.from(elements).filter(el => el.checked).length;
    let isValid = selectedCount > 0;
    let errorMessage = isValid ? null : (customMessage.required || "Please select an option.");

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
