import { handleDebug, handleValidationResult } from "@js/utils/helper.js";

/**
 * Validates a file input, checking its format (MIME type) and size.
 * Utilizes centralized debugging and callback handling for consistent behavior across validations.
 *
 * @param {Object} options - Configuration parameters for the validation.
 *   @param {File} options.element - The file object to validate.
 *   @param {Object} [options.config={}] - Configuration options for validation rules.
 *     @param {boolean} [options.config.required=true] - Whether a file is required.
 *     @param {array} [options.config.allowedTypes] - An array of allowed MIME types (e.g., ['image/jpeg', 'application/pdf']).
 *     @param {number} [options.config.maxSize] - The maximum file size in bytes.
 *     @param {Object} [options.config.customMessage] - Custom messages for validation failure.
 *   @param {Function|null} [options.callback=null] - Optional callback function to execute with the validation result.
 *   @param {boolean} [options.debug=false] - If true, enables debug mode that logs detailed debug information.
 *
 * @returns {Object} An object containing the validation results:
 *   - `isValid`: True if the validation is successful, false otherwise.
 *   - `errorMessage`: The custom error message if validation fails, or null if successful.
 */
export function isFile({ element, config = {}, callback = null, debug = false }) {
    const { required = true, allowedTypes = [], maxSize, customMessage = {} } = config;
    let isValid = true;
    let errorMessage = null;

    // Check if file is required
    if (required && !element) {
        isValid = false;
        errorMessage = customMessage.required || "Please select a file.";
    }

    // Check file type
    if (isValid && allowedTypes.length > 0 && !allowedTypes.includes(element.type)) {
        isValid = false;
        errorMessage = customMessage.type || "Invalid file type. Please upload a valid file format.";
    }

    // Check file size
    if (isValid && maxSize && element.size > maxSize) {
        isValid = false;
        errorMessage = customMessage.size || `File size should not exceed ${maxSize / 1024 / 1024}MB.`;
    }

    const result = { isValid, errorMessage };

    // Debugging output handled conditionally based on the 'debug' flag
    if (debug) {
        handleDebug({
            element: element,  // File object as 'element' for debugging context
            config: config,
            result: result,
            debug: debug
        });
    }

    // Utilize centralized callback handling to process the validation result
    return handleValidationResult(result, callback);
}
