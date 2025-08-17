/**
 * A simple headless UI factory. In a real editor this would expose
 * primitives for building inspectors, lists, modals and more without
 * depending on any particular view library.
 */
export function createPanel(title: string): HTMLElement {
  const panel = document.createElement('div');
  panel.className = 've-panel';
  const header = document.createElement('h2');
  header.textContent = title;
  panel.appendChild(header);
  return panel;
}
