import { handleDebug, handleValidationResult } from "@js/utils/helper.js";

/**
 * Validates if an email address meets specific validation rules.
 *
 * @param {Object} options - Configuration parameters for the validation.
 * @param {string} options.element - The email address to validate.
 * @param {Object} [options.config={}] - Configuration object for custom validation.
 * @param {string} [options.config.type] - Type of validation. Possible values:
 *   - "corporate": Ensures the email is not from generic domains like Gmail, Yahoo, etc.
 * @param {Object} [options.config.customMessage] - Custom error messages for validation:
 *   - `corporate`: Custom message for corporate email validation failure.
 *   - `invalid`: Custom message for invalid email format.
 * @param {Function} [options.config.customValidation] - Custom validation function that receives the email as an argument.
 *   - Should return an object: `{ isValid: boolean, errorMessage: string }`.
 * @param {Function|null} [options.callback=null] - Callback function to handle the validation result.
 * @param {boolean} [options.debug=false] - If true, enables debug mode to log additional information.
 *
 * @returns {Object} - Validation result object:
 *   - `isValid`: `true` if the email passes validation, otherwise `false`.
 *   - `errorMessage`: Error message if validation fails, otherwise `null`.
 *
 * @example
 * Simple validation with default messages
 * isEmail({ element: "test@example.com" });
 *
 * @example
 * Corporate email validation
 * isEmail({ element: "user@company.com", config: { type: "corporate" } });
 *
 * @example
 * // Custom validation and messages
 * isEmail({
 *   element: "test@example.com",
 *   config: {
 *     type: "corporate",
 *     customMessage: { corporate: "Only company emails are allowed." },
 *     customValidation: (email) => ({
 *       isValid: email.endsWith(".org"),
 *       errorMessage: "Email must end with '.org'.",
 *     }),
 *   },
 *   callback: (result) => console.log(result),
 *   debug: true,
 * });
 */


export function isEmail({ element, config = {}, callback = null, debug = false }) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex básico para validar emails
    const corporateRegex = /^[^\s@]+@(?!gmail\.com|yahoo\.com|outlook\.com)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    const defaultMessages = {
        corporate: "The email must be associated with your company domain. Personal email providers such as Gmail, Yahoo, or Outlook are not permitted",
        invalid: "Please enter a valid email address",
        required: "This field is required",
    };

    let isValid = true;
    let errorMessage = null;

    // Si el campo es requerido y está vacío, marcar como inválido
    if (config.required && !element.trim()) {
        isValid = false;
        errorMessage = config.customMessage?.required || defaultMessages.required;
    }

    // Validación: formato de email
    if (isValid && element && !emailRegex.test(element)) {
        isValid = false;
        errorMessage = config.customMessage?.invalid || defaultMessages.invalid;
    }

    // Validación: tipo corporativo
    if (isValid && config.type === "corporate" && !corporateRegex.test(element)) {
        isValid = false;
        errorMessage = config.customMessage?.corporate || defaultMessages.corporate;
    }

    // Validación personalizada
    if (isValid && config.customValidation) {
        const customResult = config.customValidation(element);
        if (!customResult.isValid) {
            isValid = false;
            errorMessage = customResult.errorMessage;
        }
    }

    const result = { isValid, errorMessage };
    handleDebug({ element, config, result, debug });
    return handleValidationResult(result, callback);
}
