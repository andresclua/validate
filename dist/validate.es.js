function g({ element: s, config: e, result: u, debug: d }) {
  d && (console.log("Validation Debugging:"), console.log(`Element: ${s}`), console.log("Configuration:", e), console.log(`Result: ${u.isValid}`), u.isValid || console.log(`Error: ${u.errorMessage}`));
}
function v(s, e) {
  return e && typeof e == "function" && e(s), s;
}
function f({ element: s, config: e = {}, callback: u = null, debug: d = !1 }) {
  var l, o, n, m, h, M, c, p;
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
  if (e.required && (s == null || s === "") && (t = !1, a = ((l = e.customMessage) == null ? void 0 : l.required) || r.required), t && isNaN(Number(s)) && (t = !1, a = ((o = e.customMessage) == null ? void 0 : o.invalid) || r.invalid), t && e.positive && Number(s) <= 0 && (t = !1, a = ((n = e.customMessage) == null ? void 0 : n.positive) || r.positive), t && e.negative && Number(s) >= 0 && (t = !1, a = ((m = e.customMessage) == null ? void 0 : m.negative) || r.negative), t && e.integer && !Number.isInteger(Number(s)) && (t = !1, a = ((h = e.customMessage) == null ? void 0 : h.integer) || r.integer), t && e.min !== void 0 && Number(s) < e.min && (t = !1, a = ((M = e.customMessage) == null ? void 0 : M.min) || r.min), t && e.max !== void 0 && Number(s) > e.max && (t = !1, a = ((c = e.customMessage) == null ? void 0 : c.max) || r.max), t && e.length !== void 0 && String(s).replace(".", "").length !== e.length && (t = !1, a = ((p = e.customMessage) == null ? void 0 : p.length) || r.length), t && typeof e.customValidation == "function") {
    const b = e.customValidation(Number(s));
    b.isValid || (t = !1, a = b.errorMessage);
  }
  const i = { isValid: t, errorMessage: a };
  return g({ element: s, config: e, result: i, debug: d }), v(i, u);
}
function V({ element: s, config: e = {}, callback: u = null, debug: d = !1 }) {
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
  const o = { isValid: i, errorMessage: l };
  return g({ element: s, config: e, result: o, debug: d }), v(o, u);
}
function x({ element: s, config: e = {}, callback: u = null, debug: d = !1 }) {
  var l, o, n, m;
  const r = {
    required: "The string cannot be empty.",
    minLength: `The string must be at least ${e.minLength} characters long.`,
    maxLength: `The string cannot be longer than ${e.maxLength} characters.`,
    pattern: "The string format is invalid."
  };
  let t = !0, a = null;
  e.required && (!s || s.trim() === "") && (t = !1, a = ((l = e.customMessage) == null ? void 0 : l.required) || r.required), t && e.minLength && s.length < e.minLength && (t = !1, a = ((o = e.customMessage) == null ? void 0 : o.minLength) || r.minLength), t && e.maxLength && s.length > e.maxLength && (t = !1, a = ((n = e.customMessage) == null ? void 0 : n.maxLength) || r.maxLength), t && e.pattern && !e.pattern.test(s) && (t = !1, a = ((m = e.customMessage) == null ? void 0 : m.pattern) || r.pattern);
  const i = { isValid: t, errorMessage: a };
  return g({ element: s, config: e, result: i, debug: d }), v(i, u);
}
function q({ element: s, config: e = {}, callback: u = null, debug: d = !1 }) {
  var l, o;
  const r = {
    required: "Please select a valid option.",
    customValidation: "The selected option is not allowed."
  };
  let t = !0, a = null;
  if (e.required && (!s || s === "") && (t = !1, a = ((l = e.customMessage) == null ? void 0 : l.required) || r.required), t && e.customValidation) {
    const n = e.customValidation(s);
    n.isValid || (t = !1, a = n.errorMessage || ((o = e.customMessage) == null ? void 0 : o.customValidation) || r.customValidation);
  }
  const i = { isValid: t, errorMessage: a };
  return g({ element: s, config: e, result: i, debug: d }), v(i, u);
}
export {
  V as isEmail,
  f as isNumber,
  q as isSelect,
  x as isString
};
