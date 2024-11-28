import { handleDebug, handleValidationResult } from "@js/utils/helper.js";

export function isString({ element, config = {}, callback = null, debug = false }) {
    const defaultMessages = {
        required: "The string cannot be empty.",
        minLength: `The string must be at least ${config.minLength} characters long.`,
        maxLength: `The string cannot be longer than ${config.maxLength} characters.`,
        pattern: "The string format is invalid.",
    };

    let isValid = true;
    let errorMessage = null;

    if (config.required && (!element || element.trim() === "")) {
        isValid = false;
        errorMessage = config.customMessage || defaultMessages.required;
    }

    if (isValid && config.minLength && element.length < config.minLength) {
        isValid = false;
        errorMessage = config.customMessage || defaultMessages.minLength;
    }

    if (isValid && config.maxLength && element.length > config.maxLength) {
        isValid = false;
        errorMessage = config.customMessage || defaultMessages.maxLength;
    }

    if (isValid && config.pattern && !config.pattern.test(element)) {
        isValid = false;
        errorMessage = config.customMessage || defaultMessages.pattern;
    }

    const result = { isValid, errorMessage };
    handleDebug({ element, config, result, debug });
    return handleValidationResult(result, callback);
}
