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

### Validation Examples

```js
// Validation on Blur Event
document.addEventListener("DOMContentLoaded", () => {
    const selectInput = document.querySelector("#select");

    if (!selectInput) return; // Exit if input doesn't exist

    const selectWrapper = selectInput.closest(".c--form-input-a");
    const selectErrorSpan = selectWrapper?.querySelector(".c--form-error-a");

    selectInput.addEventListener("blur", () => {
        const result = isSelect({
            element: selectInput.value,
            config: {
                required: true,
                customMessage: {
                    required: "Please select a valid option",
                },
            },
        });

        if (result.isValid) {
            // Valid selection: remove error styles
            selectWrapper?.classList.remove("c--form-input-a--error");
            selectWrapper?.classList.add("c--form-input-a--valid");
            if (selectErrorSpan) {
                selectErrorSpan.textContent = "";
                selectErrorSpan.style.display = "none";
            }
        } else {
            // Invalid selection: show error message
            selectWrapper?.classList.add("c--form-input-a--error");
            selectWrapper?.classList.remove("c--form-input-a--valid");
            if (selectErrorSpan) {
                selectErrorSpan.textContent = result.errorMessage;
                selectErrorSpan.style.display = "block";
            }
        }
    });
});

// Validation on Button Click
document.addEventListener("DOMContentLoaded", () => {
    const selectInput = document.querySelector("#select2");
    const selectWrapper = selectInput ? selectInput.closest(".c--form-input-a") : null;
    const selectErrorSpan = selectInput
        ? selectInput.closest(".c--form-group-a")?.querySelector(".c--form-error-a")
        : null;
    const submitButton = document.querySelector("#submitSelect");

    if (submitButton) {
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default form submission

            if (selectInput) {
                const result = isSelect({
                    element: selectInput.value,
                    config: {
                        required: true,
                        customMessage: {
                            required: "Please select a valid option",
                        },
                        customValidation: (value) => ({
                            isValid: value !== "backend", // Rejects backend option
                            errorMessage: "Backend option is not allowed.",
                        }),
                    },
                });

                if (result.isValid) {
                    // Valid selection: apply valid styles and clear errors
                    selectWrapper?.classList.add("c--form-input-a--valid");
                    selectWrapper?.classList.remove("c--form-input-a--error");
                    if (selectErrorSpan) {
                        selectErrorSpan.textContent = "";
                        selectErrorSpan.style.display = "none";
                    }
                    console.log("Selection is valid!");
                } else {
                    // Invalid selection: show error message
                    selectWrapper?.classList.add("c--form-input-a--error");
                    selectWrapper?.classList.remove("c--form-input-a--valid");
                    if (selectErrorSpan) {
                        selectErrorSpan.textContent = result.errorMessage;
                        selectErrorSpan.style.display = "block";
                    }
                    console.log("Selection is invalid:", result.errorMessage);
                }
            }
        });
    }
});
```

These examples demonstrate how to use the isSelect function to validate a select input field on both the blur event (when the user leaves the input field) and the click event of a submit button. The code applies the appropriate styles and displays error messages based on the validation result.

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
