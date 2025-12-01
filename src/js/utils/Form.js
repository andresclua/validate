import {
    isString,
    isEmail,
    isNumber,
    isSelect,
    isCheckbox,
    isRadio,
    isFile,
} from "@andresclua/validate";

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

        // ---------- CONFIG ----------
        this.fields = fields;
        this.onSubmit = onSubmit;
        this.onComplete = onComplete;
        this.onError = onError;

        // ---------- DOM ----------
        this.DOM = {
            form: element,
            submitButton: submitButtonSelector
                ? document.querySelector(submitButtonSelector)
                : null,
        };

        // ---------- VALIDATORS ----------
        this.validators = {
            isString,
            isEmail,
            isNumber,
            isSelect,
            isCheckbox,
            isRadio,
            isFile,
            ...validators,
        };

        // Track listeners to remove them later
        this._listeners = [];

        // ---------- INIT / EVENTS ----------
        this.init();
        this.events();
    }

    // ---------------- INIT ----------------
    init() {
        this.initializeFields();
    }

    // ---------------- EVENTS ----------------
    events() {
        this.initializeSubmit();
    }

    // ---------------- VALIDATOR RESOLUTION ----------------
    getValidator(validationFunction) {
        if (typeof validationFunction === "function") return validationFunction;

        if (typeof validationFunction === "string") {
            const fn = this.validators[validationFunction];
            if (!fn) throw new Error(`Validator "${validationFunction}" is not registered.`);
            return fn;
        }

        throw new Error("validationFunction must be a function or a string key.");
    }

    // ---------------- FIELDS ----------------
    initializeFields() {
        this.fields.forEach((field) => {
            const { element, validationFunction, config, on } = field;

            if (!element) throw new Error("Each field must have an element.");
            if (!validationFunction) throw new Error("A validation function is required.");

            const validator = this.getValidator(validationFunction);
            const eventType = on || "blur";

            const handler = () => {
                const result = validator({
                    element: element.value,
                    config,
                });
                this.updateFieldState(element, result);
            };

            element.addEventListener(eventType, handler);

            // Store reference for destroy()
            this._listeners.push({
                target: element,
                event: eventType,
                handler,
            });
        });
    }

    updateFieldState(element, result) {
        const wrapper = element.closest(".c--form-input-a");
        const formGroup = element.closest(".c--form-group-a");
        let errorSpan = formGroup?.querySelector(".c--form-error-a");

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
        if (this.DOM.submitButton) {
            const handler = (event) => {
                event.preventDefault();
                this.handleValidation();
            };

            this.DOM.submitButton.addEventListener("click", handler);

            this._listeners.push({
                target: this.DOM.submitButton,
                event: "click",
                handler,
            });
        }

        const formHandler = (event) => {
            event.preventDefault();
            this.handleValidation();
        };

        this.DOM.form.addEventListener("submit", formHandler);

        this._listeners.push({
            target: this.DOM.form,
            event: "submit",
            handler: formHandler,
        });
    }

    handleValidation() {
        if (this.onSubmit) this.onSubmit();

        const invalidFields = this.validateAllFields();

        if (invalidFields.length === 0) {
            if (this.onComplete) this.onComplete();
        } else {
            if (this.onError) this.onError(invalidFields);
        }
    }

    // ---------------- DESTROY ----------------
    destroy() {
        // Remove all listeners
        this._listeners.forEach(({ target, event, handler }) => {
            target.removeEventListener(event, handler);
        });

        this._listeners = [];

        // Optional: clear DOM references if desired
        // this.DOM = null;

        // Optional: clear callbacks
        // this.onSubmit = null;
        // this.onComplete = null;
        // this.onError = null;
    }
}

export default Form;
