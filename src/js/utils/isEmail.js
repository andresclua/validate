import { handleDebug, handleValidationResult } from "@js/utils/helper.js";

export function isEmail({ element, config = {}, callback = null, debug = false }) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const corporateRegex = /^[^\s@]+@(?!gmail\.com|yahoo\.com|outlook\.com)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    const defaultMessages = {
        corporate: "The email must be corporate (no generic domains like Gmail).",
        invalid: "Invalid email format.",
    };

    const isValid = config.type === "corporate"
        ? corporateRegex.test(element)
        : emailRegex.test(element);

    let errorMessage = null;
    if (!isValid) {
        errorMessage = config.type === "corporate"
            ? config.customMessage || defaultMessages.corporate
            : config.customMessage || defaultMessages.invalid;
    }

    const result = { isValid, errorMessage };
    handleDebug({ element, config, result, debug });
    return handleValidationResult(result, callback);
}
