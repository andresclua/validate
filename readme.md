# Form Validation Library
A lightweight JavaScript utility for validating form fields like email and username. This example demonstrates how to integrate and use the library to ensure inputs meet specified criteria.

## Why Choose This Library?
This validation library is designed with flexibility, modularity, and ease of use in mind. Here are the key reasons why it stands out:

### Framework-Agnostic
This library is framework-agnostic, meaning it works seamlessly with any JavaScript environment:

- Use it in plain JavaScript for lightweight projects.
- Integrate it into frameworks like React, Vue, Svelte, or Angular.
- Ideal for modern frontends or traditional setups.
- Focused purely on validation; DOM manipulation or custom message handling is left to developers.
- Includes built-in debugging tools to log detailed validation steps for easier troubleshooting.
- Supports real-time validation (e.g., on blur, input, or change events).
- Written in pure JavaScript with no dependencies, ensuring fast performance.
- Ready for use in ES Modules, CommonJS, or browser environments.

<br><br>

### Modular Design
Each validation function is a self-contained module, allowing you to:

- Import only the functions you need, keeping your project lightweight.
- Extend or modify specific validations without affecting others.
- Scale effortlessly by adding new validators.

```js
import { isEmail } from "@andresclua/validate";
import { isString } from "@andresclua/validate";
```

### Customizable

The library allows extensive customization to suit your project requirements:

- Define your own error messages with customMessage.
- Configure validations for specific needs like corporate emails or pattern-based rules.

```js
isEmail({
    element: "user@example.com",
    config: {
        type: "corporate",
        customMessage: "Please use a corporate email address.",
    },
});
```

### Flexible Validation Flow

The library supports multiple ways to handle validation:

- On blur: Validate inputs as the user interacts with them.
- On submit: Validate all inputs when the form is submitted.
- Combined flow: Use both for a robust user experience.

```js
document.querySelector("#email").addEventListener("blur", () => {
    const result = isEmail({ element: emailInput.value });
    if (!result.isValid) {
        console.error(result.errorMessage);
    }
});
```

## Examples

- [Validate Email](https://github.com/andresclua/validate/blob/main/docs/email.md) Learn how to validate email addresses with various rules and customizations.

- [Validate Number](https://github.com/andresclua/validate/blob/main/docs/number.md) Explore number validation, including range, positivity, and custom rules.

- [Validate String](https://github.com/andresclua/validate/blob/main/docs/string.md) Explore String Validation, with configurable rules such as length, pattern matching.

- [Validate Select](https://github.com/andresclua/validate/blob/main/docs/Select.md) Explore select Validation, with configurable rules such as required, pattern matching,etc.

- [Validate Checkbox](https://github.com/andresclua/validate/blob/main/docs/checkbox.md) Explore checkbox Validation, with configurable rules such as required, pattern matching,etc.

- [Validate Radio](https://github.com/andresclua/validate/blob/main/docs/radio.md) Explore Radio Validation, with configurable rules such as required, pattern matching,etc.

- [Validate File](https://github.com/andresclua/validate/blob/main/docs/file.md) Explore RadFileio Validation, with configurable rules such as required, file format,etc.

