import "./../scss/style.scss";
import Form from './utils/Form'
import { isString } from "./utils/isString";
import { isEmail } from "./utils/isEmail";


document.addEventListener("DOMContentLoaded", () => {
    const formElement = document.querySelector("#signin");

    new Form({
        element: formElement,
        submitButtonSelector: ".submit", // Selector del botón
        fields: [
            {
                element: document.querySelector("#job_title"),
                validationFunction: isString,
                config: {
                    required: true,
                    minLength: 3,
                    customMessage: {
                        required: "Job Title cannot be empty.",
                        minLength: "Job Title must be at least 3 characters long.",
                    },
                },
                on: "blur",
            },
            {
                element: document.querySelector("#job_description"),
                validationFunction: isString,
                config: {
                    required: true,
                    minLength: 10,
                    customMessage: {
                        required: "Job Description cannot be empty.",
                        minLength: "Job Description must be at least 10 characters long.",
                    },
                },
                on: "blur",
            },
        ],
        onSubmit: () => {
            console.log("Submit button clicked. Validating fields...");
        },
        onComplete: () => {
            console.log("All fields are valid! Form is ready to be submitted.");
        },
        onError: (invalidFields) => {
            console.error("Form contains errors:", invalidFields);
        },
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const formElement = document.querySelector("#submitForm");

    new Form({
        element: formElement,
        submitButtonSelector: ".submit", // Selector del botón que dispara la validación
        fields: [
            {
                element: document.querySelector("#user_name"),
                validationFunction: isString,
                config: {
                    required: true,
                    minLength: 3,
                    customMessage: {
                        required: "User Name cannot be empty.",
                        minLength: "User Name must be at least 3 characters long.",
                    },
                },
                on: null, // Desactivar la validación en blur
            },
            {
                element: document.querySelector("#user_email"),
                validationFunction: isEmail,
                config: {
                    required: true,
                    customMessage: {
                        invalid: "Please enter a valid email address.",
                        required: "Email cannot be empty.",
                    },
                },
                on: null, // Desactivar la validación en blur
            },
        ],
        onSubmit: () => {
            console.log("Submit button clicked. Validating fields...");
        },
        onComplete: () => {
            console.log("All fields are valid! Form is ready to be submitted.");
        },
        onError: (invalidFields) => {
            console.error("Form contains errors:", invalidFields);
        },
    });
});