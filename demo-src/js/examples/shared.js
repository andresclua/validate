import '../layout.js'
import '../../scss/demo.scss'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

// Clears every validation state so a form looks untouched again.
export function resetForm(form, status) {
    form.reset()
    form.querySelectorAll('.c--form-input-a').forEach(w => w.classList.remove('c--form-input-a--error', 'c--form-input-a--valid'))
    form.querySelectorAll('.c--form-file-a').forEach(w => w.classList.remove('c--form-file-a--error', 'c--form-file-a--valid'))
    form.querySelectorAll('.c--form-error-a').forEach(el => { el.textContent = '' })
    status?.classList.remove('is-visible')
}

// When validation adds or removes error messages, the fields below jump. Capture their
// positions first (capture phase runs before Form's own handlers), then let Flip slide
// them to the new layout once the handlers have run.
function animateReflow(form) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = () => form.querySelectorAll(':scope > *')
    const run = (e) => {
        if (e.type === 'click' && !e.target.closest('button')) return
        Flip.killFlipsOf(items())
        const state = Flip.getState(items())
        requestAnimationFrame(() => Flip.from(state, { duration: 0.35, ease: 'power2.out', scale: false }))
    }
    ;['blur', 'change', 'click'].forEach((type) => form.addEventListener(type, run, true))
}

// Fills the JS / HTML tabs from the real code (so docs never drift from the demo) and
// animates layout shifts. ponytail: HTML tab is live outerHTML, call before any interaction.
export function setupDemo(jsRaw, form) {
    animateReflow(form)
    const js = jsRaw.replace(/^import .*(shared|scss|\?raw).*\n/gm, '').trim()
    document.getElementById('src-js').textContent = js
    document.getElementById('src-html').textContent = form.outerHTML
}
