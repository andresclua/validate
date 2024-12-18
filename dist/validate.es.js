function g({ element: s, config: e, result: o, debug: d }) {
  d && (console.log("Validation Debugging:"), console.log(`Element: ${s}`), console.log("Configuration:", e), console.log(`Result: ${o.isValid}`), o.isValid || console.log(`Error: ${o.errorMessage}`));
}
function c(s, e) {
  return e && typeof e == "function" && e(s), s;
}
function b({ element: s, config: e = {}, callback: o = null, debug: d = !1 }) {
  var l, u, n, m, h, v, M, p;
  const r = {
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
  if (e.required && (s == null || s === "") && (t = !1, a = ((l = e.customMessage) == null ? void 0 : l.required) || r.required), t && isNaN(Number(s)) && (t = !1, a = ((u = e.customMessage) == null ? void 0 : u.invalid) || r.invalid), t && e.positive && Number(s) <= 0 && (t = !1, a = ((n = e.customMessage) == null ? void 0 : n.positive) || r.positive), t && e.negative && Number(s) >= 0 && (t = !1, a = ((m = e.customMessage) == null ? void 0 : m.negative) || r.negative), t && e.integer && !Number.isInteger(Number(s)) && (t = !1, a = ((h = e.customMessage) == null ? void 0 : h.integer) || r.integer), t && e.min !== void 0 && Number(s) < e.min && (t = !1, a = ((v = e.customMessage) == null ? void 0 : v.min) || r.min), t && e.max !== void 0 && Number(s) > e.max && (t = !1, a = ((M = e.customMessage) == null ? void 0 : M.max) || r.max), t && e.length !== void 0 && String(s).replace(".", "").length !== e.length && (t = !1, a = ((p = e.customMessage) == null ? void 0 : p.length) || r.length), t && typeof e.customValidation == "function") {
    const f = e.customValidation(Number(s));
    f.isValid || (t = !1, a = f.errorMessage);
  }
  const i = { isValid: t, errorMessage: a };
  return g({ element: s, config: e, result: i, debug: d }), c(i, o);
}
function V({ element: s, config: e = {}, callback: o = null, debug: d = !1 }) {
  var n, m;
  const r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, t = /^[^\s@]+@(?!gmail\.com|yahoo\.com|outlook\.com)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, a = {
    corporate: "The email must be associated with your company domain. Personal email providers such as Gmail, Yahoo, or Outlook are not permitted.",
    invalid: "Please enter a valid email address."
  };
  let i = !0, l = null;
  if (r.test(s) || (i = !1, l = ((n = e.customMessage) == null ? void 0 : n.invalid) || a.invalid), i && e.type === "corporate" && !t.test(s) && (i = !1, l = ((m = e.customMessage) == null ? void 0 : m.corporate) || a.corporate), i && e.customValidation) {
    const h = e.customValidation(s);
    h.isValid || (i = !1, l = h.errorMessage);
  }
  const u = { isValid: i, errorMessage: l };
  return g({ element: s, config: e, result: u, debug: d }), c(u, o);
}
function q({ element: s, config: e = {}, callback: o = null, debug: d = !1 }) {
  var l, u, n, m;
  const r = {
    required: "The string cannot be empty.",
    minLength: `The string must be at least ${e.minLength} characters long.`,
    maxLength: `The string cannot be longer than ${e.maxLength} characters.`,
    pattern: "The string format is invalid."
  };
  let t = !0, a = null;
  e.required && (!s || s.trim() === "") && (t = !1, a = ((l = e.customMessage) == null ? void 0 : l.required) || r.required), t && e.minLength && s.length < e.minLength && (t = !1, a = ((u = e.customMessage) == null ? void 0 : u.minLength) || r.minLength), t && e.maxLength && s.length > e.maxLength && (t = !1, a = ((n = e.customMessage) == null ? void 0 : n.maxLength) || r.maxLength), t && e.pattern && !e.pattern.test(s) && (t = !1, a = ((m = e.customMessage) == null ? void 0 : m.pattern) || r.pattern);
  const i = { isValid: t, errorMessage: a };
  return g({ element: s, config: e, result: i, debug: d }), c(i, o);
}
function x({ element: s, config: e = {}, callback: o = null, debug: d = !1 }) {
  var l, u;
  const r = {
    required: "Please select a valid option.",
    customValidation: "The selected option is not allowed."
  };
  let t = !0, a = null;
  if (e.required && (!s || s === "") && (t = !1, a = ((l = e.customMessage) == null ? void 0 : l.required) || r.required), t && e.customValidation) {
    const n = e.customValidation(s);
    n.isValid || (t = !1, a = n.errorMessage || ((u = e.customMessage) == null ? void 0 : u.customValidation) || r.customValidation);
  }
  const i = { isValid: t, errorMessage: a };
  return g({ element: s, config: e, result: i, debug: d }), c(i, o);
}
function T({ elements: s, config: e = {}, callback: o = null, debug: d = !1 }) {
  const { minRequired: r = 1, customMessage: t = {} } = e;
  let i = Array.from(s).filter((n) => n.checked).length >= r, l = i ? null : t.minRequired || `Please select at least ${r} options.`;
  const u = { isValid: i, errorMessage: l };
  return d && g({
    element: s,
    // Providing NodeList as 'element' for debugging context
    config: e,
    result: u,
    debug: d
  }), c(u, o);
}
export {
  T as isCheckbox,
  V as isEmail,
  b as isNumber,
  x as isSelect,
  q as isString
};
