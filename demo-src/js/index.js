import '../scss/demo.scss'
import '@andresclua/sliderkit/scss/slider.scss'
import './layout.js'
import { Slider } from '@andresclua/sliderkit'
import { isEmail, isNumber, isString, isSelect, isCheckbox, isRadio, isFile } from '@andresclua/validate'
import pkg from '../../package.json'
import { initHomeMotion } from './home-motion.js'

const input = (attrs) => `<div class="c--form-input-a"><input class="c--form-input-a__item" ${attrs}></div>`
const choices = (type, name, labels) => labels.map((l, i) => `
    <div class="c--form-${type}-a">
      <input class="c--form-${type}-a__item" type="${type}" id="${name}-${i}" name="${name}">
      <label class="c--form-${type}-a__title" for="${name}-${i}">${l}</label>
    </div>`).join('')

// One card per validator. `read` builds the validator args from the card's DOM.
const demos = [
    { name: 'isEmail', title: 'Email', text: 'Format check, plus an optional corporate-domain rule.', href: '/email/basic.html',
      hint: 'Try a gmail.com address.', event: 'input', fn: isEmail, config: { required: true, type: 'corporate' },
      field: input('type="email" placeholder="you@company.com" aria-label="Email"'),
      read: (c) => ({ element: c.querySelector('input').value }) },
    { name: 'isNumber', title: 'Number', text: 'Ranges, integers, positive or negative only.', href: '/number/basic.html',
      hint: 'Enter an integer between 18 and 99.', event: 'input', fn: isNumber, config: { required: true, integer: true, min: 18, max: 99 },
      field: input('type="text" inputmode="decimal" placeholder="Your age" aria-label="Age"'),
      read: (c) => ({ element: c.querySelector('input').value }) },
    { name: 'isString', title: 'String', text: 'Length limits and regex patterns.', href: '/string/basic.html',
      hint: '3 to 12 characters, letters only.', event: 'input', fn: isString,
      config: { required: true, minLength: 3, maxLength: 12, pattern: /^[A-Za-z]+$/, customMessage: { pattern: 'Letters only, no spaces or numbers.' } },
      field: input('type="text" placeholder="Username" aria-label="Username"'),
      read: (c) => ({ element: c.querySelector('input').value }) },
    { name: 'isSelect', title: 'Select', text: 'Make sure a real option is picked.', href: '/select/basic.html',
      hint: 'Pick anything but the placeholder.', event: 'change', fn: isSelect, config: { required: true },
      field: `<div class="c--form-input-a"><select class="c--form-input-a__item" aria-label="Plan"><option value="">Choose a plan…</option><option>Free</option><option>Pro</option><option>Team</option></select></div>`,
      read: (c) => ({ element: c.querySelector('select').value }) },
    { name: 'isCheckbox', title: 'Checkbox', text: 'Require a minimum number of selections.', href: '/checkbox/basic.html',
      hint: 'Select at least two.', event: 'change', fn: isCheckbox, config: { minRequired: 2 },
      field: choices('checkbox', 'demo-cb', ['Design', 'Code', 'Writing']),
      read: (c) => ({ elements: c.querySelectorAll('input') }) },
    { name: 'isRadio', title: 'Radio', text: 'Ensure one option in a group is chosen.', href: '/radio/basic.html',
      hint: 'Choose one option.', event: 'change', fn: isRadio, config: {},
      field: choices('radio', 'demo-rd', ['Monthly', 'Yearly', 'Lifetime']),
      read: (c) => ({ elements: c.querySelectorAll('input') }) },
    { name: 'isFile', title: 'File', text: 'Restrict file type and size.', href: '/file/basic.html',
      hint: 'PNG or JPG, up to 1MB.', event: 'change', fn: isFile,
      config: { allowedTypes: ['image/png', 'image/jpeg'], maxSize: 1024 * 1024 },
      field: '<input class="c--form-file-a" type="file" aria-label="Upload">',
      read: (c) => ({ element: c.querySelector('input').files[0] || null }) },
]

function renderCard(d) {
    const card = document.createElement('article')
    card.className = 'demo-card'
    card.innerHTML = `
      <span class="demo-card__tag">${d.name}()</span>
      <h3 class="demo-card__title">${d.title}</h3>
      <p class="demo-card__text">${d.text}</p>
      <div class="demo-card__field">${d.field}</div>
      <p class="demo-card__feedback" data-state="idle" aria-live="polite">${d.hint}</p>
      <a class="demo-card__link" href="${d.href}">Read the docs →</a>`

    const feedback = card.querySelector('.demo-card__feedback')
    const wrapper = card.querySelector('.c--form-input-a, .c--form-file-a')
    const base = wrapper?.classList.contains('c--form-file-a') ? 'c--form-file-a' : 'c--form-input-a'

    card.querySelector('.demo-card__field').addEventListener(d.event, () => {
        const result = d.fn({ ...d.read(card), config: d.config })
        feedback.dataset.state = result.isValid ? 'valid' : 'error'
        feedback.textContent = result.isValid ? '✓ Valid' : result.errorMessage
        wrapper?.classList.toggle(`${base}--valid`, result.isValid)
        wrapper?.classList.toggle(`${base}--error`, !result.isValid)
    })
    return card
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('hero-version').textContent = `v${pkg.version}`

    // ── Copy install command ────────────────────────────────────
    const label = document.getElementById('copy-label')
    document.getElementById('copy-install').addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText('npm i @andresclua/validate')
            label.textContent = 'Copied ✓'
        } catch { label.textContent = 'Press ⌘C' }
        setTimeout(() => { label.textContent = 'Copy' }, 1800)
    })

    // ── SliderKit: live demos ───────────────────────────────────
    const track = document.getElementById('demo-slider')
    demos.forEach(d => track.appendChild(renderCard(d)))

    const prev = document.getElementById('demo-prev')
    const next = document.getElementById('demo-next')
    const slider = new Slider('#demo-slider', {
        items: 1, gutter: 20, loop: false, speed: 400,
        responsive: { 720: { items: 2 }, 1100: { items: 3 } },
    })
    // ponytail: slider.isEnd only matches the last slide, wrong when several cards are visible
    const sync = () => {
        const { items, slideCount } = slider.getInfo()
        prev.disabled = slider.activeIndex <= 0
        next.disabled = slider.activeIndex >= slideCount - items
    }
    prev.addEventListener('click', () => slider.prev())
    next.addEventListener('click', () => slider.next())
    slider.on('indexChanged', sync)
    slider.on('resize', sync)
    sync()

    initHomeMotion()
})
