class Form {
    constructor({ element, fields, submitButtonSelector = null, onSubmit = null, onComplete = null, onError = null }) {
        if (!element) throw new Error("A form element is required.");

        this.formElement = element; // Elemento del formulario
        this.fields = fields; // Configuración de los campos
        this.onSubmit = onSubmit; // Callback al intentar enviar
        this.onComplete = onComplete; // Callback cuando todos los campos son válidos
        this.onError = onError; // Callback cuando hay errores
        this.submitButton = submitButtonSelector
            ? document.querySelector(submitButtonSelector)
            : null; // Botón de envío personalizado

        // Configurar eventos para los campos y el botón de envío
        this.initializeFields();
        this.initializeSubmit();
    }

    initializeFields() {
        this.fields.forEach((field) => {
            const { element, validationFunction, config, on } = field;

            if (!element) throw new Error("Each field must have an element.");
            if (!validationFunction) throw new Error("A validation function is required.");

            // Añadir eventos personalizados a cada campo
            element.addEventListener(on || "blur", () => {
                const result = validationFunction({
                    element: element.value,
                    config,
                });

                this.updateFieldState(element, result);
            });
        });
    }

    updateFieldState(element, result) {
        const wrapper = element.closest(".c--form-input-a");
        const formGroup = element.closest(".c--form-group-a"); // Buscar el grupo del formulario
        let errorSpan = formGroup?.querySelector(".c--form-error-a"); // Buscar un span existente

        // Crear el span de error dinámicamente si no existe
        if (!errorSpan && formGroup) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("c--form-error-a");
            errorSpan.style.display = "none"; // Ocultar inicialmente
            formGroup.appendChild(errorSpan); // Añadir al grupo del formulario
        }

        // Actualizar el estado del campo
        if (result.isValid) {
            wrapper?.classList.remove("c--form-input-a--error");
            wrapper?.classList.add("c--form-input-a--valid");
            if (errorSpan) {
                errorSpan.textContent = ""; // Limpiar el texto del mensaje
                errorSpan.style.display = "none"; // Ocultar el mensaje
            }
        } else {
            wrapper?.classList.add("c--form-input-a--error");
            wrapper?.classList.remove("c--form-input-a--valid");
            if (errorSpan) {
                errorSpan.textContent = result.errorMessage; // Mostrar el mensaje de error
                errorSpan.style.display = "block"; // Hacer visible el mensaje
            }
        }
    }

    validateAllFields() {
        const invalidFields = [];
        this.fields.forEach((field) => {
            const { element, validationFunction, config } = field;
            const result = validationFunction({
                element: element.value,
                config,
            });

            this.updateFieldState(element, result);
            if (!result.isValid) {
                invalidFields.push({ element, errorMessage: result.errorMessage });
            }
        });

        return invalidFields;
    }

    initializeSubmit() {
        // Manejar el evento de clic en el botón personalizado (si está definido)
        if (this.submitButton) {
            this.submitButton.addEventListener("click", (event) => {
                event.preventDefault(); // Prevenir el comportamiento por defecto
                this.handleValidation();
            });
        }

        // Manejar el evento submit del formulario
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevenir el envío por defecto
            this.handleValidation();
        });
    }

    handleValidation() {
        // Ejecutar el callback `onSubmit`, si está definido
        if (this.onSubmit) {
            this.onSubmit();
        }

        const invalidFields = this.validateAllFields();

        if (invalidFields.length === 0) {
            // Todos los campos son válidos
            if (this.onComplete) {
                this.onComplete(); // Ejecutar callback de éxito
            }
        } else {
            // Hay errores en el formulario
            if (this.onError) {
                this.onError(invalidFields); // Ejecutar callback de error con detalles
            }
        }
    }
}

export default Form;
