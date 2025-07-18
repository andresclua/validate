
# Advanced Form Validation

If you need to create a more complex form that requires validating multiple fields with different rules and configurations, the `Form` class will be extremely useful. This class allows you to configure fields, validation functions, custom error messages, and callbacks for different form events, all in a simple and flexible manner.



## Installation and Setup

The `Form` class and the validation functions are designed to work in various JavaScript environments, including ES6 modules, CommonJS, and even in the browser without a bundler.

### ES6 Modules

To use the `Form` class and validation functions in an ES6 module environment, you can import them like this:

```js
import Form from './utils/Form';
import { isString } from "./utils/isString";
import { isEmail } from "./utils/isEmail";
```

### CommonJS

If you're using CommonJS, you can require the `Form` class and validation functions like this:

```js
const Form = require('./utils/Form');
const { isString } = require('./utils/isString');
const { isEmail } = require('./utils/isEmail');
```

### Browser (without bundler)

If you're not using a module bundler and want to include the `Form` class and validation functions directly in your HTML file, you'll need to include the script files in your HTML file:

```html
<script src="path/to/Form.js"></script>
<script src="path/to/isString.js"></script>
<script src="path/to/isEmail.js"></script>
```

After including the script files, the `Form` class and validation functions will be available as global variables in your JavaScript code.

```js
const formElement = document.querySelector('#myForm');
const form = new Form({
  element: formElement,
  // ... other configuration options
});
```


## Configuration Options

When creating a new instance of `Form`, you can pass a configuration object with the following options:

- `element` (required): The form element you want to validate.
- `fields` (required): An array of objects defining the form fields and their validation rules.
- `submitButtonSelector` (optional): A CSS selector pointing to the form's submit button. If not provided, the form's `submit` event will be used.
- `onSubmit` (optional): A callback function that will be executed when the form is attempted to be submitted.
- `onComplete` (optional): A callback function that will be executed when all form fields are valid.
- `onError` (optional): A callback function that will be executed when there are errors in the form, receiving an array of invalid fields as an argument.

Configuration example:

```js
new Form({
  element: formElement,
  submitButtonSelector: ".submit-button",
  fields: [...], // Field configuration
  onSubmit: () => {
    console.log("Validating fields...");
  },
  onComplete: () => {
    console.log("All fields are valid!");
  },
  onError: (invalidFields) => {
    console.error("Form contains errors:", invalidFields);
  },
});
```



## Field Configuration

Each form field is defined as an object within the `fields` array. Each field object must have the following properties:

- `element` (required): The field element (input, textarea, select, etc.).
- `validationFunction` (required): The validation function to be applied to this field.
- `config` (optional): A configuration object that will be passed to the validation function.
- `on` (optional): The event on which the validation for this field will be triggered. If not provided, the `blur` event will be used by default.

Example of field configuration:

```js
fields: [
  {
    element: document.querySelector("#username"),
    validationFunction: isString,
    config: {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9]+$/,
      customMessage: {
        required: "Username is required.",
        minLength: "Username must be at least 3 characters long.",
        maxLength: "Username must not exceed 20 characters.",
        pattern: "Username can only contain letters and numbers.",
      },
    },
    on: "blur", // Validate on blur
  },
  {
    element: document.querySelector("#email"),
    validationFunction: isEmail,
    config: {
      required: true,
      type: "corporate",
      customMessage: {
        invalid: "Please enter a valid email address.",
        required: "Email is required.",
        corporate: "Only corporate email addresses are allowed.",
      },
    },
    on: null, // Disable blur validation
  },
  {
    element: document.querySelector("#age"),
    validationFunction: isNumber,
    config: {
      required: true,
      min: 18,
      max: 65,
      integer: true,
      customMessage: {
        required: "Age is required.",
        min: "You must be at least 18 years old.",
        max: "You cannot be older than 65 years.",
        integer: "Age must be a whole number.",
      },
    },
    on: "blur",
  },
]
```

In this example, we have three fields:

1. **Username**: Validated using the `isString` function with requirements for minimum and maximum length, a pattern to allow only letters and numbers, and custom error messages for each validation rule.

2. **Email**: Validated using the `isEmail` function with the `corporate` type to ensure only corporate email addresses are allowed, and custom error messages.

3. **Age**: Validated using the `isNumber` function with requirements for a minimum and maximum value, ensuring it's an integer, and custom error messages for each validation rule.

These examples demonstrate how to configure fields with various validation rules and custom error messages, allowing you to tailor the validation experience to your specific needs.



## Validation Functions

The `Form` class is compatible with any validation function that returns an object with the `isValid` (boolean) and `errorMessage` (string) properties. You can use the existing validation functions (`isString`, `isEmail`, etc.) or create your own custom functions.

### Using Existing Validation Functions

The existing validation functions provided in this library are:

- `isString`: Validates string input based on length, pattern matching, and required checks.
- `isEmail`: Validates email addresses with support for format checks, corporate domain validation, and custom rules.
- `isNumber`: Validates numerical input based on positivity, negativity, range, and custom validations.
- `isSelect`: Validates `<select>` fields to ensure a valid option is selected.
- `isCheckbox`: Validates checkbox groups to ensure a minimum number of checkboxes are checked.
- `isRadio`: Validates radio button groups to ensure at least one option is selected.
- `isFile`: Validates file inputs based on file type and size.

You can import and use these functions directly in your field configurations, as shown in the examples above.

### Creating Custom Validation Functions

If the existing validation functions do not meet your specific requirements, you can create your own custom validation functions. These functions should return an object with the `isValid` and `errorMessage` properties, following the same structure as the existing functions.

Example of a custom validation function:

```js
function isEvenNumber(config) {
  const { element } = config;
  const value = parseInt(element, 10);

  const isValid = !isNaN(value) && value % 2 === 0;
  const errorMessage = isValid ? null : "The value must be an even number.";

  return { isValid, errorMessage };
}
```

In this example, the `isEvenNumber` function validates whether a value is an even number. It takes a `config` object as input, which should contain the `element` property (the value to be validated). The function returns an object with `isValid` set to `true` if the value is an even number, and `false` otherwise. The `errorMessage` property contains the appropriate error message based on the validation result.

You can use custom validation functions in your field configurations, just like the existing validation functions:

```js
fields: [
  {
    element: document.querySelector("#age"),
    validationFunction: isEvenNumber,
    config: {
      required: true,
      customMessage: {
        required: "Age is required.",
      },
    },
    on: "blur",
  },
]
```

By creating custom validation functions, you can extend the functionality of the `Form` class to handle more complex or specific validation scenarios tailored to your application's needs.



## Event Handling

The `Form` class automatically handles form submission events and field validation. When the form is attempted to be submitted, either by clicking the submit button or pressing the "Enter" key, the following steps are executed:

1. The `onSubmit` callback is executed (if defined).
2. All form fields are validated.
3. If all fields are valid, the `onComplete` callback is executed (if defined).
4. If there are invalid fields, the `onError` callback is executed (if defined), passing an array of invalid fields as an argument.

### Additional Event Handling

In addition to the default form submission event handling, the `Form` class also supports real-time validation on the `input` event. This allows you to provide immediate feedback to the user as they type in the input fields.

To enable real-time validation, you can set the `on` property of a field to `"input"` instead of `"blur"`. For example:

```js
fields: [
  {
    element: document.querySelector("#username"),
    validationFunction: isString,
    config: {
      required: true,
      minLength: 3,
      customMessage: {
        required: "Username is required.",
        minLength: "Username must be at least 3 characters long.",
      },
    },
    on: "input", // Validate on input event
  },
]
```

In this example, the username field will be validated as the user types, providing real-time feedback on the validity of the input.

### Disabling Validation for Specific Fields

If you want to disable validation for a specific field, you can set the `on` property to `null`. This will prevent the `Form` class from attaching any event listeners to that field, effectively disabling validation for that field.

```js
fields: [
  {
    element: document.querySelector("#notes"),
    validationFunction: isString,
    config: {
      // No validation rules
    },
    on: null, // Disable validation for this field
  },
]
```

In this example, the `notes` field will not be validated, even if the form is submitted.

By providing these additional event handling options, the `Form` class offers flexibility in how and when validation is performed, allowing you to tailor the user experience to your specific requirements.


## Usage Examples

Here are some examples of how to use the `Form` class:

```js
// Login form validation
document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.querySelector("#login-form");

  new Form({
    element: formElement,
    submitButtonSelector: ".submit-button",
    fields: [
      {
        element: document.querySelector("#username"),
        validationFunction: isString,
        config: {
          required: true,
          minLength: 3,
          customMessage: {
            required: "Username is required.",
            minLength: "Username must be at least 3 characters long.",
          },
        },
        on: "blur",
      },
      {
        element: document.querySelector("#password"),
        validationFunction: isString,
        config: {
          required: true,
          minLength: 6,
          customMessage: {
            required: "Password is required.",
            minLength: "Password must be at least 6 characters long.",
          },
        },
        on: "blur",
      },
    ],
    onSubmit: () => {
      console.log("Validating fields...");
    },
    onComplete: () => {
      console.log("All fields are valid! Submitting form...");
      // Submit form here
    },
    onError: (invalidFields) => {
      console.error("Form contains errors:", invalidFields);
    },
  });
});

// Registration form validation
document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.querySelector("#signup-form");

  new Form({
    element: formElement,
    fields: [
      {
        element: document.querySelector("#name"),
        validationFunction: isString,
        config: {
          required: true,
          minLength: 3,
          customMessage: {
            required: "Name is required.",
            minLength: "Name must be at least 3 characters long.",
          },
        },
        on: "blur",
      },
      {
        element: document.querySelector("#email"),
        validationFunction: isEmail,
        config: {
          required: true,
          customMessage: {
            invalid: "Please enter a valid email address.",
            required: "Email is required.",
          },
        },
        on: null, // Disable blur validation
      },
      {
        element: document.querySelector("#age"),
        validationFunction: isEvenNumber, // Custom function
        config: {
          required: true,
          customMessage: {
            required: "Age is required.",
          },
        },
        on: "blur",
      },
    ],
    onComplete: () => {
      console.log("All fields are valid! Submitting form...");
      // Submit form here
    },
    onError: (invalidFields) => {
      console.error("Form contains errors:", invalidFields);
    },
  });
});
```


## Customization and Extension

The `Form` class has been designed to be flexible and extensible. You can customize its behavior and add new features according to your specific needs. For example, you could extend the `Form` class to add support for asynchronous validation, integration with third-party libraries, or any other functionality you require.

```js
class Form {
    constructor({ element, fields, submitButtonSelector = null, onSubmit = null, onComplete = null, onError = null }) {
        if (!element) throw new Error("A form element is required.");

        this.formElement = element; // Elemento del formulario
        this.fields = fields; // Configuración de los campos
        this.onSubmit = onSubmit; // Callback when attempting to submit
        this.onComplete = onComplete; // Callback when all fields are valid
        this.onError = onError; // Callback when there are errors
        this.submitButton = submitButtonSelector
            ? document.querySelector(submitButtonSelector)
            : null; // Botón de envío personalizado

        // Configurar eventos para los campos y el botón de envío
        this.initializeFields();
        this.initializeSubmit();
    }

    initializeFields() {
        this.fields.forEach((field) => {
            const { element, validationFunction, config, on } = field;

            if (!element) throw new Error("Each field must have an element.");
            if (!validationFunction) throw new Error("A validation function is required.");

            // Añadir eventos personalizados a cada campo
            element.addEventListener(on || "blur", () => {
                const result = validationFunction({
                    element: element.value,
                    config,
                });

                this.updateFieldState(element, result);
            });
        });
    }

    updateFieldState(element, result) {
        const wrapper = element.closest(".c--form-input-a");
        const formGroup = element.closest(".c--form-group-a"); // Buscar el grupo del formulario
        let errorSpan = formGroup?.querySelector(".c--form-error-a"); // Buscar un span existente

        // Crear el span de error dinámicamente si no existe
        if (!errorSpan && formGroup) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("c--form-error-a");
            errorSpan.style.display = "none"; // Ocultar inicialmente
            formGroup.appendChild(errorSpan); // Añadir al grupo del formulario
        }

        // Actualizar el estado del campo
        if (result.isValid) {
            wrapper?.classList.remove("c--form-input-a--error");
            wrapper?.classList.add("c--form-input-a--valid");
            if (errorSpan) {
                errorSpan.textContent = ""; // Limpiar el texto del mensaje
                errorSpan.style.display = "none"; // Ocultar el mensaje
            }
        } else {
            wrapper?.classList.add("c--form-input-a--error");
            wrapper?.classList.remove("c--form-input-a--valid");
            if (errorSpan) {
                errorSpan.textContent = result.errorMessage; // Mostrar el mensaje de error
                errorSpan.style.display = "block"; // Hacer visible el mensaje
            }
        }
    }

    validateAllFields() {
        const invalidFields = [];
        this.fields.forEach((field) => {
            const { element, validationFunction, config } = field;
            const result = validationFunction({
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
        // Manejar el evento de clic en el botón personalizado (si está definido)
        if (this.submitButton) {
            this.submitButton.addEventListener("click", (event) => {
                event.preventDefault(); // Prevenir el comportamiento por defecto
                this.handleValidation();
            });
        }

        // Manejar el evento submit del formulario
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevenir el envío por defecto
            this.handleValidation();
        });
    }

    handleValidation() {
        // Ejecutar el callback `onSubmit`, si está definido
        if (this.onSubmit) {
            this.onSubmit();
        }

        const invalidFields = this.validateAllFields();

        if (invalidFields.length === 0) {
            // Todos los campos son válidos
            if (this.onComplete) {
                this.onComplete(); // Execute success callback
            }
        } else {
            // Hay errores en el formulario
            if (this.onError) {
                this.onError(invalidFields); // Execute error callback with details
            }
        }
    }
}

export default Form;
```

This is the complete `handleValidation` method, which executes the appropriate callbacks (`onSubmit`, `onComplete`, or `onError`) based on the validation results. If there are no invalid fields, the `onComplete` callback is executed. If there are invalid fields, the `onError` callback is executed, passing the array of invalid fields as an argument.

The `export default Form;` line at the end exports the `Form` class as the default export, allowing other modules to import it using the default import syntax.
