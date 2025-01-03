import { handleDebug, handleValidationResult } from "@js/utils/helper.js";
/**
 * Validates if a string meets specific validation rules.
 *
 * @param {Object} options - Configuration parameters for the validation.
 * @param {string} options.element - The string to validate.
 * @param {Object} [options.config={}] - Configuration object for custom validation.
 * @param {boolean} [options.config.required=false] - Whether the string is required.
 * @param {number} [options.config.minLength] - Minimum number of characters allowed.
 * @param {number} [options.config.maxLength] - Maximum number of characters allowed.
 * @param {RegExp} [options.config.pattern] - A regular expression pattern the string must match.
 * @param {Object} [options.config.customMessage] - Custom error messages for validation:
 *   - `required`: Custom message for when the string is empty.
 *   - `minLength`: Custom message for when the string is too short.
 *   - `maxLength`: Custom message for when the string is too long.
 *   - `pattern`: Custom message for when the string does not match the pattern.
 * @param {Function|null} [options.callback=null] - Callback function to handle the validation result.
 * @param {boolean} [options.debug=false] - If true, enables debug mode to log additional information.
 *
 * @returns {Object} - Validation result object:
 *   - `isValid`: `true` if the string passes validation, otherwise `false`.
 *   - `errorMessage`: Error message if validation fails, otherwise `null`.
 *
 * @example
 * // Simple validation with default messages
 * isString({ element: "hello" });
 *
 * @example
 * // Validate a required string with minimum and maximum length
 * isString({
 *   element: "hello",
 *   config: { required: true, minLength: 3, maxLength: 10 },
 * });
 *
 * @example
 * // Validate a string against a pattern
 * isString({
 *   element: "123-456-7890",
 *   config: { pattern: /^\d{3}-\d{3}-\d{4}$/, customMessage: { pattern: "The string must be in the format XXX-XXX-XXXX." } },
 * });
 *
 * @example
 * // Custom validation with debug enabled
 * isString({
 *   element: "TestString",
 *   config: {
 *     required: true,
 *     maxLength: 15,
 *     minLength: 5,
 *   },
 *   callback: (result) => console.log(result),
 *   debug: true,
 * });
 */

export function isString({ element, config = {}, callback = null, debug = false }) {
    const defaultMessages = {
        required: "The string cannot be empty.",
        minLength: `The string must be at least ${config.minLength} characters long.`,
        maxLength: `The string cannot be longer than ${config.maxLength} characters.`,
        pattern: "The string format is invalid.",
    };

    let isValid = true;
    let errorMessage = null;

    // Validación: requerido
    if (config.required && (!element || element.trim() === "")) {
        isValid = false;
        errorMessage = (config.customMessage?.required) || defaultMessages.required;
    }

    // Validación: longitud mínima
    if (isValid && config.minLength && element.length < config.minLength) {
        isValid = false;
        errorMessage = (config.customMessage?.minLength) || defaultMessages.minLength;
    }

    // Validación: longitud máxima
    if (isValid && config.maxLength && element.length > config.maxLength) {
        isValid = false;
        errorMessage = (config.customMessage?.maxLength) || defaultMessages.maxLength;
    }

    // Validación: patrón
    if (isValid && config.pattern && !config.pattern.test(element)) {
        isValid = false;
        errorMessage = (config.customMessage?.pattern) || defaultMessages.pattern;
    }

    const result = { isValid, errorMessage };
    handleDebug({ element, config, result, debug });
    return handleValidationResult(result, callback);
}
