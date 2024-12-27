import "./../scss/style.scss";
import { isRadio } from "./utils/isRadio";

// Example for radio buttons with validation after change
document.addEventListener("DOMContentLoaded", () => {
    const radios = document.querySelectorAll("#radioForm .c--form-radio-a__item");
    const formWrapper = document.querySelector(".c--form-group-a");

    let errorSpan = formWrapper.querySelector(".c--form-error-a");
    if (!errorSpan) {
        errorSpan = document.createElement("span");
        errorSpan.classList.add("c--form-error-a");
        errorSpan.style.display = "none";
        formWrapper.appendChild(errorSpan);
    }

    const validateRadios = () => {
        isRadio({
            elements: radios,
            config: {
                customMessage: {
                    required: "Please select an option.",
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

    // Add event 'change' for each radio button
    radios.forEach(radio => {
        radio.addEventListener("change", validateRadios);
    });
});

// Example for radio buttons with validation on submit
document.addEventListener("DOMContentLoaded", () => {
    const radios = document.querySelectorAll("#submitRadioForm .c--form-radio-a__item");
    const formWrapper = document.querySelector("#submitRadioForm");
    const submitButton = document.getElementById("radioSubmit");

    let errorSpan = formWrapper.querySelector(".c--form-error-a");
    if (!errorSpan) {
        errorSpan = document.createElement("span");
        errorSpan.classList.add("c--form-error-a");
        errorSpan.style.display = "none";
        formWrapper.appendChild(errorSpan);
    }

    const validateRadios = () => {
        const result = isRadio({
            elements: radios,
            config: {
                customMessage: {
                    required: "Please select an option before submitting.",
                }
            },
            debug: true // Set to false in production
        });

        if (result.isValid) {
            errorSpan.style.display = "none";
            errorSpan.textContent = "";
            alert("Thank you for your selection!");
        } else {
            errorSpan.textContent = result.errorMessage;
            errorSpan.style.display = "block";
        }
    };

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        validateRadios();
    });
});
