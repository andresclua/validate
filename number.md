# isNumber  

The isNumber function validates numerical input based on various configurable rules such as positivity, negativity, range, and custom validations. It is flexible, supports debugging, and allows developers to provide custom error messages for specific scenarios.


# Features
- **Required Validation**: Ensures the value is provided.
- **Positive/Negative Validation**: Confirms whether the number is positive or negative.
- **Range Validation**: Validates if the number falls within a specified range.
- **Exact Length Validation**: Ensures the value has a specific number of digits.
- **Custom Validation**: Allows user-defined validation rules for advanced scenarios.
- **Debug Mode**: Logs validation details for easier debugging.
- **Callback Support**: Provides a way to handle validation results programmatically.

# Parameters

| **Parameter**          | **Type**                 | **Description**                                                                                                                                                 |
|-------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `element`              | `string | number`       | The value to validate.                                                                                                                                          |
| `config`               | `object` (optional)     | An optional object to customize validation behavior.                                                                                                           |
| **`required`**         | `boolean` (optional)    | Ensures the value is provided. Default: `false`.                                                                                                               |
| **`positive`**         | `boolean` (optional)    | Ensures the value is positive. Default: `false`.                                                                                                               |
| **`negative`**         | `boolean` (optional)    | Ensures the value is negative. Default: `false`.                                                                                                               |
| **`integer`**          | `boolean` (optional)    | Ensures the value is an integer. Default: `false`.                                                                                                             |
| **`min`**              | `number` (optional)     | Specifies the minimum value allowed.                                                                                                                           |
| **`max`**              | `number` (optional)     | Specifies the maximum value allowed.                                                                                                                           |
| **`length`**           | `number` (optional)     | Ensures the value has exactly the specified                                                                                 |

# Return Value

The function returns an object with the following properties:

- **`isValid`** (`boolean`):  
  `true` if the value passes all validations, otherwise `false`.

- **`errorMessage`** (`string | null`):  
  The error message if validation fails. Returns `null` if the value is valid.

# Examples


### Basic Number Validation
```js
const result = isNumber({
  element: "42",
});

console.log(result);
// Output:
// { isValid: true, errorMessage: null }
```

### Validate Positive Integer
```js
const result = isNumber({
  element: "-5",
  config: { positive: true, integer: true },
});

console.log(result);
// Output:
// { isValid: false, errorMessage: "The value must be positive." }
```

### Required Value within a Range
```js
const result = isNumber({
  element: "10",
  config: { required: true, min: 5, max: 15 },
});

console.log(result);
// Output:
// { isValid: true, errorMessage: null }
```

### Exact Length Validation
```js
const result = isNumber({
  element: "1234",
  config: { length: 5 },
});

console.log(result);
// Output:
// { isValid: false, errorMessage: "The value must have exactly 5 digits." }
```

### Custom Validation and Messages
```js
const result = isNumber({
  element: "100",
  config: {
    min: 50,
    max: 200,
    customMessage: {
      min: "The value is too small.",
      max: "The value is too large.",
    },
    customValidation: (num) => ({
      isValid: num % 2 === 0,
      errorMessage: "The value must be even.",
    }),
  },
  callback: (result) => console.log(result),
  debug: true,
});

console.log(result);
// Output:
// { isValid: true, errorMessage: null }
```

<br>
<br>


## Validation Flow

#### Required Check:
 - Ensures the value is provided if required is true.

#### Number Check:
- Validates if the value is a valid number.

#### Positive/Negative Check:
- Validates if the value is positive or negative based on the configuration.

#### Integer Check:
- Ensures the value is an integer if integer is true.

#### Range Check:
- Validates if the number falls within the specified range (min and max).

#### Length Check:
- Ensures the value has the exact number of digits specified by length.

#### Custom Validation:
- Executes the user-defined validation function if provided.

#### Final Result:
- Returns an object indicating whether the value is valid and the corresponding error message.
<br><br>

## Common Use Cases

#### Form Validation:
- Validate numeric inputs in real-time or on form submission.

#### Range Enforcement:
- Ensure values fall within predefined boundaries (e.g., ages, prices).

#### Custom Logic:
- Add domain-specific rules, such as ensuring even/odd numbers or specific digit patterns.