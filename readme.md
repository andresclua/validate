# Form Validation Library
A lightweight JavaScript utility for validating form fields like email and username. This example demonstrates how to integrate and use the library to ensure inputs meet specified criteria.

## Why Choose This Library?
This validation library is designed with flexibility, modularity, and ease of use in mind. Here are the key reasons why it stands out:

### Framework-Agnostic
This library is framework-agnostic, meaning it works seamlessly with any JavaScript environment:

- Use it in plain JavaScript for lightweight projects.
- Integrate it into frameworks like React, Vue, Svelte, or Angular.
- Ideal for modern frontends or traditional setups.
<br><br>

### Modular Design
Each validation function is a self-contained module, allowing you to:

- Import only the functions you need, keeping your project lightweight.
- Extend or modify specific validations without affecting others.
- Scale effortlessly by adding new validators.

```js
import { isEmail } from "./utils/isEmail";
import { isString } from "./utils/isString";
```

### Customizable

The library allows extensive customization to suit your project requirements:

- Define your own error messages with customMessage.
- Configure validations for specific needs like corporate emails, string length, or patterns.

```js
isEmail({
    element: "user@example.com",
    config: {
        type: "corporate",
        customMessage: "Please use a corporate email address.",
    },
});
```

### Flexible Validation Flow

The library supports multiple ways to handle validation:

- On blur: Validate inputs as the user interacts with them.
- On submit: Validate all inputs when the form is submitted.
- Combined flow: Use both for a robust user experience.

```js
document.querySelector("#email").addEventListener("blur", () => {
    const result = isEmail({ element: emailInput.value });
    if (!result.isValid) {
        console.error(result.errorMessage);
    }
});
```

### VUE
```javascript
<template>
  <div class="c--form-group-a">
    <label class="c--label-a" for="email">Email</label>
    <div
      :class="[
        'c--form-input-a',
        { 'c--form-input-a--error': emailError.value, 'c--form-input-a--valid': emailValid.value }
      ]"
    >
      <input
        class="c--form-input-a__item"
        type="email"
        id="email"
        v-model="email"
        @blur="validateEmail"
        placeholder="Enter your email"
      />
    </div>
    <span
      class="c--form-error-a"
      v-show="emailError.value"
    >
      {{ emailErrorMessage.value }}
    </span>
  </div>
</template>

<script>
import { ref } from "vue";
import { isEmail } from "@/utils/isEmail"; // Asegúrate de importar la función

export default {
  setup() {
    // Estado Reactivo
    const email = ref(""); // Valor del input
    const emailValid = ref(false); // Estado de validación
    const emailError = ref(false); // Indica si hay un error
    const emailErrorMessage = ref(""); // Mensaje de error

    // Método de Validación
    const validateEmail = () => {
      const result = isEmail({
        element: email.value,
        config: { type: "corporate" },
      });

      if (result.isValid) {
        emailValid.value = true;
        emailError.value = false;
        emailErrorMessage.value = "";
      } else {
        emailValid.value = false;
        emailError.value = true;
        emailErrorMessage.value = result.errorMessage;
      }
    };

    // Retornamos las propiedades reactivas y el método
    return {
      email,
      emailValid,
      emailError,
      emailErrorMessage,
      validateEmail,
    };
  },
};
</script>

<style>
/* Agrega estilos como los que usaste antes */
.c--form-input-a--error {
  border-color: red;
  background-color: #ffe6e6;
}

.c--form-input-a--valid {
  border-color: green;
  background-color: #e6ffe6;
}

.c--form-error-a {
  color: red;
  font-size: 0.875em;
}
</style>
```


