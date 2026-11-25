import { isString } from "./isString";
import { isEmail } from "./isEmail";
import { isNumber } from "./isNumber";
import { isSelect } from "./isSelect";
import { isCheckbox } from "./isCheckbox";
import { isRadio } from "./isRadio";
import { isFile } from "./isFile";

// Class names the helper looks for. Override any of them with the `classNames` option.
const DEFAULT_CLASS_NAMES = {
    group: "c--form-group-a", // wraps label + control + error message
    input: "c--form-input-a", // wrapper that receives the --error / --valid modifiers
    file: "c--form-file-a", // file inputs receive the modifiers directly
    error: "c--form-error-a", // element that shows the error message
};

/**
 * Wires several fields to the validators: validates on blur/change/input, validates
 * everything on submit and toggles `--error` / `--valid` modifiers plus the message.
 *
 * @param {Object} options
 * @param {HTMLFormElement} options.element - The form element.
 * @param {Array} options.fields - Field configs: `{ element | elements, validationFunction, config, on }`.
 * @param {string|Element} [options.submitButtonSelector] - Submit button (selector scoped to the form, or element).
 * @param {Function} [options.beforeSubmit] - Called before validating; return `false` to cancel.
 * @param {Function} [options.onSubmit] - Called when every field is valid.
 * @param {Function} [options.onError] - Called with the list of invalid fields.
 * @param {Object} [options.validators] - Extra validators, usable by name in `validationFunction`.
 * @param {Object} [options.classNames] - Override any of `group`, `input`, `file`, `error`.
 */
export class Form {
    constructor({
        element,
        fields,
        submitButtonSelector = null,
        beforeSubmit = null,
        onSubmit = null,
        onError = null,
        validators = {},
        classNames = {},
    }) {
        if (!element) throw new Error("A form element is required.");

        this.fields = fields || [];
        this.beforeSubmit = beforeSubmit;
        this.onSubmit = onSubmit;
        this.onError = onError;
        this.classNames = { ...DEFAULT_CLASS_NAMES, ...classNames };

        this.DOM = {
            form: element,
            // scoped to the form (important when multiple forms exist)
            submitButton: this.resolveSubmitButton(element, submitButtonSelector),
        };

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

        this.init();
        this.events();
    }

    init() {
        this.initializeFields();
    }

    events() {
        this.initializeSubmit();
    }

    getValidator(validationFunction) {
        if (typeof validationFunction === "function") return validationFunction;

        if (typeof validationFunction === "string") {
            const fn = this.validators[validationFunction];
            if (!fn) throw new Error(`Validator "${validationFunction}" is not registered.`);
            return fn;
        }

        throw new Error("validationFunction must be a function or a string key.");
    }

    // Runs one field: single input, group (checkbox/radio) or file.
    runField(field) {
        const { element, elements, validationFunction, config } = field;
        const validator = this.getValidator(validationFunction);

        if (elements) {
            const result = validator({ elements, config });
            this.updateFieldState(field, result);
            return result;
        }

        if (!(element instanceof Element)) {
            throw new Error("Field must include `element` (DOM Element) or `elements` (NodeList).");
        }

        // Files are validated as a File object, not as a string value
        if (element.tagName === "INPUT" && element.type === "file") {
            const result = validator({ element: element.files?.[0] || null, config });
            this.updateFieldState(field, result);
            return result;
        }

        const result = validator({ element: element.value, config });
        this.updateFieldState(field, result);
        return result;
    }

    initializeFields() {
        this.fields.forEach((field) => {
            const { element, elements, on } = field;

            // on: null -> validate only on submit
            if (on === null) return;

            const eventType = on || "blur";
            const target = element || (elements && elements[0]);
            if (!target) throw new Error("Each field must have `element` or `elements`.");

            const handler = () => this.runField(field);
            target.addEventListener(eventType, handler);
            this._listeners.push({ target, event: eventType, handler });
        });
    }

    updateFieldState(field, result) {
        const { group, input, file, error } = this.classNames;
        const { element, elements } = field;

        const baseEl = element || (elements && elements[0]);
        if (!(baseEl instanceof Element)) return;

        const formGroup = baseEl.closest(`.${group}`);
        let errorSpan = formGroup?.querySelector(`.${error}`);

        if (!errorSpan && formGroup) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add(error);
            formGroup.appendChild(errorSpan);
        }

        // Checkbox / radio groups only show the message
        if (elements) {
            if (errorSpan) errorSpan.textContent = result.isValid ? "" : result.errorMessage;
            return;
        }

        const isFileInput = baseEl.tagName === "INPUT" && baseEl.type === "file";
        const wrapper = isFileInput ? baseEl : baseEl.closest(`.${input}`);
        const baseClass = isFileInput ? file : input;
        if (!wrapper) return;

        wrapper.classList.toggle(`${baseClass}--valid`, result.isValid);
        wrapper.classList.toggle(`${baseClass}--error`, !result.isValid);
        if (errorSpan) errorSpan.textContent = result.isValid ? "" : result.errorMessage;
    }

    validateAllFields() {
        const invalidFields = [];

        this.fields.forEach((field) => {
            const result = this.runField(field);
            if (!result?.isValid) {
                invalidFields.push({ field, errorMessage: result?.errorMessage || "Invalid field" });
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
            this._listeners.push({ target: this.DOM.submitButton, event: "click", handler });
        }

        // Always listen to the form too (covers the Enter key)
        const formHandler = (event) => {
            event.preventDefault();
            this.handleValidation();
        };
        this.DOM.form.addEventListener("submit", formHandler);
        this._listeners.push({ target: this.DOM.form, event: "submit", handler: formHandler });
    }

    handleValidation() {
        if (this.beforeSubmit && this.beforeSubmit() === false) return;

        const invalidFields = this.validateAllFields();

        if (invalidFields.length === 0) {
            if (this.onSubmit) this.onSubmit();
        } else if (this.onError) {
            this.onError(invalidFields);
        }
    }

    resolveSubmitButton(formEl, submitButtonSelector) {
        if (!submitButtonSelector) return null;
        if (submitButtonSelector instanceof Element) return submitButtonSelector;
        if (typeof submitButtonSelector === "string") return formEl.querySelector(submitButtonSelector);
        throw new Error("submitButtonSelector must be a selector string or a DOM Element.");
    }

    destroy() {
        this._listeners.forEach(({ target, event, handler }) => {
            target.removeEventListener(event, handler);
        });
        this._listeners = [];
    }
}
