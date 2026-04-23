import Form from '../Form.js'
import '../layout.js'
import '../../scss/demo.scss'

function resetForm(formEl, statusEl) {
    formEl.reset()
    formEl.querySelectorAll('.c--form-input-a').forEach(w => {
        w.classList.remove('c--form-input-a--error', 'c--form-input-a--valid')
    })
    formEl.querySelectorAll('.c--form-error-a').forEach(el => { el.textContent = '' })
    if (statusEl) statusEl.classList.remove('is-visible')
}

document.addEventListener('DOMContentLoaded', () => {

    // ── Playground 1: Login ─────────────────────────────────────
    const loginStatus = document.getElementById('login-status')

    new Form({
        element: document.getElementById('form-login'),
        fields: [
            {
                element: document.getElementById('pg1-username'),
                validationFunction: 'isString',
                config: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                    customMessage: {
                        required: 'Username is required.',
                        minLength: 'Min 3 characters.',
                        maxLength: 'Max 20 characters.'
                    }
                },
                on: 'blur'
            },
            {
                element: document.getElementById('pg1-password'),
                validationFunction: 'isString',
                config: {
                    required: true,
                    minLength: 8,
                    customMessage: {
                        required: 'Password is required.',
                        minLength: 'At least 8 characters.'
                    }
                },
                on: 'blur'
            }
        ],
        submitButtonSelector: '#login-submit-btn',
        onSubmit: () => { loginStatus.classList.add('is-visible') },
        onError: () => { loginStatus.classList.remove('is-visible') }
    })

    document.getElementById('login-reset-btn').addEventListener('click', () => {
        resetForm(document.getElementById('form-login'), loginStatus)
    })


    // ── Playground 2: Bio ───────────────────────────────────────
    const bioStatus = document.getElementById('bio-status')

    new Form({
        element: document.getElementById('form-bio'),
        fields: [
            {
                element: document.getElementById('pg2-name'),
                validationFunction: 'isString',
                config: {
                    required: true,
                    minLength: 2,
                    maxLength: 30,
                    customMessage: {
                        required: 'Name is required.',
                        minLength: 'Min 2 characters.',
                        maxLength: 'Max 30 characters.'
                    }
                },
                on: 'blur'
            },
            {
                element: document.getElementById('pg2-bio'),
                validationFunction: 'isString',
                config: {
                    required: true,
                    minLength: 40,
                    customMessage: {
                        required: 'Bio is required.',
                        minLength: 'Write at least 40 characters.'
                    }
                },
                on: 'blur'
            }
        ],
        submitButtonSelector: '#bio-submit-btn',
        onSubmit: () => { bioStatus.classList.add('is-visible') },
        onError: () => { bioStatus.classList.remove('is-visible') }
    })

    document.getElementById('bio-reset-btn').addEventListener('click', () => {
        resetForm(document.getElementById('form-bio'), bioStatus)
    })


    // ── Playground 3: Text match + checkbox ─────────────────────
    const pg3TextInput  = document.getElementById('pg3-text')
    const pg3AcceptCb   = document.getElementById('pg3-accept-cb')
    const matchSubmitBtn = document.getElementById('match-submit-btn')
    const matchStatus   = document.getElementById('match-status')

    function updateMatchState() {
        const textOk = pg3TextInput.value === 'Lorem ipsum'
        const cbOk   = pg3AcceptCb.checked
        matchSubmitBtn.disabled = !(textOk && cbOk)
    }
    pg3TextInput.addEventListener('input', updateMatchState)
    pg3AcceptCb.addEventListener('change', updateMatchState)

    new Form({
        element: document.getElementById('form-match'),
        fields: [
            {
                element: pg3TextInput,
                validationFunction: 'isString',
                config: {
                    required: true,
                    pattern: /^Lorem ipsum$/,
                    customMessage: {
                        required: 'This field is required.',
                        pattern: 'Type exactly: Lorem ipsum'
                    }
                },
                on: 'input'
            },
            {
                elements: document.querySelectorAll('#pg3-accept-cb'),
                validationFunction: 'isCheckbox',
                config: {
                    minRequired: 1,
                    customMessage: { minRequired: 'You must accept the terms.' }
                },
                on: 'change'
            }
        ],
        submitButtonSelector: '#match-submit-btn',
        onSubmit: () => { matchStatus.classList.add('is-visible') },
        onError: () => { matchStatus.classList.remove('is-visible') }
    })

    document.getElementById('match-reset-btn').addEventListener('click', () => {
        resetForm(document.getElementById('form-match'), matchStatus)
        matchSubmitBtn.disabled = true
    })


    // ── Playground 4: Password confirm ──────────────────────────
    const pg4PasswordInput = document.getElementById('pg4-password')
    const pwStatus = document.getElementById('pw-status')

    const confirmValidator = ({ element: value }) => {
        if (!value) return { isValid: false, errorMessage: 'Please confirm your password.' }
        return {
            isValid: value === pg4PasswordInput.value,
            errorMessage: 'Passwords do not match.'
        }
    }

    new Form({
        element: document.getElementById('form-pw'),
        fields: [
            {
                element: pg4PasswordInput,
                validationFunction: 'isString',
                config: {
                    required: true,
                    minLength: 8,
                    customMessage: {
                        required: 'Password is required.',
                        minLength: 'At least 8 characters.'
                    }
                },
                on: 'blur'
            },
            {
                element: document.getElementById('pg4-confirm'),
                validationFunction: confirmValidator,
                config: {},
                on: 'blur'
            }
        ],
        submitButtonSelector: '#pw-submit-btn',
        onSubmit: () => { pwStatus.classList.add('is-visible') },
        onError: () => { pwStatus.classList.remove('is-visible') }
    })

    document.getElementById('pw-reset-btn').addEventListener('click', () => {
        resetForm(document.getElementById('form-pw'), pwStatus)
    })

})
