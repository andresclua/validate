/**
 * code-tabs.js
 * Handles tab switching within .code-block containers.
 *
 * Tab button:   .code-block__tab     (data-tab="js"|"html"|"config"|…)
 * Content panel:.code-block__content (data-tab="js"|"html"|"config"|…)
 * Active state: --active modifier on both tab and matching content panel
 */

/**
 * Initialize all .code-block elements on the page.
 * Attach click handlers to each tab button; on click, swap active classes.
 */
export function initCodeTabs() {
  const blocks = document.querySelectorAll('.code-block')

  blocks.forEach(block => {
    const tabs = block.querySelectorAll('.code-block__tab')
    const panels = block.querySelectorAll('.code-block__content')

    // Auto-activate the first tab if none is already active
    const activeTab = block.querySelector('.code-block__tab--active')
    if (!activeTab && tabs.length > 0) {
      tabs[0].classList.add('code-block__tab--active')
      if (panels[0]) panels[0].classList.add('code-block__content--active')
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab

        // Deactivate all tabs and panels within this block
        tabs.forEach(t => t.classList.remove('code-block__tab--active'))
        panels.forEach(p => p.classList.remove('code-block__content--active'))

        // Activate clicked tab and matching panel
        tab.classList.add('code-block__tab--active')
        const matchingPanel = block.querySelector(
          `.code-block__content[data-tab="${targetTab}"]`
        )
        if (matchingPanel) {
          matchingPanel.classList.add('code-block__content--active')
        }
      })
    })
  })
}

document.addEventListener('DOMContentLoaded', initCodeTabs)
