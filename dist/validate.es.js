function h({ element: s, config: e, result: n, debug: o }) {
  o && (console.log("Validation Debugging:"), console.log(`Element: ${s}`), console.log("Configuration:", e), console.log(`Result: ${n.isValid}`), n.isValid || console.log(`Error: ${n.errorMessage}`));
}
function f(s, e) {
  return e && typeof e == "function" && e(s), s;
}
function V({ element: s, config: e = {}, callback: n = null, debug: o = !1 }) {
  var r, u, d, m, c, g, M, p;
  const l = {
    required: "The value is required.",
    invalid: "The value must be a valid number.",
    positive: "The value must be positive.",
    negative: "The value must be negative.",
    integer: "The value must be an integer.",
    min: `The value must be greater than or equal to ${e.min}.`,
    max: `The value must be less than or equal to ${e.max}.`,
    length: `The value must have exactly ${e.length} digits.`
  };
  let t = !0, a = null;
  if (e.required && (s == null || s === "") && (t = !1, a = ((r = e.customMessage) == null ? void 0 : r.required) || l.required), t && isNaN(Number(s)) && (t = !1, a = ((u = e.customMessage) == null ? void 0 : u.invalid) || l.invalid), t && e.positive && Number(s) <= 0 && (t = !1, a = ((d = e.customMessage) == null ? void 0 : d.positive) || l.positive), t && e.negative && Number(s) >= 0 && (t = !1, a = ((m = e.customMessage) == null ? void 0 : m.negative) || l.negative), t && e.integer && !Number.isInteger(Number(s)) && (t = !1, a = ((c = e.customMessage) == null ? void 0 : c.integer) || l.integer), t && e.min !== void 0 && Number(s) < e.min && (t = !1, a = ((g = e.customMessage) == null ? void 0 : g.min) || l.min), t && e.max !== void 0 && Number(s) > e.max && (t = !1, a = ((M = e.customMessage) == null ? void 0 : M.max) || l.max), t && e.length !== void 0 && String(s).replace(".", "").length !== e.length && (t = !1, a = ((p = e.customMessage) == null ? void 0 : p.length) || l.length), t && typeof e.customValidation == "function") {
    const v = e.customValidation(Number(s));
    v.isValid || (t = !1, a = v.errorMessage);
  }
  const i = { isValid: t, errorMessage: a };
  return h({ element: s, config: e, result: i, debug: o }), f(i, n);
}
function q({ element: s, config: e = {}, callback: n = null, debug: o = !1 }) {
  var d, m, c;
  const l = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, t = /^[^\s@]+@(?!gmail\.com|yahoo\.com|outlook\.com)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, a = {
    corporate: "The email must be associated with your company domain. Personal email providers such as Gmail, Yahoo, or Outlook are not permitted.",
    invalid: "Please enter a valid email address.",
    required: "This field is required."
  };
  let i = !0, r = null;
  if (e.required && !s.trim() && (i = !1, r = ((d = e.customMessage) == null ? void 0 : d.required) || a.required), i && s && !l.test(s) && (i = !1, r = ((m = e.customMessage) == null ? void 0 : m.invalid) || a.invalid), i && e.type === "corporate" && !t.test(s) && (i = !1, r = ((c = e.customMessage) == null ? void 0 : c.corporate) || a.corporate), i && e.customValidation) {
    const g = e.customValidation(s);
    g.isValid || (i = !1, r = g.errorMessage);
  }
  const u = { isValid: i, errorMessage: r };
  return h({ element: s, config: e, result: u, debug: o }), f(u, n);
}
function b({ element: s, config: e = {}, callback: n = null, debug: o = !1 }) {
  var r, u, d, m;
  const l = {
    required: "The string cannot be empty.",
    minLength: `The string must be at least ${e.minLength} characters long.`,
    maxLength: `The string cannot be longer than ${e.maxLength} characters.`,
    pattern: "The string format is invalid."
  };
  let t = !0, a = null;
  if (e.required && (!s || s.trim() === "") && (t = !1, a = ((r = e.customMessage) == null ? void 0 : r.required) || l.required), t && e.minLength && s.length < e.minLength && (t = !1, a = ((u = e.customMessage) == null ? void 0 : u.minLength) || l.minLength), t && e.maxLength && s.length > e.maxLength && (t = !1, a = ((d = e.customMessage) == null ? void 0 : d.maxLength) || l.maxLength), t && e.pattern && !e.pattern.test(s) && (t = !1, a = ((m = e.customMessage) == null ? void 0 : m.pattern) || l.pattern), t && e.customValidation) {
    const c = e.customValidation(s);
    c.isValid || (t = !1, a = c.errorMessage);
  }
  const i = { isValid: t, errorMessage: a };
  return h({ element: s, config: e, result: i, debug: o }), f(i, n);
}
function x({ element: s, config: e = {}, callback: n = null, debug: o = !1 }) {
  var r, u;
  const l = {
    required: "Please select a valid option.",
    customValidation: "The selected option is not allowed."
  };
  let t = !0, a = null;
  if (e.required && (!s || s === "") && (t = !1, a = ((r = e.customMessage) == null ? void 0 : r.required) || l.required), t && e.customValidation) {
    const d = e.customValidation(s);
    d.isValid || (t = !1, a = d.errorMessage || ((u = e.customMessage) == null ? void 0 : u.customValidation) || l.customValidation);
  }
  const i = { isValid: t, errorMessage: a };
  return h({ element: s, config: e, result: i, debug: o }), f(i, n);
}
function T({ elements: s, config: e = {}, callback: n = null, debug: o = !1 }) {
  const { minRequired: l = 1, customMessage: t = {} } = e;
  let i = Array.from(s).filter((d) => d.checked).length >= l, r = i ? null : t.minRequired || `Please select at least ${l} options.`;
  const u = { isValid: i, errorMessage: r };
  return o && h({
    element: s,
    // Providing NodeList as 'element' for debugging context
    config: e,
    result: u,
    debug: o
  }), f(u, n);
}
function y({ elements: s, config: e = {}, callback: n = null, debug: o = !1 }) {
  const { customMessage: l = {} } = e;
  let a = Array.from(s).filter((u) => u.checked).length > 0, i = a ? null : l.required || "Please select an option.";
  const r = { isValid: a, errorMessage: i };
  return o && h({
    element: s,
    // Providing NodeList as 'element' for debugging context
    config: e,
    result: r,
    debug: o
  }), f(r, n);
}
function L({ element: s, config: e = {}, callback: n = null, debug: o = !1 }) {
  const { required: l = !0, allowedTypes: t = [], maxSize: a, customMessage: i = {} } = e;
  let r = !0, u = null;
  l && !s && (r = !1, u = i.required || "Please select a file."), r && t.length > 0 && !t.includes(s.type) && (r = !1, u = i.type || "Invalid file type. Please upload a valid file format."), r && a && s.size > a && (r = !1, u = i.size || `File size should not exceed ${a / 1024 / 1024}MB.`);
  const d = { isValid: r, errorMessage: u };
  return o && h({
    element: s,
    // File object as 'element' for debugging context
    config: e,
    result: d,
    debug: o
  }), f(d, n);
}
export {
  T as isCheckbox,
  q as isEmail,
  L as isFile,
  V as isNumber,
  y as isRadio,
  x as isSelect,
  b as isString
};
