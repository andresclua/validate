import "./../scss/style.scss";
import { isEmail } from "./utils/isEmail";


document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.querySelector("#email");

    if (!emailInput) return; // Salir si no existe el input

    const emailWrapper = emailInput.closest(".c--form-input-a"); // Contenedor del input
    const emailFormGroup = emailInput.closest(".c--form-group-a"); // Contenedor general
    let emailErrorSpan = emailFormGroup?.querySelector(".c--form-error-a"); // Buscar el span existente

    // Crear dinámicamente el span de error si no existe
    if (!emailErrorSpan && emailFormGroup) {
        emailErrorSpan = document.createElement("span");
        emailErrorSpan.classList.add("c--form-error-a");
        emailErrorSpan.style.display = "none"; // Ocultarlo inicialmente
        emailFormGroup.appendChild(emailErrorSpan); // Añadir al contenedor del formulario
    }

    emailInput.addEventListener("blur", () => {
        const result = isEmail({
            element: emailInput.value,
            config: {
                type: "corporate",
                customMessage: {
                    invalid: "Please enter a valid email address.",
                },
            },
        });

        if (result.isValid) {
            // Si es válido, eliminar errores y limpiar el mensaje
            emailWrapper?.classList.remove("c--form-input-a--error");
            emailWrapper?.classList.add("c--form-input-a--valid");
            if (emailErrorSpan) {
                emailErrorSpan.textContent = "";
                emailErrorSpan.style.display = "none";
            }
        } else {
            // Si no es válido, mostrar el error
            emailWrapper?.classList.add("c--form-input-a--error");
            emailWrapper?.classList.remove("c--form-input-a--valid");
            if (emailErrorSpan) {
                emailErrorSpan.textContent = result.errorMessage;
                emailErrorSpan.style.display = "block";
            }
        }
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.querySelector("#email2");
    const emailWrapper = emailInput ? emailInput.closest(".c--form-input-a") : null;
    const emailErrorSpan = emailInput
        ? emailInput.closest(".c--form-group-a")?.querySelector(".c--form-error-a")
        : null;
    const submitButton = document.querySelector("#submitEmail");

    if (submitButton) {
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

            if (emailInput) {
                const result = isEmail({
                    element: emailInput.value,
                    config: {
                        customMessage: {
                       
                            invalid: "Please enter a valid email address!!",
                        },
                    },
                });

                if (result.isValid) {
                    // Validación exitosa: aplicar estilos y limpiar errores
                    emailWrapper?.classList.add("c--form-input-a--valid");
                    emailWrapper?.classList.remove("c--form-input-a--error");
                    if (emailErrorSpan) {
                        emailErrorSpan.textContent = "";
                        emailErrorSpan.style.display = "none";
                    }
                    console.log("Email is valid!");
                } else {
                    // Validación fallida: mostrar mensaje de error
                    emailWrapper?.classList.add("c--form-input-a--error");
                    emailWrapper?.classList.remove("c--form-input-a--valid");
                    if (emailErrorSpan) {
                        emailErrorSpan.textContent = result.errorMessage;
                        emailErrorSpan.style.display = "block";
                    }
                    console.log("Email is invalid:", result.errorMessage);
                }
            }
        });
    }
});
