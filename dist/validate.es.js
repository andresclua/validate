function h({ element: s, config: e, result: n, debug: o }) {
  o && (console.log("Validation Debugging:"), console.log(`Element: ${s}`), console.log("Configuration:", e), console.log(`Result: ${n.isValid}`), n.isValid || console.log(`Error: ${n.errorMessage}`));
}
function g(s, e) {
  return e && typeof e == "function" && e(s), s;
}
function V({ element: s, config: e = {}, callback: n = null, debug: o = !1 }) {
  var i, u, d, m, c, f, M, p;
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
  if (e.required && (s == null || s === "") && (t = !1, a = ((i = e.customMessage) == null ? void 0 : i.required) || l.required), t && isNaN(Number(s)) && (t = !1, a = ((u = e.customMessage) == null ? void 0 : u.invalid) || l.invalid), t && e.positive && Number(s) <= 0 && (t = !1, a = ((d = e.customMessage) == null ? void 0 : d.positive) || l.positive), t && e.negative && Number(s) >= 0 && (t = !1, a = ((m = e.customMessage) == null ? void 0 : m.negative) || l.negative), t && e.integer && !Number.isInteger(Number(s)) && (t = !1, a = ((c = e.customMessage) == null ? void 0 : c.integer) || l.integer), t && e.min !== void 0 && Number(s) < e.min && (t = !1, a = ((f = e.customMessage) == null ? void 0 : f.min) || l.min), t && e.max !== void 0 && Number(s) > e.max && (t = !1, a = ((M = e.customMessage) == null ? void 0 : M.max) || l.max), t && e.length !== void 0 && String(s).replace(".", "").length !== e.length && (t = !1, a = ((p = e.customMessage) == null ? void 0 : p.length) || l.length), t && typeof e.customValidation == "function") {
    const v = e.customValidation(Number(s));
    v.isValid || (t = !1, a = v.errorMessage);
  }
  const r = { isValid: t, errorMessage: a };
  return h({ element: s, config: e, result: r, debug: o }), g(r, n);
}
function b({ element: s, config: e = {}, callback: n = null, debug: o = !1 }) {
  var d, m;
  const l = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, t = /^[^\s@]+@(?!gmail\.com|yahoo\.com|outlook\.com)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, a = {
    corporate: "The email must be associated with your company domain. Personal email providers such as Gmail, Yahoo, or Outlook are not permitted.",
    invalid: "Please enter a valid email address."
  };
  let r = !0, i = null;
  if (l.test(s) || (r = !1, i = ((d = e.customMessage) == null ? void 0 : d.invalid) || a.invalid), r && e.type === "corporate" && !t.test(s) && (r = !1, i = ((m = e.customMessage) == null ? void 0 : m.corporate) || a.corporate), r && e.customValidation) {
    const c = e.customValidation(s);
    c.isValid || (r = !1, i = c.errorMessage);
  }
  const u = { isValid: r, errorMessage: i };
  return h({ element: s, config: e, result: u, debug: o }), g(u, n);
}
function q({ element: s, config: e = {}, callback: n = null, debug: o = !1 }) {
  var i, u, d, m;
  const l = {
    required: "The string cannot be empty.",
    minLength: `The string must be at least ${e.minLength} characters long.`,
    maxLength: `The string cannot be longer than ${e.maxLength} characters.`,
    pattern: "The string format is invalid."
  };
  let t = !0, a = null;
  if (e.required && (!s || s.trim() === "") && (t = !1, a = ((i = e.customMessage) == null ? void 0 : i.required) || l.required), t && e.minLength && s.length < e.minLength && (t = !1, a = ((u = e.customMessage) == null ? void 0 : u.minLength) || l.minLength), t && e.maxLength && s.length > e.maxLength && (t = !1, a = ((d = e.customMessage) == null ? void 0 : d.maxLength) || l.maxLength), t && e.pattern && !e.pattern.test(s) && (t = !1, a = ((m = e.customMessage) == null ? void 0 : m.pattern) || l.pattern), t && e.customValidation) {
    const c = e.customValidation(s);
    c.isValid || (t = !1, a = c.errorMessage);
  }
  const r = { isValid: t, errorMessage: a };
  return h({ element: s, config: e, result: r, debug: o }), g(r, n);
}
function x({ element: s, config: e = {}, callback: n = null, debug: o = !1 }) {
  var i, u;
  const l = {
    required: "Please select a valid option.",
    customValidation: "The selected option is not allowed."
  };
  let t = !0, a = null;
  if (e.required && (!s || s === "") && (t = !1, a = ((i = e.customMessage) == null ? void 0 : i.required) || l.required), t && e.customValidation) {
    const d = e.customValidation(s);
    d.isValid || (t = !1, a = d.errorMessage || ((u = e.customMessage) == null ? void 0 : u.customValidation) || l.customValidation);
  }
  const r = { isValid: t, errorMessage: a };
  return h({ element: s, config: e, result: r, debug: o }), g(r, n);
}
function T({ elements: s, config: e = {}, callback: n = null, debug: o = !1 }) {
  const { minRequired: l = 1, customMessage: t = {} } = e;
  let r = Array.from(s).filter((d) => d.checked).length >= l, i = r ? null : t.minRequired || `Please select at least ${l} options.`;
  const u = { isValid: r, errorMessage: i };
  return o && h({
    element: s,
    // Providing NodeList as 'element' for debugging context
    config: e,
    result: u,
    debug: o
  }), g(u, n);
}
function y({ elements: s, config: e = {}, callback: n = null, debug: o = !1 }) {
  const { customMessage: l = {} } = e;
  let a = Array.from(s).filter((u) => u.checked).length > 0, r = a ? null : l.required || "Please select an option.";
  const i = { isValid: a, errorMessage: r };
  return o && h({
    element: s,
    // Providing NodeList as 'element' for debugging context
    config: e,
    result: i,
    debug: o
  }), g(i, n);
}
function L({ element: s, config: e = {}, callback: n = null, debug: o = !1 }) {
  const { required: l = !0, allowedTypes: t = [], maxSize: a, customMessage: r = {} } = e;
  let i = !0, u = null;
  l && !s && (i = !1, u = r.required || "Please select a file."), i && t.length > 0 && !t.includes(s.type) && (i = !1, u = r.type || "Invalid file type. Please upload a valid file format."), i && a && s.size > a && (i = !1, u = r.size || `File size should not exceed ${a / 1024 / 1024}MB.`);
  const d = { isValid: i, errorMessage: u };
  return o && h({
    element: s,
    // File object as 'element' for debugging context
    config: e,
    result: d,
    debug: o
  }), g(d, n);
}
export {
  T as isCheckbox,
  b as isEmail,
  L as isFile,
  V as isNumber,
  y as isRadio,
  x as isSelect,
  q as isString
};
