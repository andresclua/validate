import { handleDebug, handleValidationResult } from "@js/utils/helper.js";
/**
 * Validates if a value meets specific numerical validation rules.
 *
 * @param {Object} options - Configuration parameters for the validation.
 * @param {string|number} options.element - The value to validate.
 * @param {Object} [options.config={}] - Configuration object for custom validation.
 * @param {boolean} [options.config.required=false] - Whether the value is required.
 * @param {boolean} [options.config.positive=false] - Ensures the value is positive.
 * @param {boolean} [options.config.negative=false] - Ensures the value is negative.
 * @param {boolean} [options.config.integer=false] - Ensures the value is an integer.
 * @param {number} [options.config.min] - Minimum value allowed.
 * @param {number} [options.config.max] - Maximum value allowed.
 * @param {number} [options.config.length] - Exact number of digits the value must have.
 * @param {Object} [options.config.customMessage] - Custom error messages for validation:
 *   - `required`: Custom message for when the value is required.
 *   - `invalid`: Custom message for invalid number format.
 *   - `positive`: Custom message for positive number validation failure.
 *   - `negative`: Custom message for negative number validation failure.
 *   - `integer`: Custom message for integer validation failure.
 *   - `min`: Custom message for minimum value validation failure.
 *   - `max`: Custom message for maximum value validation failure.
 *   - `length`: Custom message for exact length validation failure.
 * @param {Function} [options.config.customValidation] - Custom validation function that receives the number as an argument.
 *   - Should return an object: `{ isValid: boolean, errorMessage: string }`.
 * @param {Function|null} [options.callback=null] - Callback function to handle the validation result.
 * @param {boolean} [options.debug=false] - If true, enables debug mode to log additional information.
 *
 * @returns {Object} - Validation result object:
 *   - `isValid`: `true` if the value passes validation, otherwise `false`.
 *   - `errorMessage`: Error message if validation fails, otherwise `null`.
 *
 * @example
 * // Simple validation with default messages
 * isNumber({ element: "42" });
 *
 * @example
 * // Validate a positive integer
 * isNumber({
 *   element: "-5",
 *   config: { positive: true, integer: true },
 * });
 *
 * @example
 * // Validate a required value within a range
 * isNumber({
 *   element: "10",
 *   config: { required: true, min: 5, max: 15 },
 * });
 *
 * @example
 * // Custom validation and messages
 * isNumber({
 *   element: "100",
 *   config: {
 *     min: 50,
 *     max: 200,
 *     customMessage: {
 *       min: "The value is too small.",
 *       max: "The value is too large.",
 *     },
 *     customValidation: (num) => ({
 *       isValid: num % 2 === 0,
 *       errorMessage: "The value must be even.",
 *     }),
 *   },
 *   callback: (result) => console.log(result),
 *   debug: true,
 * });
 */
export function isNumber({ element, config = {}, callback = null, debug = false }) {
    const defaultMessages = {
        required: "The value is required.",
        invalid: "The value must be a valid number.",
        positive: "The value must be positive.",
        negative: "The value must be negative.",
        integer: "The value must be an integer.",
        min: `The value must be greater than or equal to ${config.min}.`,
        max: `The value must be less than or equal to ${config.max}.`,
        length: `The value must have exactly ${config.length} digits.`,
    };

    let isValid = true;
    let errorMessage = null;

    // Validación: requerido
    if (config.required && (element === null || element === undefined || element === "")) {
        isValid = false;
        errorMessage = config.customMessage?.required || defaultMessages.required;
    }

    // Validación: número válido
    if (isValid && isNaN(Number(element))) {
        isValid = false;
        errorMessage = config.customMessage?.invalid || defaultMessages.invalid;
    }

    // Validación: positivo
    if (isValid && config.positive && Number(element) <= 0) {
        isValid = false;
        errorMessage = config.customMessage?.positive || defaultMessages.positive;
    }

    // Validación: negativo
    if (isValid && config.negative && Number(element) >= 0) {
        isValid = false;
        errorMessage = config.customMessage?.negative || defaultMessages.negative;
    }

    // Validación: entero
    if (isValid && config.integer && !Number.isInteger(Number(element))) {
        isValid = false;
        errorMessage = config.customMessage?.integer || defaultMessages.integer;
    }

    // Validación: mínimo
    if (isValid && config.min !== undefined && Number(element) < config.min) {
        isValid = false;
        errorMessage = config.customMessage?.min || defaultMessages.min;
    }

    // Validación: máximo
    if (isValid && config.max !== undefined && Number(element) > config.max) {
        isValid = false;
        errorMessage = config.customMessage?.max || defaultMessages.max;
    }

    // Validación: longitud exacta
    if (isValid && config.length !== undefined && String(element).replace('.', '').length !== config.length) {
        isValid = false;
        errorMessage = config.customMessage?.length || defaultMessages.length;
    }

    // Validación personalizada
    if (isValid && typeof config.customValidation === "function") {
        const customResult = config.customValidation(Number(element));
        if (!customResult.isValid) {
            isValid = false;
            errorMessage = customResult.errorMessage;
        }
    }

    const result = { isValid, errorMessage };
    handleDebug({ element, config, result, debug });
    return handleValidationResult(result, callback);
}
