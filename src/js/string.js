import "./../scss/style.scss";
import { isString } from "./utils/isString";
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


// Email Validation
document.addEventListener("DOMContentLoaded", () => {
    const firstNameInput = document.querySelector("#firstName");

    if (!firstNameInput) return; // Verificar que el elemento existe

    const firstNameWrapper = firstNameInput.closest(".c--form-input-a");
    let firstNameErrorSpan = firstNameWrapper?.querySelector(".c--form-error-a");

    // Crear dinámicamente el span de error si no existe
    if (!firstNameErrorSpan && firstNameWrapper) {
        firstNameErrorSpan = document.createElement("span");
        firstNameErrorSpan.classList.add("c--form-error-a");
        firstNameErrorSpan.style.display = "none"; // Ocultar inicialmente
        firstNameWrapper.parentNode.appendChild(firstNameErrorSpan); // Añadir al DOM
    }

    // Validar en el evento blur
    firstNameInput.addEventListener("blur", () => {
        const result = isString({
            element: firstNameInput.value,
            config: {
                required: true,
                minLength: 4,
                customMessage: {
                    required: "First Name cannot be empty.",
                    minLength: "First Name must be at least 4 characters long.",
                },
            },
        });

        if (result.isValid) {
            // Si la validación pasa
            firstNameWrapper?.classList.remove("c--form-input-a--error");
            firstNameWrapper?.classList.add("c--form-input-a--valid");
            if (firstNameErrorSpan) {
                firstNameErrorSpan.textContent = "";
                firstNameErrorSpan.style.display = "none";
            }
        } else {
            // Si la validación falla
            firstNameWrapper?.classList.add("c--form-input-a--error");
            firstNameWrapper?.classList.remove("c--form-input-a--valid");
            if (firstNameErrorSpan) {
                firstNameErrorSpan.textContent = result.errorMessage;
                firstNameErrorSpan.style.display = "block";
            }
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.querySelector("#somefield");
    const submitButton = document.querySelector("#submitNumber");

    if (!inputField || !submitButton) return; // Verificar que los elementos existen

    const fieldWrapper = inputField.closest(".c--form-input-a");
    let errorSpan = fieldWrapper?.querySelector(".c--form-error-a");

    // Crear dinámicamente el span de error si no existe
    if (!errorSpan && fieldWrapper) {
        errorSpan = document.createElement("span");
        errorSpan.classList.add("c--form-error-a");
        errorSpan.style.display = "none"; // Ocultar inicialmente
        fieldWrapper.parentNode.appendChild(errorSpan); // Añadir al DOM
    }

    // Evento click para validación
    submitButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del botón

        const result = isString({
            element: inputField.value,
            config: {
                required: true,
                minLength: 4,
                customMessage: {
                    required: "This field cannot be empty.",
                    minLength: "The input must be at least 4 characters long.",
                },
            },
        });

        // Manejar el resultado de la validación
        if (result.isValid) {
            // Validación exitosa
            fieldWrapper?.classList.remove("c--form-input-a--error");
            fieldWrapper?.classList.add("c--form-input-a--valid");
            if (errorSpan) {
                errorSpan.textContent = "";
                errorSpan.style.display = "none";
            }
            console.log("Input is valid:", inputField.value);
        } else {
            // Validación fallida
            fieldWrapper?.classList.add("c--form-input-a--error");
            fieldWrapper?.classList.remove("c--form-input-a--valid");
            if (errorSpan) {
                errorSpan.textContent = result.errorMessage;
                errorSpan.style.display = "block";
            }
            console.log("Input is invalid:", result.errorMessage);
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const jobTitleInput = document.querySelector("#job_title");
    const jobDescriptionInput = document.querySelector("#job_description");
    const submitButton = document.querySelector("#jobsubmition");

    if (!jobTitleInput || !jobDescriptionInput || !submitButton) return; // Verificar que los elementos existen

    // Helper function to validate a field
    const validateField = (input, config) => {
        const wrapper = input.closest(".c--form-input-a");
        let errorSpan = wrapper?.querySelector(".c--form-error-a");

        // Crear el span de error dinámicamente si no existe
        if (!errorSpan && wrapper) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("c--form-error-a");
            errorSpan.style.display = "none"; // Ocultar inicialmente
            wrapper.parentNode.appendChild(errorSpan); // Añadir al DOM
        }

        const result = isString({
            element: input.value,
            config,
        });

        // Manejar el resultado de la validación
        if (result.isValid) {
            wrapper?.classList.remove("c--form-input-a--error");
            wrapper?.classList.add("c--form-input-a--valid");
            if (errorSpan) {
                errorSpan.textContent = "";
                errorSpan.style.display = "none";
            }
        } else {
            wrapper?.classList.add("c--form-input-a--error");
            wrapper?.classList.remove("c--form-input-a--valid");
            if (errorSpan) {
                errorSpan.textContent = result.errorMessage;
                errorSpan.style.display = "block";
            }
        }

        return result.isValid;
    };

    // Evento click para validación de múltiples campos
    submitButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevenir comportamiento predeterminado del botón

        // Configuraciones para cada campo
        const isJobTitleValid = validateField(jobTitleInput, {
            required: true,
            minLength: 3,
            customMessage: {
                required: "Job Title cannot be empty.",
                minLength: "Job Title must be at least 3 characters long.",
            },
        });

        const isJobDescriptionValid = validateField(jobDescriptionInput, {
            required: true,
            minLength: 10,
            customMessage: {
                required: "Job Description cannot be empty.",
                minLength: "Job Description must be at least 10 characters long.",
            },
        });

        // Mostrar mensaje en consola basado en los resultados
        if (isJobTitleValid && isJobDescriptionValid) {
            console.log("Form submitted successfully!");
        } else {
            console.log("Please fix the errors before submitting.");
        }
    });
});