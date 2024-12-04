# Form Validation Library
A lightweight JavaScript utility for validating form fields like email and username. This example demonstrates how to integrate and use the library to ensure inputs meet specified criteria.

## Why Choose This Library?
This validation library is designed with flexibility, modularity, and ease of use in mind. Here are the key reasons why it stands out:

### Framework-Agnostic
This library is framework-agnostic, meaning it works seamlessly with any JavaScript environment:

- Use it in plain JavaScript for lightweight projects.
- Integrate it into frameworks like React, Vue, Svelte, or Angular.
- Ideal for modern frontends or traditional setups.
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
- Configure validations for specific needs like corporate emails, string length, or patterns.

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

- [Validate Email](./docs/email.md)  
  Learn how to validate email addresses with various rules and customizations.

- [Validate Number](./docs/number.md)   Explore number validation, including range, positivity, and custom rules.

- [Validate String](./docs/string.md)  
  Explore String Validation, with configurable rules such as length, pattern matching.

- Select, Checkbox and Radio comming soon
