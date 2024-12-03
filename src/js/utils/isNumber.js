import { handleDebug, handleValidationResult } from "@js/utils/helper.js";

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
