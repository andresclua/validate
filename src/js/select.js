import "./../scss/style.scss";
import { isSelect } from "./utils/isSelect";

document.addEventListener("DOMContentLoaded", () => {
    const selectElement = document.querySelector("#country");
    const selectWrapper = selectElement ? selectElement.closest(".c--form-select-a") : null;
    const selectErrorSpan = selectElement
        ? selectElement.closest(".c--form-group-a")?.querySelector(".c--form-error-a")
        : null;

    if (selectElement) {
        selectElement.addEventListener("change", () => {
            const result = isSelect({
                element: selectElement.value, // Valor seleccionado del `<select>`
                config: {
                    required: true,
                    customMessage: {
                        required: "You must select a country.",
                    },
                },
                debug: true, // Habilitar debugging
            });

            // Actualizar la interfaz según el resultado de la validación
            if (result.isValid) {
                selectWrapper?.classList.add("c--form-select-a--valid");
                selectWrapper?.classList.remove("c--form-select-a--error");
                if (selectErrorSpan) {
                    selectErrorSpan.textContent = "";
                    selectErrorSpan.style.display = "none";
                }
                console.log("The selected option is valid!");
            } else {
                selectWrapper?.classList.add("c--form-select-a--error");
                selectWrapper?.classList.remove("c--form-select-a--valid");
                if (selectErrorSpan) {
                    selectErrorSpan.textContent = result.errorMessage;
                    selectErrorSpan.style.display = "block";
                }
                console.error("Error:", result.errorMessage);
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const selectElement = document.querySelector("#skills");
    const selectWrapper = selectElement ? selectElement.closest(".c--form-select-a") : null;
    const selectErrorSpan = selectElement
        ? selectElement.closest(".c--form-group-a")?.querySelector(".c--form-error-a")
        : null;
    const submitButton = document.querySelector("#validateSkills");

    if (submitButton) {
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); // Evitar el comportamiento por defecto del botón

            const result = isSelect({
                element: selectElement.value, // Valor seleccionado del `<select>`
                config: {
                    required: true,
                    customMessage: {
                        required: "You must select a skill.",
                    },
                },
                debug: true, // Mostrar mensajes de depuración
            });

            if (result.isValid) {
                // Validación exitosa: aplicar estilos y limpiar errores
                selectWrapper?.classList.add("c--form-select-a--valid");
                selectWrapper?.classList.remove("c--form-select-a--error");
                if (selectErrorSpan) {
                    selectErrorSpan.textContent = "";
                    selectErrorSpan.style.display = "none";
                }
                console.log("The selected skill is valid!");
            } else {
                // Validación fallida: mostrar mensaje de error
                selectWrapper?.classList.add("c--form-select-a--error");
                selectWrapper?.classList.remove("c--form-select-a--valid");
                if (selectErrorSpan) {
                    selectErrorSpan.textContent = result.errorMessage;
                    selectErrorSpan.style.display = "block";
                }
                console.error("Error:", result.errorMessage);
            }
        });
    }
});