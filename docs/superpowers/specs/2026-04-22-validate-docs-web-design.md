# validate — Documentation Site Design

**Date:** 2026-04-22  
**Status:** Approved

---

## Overview

A documentation website for `@andresclua/validate` that lives inside the same repo, built with Vite multipage, following the visual identity of `@andresclua/custom-cursor`. The site has a sidebar + content layout (Vite/Tailwind docs style) with interactive playgrounds and multiple examples per validator.

---

## Architecture

### Approach: Vite Multipage + Shared Layout JS

Each validator variant is its own HTML file. A shared JS module (`layout.js`) reads a central navigation config (`nav-config.js`) and injects the top nav and sidebar into every page. Adding a new example = one new `.html` file + one line in `nav-config.js`.

Two separate Vite configs coexist in the repo:
- `vite.config.js` — builds the library (`dist/validate.es.js`, `dist/validate.umd.js`)
- `vite.config.demo.js` — builds the docs site into `demo/`

### File Structure

```
validate/
├── demo/                          ← compiled output (gitignored or committed)
├── demo-src/
│   ├── index.html                 ← Getting Started / Introduction
│   ├── installation.html
│   ├── email/
│   │   ├── basic.html
│   │   ├── corporate.html
│   │   ├── custom-message.html
│   │   ├── custom-fn.html
│   │   └── async.html
│   ├── number/
│   │   ├── basic.html
│   │   ├── minmax.html
│   │   ├── integer.html
│   │   ├── positive-negative.html
│   │   └── custom-fn.html
│   ├── string/
│   │   ├── basic.html
│   │   ├── minmax-length.html
│   │   ├── pattern.html
│   │   └── custom-fn.html
│   ├── select/
│   │   ├── basic.html
│   │   └── custom-fn.html
│   ├── checkbox/
│   │   ├── basic.html
│   │   └── min-selections.html
│   ├── radio/
│   │   ├── basic.html
│   │   └── custom-fn.html
│   ├── file/
│   │   ├── basic.html
│   │   ├── type-restriction.html
│   │   └── max-size.html
│   ├── advanced/
│   │   ├── form-class.html
│   │   ├── custom-validators.html
│   │   ├── before-submit.html
│   │   └── on-error.html
│   └── js/
│       ├── layout.js              ← injects topnav + sidebar into every page
│       ├── nav-config.js          ← single source of truth for navigation tree
│       ├── playground.js          ← shared playground logic (validate on input/click)
│       └── code-tabs.js           ← shared tab switching logic
│   └── scss/
│       └── demo.scss              ← all demo site styles
└── vite.config.demo.js
```

---

## Navigation Tree (nav-config.js)

```js
export const nav = [
  {
    group: 'Getting started',
    items: [
      { label: 'Introduction', href: '/index.html' },
      { label: 'Installation', href: '/installation.html' },
    ]
  },
  {
    group: 'Validators',
    items: [
      { label: 'Email', children: [
        { label: 'Basic', href: '/email/basic.html' },
        { label: 'Corporate domains', href: '/email/corporate.html' },
        { label: 'Custom message', href: '/email/custom-message.html' },
        { label: 'Custom fn', href: '/email/custom-fn.html' },
        { label: 'Async', href: '/email/async.html' },
      ]},
      { label: 'Number', children: [
        { label: 'Basic', href: '/number/basic.html' },
        { label: 'Min / Max', href: '/number/minmax.html' },
        { label: 'Integer only', href: '/number/integer.html' },
        { label: 'Positive / Negative', href: '/number/positive-negative.html' },
        { label: 'Custom fn', href: '/number/custom-fn.html' },
      ]},
      { label: 'String', children: [
        { label: 'Basic', href: '/string/basic.html' },
        { label: 'Min / Max length', href: '/string/minmax-length.html' },
        { label: 'Pattern (regex)', href: '/string/pattern.html' },
        { label: 'Custom fn', href: '/string/custom-fn.html' },
      ]},
      { label: 'Select', children: [
        { label: 'Basic', href: '/select/basic.html' },
        { label: 'Custom fn', href: '/select/custom-fn.html' },
      ]},
      { label: 'Checkbox', children: [
        { label: 'Basic', href: '/checkbox/basic.html' },
        { label: 'Min selections', href: '/checkbox/min-selections.html' },
      ]},
      { label: 'Radio', children: [
        { label: 'Basic', href: '/radio/basic.html' },
        { label: 'Custom fn', href: '/radio/custom-fn.html' },
      ]},
      { label: 'File', children: [
        { label: 'Basic', href: '/file/basic.html' },
        { label: 'Type restriction', href: '/file/type-restriction.html' },
        { label: 'Max size', href: '/file/max-size.html' },
      ]},
    ]
  },
  {
    group: 'Advanced',
    items: [
      { label: 'Form class', children: [
        { label: 'Basic form', href: '/advanced/form-class.html' },
        { label: 'Custom validators', href: '/advanced/custom-validators.html' },
        { label: 'beforeSubmit', href: '/advanced/before-submit.html' },
        { label: 'onError', href: '/advanced/on-error.html' },
      ]},
    ]
  }
]
```

---

## Per-Page Structure

Every validator variant page follows this structure:

```
1. Breadcrumb          validators › email › basic
2. Title + badge       isEmail() — Basic
3. Description         1–2 sentences explaining what this variant demonstrates
4. Code tabs           [JS] [HTML] [Config] — dark background, monospace
5. Playground          Live form field(s) + Validate button + Reset button
                       Shows valid/error state in real time
6. Prev / Next nav     Links to adjacent variants in the sidebar order
```

The playground imports directly from `@andresclua/validate` (resolved by Vite to the local `dist/validate.es.js` via the `resolve.alias` in `vite.config.demo.js`), so it always reflects the real library behavior regardless of page depth.

---

## Layout Components (injected by layout.js)

### Top Nav
- Left: `@andresclua/validate` logo + version badge (red pill)
- Right: npm link, GitHub link, Install CTA (red pill button)
- Fixed at top, height 48px, background `#1e1e1e`

### Sidebar
- Width: 220px, background `#1a1a1a`
- Groups labeled in red uppercase (Getting Started / Validators / Advanced)
- Collapsed by default; the active parent auto-expands
- Active item: red left border + white text + red dot indicator
- Sub-items indented with a small dot bullet

### Content area
- Background `#25282b`, padding `28px 32px`
- Max readable width: `760px`

---

## Visual Design System

Follows `@andresclua/custom-cursor` exactly:

| Token | Value |
|---|---|
| `--red` | `#e60000` |
| `--charcoal` | `#25282b` |
| `--dark` | `#1e1e1e` |
| `--nav` | `#2d2d2d` |
| `--border` | `#3a3a3a` |
| `--text` | `#d4d4d4` |
| `--muted` | `#7e7e7e` |
| Font | Inter (400, 600, 700, 800) |
| Code font | SF Mono, Fira Code, Consolas |

---

## Build Config (vite.config.demo.js)

```js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import glob from 'fast-glob'

const inputs = Object.fromEntries(
  glob.sync('demo-src/**/*.html').map(f => [
    f.replace('demo-src/', '').replace('.html', ''),
    resolve(__dirname, f)
  ])
)

export default defineConfig({
  root: 'demo-src',
  resolve: {
    alias: {
      '@andresclua/validate': resolve(__dirname, 'dist/validate.es.js'),
    }
  },
  build: {
    outDir: resolve(__dirname, 'demo'),
    emptyOutDir: true,
    rollupOptions: { input: inputs }
  }
})
```

> `fast-glob` (devDependency) auto-discovers all `.html` files bajo `demo-src/`. Cada nuevo archivo queda incluido en el build sin tocar la config.

NPM scripts added:
- `npm run demo` — dev server for the docs site
- `npm run build:demo` — compile docs to `demo/`

---

## Out of Scope

- Search functionality
- Dark/light mode toggle
- Internationalization
- Version switching
