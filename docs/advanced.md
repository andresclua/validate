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
- isSelect: Validates <select> fields to ensure a valid option is selected.
- isCheckbox: Validates checkbox groups to ensure a minimum number of checkboxes are checked.
- isRadio: Validates radio button groups to ensure at least one option is selected.
- isFile: Validates file inputs based on file type and size.

You can import and use these functions directly in your Form class

## Customization and Extension



```js
// you can add more validations here
import { isString, isEmail } from "@andresclua/validate";



class Form {
    constructor({
        element,
        fields,
        submitButtonSelector = null,
        onSubmit = null,
        onComplete = null,
        onError = null,
        validators = {}, // opcional para extender desde fuera
    }) {
        if (!element) throw new Error("A form element is required.");

        this.formElement = element;
        this.fields = fields;
        this.onSubmit = onSubmit;
        this.onComplete = onComplete;
        this.onError = onError;
        this.submitButton = submitButtonSelector
            ? document.querySelector(submitButtonSelector)
            : null;

        // Registry de validadores disponibles
        this.validators = {
            isString,
            isEmail,
            // puedes ir agregando más nativos aquí
            ...validators, // permitir inyectar extras desde fuera si quieres
        };

        this.initializeFields();
        this.initializeSubmit();
    }

    /**
     * Devuelve la función de validación.
     * - Si es función → la devuelve tal cual
     * - Si es string → la busca en this.validators
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
        if (this.submitButton) {
            this.submitButton.addEventListener("click", (event) => {
                event.preventDefault();
                this.handleValidation();
            });
        }

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
```


This is the complete validation method, which executes the appropriate callbacks (onSubmit, onComplete, or onError) based on the validation results. If there are no invalid fields, the onComplete callback is executed. If there are invalid fields, the onError callback is executed, passing the array of invalid fields as an argument.

The export default Form; line at the end exports the Form class as the default export, allowing other modules to import it using the default import syntax.