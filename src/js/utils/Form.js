import { isString, isEmail, isNumber, isSelect, isCheckbox, isRadio, isFile } from "@andresclua/validate";

class Form {
  constructor({ element, fields, submitButtonSelector = null, beforeSubmit = null, onSubmit = null, onError = null, validators = {} }) {
    if (!element) throw new Error("A form element is required.");

    // ---------- CONFIG ----------
    this.fields = fields || [];
    this.beforeSubmit = beforeSubmit;
    this.onSubmit = onSubmit;
    this.onError = onError;

    // ---------- DOM ----------
    this.DOM = {
      form: element,
      // scoped to the form (important when multiple forms exist)
      submitButton: this.resolveSubmitButton(element, submitButtonSelector),
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

  // --------- CORE: run a field (single/group/file) ---------
  runField(field) {
    const { element, elements, validationFunction, config } = field;
    const validator = this.getValidator(validationFunction);

    // GROUP: checkbox/radio (NodeList)
    if (elements) {
      const result = validator({ elements, config });
      this.updateFieldState(field, result);
      return result;
    }

    if (!(element instanceof Element)) {
      throw new Error("Field must include `element` (DOM Element) or `elements` (NodeList).");
    }

    // FILE: pass File object (not .value string)
    if (element.tagName === "INPUT" && element.type === "file") {
      const file = element.files?.[0] || null;
      const result = validator({ element: file, config });
      this.updateFieldState(field, result);
      return result;
    }

    // DEFAULT: input/select -> pass string value
    const result = validator({ element: element.value, config });
    this.updateFieldState(field, result);
    return result;
  }

  // ---------------- FIELDS ----------------
  initializeFields() {
    this.fields.forEach((field) => {
      const { element, elements, on } = field;

      // If on === null -> do not attach listeners (validate only on submit)
      if (on === null) return;

      const eventType = on || "blur";

      // For groups, attach listener to first element (cheap) OR you can attach to each checkbox/radio if desired.
      const target = element || (elements && elements[0]);
      if (!target) throw new Error("Each field must have `element` or `elements`.");

      const handler = () => this.runField(field);

      target.addEventListener(eventType, handler);
      this._listeners.push({ target, event: eventType, handler });
    });
  }

  // ---------------- UI UPDATE ----------------
  updateFieldState(field, result) {
    const { element, elements } = field;

    const baseEl = element || (elements && elements[0]);
    if (!(baseEl instanceof Element)) return;

    // Error span lives in the closest form group
    const formGroup = baseEl.closest(".c--form-group-a");
    let errorSpan = formGroup?.querySelector(".c--form-error-a");

    // Create error span if missing
    if (!errorSpan && formGroup) {
      errorSpan = document.createElement("span");
      errorSpan.classList.add("c--form-error-a");
      errorSpan.style.display = "none";
      formGroup.appendChild(errorSpan);
    }

    // GROUPS (checkbox/radio): your pattern is "only span"
    if (elements) {
      if (errorSpan) {
        errorSpan.textContent = result.isValid ? "" : result.errorMessage;
        errorSpan.style.display = result.isValid ? "none" : "block";
      }
      return;
    }

    // SINGLE FIELDS: wrapper + modifiers, parallel per control type
    let wrapper = null;
    let baseClass = null;

    if (baseEl.tagName === "SELECT") {
      wrapper = baseEl.closest(".c--form-select-a");
      baseClass = "c--form-select-a";
    } else if (baseEl.tagName === "INPUT" && baseEl.type === "file") {
      wrapper = baseEl.closest(".c--form-file-a");
      baseClass = "c--form-file-a";
    } else {
      wrapper = baseEl.closest(".c--form-input-a");
      baseClass = "c--form-input-a";
    }

    if (!wrapper || !baseClass) return;

    const errorClass = `${baseClass}--error`;
    const validClass = `${baseClass}--valid`;

    if (result.isValid) {
      wrapper.classList.remove(errorClass);
      wrapper.classList.add(validClass);

      if (errorSpan) {
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
      }
    } else {
      wrapper.classList.add(errorClass);
      wrapper.classList.remove(validClass);

      if (errorSpan) {
        errorSpan.textContent = result.errorMessage;
        errorSpan.style.display = "block";
      }
    }
  }

  // ---------------- VALIDATE ALL ----------------
  validateAllFields() {
    const invalidFields = [];

    this.fields.forEach((field) => {
      const result = this.runField(field);

      if (!result?.isValid) {
        invalidFields.push({
          field,
          errorMessage: result?.errorMessage || "Invalid field",
        });
      }
    });

    return invalidFields;
  }

  // ---------------- SUBMIT ----------------
  initializeSubmit() {
    // Optional: click submit button
    if (this.DOM.submitButton) {
      const handler = (event) => {
        event.preventDefault();
        this.handleValidation();
      };

      this.DOM.submitButton.addEventListener("click", handler);
      this._listeners.push({ target: this.DOM.submitButton, event: "click", handler });
    }

    // Always listen to form submit (covers enter key)
    const formHandler = (event) => {
      event.preventDefault();
      this.handleValidation();
    };

    this.DOM.form.addEventListener("submit", formHandler);
    this._listeners.push({ target: this.DOM.form, event: "submit", handler: formHandler });
  }

  handleValidation() {
    // beforeSubmit can return false to cancel submission
    if (this.beforeSubmit) {
      const shouldContinue = this.beforeSubmit();
      if (shouldContinue === false) return;
    }

    const invalidFields = this.validateAllFields();

    if (invalidFields.length === 0) {
      if (this.onSubmit) this.onSubmit();
    } else {
      if (this.onError) this.onError(invalidFields);
    }
  }

  resolveSubmitButton(formEl, submitButtonSelector) {
    if (!submitButtonSelector) return null;

    // Ya es un Element
    if (submitButtonSelector instanceof Element) {
      return submitButtonSelector;
    }

    // Es un selector string (scoped al form)
    if (typeof submitButtonSelector === "string") {
      return formEl.querySelector(submitButtonSelector);
    }

    throw new Error("submitButtonSelector must be a selector string or a DOM Element.");
  }

  // ---------------- DESTROY ----------------
  destroy() {
    this._listeners.forEach(({ target, event, handler }) => {
      target.removeEventListener(event, handler);
    });

    this._listeners = [];
  }
}

export default Form;
