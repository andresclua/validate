## Form helper

If you need to create a more complex form that requires validating multiple fields with different rules and configurations, the Form class will be extremely useful. This class allows you to configure fields, validation functions, custom error messages, and callbacks for different form events, all in a simple and flexible manner.

```js
import { Form } from "@andresclua/validate";
```

`Form` ships with the package and already includes every validator, so you can import it on its own.

## Form – Constructor options

When creating a Form instance, you pass a configuration object:

```js
new Form({
  element: formElement,
  fields: [...],
  submitButtonSelector: ".submit-button",
  beforeSubmit: () => console.log("Before validation..."),
  onSubmit: () => console.log("Form is valid!"),
  onError: (invalidFields) => console.error("Errors:", invalidFields),
});
```

### Options inside Form

| Option                 | Required | Description                                                                            |
| ---------------------- | -------- | -------------------------------------------------------------------------------------- |
| `element`              | Yes      | The `<form>` element to validate                                                       |
| `fields`               | Yes      | Array of field configurations  (see below)                                                        |
| `submitButtonSelector` | No       | CSS selector for a custom submit button. If omitted, the form's `submit` event is used |
| `beforeSubmit`         | No       | Called before validation starts. Return `false` to cancel the submission               |
| `onSubmit`             | No       | Called if **all** fields are valid                                                     |
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
  beforeSubmit: () => console.log("Before validation..."),
  onSubmit: () => console.log("Form is valid!"),
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

Each one can be referenced by name in a field's `validationFunction` (for example `"isEmail"`), or you can pass your own function.

## Class names

The helper toggles `--error` and `--valid` modifiers and fills an error element. By default it looks for the `c--form-*` classes used in the docs. Override any of them with `classNames`:

```js
new Form({
  element: document.getElementById("signup-form"),
  fields: [/* ... */],
  classNames: {
    group: "field",        // wraps label, control and error message
    input: "field__input", // receives --error / --valid modifiers
    file: "field__file",   // file inputs receive the modifiers directly
    error: "field__error", // shows the error message
  },
});
```

> **Tip:** reserve a line of height for the error element (for example `min-height: 1.5em`). If it only appears when a field fails, the layout shifts when it goes away and a click on the submit button can land on empty space.

## Cleaning up

`destroy()` removes every listener the helper added:

```js
const form = new Form({ /* ... */ });
form.destroy();
```
