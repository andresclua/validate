# isEmail

The isEmail function provides flexible and customizable email validation capabilities. It supports multiple types of validation, including format checks, corporate domain validation, and custom user-defined rules. The function is modular, debug-friendly, and extensible, making it suitable for a wide range of applications.


# Features
- Basic Email Validation: Ensures the email follows standard format rules.
- Corporate Email Validation: Rejects generic email domains like Gmail, Yahoo, or Outlook.
- Custom Validation: Allows additional user-defined checks for advanced requirements.
- Error Messaging: Supports custom error messages for different validation types.
- Debug Mode: Logs validation details for easier debugging.
- Callback Support: Enables custom actions based on the validation result.

# Parameters

| **Parameter**       | **Type**            | **Description**                                                                                                                                              |
|----------------------|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `element`            | `string`           | The email address to validate.                                                                                                                              |
| `config`             | `object` (optional)| An optional object to customize validation behavior.                                                                                                        |
| `type`           | `string` (optional)| Specifies the type of validation: <br> - `"corporate"`: Ensures the email is not from generic domains like Gmail, Yahoo, or Outlook.                        |
| `customMessage`  | `object` (optional)| Custom error messages for validation failures: <br> - **`corporate`**: Message for corporate email validation failure. <br> - **`invalid`**: Message for invalid email format. |
| `customValidation` | `function` (optional)| A user-defined function for additional validation. <br> **Input**: The email address. <br> **Output**: An object with: <br> - `isValid` (`boolean`): Whether the custom validation passed. <br> - `errorMessage` (`string`): Error message for failed validation. |
| `callback`           | `function` (optional)| A function that receives the validation result as an argument.                                                                                              |
| `debug`              | `boolean` (optional)| If `true`, logs validation details to the console for debugging purposes.                                                                                   |

# Return Value

The function returns an object with the following properties:

- **`isValid`** (`boolean`):  
  Indicates whether the value passed all validations. Returns `true` if valid, otherwise `false`.

- **`errorMessage`** (`string | null`):  
  Contains the error message if validation failed. Returns `null` if the value is valid.

# Examples


### Basic Email Validation
```js
const result = isEmail({
  element: "test@example.com",
});

console.log(result);
// Output:
// { isValid: true, errorMessage: null }
```

### Corporate Email Validation
```js
const result = isEmail({
  element: "user@gmail.com",
  config: { type: "corporate" },
});

console.log(result);
// Output:
// { isValid: false, errorMessage: "The email must be associated with your company domain. Personal email providers such as Gmail, Yahoo, or Outlook are not permitted." }
```

### Custom Validation and Messages

```js
const result = isEmail({
  element: "test@mycompany.org",
  config: {
    type: "corporate",
    customMessage: {
      corporate: "Only company emails are allowed.",
    },
    customValidation: (email) => ({
      isValid: email.endsWith(".org"),
      errorMessage: "Email must end with '.org'.",
    }),
  },
});

console.log(result);
// Output:
// { isValid: true, errorMessage: null }
```

### Debug Mode
```js
isEmail({
  element: "invalid-email",
  debug: true,
});
// Console Output:
// Validating email: invalid-email
// Result: { isValid: false, errorMessage: "Please enter a valid email address." }
```

### Using a Callback
```js
isEmail({
  element: "test@example.com",
  callback: (result) => {
    if (result.isValid) {
      console.log("Email is valid!");
    } else {
      console.error("Validation failed:", result.errorMessage);
    }
  },
});
```

<br>
<br>


## Validation Flow

#### Email Format:

- Validates the email against a standard format using a regular expression.
- If invalid, returns "Please enter a valid email address.".

#### Corporate Email Check (if configured):

- Ensures the email domain is not generic (e.g., Gmail, Yahoo, Outlook).
- If invalid, returns "The email must be associated with your company domain.".

#### Custom Validation (if configured):

- Executes the user-defined validation function.
- If it fails, returns the custom error message from the function.

#### Final Result:

- If all checks pass, isValid is true and errorMessage is null.
- Otherwise, isValid is false and errorMessage contains the failure reason.
<br><br>

## Common Use Cases

#### Form Validation:

- Validate email fields in real-time on user input or before form submission.
#### Corporate Applications:

- Ensure only company emails are accepted for registration.

### Custom Logic:

- Enforce additional rules, such as specific domain requirements or string patterns.

## Debugging Tips
- Enable debug: true to see detailed logs of the validation process.
- Use the callback function to handle validation results in real-time.