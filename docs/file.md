# isFile

The `isFile` function provides flexible and customizable validation capabilities for file input fields. It validates both the file type (format) and size, ensuring the uploaded file meets specified requirements. It also supports custom error messages, debugging, and callback functionality.

It is modular, debug-friendly, and extensible, making it suitable for a wide range of applications.

## Features
- **File Type Validation:** Ensures the file is of an allowed type (e.g., `.jpg`, `.png`, `.pdf`).
- **File Size Validation:** Ensures the file size does not exceed the specified limit.
- **Custom Error Messages:** Allows custom error messages for both file type and size validation failures.
- **Debug Mode:** Logs detailed information for debugging if the `debug` flag is enabled.
- **Callback Support:** Executes a callback with the validation result, enabling real-time actions based on validation status.

## Parameters

| **Parameter**       | **Type**            | **Description**                                                                                                                                              |
|---------------------|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `element`           | `File`              | The file input element (or file object) to validate.                                                                                                        |
| `config`            | `object` (optional) | An optional object to customize validation behavior.                                                                                                        |
| `config.required`   | `boolean` (optional)| If `true`, ensures a file is selected before proceeding.                                                                                                    |
| `config.allowedTypes` | `array` (optional) | An array of allowed file extensions (e.g., `["image/jpeg", "image/png"]`).                                                                                  |
| `config.maxSize`    | `number` (optional) | The maximum allowed file size in bytes.                                                                                                                      |
| `config.customMessage` | `object` (optional) | Custom error messages for validation failures: <br> - `required`: Message when no file is selected. <br> - `type`: Message for unsupported file types. <br> - `size`: Message for file size validation failure. |
| `callback`          | `function` (optional)| A function that receives the validation result as an argument.                                                                                              |
| `debug`             | `boolean` (optional)| If `true`, logs validation details to the console for debugging purposes.                                                                                   |

## Return Value

The function returns an object with the following properties:

- **`isValid`** (`boolean`):  
  Indicates whether the file passed all validations. Returns `true` if valid, otherwise `false`.

- **`errorMessage`** (`string | null`):  
  Contains the error message if validation failed. Returns `null` if the value is valid.

## Examples

### Basic File Validation
```js
const fileInput = document.querySelector('#file-input');

const result = isFile({
  element: fileInput.files[0],
});

console.log(result);
// Output:
// { isValid: true, errorMessage: null }
```

### File Type Validation

```js
const fileInput = document.querySelector('#file-input');

const result = isFile({
  element: fileInput.files[0],
  config: {
    allowedTypes: ["image/jpeg", "image/png"],
    customMessage: {
      type: "Only JPEG and PNG files are allowed.",
    },
  },
});

console.log(result);
// Output:
// { isValid: false, errorMessage: "Only JPEG and PNG files are allowed." }
```

### File Size Validation
```js
const fileInput = document.querySelector('#file-input');

const result = isFile({
  element: fileInput.files[0],
  config: {
    maxSize: 1048576, // 1MB
    customMessage: {
      size: "The file size must not exceed 1MB.",
    },
  },
});

console.log(result);
// Output:
// { isValid: false, errorMessage: "The file size must not exceed 1MB." }
```

### Debug Mode

```js
const fileInput = document.querySelector('#file-input');

isFile({
  element: fileInput.files[0],
  config: {
    allowedTypes: ["image/jpeg", "image/png"],
    maxSize: 1048576,
  },
  debug: true,
});
// Console Output:
// Validating file: [file object]
// Result: { isValid: false, errorMessage: "The file size must not exceed 1MB." }
```

### Using Callback

```js
const fileInput = document.querySelector('#file-input');

isFile({
  element: fileInput.files[0],
  callback: (result) => {
    if (result.isValid) {
      console.log("File is valid!");
    } else {
      console.error("Validation failed:", result.errorMessage);
    }
  },
});
```

## Validation Flow

#### Required Validation:

- Ensures a file is selected.
- If no file is selected, returns the error message "Please select a file.".

#### File Type Validation:

- Ensures the file type matches one of the allowed types.
- If the file type is not allowed, returns the error message: "Only JPG, PNG, or PDF files are allowed."

#### File Size Validation:
- Ensures the file size does not exceed the specified maxSize in bytes.
- If the file exceeds the size limit, returns the error message: "The file size must not exceed 1MB."


#### Final Result:
- If all checks pass, isValid is true and errorMessage is null.
- Otherwise, isValid is false and errorMessage contains the failure reason.



<br><br>

## Common Use Cases

#### File Upload Validation:
- Validate radio button groups in real-time on user input or before form submission.

