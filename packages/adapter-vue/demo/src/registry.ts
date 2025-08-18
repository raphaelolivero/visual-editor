export type CompDef = {
  type: string
  label: string
  defaultProps?: Record<string, any>
  defaultSize?: { width: number; height: number }
  render: (props: Record<string, any>) => any
}

import { h } from 'vue'

export const registry: Record<string, CompDef> = {
  heading: {
    type: 'heading',
    label: 'Heading',
    defaultProps: { text: 'Hello world', level: 2 },
    defaultSize: { width: 200, height: 40 },
    render: (p) => h(`h${p.level ?? 2}`, { class: 'text-xl font-semibold' }, p.text ?? '')
  },
  paragraph: {
    type: 'paragraph',
    label: 'Paragraph',
    defaultProps: { text: 'Lorem ipsum dolor sit amet.' },
    defaultSize: { width: 200, height: 60 },
    render: (p) => h('p', { class: 'text-base leading-6' }, p.text ?? '')
  },
  textarea: {
    type: 'textarea',
    label: 'Textarea',
    defaultProps: { placeholder: 'Type here…', rows: 4 },
    defaultSize: { width: 200, height: 100 },
    render: (p) => h('textarea', {
      placeholder: p.placeholder,
      rows: p.rows ?? 4,
      class: 'w-full border rounded p-2'
    })
  },
  button: {
    type: 'button',
    label: 'Button',
    defaultProps: { text: 'Click me' },
    defaultSize: { width: 120, height: 40 },
    render: (p) => h('button', { class: 'px-3 py-2 rounded bg-black text-white' }, p.text ?? '')
  }
}
