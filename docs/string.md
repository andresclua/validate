# isString

The `isString` function validates string input based on several configurable rules such as length, pattern matching, and required checks. It is customizable, debug-friendly, and supports callbacks for handling validation results programmatically.

## Features
- **Required Validation**: Ensures the string is not empty.
- **Length Validation**: Validates if the string meets minimum and/or maximum length requirements.
- **Pattern Matching**: Ensures the string matches a specific regular expression.
- **Custom Error Messages**: Allows developers to specify tailored error messages for specific validation failures.
- **Callback Support**: Provides a way to handle validation results programmatically.
- **Debug Mode**: Logs validation details for easier debugging.


## Parameters

| Parameter         | Type                 | Description                                                                                                                                                 |
|-------------------|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| element           | string               | The string to validate.                                                                                                                                    |
| config            | object (optional)    | An optional object to customize validation behavior.                                                                                                       |
| required          | boolean (optional)   | Ensures the string is provided and not empty. Default: false.                                                                                              |
| minLength         | number (optional)    | Specifies the minimum length of the string.                                                                                                               |
| maxLength         | number (optional)    | Specifies the maximum length of the string.                                                                                                               |
| callback          | function (optional)  | A function that receives the validation result as an argument.      
| pattern           | RegExp (optional)    | Ensures the string matches the specified regular expression.                                                                                               |
| customMessage     | object (optional)    | Custom error messages for validation failures: <br> - required: Message for required validation failure. <br> - minLength: Message for minimum length validation failure. <br> - maxLength: Message for maximum length validation failure. <br> - pattern: Message for pattern validation failure. |                                                                                      |
| debug             | boolean (optional)   | If true, logs validation details to the console for debugging purposes.                                                                                    |

## Return Value

The function returns an object with the following properties:

- **`isValid`** (`boolean`):  
  Indicates whether the string passed all validations. Returns `true` if valid, otherwise `false`.

- **`errorMessage`** (`string | null`):  
  Contains the error message if validation failed. Returns `null` if the string is valid.

## Examples

### Basic String Validation
```js
const result = isString({
  element: "Hello",
  config: { required: true },
});

console.log(result);
// Output:
// { isValid: true, errorMessage: null }
```

### Minimum and Maximum Length Validation

```js
const result = isString({
  element: "Hi",
  config: { minLength: 3, maxLength: 10 },
});

console.log(result);
// Output:
// { isValid: false, errorMessage: "The string must be at least 3 characters long." }
```

### Pattern Matching

```js
const result = isString({
  element: "abc123",
  config: { pattern: /^[a-z]+$/, customMessage: { pattern: "Only lowercase letters are allowed." } },
});

console.log(result);
// Output:
// { isValid: false, errorMessage: "Only lowercase letters are allowed." }
```

### Custom Error Messages
```js
const result = isString({
  element: "",
  config: {
    required: true,
    minLength: 5,
    customMessage: {
      required: "You must provide a string.",
      minLength: "The string is too short.",
    },
  },
});

console.log(result);
// Output:
// { isValid: false, errorMessage: "You must provide a string." }
```

### Debugging and Callback Usage

```js
isString({
  element: "Test",
  config: { required: true, minLength: 5 },
  debug: true,
  callback: (result) => {
    if (result.isValid) {
      console.log("Validation passed!");
    } else {
      console.error("Validation failed:", result.errorMessage);
    }
  },
});
// Console Output:
// Validating string: Test
// Result: { isValid: false, errorMessage: "The string must be at least 5 characters long." }
```

### Debugging and Callback with Regex
```js
 isString({
    element: inputText, // Usamos el valor del input
    config: {
        customValidation: (element) => {
            const forbiddenWords = ['wolf', 'monster']; // forbidden

            // Regex
            const regex = new RegExp(`\\b(${forbiddenWords.join('|')})\\b`, 'i'); // \b make sure 

            // Si el input contiene cualquiera de las palabras prohibidas, la validación falla
            if (regex.test(element)) {
                return {
                    isValid: false,
                    errorMessage: "The string contains prohibited words.",
                };
            }

            // Si no contiene palabras prohibidas, la validación es exitosa
            return { isValid: true, errorMessage: null };
        },
    },
    callback: (result) => console.log(result), // Muestra el resultado
    debug: true,
});
```


### Validation Examples

```js
// Validation on Blur Event
document.addEventListener("DOMContentLoaded", () => {
    const stringInput = document.querySelector("#string");

    if (!stringInput) return; // Exit if input doesn't exist

    const stringWrapper = stringInput.closest(".c--form-input-a");
    const stringErrorSpan = stringWrapper?.querySelector(".c--form-error-a");

    stringInput.addEventListener("blur", () => {
        const result = isString({
            element: stringInput.value,
            config: {
                required: true,
                minLength: 3,
                maxLength: 10,
                customMessage: {
                    required: "This field is required",
                    minLength: "The string must be at least 3 characters long",
                    maxLength: "The string must not exceed 10 characters",
                },
            },
        });

        if (result.isValid) {
            // Valid string: remove error styles
            stringWrapper?.classList.remove("c--form-input-a--error");
            stringWrapper?.classList.add("c--form-input-a--valid");
            if (stringErrorSpan) {
                stringErrorSpan.textContent = "";
                stringErrorSpan.style.display = "none";
            }
        } else {
            // Invalid string: show error message
            stringWrapper?.classList.add("c--form-input-a--error");
            stringWrapper?.classList.remove("c--form-input-a--valid");
            if (stringErrorSpan) {
                stringErrorSpan.textContent = result.errorMessage;
                stringErrorSpan.style.display = "block";
            }
        }
    });
});

// Validation on Button Click
document.addEventListener("DOMContentLoaded", () => {
    const stringInput = document.querySelector("#string2");
    const stringWrapper = stringInput ? stringInput.closest(".c--form-input-a") : null;
    const stringErrorSpan = stringInput
        ? stringInput.closest(".c--form-group-a")?.querySelector(".c--form-error-a")
        : null;
    const submitButton = document.querySelector("#submitString");

    if (submitButton) {
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default form submission

            if (stringInput) {
                const result = isString({
                    element: stringInput.value,
                    config: {
                        required: true,
                        minLength: 5,
                        maxLength: 20,
                        customMessage: {
                            required: "This field is required",
                            minLength: "The string must be at least 5 characters long",
                            maxLength: "The string must not exceed 20 characters",
                        },
                    },
                });

                if (result.isValid) {
                    // Valid string: apply valid styles and clear errors
                    stringWrapper?.classList.add("c--form-input-a--valid");
                    stringWrapper?.classList.remove("c--form-input-a--error");
                    if (stringErrorSpan) {
                        stringErrorSpan.textContent = "";
                        stringErrorSpan.style.display = "none";
                    }
                    console.log("String is valid!");
                } else {
                    // Invalid string: show error message
                    stringWrapper?.classList.add("c--form-input-a--error");
                    stringWrapper?.classList.remove("c--form-input-a--valid");
                    if (stringErrorSpan) {
                        stringErrorSpan.textContent = result.errorMessage;
                        stringErrorSpan.style.display = "block";
                    }
                    console.log("String is invalid:", result.errorMessage);
                }
            }
        });
    }
});
```

These examples demonstrate how to use the isString function to validate a string input field on both the blur event (when the user leaves the input field) and the click event of a submit button. The code applies the appropriate styles and displays error messages based on the validation result.

<br>
<br>

### Vue Example
```js
<template>
  <div class="c--form-group-a">
    <label class="c--label-a" for="email">Email</label>
    <div class="c--form-input-a" :class="{ 'c--form-input-a--error': hasError, 'c--form-input-a--valid': isValid }">
      <input
        class="c--form-input-a__item"
        type="email"
        id="email"
        v-model="email"
        @blur="validateEmail"
      />
    </div>
    <span v-if="hasError" class="c--form-error-a">{{ errorMessage }}</span>
  </div>
</template>

<script>
import { ref } from "vue";
import { isEmail } from "@/utils/isEmail"; // Import your isEmail function

export default {
  name: "EmailValidation",
  setup() {
    const email = ref(""); // Bind the input value
    const hasError = ref(false); // Track if there's an error
    const isValid = ref(false); // Track if the input is valid
    const errorMessage = ref(""); // Store the error message

    const validateEmail = () => {
      const result = isEmail({
        element: email.value,
        config: {
          type: "corporate",
          customMessage: {
            invalid: "Please enter a valid email address.",
          },
        },
      });

      if (result.isValid) {
        hasError.value = false;
        isValid.value = true;
        errorMessage.value = "";
      } else {
        hasError.value = true;
        isValid.value = false;
        errorMessage.value = result.errorMessage;
      }
    };

    return {
      email,
      hasError,
      isValid,
      errorMessage,
      validateEmail,
    };
  },
};
</script>
```

## Validation Flow
#### Required Check:
- Ensures the string is provided and not empty if required is true.
- Length Validation:
- Validates the string against minLength and maxLength if specified.

#### Pattern Matching:
- Ensures the string matches the specified regular expression (pattern) if provided.
#### Custom Validation
 - Executes user-defined validation rules if included.

#### Final Result:
- Returns an object indicating whether the string is valid and any associated error message.

<br><br>

## Common Use Cases

#### Form Validation:
- Validate string inputs such as names, usernames, or other text fields in forms.
#### Pattern Matching:
- Ensure the string adheres to specific formats like alphanumeric or custom patterns.

#### Custom Logic:
- Add domain-specific validations such as excluding certain characters or enforcing stricter input rules.

#### Debugging Tips
- Use debug: true to log the validation process and outputs for troubleshooting.
- Leverage the callback parameter to execute custom actions based on validation results.
