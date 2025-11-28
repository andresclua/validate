import { isString, isEmail,isNumber,isSelect,isCheckbox,isRadio,isFile } from "@andresclua/validate";


class Form {
    constructor({
        element,
        fields,
        submitButtonSelector = null,
        onSubmit = null,
        onComplete = null,
        onError = null,
        validators = {},
    }) {
        if (!element) throw new Error("A form element is required.");

        // Base config
        this.formElement = element;
        this.fields = fields;
        this.onSubmit = onSubmit;
        this.onComplete = onComplete;
        this.onError = onError;

        // Custom submit button (optional)
        this.submitButton = submitButtonSelector
            ? document.querySelector(submitButtonSelector)
            : null;

        // Registry of available validators
        this.validators = {
            isString,
            isEmail,
            // add more native validators here if you want
            ...validators,
        };

        // Standard pattern: only init + events in constructor
        this.init();
        this.events();
    }

    // ---------- INIT ----------

    init() {
        this.initializeFields();
    }

    // ---------- EVENTS ----------

    events() {
        this.initializeSubmit();
    }

    /**
     * Resolves the validation function:
     * - If it's a function → return as is
     * - If it's a string → look it up in this.validators
     */
    getValidator(validationFunction) {
        if (typeof validationFunction === "function") {
            return validationFunction;
        }

        if (typeof validationFunction === "string") {
            const fn = this.validators[validationFunction];
            if (!fn) {
                throw new Error(`Validator "${validationFunction}" is not registered.`);
            }
            return fn;
        }

        throw new Error("validationFunction must be a function or a string key.");
    }

    initializeFields() {
        this.fields.forEach((field) => {
            const { element, validationFunction, config, on } = field;

            if (!element) throw new Error("Each field must have an element.");
            if (!validationFunction) throw new Error("A validation function is required.");

            const validator = this.getValidator(validationFunction);

            element.addEventListener(on || "blur", () => {
                const result = validator({
                    element: element.value,
                    config,
                });

                this.updateFieldState(element, result);
            });
        });
    }

    updateFieldState(element, result) {
        const wrapper = element.closest(".c--form-input-a");
        const formGroup = element.closest(".c--form-group-a");
        let errorSpan = formGroup?.querySelector(".c--form-error-a");

        // Create error span dynamically if it doesn't exist
        if (!errorSpan && formGroup) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("c--form-error-a");
            errorSpan.style.display = "none";
            formGroup.appendChild(errorSpan);
        }

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
    }

    validateAllFields() {
        const invalidFields = [];

        this.fields.forEach((field) => {
            const { element, validationFunction, config } = field;
            const validator = this.getValidator(validationFunction);

            const result = validator({
                element: element.value,
                config,
            });

            this.updateFieldState(element, result);

            if (!result.isValid) {
                invalidFields.push({ element, errorMessage: result.errorMessage });
            }
        });

        return invalidFields;
    }

    initializeSubmit() {
        // Custom submit button
        if (this.submitButton) {
            this.submitButton.addEventListener("click", (event) => {
                event.preventDefault();
                this.handleValidation();
            });
        }

        // Native form submit
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleValidation();
        });
    }

    handleValidation() {
        if (this.onSubmit) {
            this.onSubmit();
        }

        const invalidFields = this.validateAllFields();

        if (invalidFields.length === 0) {
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            if (this.onError) {
                this.onError(invalidFields);
            }
        }
    }
}

export default Form;
