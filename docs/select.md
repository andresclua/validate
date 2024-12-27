# isSelect

The `isSelect` function provides flexible and customizable validation capabilities for `<select>` fields. It supports basic validation, such as ensuring a user selects a valid option, and allows for custom user-defined validation rules.

It is modular, debug-friendly, and extensible, making it suitable for a wide range of applications.



# Features
- **Basic Validation:** Ensures a valid option is selected from the `<select>`.
- **Required Validation:** Requires a valid option to be selected to be considered valid.
- **Custom Validation:** Allows for additional user-defined validation rules.
- **Custom Error Messages:** Supports custom error messages for different validation types.
- **Debug Mode:** Logs validation details for easier debugging.
- **Callback Support:** Enables custom actions based on the validation result.

# Parameters

| **Parameter**       | **Type**              | **Description**                                                                                                                                              |
|----------------------|--------------------- |--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `element`            | `string`             | The value selected from the `<select>` element.     |
| `config`             | `object` (optional)  | An optional object to customize validation behavior.  |                                                                                                       |
| `config.required`    | `boolean` (optional) | If `true`, ensures that an option is selected and not empty.   |
| `config.customMessage` | `object` (optional)  | Custom error messages for validation failures: <br> - `required`: Message for required validation failure. <br> - `customValidation`: Message for custom validation failure.  |
| `config.customValidation`   | `function` (optional)|  A user-defined function for additional validation. <br> Input: The selected value. <br> **Output**: An object with: <br> - `isValid` (`boolean`): Whether the custom validation passed. <br> - `errorMessage` (`string`): Error message for failed validation. |
| `callback`           | `function` (optional)| A function that receives the validation result as an argument.                                                                                              |
| `debug`              | `boolean` (optional)| If `true`, logs validation details to the console for debugging purposes.                                                                                   |

# Return Value

The function returns an object with the following properties:


- **`isValid`** (`boolean`):  
    Indicates whether the value passed all validations. Returns `true` if valid, otherwise `false`.


- **`errorMessage`** (`string | null`):  
    Contains the error message if validation failed. Returns `null` if the value is valid.


# Examples


### Basic Select Validation
```js
const result = isSelect({
  element: "us", // The selected option value
  config: { required: true },
});

console.log(result);
// Output:
// { isValid: true, errorMessage: null }
```


### Custom Validation 

```js
const result = isSelect({
  element: "frontend", // The selected option value
  config: {
    required: true,
    customValidation: (value) => ({
      isValid: value !== "backend", // Rejects backend option
      errorMessage: "Backend option is not allowed.",
    }),
  },
});

console.log(result);
// Output:
// { isValid: false, errorMessage: "Backend option is not allowed." }
```

### Debug Mode
```js
isSelect({
  element: "", // Empty value
  config: { required: true },
  debug: true,
});
// Console Output:
// Validating select: 
// Result: { isValid: false, errorMessage: "You must select a valid option." }
```

### Using a Callback
```js
isSelect({
  element: "frontend", // The selected option value
  callback: (result) => {
    if (result.isValid) {
      console.log("The selected option is valid!");
    } else {
      console.error("Validation failed:", result.errorMessage);
    }
  },
});
```

<br>
<br>


## Validation Flow

#### Required Validation:

- Ensures the user has selected an option.
- If no option is selected, returns the error message "Please select a valid option".

#### Custom Validation (if configured):

- Executes the user-defined validation function.
- If it fails, returns the custom error message from the function.

#### Final Result:

- If all checks pass, isValid is true and errorMessage is null.
- Otherwise, isValid is false and errorMessage contains the failure reason.


<br><br>

## Common Use Cases

#### Form Validation:

- Validate dropdown fields in real-time on user input or before form submission.

#### Custom Logic:

- Enforce additional rules, such as disallowing specific options.


## Debugging Tips
- Enable debug: true to see detailed logs of the validation process.
- Use the callback function to handle validation results in real-time.
