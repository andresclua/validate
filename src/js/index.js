import "./../scss/style.scss";
import { isEmail } from "./utils/isEmail";
import { isString } from "./utils/isString";

document.addEventListener("DOMContentLoaded", () => {
    
    
    // Email Validation
    const emailInput = document.querySelector("#email");
    const emailWrapper = emailInput ? emailInput.closest(".c--form-input-a") : null;
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
                },
            });
            if (emailErrorSpan) {
                emailErrorSpan.textContent = result.errorMessage;
                emailErrorSpan.style.display = "block";
            }
        });
    }

    // Username Validation
    const usernameInput = document.querySelector("#username");
    const usernameWrapper = usernameInput ? usernameInput.closest(".c--form-input-a") : null;
    const usernameErrorSpan = usernameInput ? usernameInput.closest(".c--form-group-a")?.querySelector(".c--form-error-a") : null;

    if (usernameInput) {
        usernameInput.addEventListener("blur", () => {
            const result = isString({
                element: usernameInput.value,
                config: {
                    required: true,
                    minLength: 6,
                    customMessage: {
                        required: "Username cannot be empty.",
                        minLength: "Username must have at least 6 characters.",
                    },
                },
            });

            if (result.isValid) {
                usernameWrapper?.classList.remove("c--form-input-a--error");
                usernameWrapper?.classList.add("c--form-input-a--valid");
                if (usernameErrorSpan) {
                    usernameErrorSpan.textContent = "";
                    usernameErrorSpan.style.display = "none";
                }
            } else {
                usernameWrapper?.classList.add("c--form-input-a--error");
                usernameWrapper?.classList.remove("c--form-input-a--valid");
                if (usernameErrorSpan) {
                    usernameErrorSpan.textContent = result.errorMessage;
                    usernameErrorSpan.style.display = "block";
                }
            }
        });
    }

    // Submit Button Validation
    const submitButton = document.querySelector(".btn");
    // if (submitButton) {
    //     submitButton.addEventListener("click", (event) => {
    //         event.preventDefault(); // Prevenir envío por defecto

    //         const emailResult = isEmail({ element: emailInput?.value || "", config: { type: "corporate" } });
    //         const usernameResult = isString({
    //             element: usernameInput?.value || "",
    //             config: {
    //                 required: true,
    //                 minLength: 6,
    //                 customMessage: "Username must be at least 6 characters long.",
    //             },
    //         });

    //         if (emailResult.isValid && usernameResult.isValid) {
    //             console.log("Form submitted successfully!");
    //         } else {
    //             console.log("Please fix the errors before submitting.");
    //         }
    //     });
    // }
});

