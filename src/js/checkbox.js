import "./../scss/style.scss";
import { isCheckbox } from "./utils/isCheckbox";


document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll("#blur .c--form-checkbox-a__item");
    const formWrapper = document.querySelector(".c--form-group-a");

    let errorSpan = formWrapper.querySelector(".c--form-error-a");
    if (!errorSpan) {
        errorSpan = document.createElement("span");
        errorSpan.classList.add("c--form-error-a");
        errorSpan.style.display = "none";
        formWrapper.appendChild(errorSpan);
    }

    const validateCheckboxes = () => {
        isCheckbox({
            elements: checkboxes,
            config: {
                minRequired: 2,
                customMessage: {
                    minRequired: "At least two options must be selected.",
                },
            },
            callback: (result) => {
                if (result.isValid) {
                    errorSpan.style.display = "none";
                    errorSpan.textContent = "";
                } else {
                    errorSpan.textContent = result.errorMessage;
                    errorSpan.style.display = "block";
                }
            },
            debug: true // Set this to false in production
        });
    };

    // Add event 'change' for each checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", validateCheckboxes);
    });
});



document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar sólo los checkboxes dentro del contenedor #clickForm
    const checkboxes = document.querySelectorAll("#clickForm .c--form-checkbox-a__item");
    const formWrapper = document.querySelector("#clickForm");
    const submitButton = document.getElementById("flavoursubmit");

    // Verificar si ya existe un span de error, y si no, crearlo
    let errorSpan = formWrapper.querySelector(".c--form-error-a");
    if (!errorSpan) {
        errorSpan = document.createElement("span");
        errorSpan.classList.add("c--form-error-a");
        errorSpan.style.display = "none";
        formWrapper.appendChild(errorSpan);
    }

    // Función para validar los checkboxes
    const validateCheckboxes = () => {
        const result = isCheckbox({
            elements: checkboxes,
            config: {
                minRequired: 2,
                customMessage: {
                    minRequired: "Please select at least two flavors.",
                }
            },
            debug: true // Cambiar a false en producción
        });

        // Mostrar u ocultar el mensaje de error basado en la validación
        if (result.isValid) {
            errorSpan.style.display = "none";
            errorSpan.textContent = "";
            alert("Thank you for your selection!");  // Mensaje opcional de éxito o proceder con el envío
        } else {
            errorSpan.textContent = result.errorMessage;
            errorSpan.style.display = "block";
        }
    };

    // Agregar listener para el botón de submit
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();  // Prevenir el envío tradicional del formulario
        validateCheckboxes();
    });
});

