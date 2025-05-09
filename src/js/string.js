import "./../scss/style.scss";
import { isString } from "./utils/isString";


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
                    required: "This field is required",
                    minLength: "The input must be at least 4 characters long",
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


// Email Validation

document.addEventListener("DOMContentLoaded", () => {
    const firstNameInput = document.querySelector("#username");

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

    // string bad words
    firstNameInput.addEventListener("blur", () => {
        // Captura el valor actual del input
        const inputText = firstNameInput.value;

        // Uso de la validación con la función personalizada
        const result = isString({
            element: inputText, // Usamos el valor del input
            config: {
                customValidation: (element) => {
                 
        
                    // Ajustamos la expresión regular para asegurarnos de que solo las palabras exactas se detecten
                    const regex = new RegExp(`\\b(${forbiddenWords.join('|')})\\b`, 'i'); // \b asegura que se detecten solo palabras completas
        
                    // Si el input contiene cualquiera de las palabras prohibidas, la validación falla
                    if (regex.test(element)) {
                        return {
                            isValid: false,
                            errorMessage: "The field contains prohibited words.",
                        };
                    }
        
                    // Si no contiene palabras prohibidas, la validación es exitosa
                    return { isValid: true, errorMessage: null };
                },
            },
            callback: (result) => console.log(result), // Muestra el resultado
            debug: true,
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