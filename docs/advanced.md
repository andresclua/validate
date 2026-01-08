## Optional Helper: Form Class

If you need to create a more complex form that requires validating multiple fields with different rules and configurations, the Form class will be extremely useful. This class allows you to configure fields, validation functions, custom error messages, and callbacks for different form events, all in a simple and flexible manner.

> **Note:**  
> The `Form` class is **not part of the package**.  
> It is an optional helper you can copy into your project and connect to `@andresclua/validate`.

## Form – Constructor options

When creating a Form instance, you pass a configuration object:

```js
new Form({
  element: formElement,
  fields: [...],
  submitButtonSelector: ".submit-button",
  onSubmit: () => console.log("Validating..."),
  onComplete: () => console.log("Form is valid!"),
  onError: (invalidFields) => console.error("Errors:", invalidFields),
});
```

### Options inside Form

| Option                 | Required | Description                                                                            |
| ---------------------- | -------- | -------------------------------------------------------------------------------------- |
| `element`              | Yes      | The `<form>` element to validate                                                       |
| `fields`               | Yes      | Array of field configurations  (see below)                                                        |
| `submitButtonSelector` | No       | CSS selector for a custom submit button. If omitted, the form's `submit` event is used |
| `onSubmit`             | No       | Called whenever validation is triggered (before checking fields)                       |
| `onComplete`           | No       | Called if **all** fields are valid                                                     |
| `onError`              | No       | Called with an array of invalid fields if any field is invalid                         |

### Field Configurations

Each entry in fields controls a single input/field.

| Property             | Required | Description                                                                        |
| -------------------- | -------- | ---------------------------------------------------------------------------------- |
| `element`            | Yes      | The DOM element to validate (`<input>`, `<textarea>`, `<select>`, etc.)            |
| `validationFunction` | Yes      | A validator name (`"isString"`, `"isEmail"`, `"isNumber"`, …) or a custom function |
| `config`             | No       | Validation configuration passed directly to the validator                          |
| `on`                 | No       | Event that triggers validation (`"blur"`, `"input"`, or `null`)                    |

```js
{
element: document.querySelector("#username"),
validationFunction: "isString",
config: {
  required: true,
  minLength: 3,
  maxLength: 20,
  pattern: /^[a-zA-Z0-9]+$/,
  customMessage: {
    required: "Username is required.",
    minLength: "Username must be at least 3 characters.",
    maxLength: "Username cannot exceed 20 characters.",
    pattern: "Only letters and numbers are allowed.",
  },
},
on: "blur"
},
{
  element: document.querySelector("#email"),
  validationFunction: "isEmail",
  config: {
    required: true,
    type: "corporate",
    customMessage: {
      required: "Email is required.",
      invalid: "Enter a valid email address.",
      corporate: "Only corporate email addresses are allowed.",
    },
  },
  on: null, // no blur validation → only on submit
},
```

### Form with Fields Configuration looks like

```js

new Form({
  element: formElement,
  fields: [ {
        element: document.querySelector("#username"),
        validationFunction: "isString",
        config: {
          required: true,
          minLength: 3,
          maxLength: 20,
          pattern: /^[a-zA-Z0-9]+$/,
          customMessage: {
            required: "Username is required.",
            minLength: "Username must be at least 3 characters.",
            maxLength: "Username cannot exceed 20 characters.",
            pattern: "Only letters and numbers are allowed.",
          },
        },
        on: "blur"
        },
        {
          element: document.querySelector("#email"),
          validationFunction: "isEmail",
          config: {
            required: true,
            type: "corporate",
            customMessage: {
              required: "Email is required.",
              invalid: "Enter a valid email address.",
              corporate: "Only corporate email addresses are allowed.",
            },
          },
          on: null, // no blur validation → only on submit
        },
  ],
  submitButtonSelector: ".submit-button",
  onSubmit: () => console.log("Validating..."),
  onComplete: () => console.log("Form is valid!"),
  onError: (invalidFields) => console.error("Errors:", invalidFields),
});
```


## Validation Functions

The existing validation functions provided in this library are:

- isString: Validates string input based on length, pattern matching, and required checks.
- isEmail: Validates email addresses with support for format checks, corporate domain validation, and custom rules.
- isNumber: Validates numerical input based on positivity, negativity, range, and custom validations.
- isSelect: Validates `<select>` fields to ensure a valid option is selected.
- isCheckbox: Validates checkbox groups to ensure a minimum number of checkboxes are checked.
- isRadio: Validates radio button groups to ensure at least one option is selected.
- isFile: Validates file inputs based on file type and size.

You can import and use these functions directly in your Form class

## Customization and Extension



```js
// you can add more validations here
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
    this.fields = fields || [];
    this.onSubmit = onSubmit;
    this.onComplete = onComplete;
    this.onError = onError;

    // ---------- DOM ----------
    this.DOM = {
      form: element,
      // scoped to the form (important when multiple forms exist)
      submitButton: submitButtonSelector ? element.querySelector(submitButtonSelector) : null,
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
    this._listeners.forEach(({ target, event, handler }) => {
      target.removeEventListener(event, handler);
    });

    this._listeners = [];
  }
}

export default Form;

```


This is the complete validation method, which executes the appropriate callbacks (onSubmit, onComplete, or onError) based on the validation results. If there are no invalid fields, the onComplete callback is executed. If there are invalid fields, the onError callback is executed, passing the array of invalid fields as an argument.

The export default Form; line at the end exports the Form class as the default export, allowing other modules to import it using the default import syntax.