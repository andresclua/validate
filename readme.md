# @andresclua/validate

A lightweight, framework-agnostic JavaScript validation library.

**[→ Live docs & interactive examples at validate.andresclua.com](https://validate.andresclua.com)**

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

| Validator | Live docs | GitHub |
|---|---|---|
| Email | [Live](https://validate.andresclua.com/email/basic.html) | [docs/email.md](https://github.com/andresclua/validate/blob/main/docs/email.md) |
| Number | [Live](https://validate.andresclua.com/number/basic.html) | [docs/number.md](https://github.com/andresclua/validate/blob/main/docs/number.md) |
| String | [Live](https://validate.andresclua.com/string/basic.html) | [docs/string.md](https://github.com/andresclua/validate/blob/main/docs/string.md) |
| Select | [Live](https://validate.andresclua.com/select/basic.html) | [docs/Select.md](https://github.com/andresclua/validate/blob/main/docs/Select.md) |
| Checkbox | [Live](https://validate.andresclua.com/checkbox/basic.html) | [docs/checkbox.md](https://github.com/andresclua/validate/blob/main/docs/checkbox.md) |
| Radio | [Live](https://validate.andresclua.com/radio/basic.html) | [docs/radio.md](https://github.com/andresclua/validate/blob/main/docs/radio.md) |
| File | [Live](https://validate.andresclua.com/file/basic.html) | [docs/file.md](https://github.com/andresclua/validate/blob/main/docs/file.md) |

## Do you need to validate an entire form?

Check out the [optional Form helper](https://validate.andresclua.com/advanced/form-helper.html) — a copy-paste class that wires multiple fields, blur events, and submit logic in one place. Also available in [docs/advanced.md](https://github.com/andresclua/validate/blob/main/docs/advanced.md).

