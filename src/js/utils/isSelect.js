import { handleDebug, handleValidationResult } from "@js/utils/helper.js";

export function isSelect({ element, config = {}, callback = null, debug = false }) {
    const defaultMessages = {
        required: "Please select a valid option.",
        customValidation: "The selected option is not allowed.",
    };

    let isValid = true;
    let errorMessage = null;

    // Validación: requerido
    if (config.required && (!element || element === "")) {
        isValid = false;
        errorMessage = config.customMessage?.required || defaultMessages.required;
    }

    // Validación personalizada
    if (isValid && config.customValidation) {
        const customResult = config.customValidation(element);
        if (!customResult.isValid) {
            isValid = false;
            errorMessage =
                customResult.errorMessage || config.customMessage?.customValidation || defaultMessages.customValidation;
        }
    }

    const result = { isValid, errorMessage };

    // Debugging
    handleDebug({ element, config, result, debug });

    // Validación y callback
    return handleValidationResult(result, callback);
}
