import { nav } from './nav-config.js'
import { initCodeTabs } from './code-tabs.js'
import pkg from '../../package.json'

/**
 * Normalize a pathname for comparison.
 * Strips trailing slashes and treats bare "/" as "/index.html".
 */
function normalizePath(path) {
  if (!path) return '/index.html'
  // Strip query string and hash
  path = path.split('?')[0].split('#')[0]
  // Trailing slash → /index.html
  if (path.endsWith('/')) {
    path = path + 'index.html'
  }
  // Extensionless path → add .html
  if (!path.includes('.')) path = path + '.html'
  return path
}

/**
 * Build the topnav element.
 */
function buildTopnav(currentPath, isHome) {
  const nav = document.createElement('nav')
  nav.className = 'topnav'
  const inExamples = currentPath.startsWith('/examples/')
  const active = (on) => (on ? ' topnav__link--active' : '')
  nav.innerHTML = `
    <a class="topnav__logo" href="/index.html">
      <span>@andresclua/<span style="color:var(--red)">validate</span></span>
      <span class="topnav__badge">v${pkg.version}</span>
    </a>
    <div class="topnav__links">
      <a href="/installation.html" class="topnav__link${active(!isHome && !inExamples)}">Docs</a>
      <a href="/examples/signup.html" class="topnav__link${active(inExamples)}">Examples</a>
      <a href="https://www.npmjs.com/package/@andresclua/validate" class="topnav__link topnav__link--ext" target="_blank" rel="noopener">npm</a>
      <a href="https://github.com/andresclua/validate" class="topnav__link topnav__link--ext" target="_blank" rel="noopener">GitHub</a>
      <a href="/installation.html" class="topnav__cta">Get started</a>
      ${isHome ? '' : '<button class="topnav__menu" type="button" aria-label="Toggle navigation">☰</button>'}
    </div>
  `
  nav.querySelector('.topnav__menu')?.addEventListener('click', () => document.body.classList.toggle('sidebar-open'))
  return nav
}

// Footer shown on the landing page only.
function buildFooter() {
  const footer = document.createElement('footer')
  footer.className = 'site-footer'
  footer.innerHTML = `
    <div class="container site-footer__inner">
      <p><strong>@andresclua/validate</strong> · v${pkg.version}</p>
      <nav class="site-footer__links">
        <a href="/installation.html">Docs</a>
        <a href="/examples/signup.html">Examples</a>
        <a href="https://github.com/andresclua/validate" target="_blank" rel="noopener">GitHub</a>
        <a href="https://www.npmjs.com/package/@andresclua/validate" target="_blank" rel="noopener">npm</a>
        <a href="https://sliderkit.andresclua.com" target="_blank" rel="noopener">SliderKit</a>
      </nav>
    </div>
  `
  return footer
}

/**
 * Build the sidebar element from the nav config.
 * Returns the aside element and a boolean indicating if any item was matched.
 */
function buildSidebar(currentPath) {
  const aside = document.createElement('aside')
  aside.className = 'sidebar'

  nav.forEach(group => {
    // Group label
    const label = document.createElement('span')
    label.className = 'sidebar__group-label'
    label.textContent = group.group
    aside.appendChild(label)

    group.items.forEach(item => {
      if (!item.children) {
        // Simple link item
        const a = document.createElement('a')
        a.className = 'sidebar__item'
        a.href = item.href
        a.textContent = item.label

        if (normalizePath(item.href) === currentPath) {
          a.classList.add('sidebar__item--active')
        }

        aside.appendChild(a)
      } else {
        // Parent item with children — check if any child is active
        const childIsActive = item.children.some(
          child => normalizePath(child.href) === currentPath
        )

        const parentEl = document.createElement('button')
        parentEl.type = 'button'
        parentEl.className = 'sidebar__item sidebar__item--parent'
        parentEl.innerHTML = `<span>${item.label}</span><span class="sidebar__chevron" aria-hidden="true"></span>`
        parentEl.setAttribute('aria-expanded', String(childIsActive))
        if (childIsActive) {
          parentEl.classList.add('sidebar__item--active', 'sidebar__item--open')
        }
        aside.appendChild(parentEl)

        // Subitems container — hidden by default, shown when a child is active
        const subContainer = document.createElement('div')
        subContainer.className = 'sidebar__subitems'
        if (childIsActive) {
          subContainer.classList.add('sidebar__subitems--open')
        }

        // Toggle expand/collapse on click
        parentEl.addEventListener('click', () => {
          const open = subContainer.classList.toggle('sidebar__subitems--open')
          parentEl.classList.toggle('sidebar__item--open', open)
          parentEl.setAttribute('aria-expanded', String(open))
        })

        item.children.forEach(child => {
          const subEl = document.createElement('a')
          subEl.className = 'sidebar__subitem'
          subEl.href = child.href

          const dot = document.createElement('span')
          dot.className = 'sidebar__dot'

          const isActive = normalizePath(child.href) === currentPath
          if (isActive) {
            subEl.classList.add('sidebar__subitem--active')
            dot.classList.add('sidebar__dot--active')
          }

          subEl.appendChild(dot)
          subEl.appendChild(document.createTextNode(child.label))
          subContainer.appendChild(subEl)
        })

        aside.appendChild(subContainer)
      }
    })
  })

  return aside
}

/**
 * Inject topnav and sidebar/content layout into the page.
 * Called on DOMContentLoaded.
 */
function initLayout() {
  const currentPath = normalizePath(window.location.pathname)
  // The landing page has no sidebar; the sidebar belongs to the docs pages.
  const isHome = currentPath === '/index.html'

  // Collect existing body children
  const existingChildren = Array.from(document.body.childNodes)

  // Wrap existing content in <main class="content">
  const main = document.createElement('main')
  main.className = isHome ? 'content content--home' : 'content'
  existingChildren.forEach(child => main.appendChild(child))

  // Build layout wrapper
  const layout = document.createElement('div')
  layout.className = isHome ? 'layout layout--home' : 'layout'
  if (!isHome) layout.appendChild(buildSidebar(currentPath))
  layout.appendChild(main)

  // Clear body and inject topnav + layout (+ footer on the landing)
  document.body.innerHTML = ''
  document.body.appendChild(buildTopnav(currentPath, isHome))
  document.body.appendChild(layout)
  if (isHome) document.body.appendChild(buildFooter())

  // Re-initialize code tabs on the new DOM
  initCodeTabs()
}

document.addEventListener('DOMContentLoaded', initLayout)
