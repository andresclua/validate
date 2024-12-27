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




