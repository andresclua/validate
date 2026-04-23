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
      { label: 'Form Helper', children: [
        { label: 'Optional helper', href: '/advanced/form-helper.html' },
      ]},
    ]
  }
]
