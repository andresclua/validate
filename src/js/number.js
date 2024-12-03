import "./../scss/style.scss";
import { isNumber } from "./utils/isNumber";

document.addEventListener("DOMContentLoaded", () => {
    const numberInput = document.querySelector("#number");

    if (!numberInput) return; // Asegurarse de que el elemento existe

    const numberWrapper = numberInput.closest(".c--form-input-a");
    let numberErrorSpan = numberWrapper?.querySelector(".c--form-error-a");

    // Crear dinámicamente el span de error si no existe
    if (!numberErrorSpan && numberWrapper) {
        numberErrorSpan = document.createElement("span");
        numberErrorSpan.classList.add("c--form-error-a");
        numberErrorSpan.style.display = "none"; // Ocultar inicialmente
        numberWrapper.parentNode.appendChild(numberErrorSpan); // Añadir al DOM
    }

    // Función de manejo de estado visual 
    // deberia poder usarse con jsutils
    const updateFieldState = ({ isValid, errorMessage }) => {
        if (isValid) {
            numberWrapper?.classList.remove("c--form-input-a--error");
            numberWrapper?.classList.add("c--form-input-a--valid");
            if (numberErrorSpan) {
                numberErrorSpan.textContent = "";
                numberErrorSpan.style.display = "none";
            }
        } else {
            numberWrapper?.classList.add("c--form-input-a--error");
            numberWrapper?.classList.remove("c--form-input-a--valid");
            if (numberErrorSpan) {
                numberErrorSpan.textContent = errorMessage;
                numberErrorSpan.style.display = "block";
            }
        }
    };

    // Evento blur para validación
    numberInput.addEventListener("blur", () => {
        const result = isNumber({
            element: numberInput.value,
            config: {
                required: true,
                positive: true,
                integer: true,
                min: 1,
                max: 9999,
                customMessage: {
                    required: "This field is mandatory.",
                    positive: "The number must be positive.",
                    integer: "Please provide an integer.",
                    min: "The number must be at least 1000.",
                    max: "The number must not exceed 9999.",
                },
                customValidation: (value) => {
                    const isValid = value % 2 === 0; // Validación personalizada: número par
                    return {
                        isValid,
                        errorMessage: isValid
                            ? null
                            : "The number must be even.",
                    };
                },
            },
        });

        updateFieldState(result);
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const numberInput = document.querySelector("#number2");
    const submitButton = document.querySelector("#submitNumber");

    if (!numberInput || !submitButton) return; // Ensure elements exist

    const numberWrapper = numberInput.closest(".c--form-input-a");
    let numberErrorSpan = numberWrapper?.querySelector(".c--form-error-a");

    // Dynamically create error span if it doesn't exist
    if (!numberErrorSpan && numberWrapper) {
        numberErrorSpan = document.createElement("span");
        numberErrorSpan.classList.add("c--form-error-a");
        numberErrorSpan.style.display = "none"; // Initially hidden
        numberWrapper.parentNode.appendChild(numberErrorSpan); // Add to DOM
    }

    // Add click event listener to the button
    submitButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default form submission

        const result = isNumber({
            element: numberInput.value,
            config: {
                required: true,
                positive: true,
                integer: true,
                min: 1000,
                max: 9999,
                customMessage: {
                    required: "This field is mandatory.",
                    positive: "The number must be positive.",
                    integer: "Please provide an integer.",
                    min: "The number must be at least 1000.",
                    max: "The number must not exceed 9999.",
                },
                // customValidation: (value) => {
                //     const isValid = value % 2 === 0; // Must be an even number
                //     return {
                //         isValid,
                //         errorMessage: isValid
                //             ? null
                //             : "The number must be even.",
                //     };
                // },
            },
        });

        // Handle the validation result
        if (result.isValid) {
            // Validation passed
            numberWrapper?.classList.remove("c--form-input-a--error");
            numberWrapper?.classList.add("c--form-input-a--valid");
            if (numberErrorSpan) {
                numberErrorSpan.textContent = "";
                numberErrorSpan.style.display = "none";
            }
            console.log("Number is valid:", numberInput.value);
        } else {
            // Validation failed
            numberWrapper?.classList.add("c--form-input-a--error");
            numberWrapper?.classList.remove("c--form-input-a--valid");
            if (numberErrorSpan) {
                numberErrorSpan.textContent = result.errorMessage;
                numberErrorSpan.style.display = "block";
            }
            console.log("Number is invalid:", result.errorMessage);
        }
    });
});
