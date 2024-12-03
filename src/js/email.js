import "./../scss/style.scss";
import { isEmail } from "./utils/isEmail";


// Email Validation
document.addEventListener("DOMContentLoaded", () => {
    
    const emailInput = document.querySelector("#email");
    const emailErrorSpan = emailInput ? emailInput.closest(".c--form-group-a")?.querySelector(".c--form-error-a") : null;

    if (emailInput) {
        emailInput.addEventListener("blur", () => {
            const result = isEmail({
                element: emailInput.value,
                config: {
                    type: "corporate",
                    customMessage: {
                        corporate: "This email must belong to your company domain.",
                        invalid: "Please enter a valid email address.",
                    },
                    customValidation: (value) => {
                        // Validación personalizada: el email debe contener "company"
                        const isValid = value.includes("company");
                        return {
                            isValid,
                            errorMessage: isValid
                                ? null
                                : "The email must include 'company' in the address.",
                        };
                    },
                },
            });
            if (emailErrorSpan) {
                emailErrorSpan.textContent = result.errorMessage;
                emailErrorSpan.style.display = "block";
            }
        });
    }

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
                        type: "corporate",
                        customMessage: {
                            corporate: "This email must belong to your company domain.",
                            invalid: "Please enter a valid email address.",
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
