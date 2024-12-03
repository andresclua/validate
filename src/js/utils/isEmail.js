import { handleDebug, handleValidationResult } from "@js/utils/helper.js";

export function isEmail({ element, config = {}, callback = null, debug = false }) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const corporateRegex = /^[^\s@]+@(?!gmail\.com|yahoo\.com|outlook\.com)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    const defaultMessages = {
        corporate: "The email must be corporate (no generic domains like Gmail).",
        invalid: "Invalid email format.",
    };

    let isValid = true;
    let errorMessage = null;

    // Validación predeterminada: tipo "corporate"
    if (config.type === "corporate" && !corporateRegex.test(element)) {
        isValid = false;
        errorMessage = config.customMessage?.corporate || defaultMessages.corporate;
    }

    // Validación predeterminada: formato de email
    if (isValid && !emailRegex.test(element)) {
        isValid = false;
        errorMessage = config.customMessage?.invalid || defaultMessages.invalid;
    }

    // Validación personalizada
    if (isValid && typeof config.customValidation === "function") {
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
