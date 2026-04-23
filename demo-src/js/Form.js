import {
    isString,
    isEmail,
    isNumber,
    isSelect,
    isCheckbox,
    isRadio,
    isFile,
} from '@andresclua/validate'

class Form {
    constructor({
        element,
        fields,
        submitButtonSelector = null,
        beforeSubmit = null,
        onSubmit = null,
        onError = null,
        validators = {},
    }) {
        if (!element) throw new Error('A form element is required.')

        this.fields = fields || []
        this.beforeSubmit = beforeSubmit
        this.onSubmit = onSubmit
        this.onError = onError

        this.DOM = {
            form: element,
            submitButton: submitButtonSelector ? element.querySelector(submitButtonSelector) : null,
        }

        this.validators = {
            isString,
            isEmail,
            isNumber,
            isSelect,
            isCheckbox,
            isRadio,
            isFile,
            ...validators,
        }

        this._listeners = []

        this.init()
        this.events()
    }

    init() {
        this.initializeFields()
    }

    events() {
        this.initializeSubmit()
    }

    getValidator(validationFunction) {
        if (typeof validationFunction === 'function') return validationFunction

        if (typeof validationFunction === 'string') {
            const fn = this.validators[validationFunction]
            if (!fn) throw new Error(`Validator "${validationFunction}" is not registered.`)
            return fn
        }

        throw new Error('validationFunction must be a function or a string key.')
    }

    runField(field) {
        const { element, elements, validationFunction, config } = field
        const validator = this.getValidator(validationFunction)

        if (elements) {
            const result = validator({ elements, config })
            this.updateFieldState(field, result)
            return result
        }

        if (!(element instanceof Element)) {
            throw new Error('Field must include `element` (DOM Element) or `elements` (NodeList).')
        }

        if (element.tagName === 'INPUT' && element.type === 'file') {
            const file = element.files?.[0] || null
            const result = validator({ element: file, config })
            this.updateFieldState(field, result)
            return result
        }

        const result = validator({ element: element.value, config })
        this.updateFieldState(field, result)
        return result
    }

    initializeFields() {
        this.fields.forEach((field) => {
            const { element, elements, on } = field

            if (on === null) return

            const eventType = on || 'blur'
            const target = element || (elements && elements[0])
            if (!target) throw new Error('Each field must have `element` or `elements`.')

            const handler = () => this.runField(field)

            target.addEventListener(eventType, handler)
            this._listeners.push({ target, event: eventType, handler })
        })
    }

    updateFieldState(field, result) {
        const { element, elements } = field

        const baseEl = element || (elements && elements[0])
        if (!(baseEl instanceof Element)) return

        const formGroup = baseEl.closest('.c--form-group-a')
        let errorSpan = formGroup?.querySelector('.c--form-error-a')

        if (!errorSpan && formGroup) {
            errorSpan = document.createElement('span')
            errorSpan.classList.add('c--form-error-a')
            formGroup.appendChild(errorSpan)
        }

        if (elements) {
            if (errorSpan) {
                errorSpan.textContent = result.isValid ? '' : result.errorMessage
            }
            return
        }

        let wrapper = null
        let baseClass = null

        if (baseEl.tagName === 'SELECT') {
            wrapper = baseEl.closest('.c--form-input-a')
            baseClass = 'c--form-input-a'
        } else if (baseEl.tagName === 'INPUT' && baseEl.type === 'file') {
            wrapper = baseEl
            baseClass = 'c--form-file-a'
        } else {
            wrapper = baseEl.closest('.c--form-input-a')
            baseClass = 'c--form-input-a'
        }

        if (!wrapper || !baseClass) return

        const errorClass = `${baseClass}--error`
        const validClass = `${baseClass}--valid`

        if (result.isValid) {
            wrapper.classList.remove(errorClass)
            wrapper.classList.add(validClass)
            if (errorSpan) errorSpan.textContent = ''
        } else {
            wrapper.classList.add(errorClass)
            wrapper.classList.remove(validClass)
            if (errorSpan) errorSpan.textContent = result.errorMessage
        }
    }

    validateAllFields() {
        const invalidFields = []

        this.fields.forEach((field) => {
            const result = this.runField(field)
            if (!result?.isValid) {
                invalidFields.push({ field, errorMessage: result?.errorMessage || 'Invalid field' })
            }
        })

        return invalidFields
    }

    initializeSubmit() {
        if (this.DOM.submitButton) {
            const handler = (event) => {
                event.preventDefault()
                this.handleValidation()
            }
            this.DOM.submitButton.addEventListener('click', handler)
            this._listeners.push({ target: this.DOM.submitButton, event: 'click', handler })
        }

        const formHandler = (event) => {
            event.preventDefault()
            this.handleValidation()
        }
        this.DOM.form.addEventListener('submit', formHandler)
        this._listeners.push({ target: this.DOM.form, event: 'submit', handler: formHandler })
    }

    handleValidation() {
        if (this.beforeSubmit) {
            const shouldContinue = this.beforeSubmit()
            if (shouldContinue === false) return
        }

        const invalidFields = this.validateAllFields()

        if (invalidFields.length === 0) {
            if (this.onSubmit) this.onSubmit()
        } else {
            if (this.onError) this.onError(invalidFields)
        }
    }

    destroy() {
        this._listeners.forEach(({ target, event, handler }) => {
            target.removeEventListener(event, handler)
        })
        this._listeners = []
    }
}

export default Form
