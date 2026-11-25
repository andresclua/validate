import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(Flip, ScrollTrigger)

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Hero entrance + staggered reveal of each section on scroll.
function intro() {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero__eyebrow', { y: 16, opacity: 0, duration: 0.5 })
        .from('.hero__title', { y: 40, opacity: 0, duration: 0.8 }, '-=0.25')
        .from('.hero__lead', { y: 24, opacity: 0, duration: 0.6 }, '-=0.45')
        .from('.hero__actions .btn', { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.35')
        .from('.hero__install', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.hero__stats li', { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.3')

    const targets = '.home-section__head, .feature, .home-code > *, .which, .chips, .example-card, .cta'
    gsap.set(targets, { y: 36, opacity: 0 })
    ScrollTrigger.batch(targets, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08, overwrite: true }),
    })
}

// Filter chips for the "Which validator" table, animated with Flip.
function initFilter() {
    const chips = [...document.querySelectorAll('.chip')]
    const rows = [...document.querySelectorAll('.which__row')]
    const list = document.querySelector('.which')
    if (!chips.length || !list) return

    chips.forEach((chip) => chip.addEventListener('click', () => {
        const filter = chip.dataset.filter
        chips.forEach((c) => {
            const on = c === chip
            c.classList.toggle('chip--active', on)
            c.setAttribute('aria-pressed', String(on))
        })

        const state = Flip.getState(rows) // capture positions before the change
        rows.forEach((r) => r.classList.toggle('is-hidden', filter !== 'all' && r.dataset.group !== filter))

        Flip.from(state, {
            duration: reduceMotion() ? 0 : 0.6,
            ease: 'power2.inOut',
            stagger: 0.04,
            absolute: true,
            onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4 }),
            onLeave: (els) => gsap.to(els, { opacity: 0, y: -16, duration: 0.3 }),
        })
    }))
}

export function initHomeMotion() {
    initFilter()
    if (reduceMotion()) return // keep content visible and static
    intro()
}
