# isEmail

The isEmail function provides flexible and customizable email validation capabilities. It supports multiple types of validation, including format checks, corporate domain validation, and custom user-defined rules. The function is modular, debug-friendly, and extensible, making it suitable for a wide range of applications.


# Features
- **Basic Email Validation:** Ensures the email follows standard format rules.
- **Corporate Email Validation:** Rejects generic email domains like Gmail, Yahoo, or Outlook.
- **Custom Validation:** Allows additional user-defined checks for advanced requirements.
- **Error Messaging:** Supports custom error messages for different validation types.
- **Debug Mode:** Logs validation details for easier debugging.
- **Callback Support:** Enables custom actions based on the validation result.

# Parameters

| **Parameter**       | **Type**            | **Description**                                                                                                                                              |
|----------------------|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `element`            | `string`           | The email address to validate.                                                                                                                              |
| `config`             | `object` (optional)| An optional object to customize validation behavior.                                                                                                        |
| `type`           | `string` (optional)| Specifies the type of validation: <br> - `"corporate"`: Ensures the email is not from generic domains like Gmail, Yahoo, or Outlook.                        |
| `customMessage`  | `object` (optional)| Custom error messages for validation failures: <br> - `corporate`: Message for corporate email validation failure. <br> - **`invalid`**: Message for invalid email format. |
| `customValidation` | `function` (optional)| A user-defined function for additional validation. <br> Input: The email address. <br> **Output**: An object with: <br> - `isValid` (`boolean`): Whether the custom validation passed. <br> - `errorMessage` (`string`): Error message for failed validation. |
| `callback`           | `function` (optional)| A function that receives the validation result as an argument.                                                                                              |
| `debug`              | `boolean` (optional)| If `true`, logs validation details to the console for debugging purposes.                                                                                   |

# Return Value

The function returns an object with the following properties:

- **`isValid`** (`boolean`):  
  Indicates whether the string passed all validations. Returns `true` if valid, otherwise `false`.


- **`errorMessage`** (`string | null`):  
  Contains the error message if validation failed. Returns `null` if the string is valid.

# Examples


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

### Vue Example

```vue
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
<br>
<br>


## Validation Flow

#### Required Check:

- Ensures the string is provided and not empty if required is true.

#### Length Validation:

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

### Custom Logic:

- Add domain-specific validations such as excluding certain characters or enforcing stricter input rules.

## Debugging Tips
- Use debug: true to log the validation process and outputs for troubleshooting.
- Leverage the callback parameter to execute custom actions based on validation results.