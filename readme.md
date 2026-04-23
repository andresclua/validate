# @andresclua/validate

A lightweight, framework-agnostic JavaScript validation library.

**[→ Live docs & interactive examples at validate-andresclua.netlify.app](https://validate-andresclua.netlify.app)**

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

The interactive documentation site covers every validator with live playgrounds:

| Validator | Docs |
|---|---|
| Email | [validate-andresclua.netlify.app/email/basic.html](https://validate-andresclua.netlify.app/email/basic.html) |
| Number | [validate-andresclua.netlify.app/number/basic.html](https://validate-andresclua.netlify.app/number/basic.html) |
| String | [validate-andresclua.netlify.app/string/basic.html](https://validate-andresclua.netlify.app/string/basic.html) |
| Select | [validate-andresclua.netlify.app/select/basic.html](https://validate-andresclua.netlify.app/select/basic.html) |
| Checkbox | [validate-andresclua.netlify.app/checkbox/basic.html](https://validate-andresclua.netlify.app/checkbox/basic.html) |
| Radio | [validate-andresclua.netlify.app/radio/basic.html](https://validate-andresclua.netlify.app/radio/basic.html) |
| File | [validate-andresclua.netlify.app/file/basic.html](https://validate-andresclua.netlify.app/file/basic.html) |

## Do you need to validate an entire form?

Check out the [optional Form helper](https://validate-andresclua.netlify.app/advanced/form-helper.html) — a copy-paste class that wires multiple fields, blur events, and submit logic in one place.

