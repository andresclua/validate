# isRadio  

The `isRadio` function provides flexible and customizable validation capabilities for `<input type="radio">` elements. It ensures that at least one radio button in a group is selected, allowing for custom error messages and supporting debugging and callback functionality.

It is modular, easy to debug, and extensible, making it suitable for a wide range of applications.



# Features

- **Basic Validation**:  Ensures at least one radio button in the group is selected.
- **Custom Error Messages**: Allows custom error messages for validation failure.
- **Debug Mode**: Provides detailed debugging information when enabled..
- **Callback Support**: Provides a way to handle validation results programmatically.

# Parameters

| **Parameter**          | **Type**                 | **Description**                                                                  |
|-------------------------|--------------------------|---------------------------------------------------------------------------------|
| `elements`              | `NodeList`       | A NodeList containing the checkbox elements to validate.                                |
| `config`               | `object` (optional)     | An optional object to customize validation behavior.                              |
| `config.customMessage`        |  `object` (optional)  | Custom error messages for validation failures: <br> - `required`: Message when no radio option is selected.     |
| `callback`         | `Function`    | null` (optional).                                                                                |
| `debug`         | `boolean` (optional)    | If true, enables debug mode to log detailed debug information.


# Return Value

The function returns an object with the following properties:

- **`isValid`** (`boolean`):  
Indicates whether the value passed all validations. Returns `true` if valid, otherwise `false`.

- **`errorMessage`** (`string | null`):  
  The error message if validation fails. Returns `null` if the value is valid.

# Examples


### Basic Radio Validation


```js
const radios = document.querySelectorAll('input[name="choice"]');

const result = isRadio({
  elements: radios,
  config: {
    customMessage: {
      required: "You must select an option.",
    }
  },
});

console.log(result);
// Output:
// { isValid: true, errorMessage: null }
```

### Validation with  Custom Errror Message
```js
const radios = document.querySelectorAll('input[name="flavor"]');

const result = isRadio({
  elements: radios,
  config: {
    customMessage: {
      required: "Please select your favorite flavor.",
    }
  },
});

console.log(result);
// Output:
// { isValid: false, errorMessage: "Please select your favorite flavor." }
```


### Debug Mode
```js
const radios = document.querySelectorAll('input[name="choice"]');

isRadio({
  elements: radios,
  config: {
    customMessage: {
      required: "Please select an option.",
    }
  },
  debug: true,
});
// Console Output:
// Validating radio buttons: [radio1, radio2, radio3]
// Result: { isValid: false, errorMessage: "Please select an option." }
}
```


### Using a Callback

```js
const radios = document.querySelectorAll('input[name="choice"]');

isRadio({
  elements: radios,
  callback: (result) => {
    if (result.isValid) {
      console.log("Radio selection is valid!");
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
    const radioInputs = document.querySelectorAll("#radios input[type='radio']");

    if (!radioInputs.length) return; // Exit if no radio inputs exist

    const radioWrapper = radioInputs[0].closest(".c--form-input-a");
    const radioErrorSpan = radioWrapper?.querySelector(".c--form-error-a");

    radioInputs.forEach((radio) => {
        radio.addEventListener("blur", () => {
            const result = isRadio({
                elements: radioInputs,
                config: {
                    customMessage: {
                        required: "Please select an option",
                    },
                },
            });

            if (result.isValid) {
                // Valid selection: remove error styles
                radioWrapper?.classList.remove("c--form-input-a--error");
                radioWrapper?.classList.add("c--form-input-a--valid");
                if (radioErrorSpan) {
                    radioErrorSpan.textContent = "";
                    radioErrorSpan.style.display = "none";
                }
            } else {
                // Invalid selection: show error message
                radioWrapper?.classList.add("c--form-input-a--error");
                radioWrapper?.classList.remove("c--form-input-a--valid");
                if (radioErrorSpan) {
                    radioErrorSpan.textContent = result.errorMessage;
                    radioErrorSpan.style.display = "block";
                }
            }
        });
    });
});

// Validation on Button Click
document.addEventListener("DOMContentLoaded", () => {
    const radioInputs = document.querySelectorAll("#radios2 input[type='radio']");
    const radioWrapper = radioInputs[0] ? radioInputs[0].closest(".c--form-input-a") : null;
    const radioErrorSpan = radioInputs[0]
        ? radioInputs[0].closest(".c--form-group-a")?.querySelector(".c--form-error-a")
        : null;
    const submitButton = document.querySelector("#submitRadios");

    if (submitButton) {
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default form submission

            if (radioInputs.length) {
                const result = isRadio({
                    elements: radioInputs,
                    config: {
                        customMessage: {
                            required: "Please select an option",
                        },
                    },
                });

                if (result.isValid) {
                    // Valid selection: apply valid styles and clear errors
                    radioWrapper?.classList.add("c--form-input-a--valid");
                    radioWrapper?.classList.remove("c--form-input-a--error");
                    if (radioErrorSpan) {
                        radioErrorSpan.textContent = "";
                        radioErrorSpan.style.display = "none";
                    }
                    console.log("Selection is valid!");
                } else {
                    // Invalid selection: show error message
                    radioWrapper?.classList.add("c--form-input-a--error");
                    radioWrapper?.classList.remove("c--form-input-a--valid");
                    if (radioErrorSpan) {
                        radioErrorSpan.textContent = result.errorMessage;
                        radioErrorSpan.style.display = "block";
                    }
                    console.log("Selection is invalid:", result.errorMessage);
                }
            }
        });
    }
});
```

These examples demonstrate how to use the isRadio function to validate a group of radio inputs on both the blur event (when the user leaves the input field) and the click event of a submit button. The code applies the appropriate styles and displays error messages based on the validation result.

<br>
<br>

## Validation Flow

#### Minimum Check:
 - Ensures at least one radio button in the group is selected.
- If no radio button is selected, returns the error message "Please select an option.".


#### Final Result:
- If all checks pass, isValid is true and errorMessage is null.
- Otherwise, isValid is false and errorMessage contains the failure reason.




<br><br>

## Common Use Cases

#### Form Submission Validation:
- Validate radio button groups in real-time on user input or before form submission.
