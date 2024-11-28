// Manejo centralizado de debugging
export function handleDebug({ element, config, result, debug }) {
    if (debug) {
        console.log("Validation Debugging:");
        console.log(`Element: ${element}`);
        console.log(`Configuration:`, config);
        console.log(`Result: ${result.isValid}`);
        if (!result.isValid) console.log(`Error: ${result.errorMessage}`);
    }
}

// Manejo centralizado de callbacks
export function handleValidationResult(result, callback) {
    if (callback && typeof callback === "function") {
        callback(result);
    }
    return result;
}
