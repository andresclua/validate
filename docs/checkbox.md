# isNumber  

The isNumber function validates numerical input based on various configurable rules such as positivity, negativity, range, and custom validations. It is flexible, supports debugging, and allows developers to provide custom error messages for specific scenarios.


# Features
- **Minimum Required Check**:  Ensures that at least a specified number of checkboxes are checked.
- **Custom Error Messages**: Allows for custom messages based on validation results.
- **Custom Validation**: Allows user-defined validation rules for advanced scenarios.
- **Debug Mode**: Logs validation details for easier debugging.
- **Callback Support**: Provides a way to handle validation results programmatically.

# Parameters

| **Parameter**          | **Type**                 | **Description**                                                                                                                                                 |
|-------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `elements`              | `NodeList`       | A NodeList containing the checkbox elements to validate.                                                                                                                                          |
| `config`               | `object` (optional)     | An optional object to customize validation behavior.                                                                                                           |
| `required`        | `boolean` (optional)    | Configuration object for setting up validation rules, including minRequired and customMessage..                                                                                                               |
| `callback`         | `Function`    | null` (optional).                                                                                                               |
| `debug`         | `boolean` (optional)    | If true, enables debug mode to log detailed debug information.


# Return Value

The function returns an object with the following properties:

- **`isValid`** (`boolean`):  
  `True` if the number of checked checkboxes meets or exceeds the minimum required; otherwise, false..

- **`errorMessage`** (`string | null`):  
  The error message if validation fails. Returns `null` if the value is valid.

# Examples


### Basic Checkbox Validation


```js
const checkboxes = document.querySelectorAll('.my-checkboxes');
const result = isCheckbox({
  elements: checkboxes,
  config: {
    minRequired: 2,
    customMessage: {
      minRequired: "Please select at least two options."
    }
  },
  debug: true
});

console.log(result);
// Output:
// { isValid: false, errorMessage: "Please select at least two options." }
```

### Validate with Callback
```js
const checkboxes = document.querySelectorAll('.my-checkboxes');
const result = isCheckbox({
  elements: checkboxes,
  config: {
    minRequired: 3
  },
  callback: (result) => {
    if (!result.isValid) {
      alert(result.errorMessage);
    }
  },
  debug: true
});

console.log(result);
// Depending on the number of checkboxes checked, it may trigger the alert.
```





## Validation Flow

#### Minimum Check:
 - Validates that the number of checked checkboxes is at least the minimum required.

#### Error Handling:
- Returns a custom error message if the validation fails..

#### Debugging Output:
- Logs detailed information about the validation process if debug mode is enabled.


<br><br>


## Validation Examples

```js
// Validation on Blur Event
document.addEventListener("DOMContentLoaded", () => {
    const checkboxInputs = document.querySelectorAll("#checkboxes input[type='checkbox']");

    if (!checkboxInputs.length) return; // Exit if no checkboxes exist

    const checkboxWrapper = checkboxInputs[0].closest(".c--form-input-a");
    const checkboxErrorSpan = checkboxWrapper?.querySelector(".c--form-error-a");

    checkboxInputs.forEach((checkbox) => {
        checkbox.addEventListener("blur", () => {
            const result = isCheckbox({
                elements: checkboxInputs,
                config: {
                    minRequired: 2,
                    customMessage: {
                        minRequired: "Please select at least 2 options",
                    },
                },
            });

            if (result.isValid) {
                // Valid selection: remove error styles
                checkboxWrapper?.classList.remove("c--form-input-a--error");
                checkboxWrapper?.classList.add("c--form-input-a--valid");
                if (checkboxErrorSpan) {
                    checkboxErrorSpan.textContent = "";
                    checkboxErrorSpan.style.display = "none";
                }
            } else {
                // Invalid selection: show error message
                checkboxWrapper?.classList.add("c--form-input-a--error");
                checkboxWrapper?.classList.remove("c--form-input-a--valid");
                if (checkboxErrorSpan) {
                    checkboxErrorSpan.textContent = result.errorMessage;
                    checkboxErrorSpan.style.display = "block";
                }
            }
        });
    });
});

// Validation on Button Click
document.addEventListener("DOMContentLoaded", () => {
    const checkboxInputs = document.querySelectorAll("#checkboxes2 input[type='checkbox']");
    const checkboxWrapper = checkboxInputs[0] ? checkboxInputs[0].closest(".c--form-input-a") : null;
    const checkboxErrorSpan = checkboxInputs[0]
        ? checkboxInputs[0].closest(".c--form-group-a")?.querySelector(".c--form-error-a")
        : null;
    const submitButton = document.querySelector("#submitCheckboxes");

    if (submitButton) {
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default form submission

            if (checkboxInputs.length) {
                const result = isCheckbox({
                    elements: checkboxInputs,
                    config: {
                        minRequired: 3,
                        customMessage: {
                            minRequired: "Please select at least 3 options",
                        },
                    },
                });

                if (result.isValid) {
                    // Valid selection: apply valid styles and clear errors
                    checkboxWrapper?.classList.add("c--form-input-a--valid");
                    checkboxWrapper?.classList.remove("c--form-input-a--error");
                    if (checkboxErrorSpan) {
                        checkboxErrorSpan.textContent = "";
                        checkboxErrorSpan.style.display = "none";
                    }
                    console.log("Selection is valid!");
                } else {
                    // Invalid selection: show error message
                    checkboxWrapper?.classList.add("c--form-input-a--error");
                    checkboxWrapper?.classList.remove("c--form-input-a--valid");
                    if (checkboxErrorSpan) {
                        checkboxErrorSpan.textContent = result.errorMessage;
                        checkboxErrorSpan.style.display = "block";
                    }
                    console.log("Selection is invalid:", result.errorMessage);
                }
            }
        });
    }
});
```

These examples demonstrate how to use the isCheckbox function to validate a group of checkbox inputs on both the blur event (when the user leaves the input field) and the click event of a submit button. The code applies the appropriate styles and displays error messages based on the validation result.

<br>
<br>

## Common Use Cases

#### Form Submission Validation:
- Ensures that users have selected the required number of options before submitting a form.

#### User Preferences:
- Validates user settings where multiple selections are possible, ensuring that minimum criteria are met.
