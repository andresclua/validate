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

## Common Use Cases

#### Form Submission Validation:
- Ensures that users have selected the required number of options before submitting a form.

#### User Preferences:
- Validates user settings where multiple selections are possible, ensuring that minimum criteria are met.


