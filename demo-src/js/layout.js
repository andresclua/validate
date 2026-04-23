import { nav } from './nav-config.js'
import { initCodeTabs } from './code-tabs.js'

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
function buildTopnav() {
  const nav = document.createElement('nav')
  nav.className = 'topnav'
  nav.innerHTML = `
    <div class="topnav__logo">
      @andresclua/<span style="color:var(--red)">validate</span>
      <span class="topnav__badge">v0.0.14</span>
    </div>
    <div class="topnav__links">
      <a href="https://www.npmjs.com/package/@andresclua/validate" class="topnav__link" target="_blank">npm</a>
      <a href="https://github.com/andresclua/validate" class="topnav__link" target="_blank">GitHub</a>
      <a href="/installation.html" class="topnav__cta">Install</a>
    </div>
  `
  return nav
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

        const parentEl = document.createElement('div')
        parentEl.className = 'sidebar__item'
        parentEl.textContent = item.label
        if (childIsActive) {
          parentEl.classList.add('sidebar__item--active')
        }
        aside.appendChild(parentEl)

        // Subitems container — hidden by default, shown when a child is active
        const subContainer = document.createElement('div')
        subContainer.className = 'sidebar__subitems'
        if (childIsActive) {
          subContainer.classList.add('sidebar__subitems--open')
        }

        // Toggle expand/collapse on click
        parentEl.style.cursor = 'pointer'
        parentEl.addEventListener('click', () => {
          subContainer.classList.toggle('sidebar__subitems--open')
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

  // Collect existing body children
  const existingChildren = Array.from(document.body.childNodes)

  // Wrap existing content in <main class="content">
  const main = document.createElement('main')
  main.className = 'content'
  existingChildren.forEach(child => main.appendChild(child))

  // Build sidebar
  const sidebar = buildSidebar(currentPath)

  // Build layout wrapper
  const layout = document.createElement('div')
  layout.className = 'layout'
  layout.appendChild(sidebar)
  layout.appendChild(main)

  // Build topnav
  const topnav = buildTopnav()

  // Clear body and inject topnav + layout
  document.body.innerHTML = ''
  document.body.appendChild(topnav)
  document.body.appendChild(layout)

  // Re-initialize code tabs on the new DOM
  initCodeTabs()
}

document.addEventListener('DOMContentLoaded', initLayout)
