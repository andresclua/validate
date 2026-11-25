function f({ element: i, config: e, result: t, debug: a }) {
  a && (console.log("Validation Debugging:"), console.log(`Element: ${i}`), console.log("Configuration:", e), console.log(`Result: ${t.isValid}`), t.isValid || console.log(`Error: ${t.errorMessage}`));
}
function g(i, e) {
  return e && typeof e == "function" && e(i), i;
}
function b({ element: i, config: e = {}, callback: t = null, debug: a = !1 }) {
  var o, u, d, h, m, c, p, v;
  const n = {
    required: "The value is required.",
    invalid: "The value must be a valid number.",
    positive: "The value must be positive.",
    negative: "The value must be negative.",
    integer: "The value must be an integer.",
    min: `The value must be greater than or equal to ${e.min}.`,
    max: `The value must be less than or equal to ${e.max}.`,
    length: `The value must have exactly ${e.length} digits.`
  };
  let s = !0, r = null;
  if (e.required && (i == null || i === "") && (s = !1, r = ((o = e.customMessage) == null ? void 0 : o.required) || n.required), s && isNaN(Number(i)) && (s = !1, r = ((u = e.customMessage) == null ? void 0 : u.invalid) || n.invalid), s && e.positive && Number(i) <= 0 && (s = !1, r = ((d = e.customMessage) == null ? void 0 : d.positive) || n.positive), s && e.negative && Number(i) >= 0 && (s = !1, r = ((h = e.customMessage) == null ? void 0 : h.negative) || n.negative), s && e.integer && !Number.isInteger(Number(i)) && (s = !1, r = ((m = e.customMessage) == null ? void 0 : m.integer) || n.integer), s && e.min !== void 0 && Number(i) < e.min && (s = !1, r = ((c = e.customMessage) == null ? void 0 : c.min) || n.min), s && e.max !== void 0 && Number(i) > e.max && (s = !1, r = ((p = e.customMessage) == null ? void 0 : p.max) || n.max), s && e.length !== void 0 && String(i).replace(".", "").length !== e.length && (s = !1, r = ((v = e.customMessage) == null ? void 0 : v.length) || n.length), s && typeof e.customValidation == "function") {
    const M = e.customValidation(Number(i));
    M.isValid || (s = !1, r = M.errorMessage);
  }
  const l = { isValid: s, errorMessage: r };
  return f({ element: i, config: e, result: l, debug: a }), g(l, t);
}
function V({ element: i, config: e = {}, callback: t = null, debug: a = !1 }) {
  var d, h, m;
  const n = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, s = /^[^\s@]+@(?!gmail\.com|yahoo\.com|outlook\.com)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, r = {
    corporate: "The email must be associated with your company domain. Personal email providers such as Gmail, Yahoo, or Outlook are not permitted",
    invalid: "Please enter a valid email address",
    required: "This field is required"
  };
  let l = !0, o = null;
  if (e.required && !i.trim() && (l = !1, o = ((d = e.customMessage) == null ? void 0 : d.required) || r.required), l && i && !n.test(i) && (l = !1, o = ((h = e.customMessage) == null ? void 0 : h.invalid) || r.invalid), l && e.type === "corporate" && !s.test(i) && (l = !1, o = ((m = e.customMessage) == null ? void 0 : m.corporate) || r.corporate), l && e.customValidation) {
    const c = e.customValidation(i);
    c.isValid || (l = !1, o = c.errorMessage);
  }
  const u = { isValid: l, errorMessage: o };
  return f({ element: i, config: e, result: u, debug: a }), g(u, t);
}
function q({ element: i, config: e = {}, callback: t = null, debug: a = !1 }) {
  var o, u, d, h;
  const n = {
    required: "This field is required",
    minLength: `The field must be at least ${e.minLength} characters long`,
    maxLength: `The field cannot be longer than ${e.maxLength} characters`,
    pattern: "The field format is invalid"
  };
  let s = !0, r = null;
  if (e.required && (!i || i.trim() === "") && (s = !1, r = ((o = e.customMessage) == null ? void 0 : o.required) || n.required), s && e.minLength && i.length < e.minLength && (s = !1, r = ((u = e.customMessage) == null ? void 0 : u.minLength) || n.minLength), s && e.maxLength && i.length > e.maxLength && (s = !1, r = ((d = e.customMessage) == null ? void 0 : d.maxLength) || n.maxLength), s && e.pattern && !e.pattern.test(i) && (s = !1, r = ((h = e.customMessage) == null ? void 0 : h.pattern) || n.pattern), s && e.customValidation) {
    const m = e.customValidation(i);
    m.isValid || (s = !1, r = m.errorMessage);
  }
  const l = { isValid: s, errorMessage: r };
  return f({ element: i, config: e, result: l, debug: a }), g(l, t);
}
function E({ element: i, config: e = {}, callback: t = null, debug: a = !1 }) {
  var o, u;
  const n = {
    required: "Please select a valid option.",
    customValidation: "The selected option is not allowed."
  };
  let s = !0, r = null;
  if (e.required && (!i || i === "") && (s = !1, r = ((o = e.customMessage) == null ? void 0 : o.required) || n.required), s && e.customValidation) {
    const d = e.customValidation(i);
    d.isValid || (s = !1, r = d.errorMessage || ((u = e.customMessage) == null ? void 0 : u.customValidation) || n.customValidation);
  }
  const l = { isValid: s, errorMessage: r };
  return f({ element: i, config: e, result: l, debug: a }), g(l, t);
}
function y({ elements: i, config: e = {}, callback: t = null, debug: a = !1 }) {
  const { minRequired: n = 1, customMessage: s = {} } = e;
  let l = Array.from(i).filter((d) => d.checked).length >= n, o = l ? null : s.minRequired || `Please select at least ${n} options.`;
  const u = { isValid: l, errorMessage: o };
  return a && f({
    element: i,
    // Providing NodeList as 'element' for debugging context
    config: e,
    result: u,
    debug: a
  }), g(u, t);
}
function L({ elements: i, config: e = {}, callback: t = null, debug: a = !1 }) {
  const { customMessage: n = {} } = e;
  let r = Array.from(i).filter((u) => u.checked).length > 0, l = r ? null : n.required || "Please select an option.";
  const o = { isValid: r, errorMessage: l };
  return a && f({
    element: i,
    // Providing NodeList as 'element' for debugging context
    config: e,
    result: o,
    debug: a
  }), g(o, t);
}
function x({ element: i, config: e = {}, callback: t = null, debug: a = !1 }) {
  const { required: n = !0, allowedTypes: s = [], maxSize: r, customMessage: l = {} } = e;
  let o = !0, u = null;
  n && !i && (o = !1, u = l.required || "Please select a file."), o && i && s.length > 0 && !s.includes(i.type) && (o = !1, u = l.type || "Invalid file type. Please upload a valid file format."), o && i && r && i.size > r && (o = !1, u = l.size || `File size should not exceed ${r / 1024 / 1024}MB.`);
  const d = { isValid: o, errorMessage: u };
  return a && f({
    element: i,
    // File object as 'element' for debugging context
    config: e,
    result: d,
    debug: a
  }), g(d, t);
}
const S = {
  group: "c--form-group-a",
  // wraps label + control + error message
  input: "c--form-input-a",
  // wrapper that receives the --error / --valid modifiers
  file: "c--form-file-a",
  // file inputs receive the modifiers directly
  error: "c--form-error-a"
  // element that shows the error message
};
class T {
  constructor({
    element: e,
    fields: t,
    submitButtonSelector: a = null,
    beforeSubmit: n = null,
    onSubmit: s = null,
    onError: r = null,
    validators: l = {},
    classNames: o = {}
  }) {
    if (!e) throw new Error("A form element is required.");
    this.fields = t || [], this.beforeSubmit = n, this.onSubmit = s, this.onError = r, this.classNames = { ...S, ...o }, this.DOM = {
      form: e,
      // scoped to the form (important when multiple forms exist)
      submitButton: this.resolveSubmitButton(e, a)
    }, this.validators = {
      isString: q,
      isEmail: V,
      isNumber: b,
      isSelect: E,
      isCheckbox: y,
      isRadio: L,
      isFile: x,
      ...l
    }, this._listeners = [], this.init(), this.events();
  }
  init() {
    this.initializeFields();
  }
  events() {
    this.initializeSubmit();
  }
  getValidator(e) {
    if (typeof e == "function") return e;
    if (typeof e == "string") {
      const t = this.validators[e];
      if (!t) throw new Error(`Validator "${e}" is not registered.`);
      return t;
    }
    throw new Error("validationFunction must be a function or a string key.");
  }
  // Runs one field: single input, group (checkbox/radio) or file.
  runField(e) {
    var o;
    const { element: t, elements: a, validationFunction: n, config: s } = e, r = this.getValidator(n);
    if (a) {
      const u = r({ elements: a, config: s });
      return this.updateFieldState(e, u), u;
    }
    if (!(t instanceof Element))
      throw new Error("Field must include `element` (DOM Element) or `elements` (NodeList).");
    if (t.tagName === "INPUT" && t.type === "file") {
      const u = r({ element: ((o = t.files) == null ? void 0 : o[0]) || null, config: s });
      return this.updateFieldState(e, u), u;
    }
    const l = r({ element: t.value, config: s });
    return this.updateFieldState(e, l), l;
  }
  initializeFields() {
    this.fields.forEach((e) => {
      const { element: t, elements: a, on: n } = e;
      if (n === null) return;
      const s = n || "blur", r = t || a && a[0];
      if (!r) throw new Error("Each field must have `element` or `elements`.");
      const l = () => this.runField(e);
      r.addEventListener(s, l), this._listeners.push({ target: r, event: s, handler: l });
    });
  }
  updateFieldState(e, t) {
    const { group: a, input: n, file: s, error: r } = this.classNames, { element: l, elements: o } = e, u = l || o && o[0];
    if (!(u instanceof Element)) return;
    const d = u.closest(`.${a}`);
    let h = d == null ? void 0 : d.querySelector(`.${r}`);
    if (!h && d && (h = document.createElement("span"), h.classList.add(r), d.appendChild(h)), o) {
      h && (h.textContent = t.isValid ? "" : t.errorMessage);
      return;
    }
    const m = u.tagName === "INPUT" && u.type === "file", c = m ? u : u.closest(`.${n}`), p = m ? s : n;
    c && (c.classList.toggle(`${p}--valid`, t.isValid), c.classList.toggle(`${p}--error`, !t.isValid), h && (h.textContent = t.isValid ? "" : t.errorMessage));
  }
  validateAllFields() {
    const e = [];
    return this.fields.forEach((t) => {
      const a = this.runField(t);
      a != null && a.isValid || e.push({ field: t, errorMessage: (a == null ? void 0 : a.errorMessage) || "Invalid field" });
    }), e;
  }
  initializeSubmit() {
    if (this.DOM.submitButton) {
      const t = (a) => {
        a.preventDefault(), this.handleValidation();
      };
      this.DOM.submitButton.addEventListener("click", t), this._listeners.push({ target: this.DOM.submitButton, event: "click", handler: t });
    }
    const e = (t) => {
      t.preventDefault(), this.handleValidation();
    };
    this.DOM.form.addEventListener("submit", e), this._listeners.push({ target: this.DOM.form, event: "submit", handler: e });
  }
  handleValidation() {
    if (this.beforeSubmit && this.beforeSubmit() === !1) return;
    const e = this.validateAllFields();
    e.length === 0 ? this.onSubmit && this.onSubmit() : this.onError && this.onError(e);
  }
  resolveSubmitButton(e, t) {
    if (!t) return null;
    if (t instanceof Element) return t;
    if (typeof t == "string") return e.querySelector(t);
    throw new Error("submitButtonSelector must be a selector string or a DOM Element.");
  }
  destroy() {
    this._listeners.forEach(({ target: e, event: t, handler: a }) => {
      e.removeEventListener(t, a);
    }), this._listeners = [];
  }
}
export {
  T as Form,
  y as isCheckbox,
  V as isEmail,
  x as isFile,
  b as isNumber,
  L as isRadio,
  E as isSelect,
  q as isString
};
