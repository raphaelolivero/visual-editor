const registry = {
  heading: {
    label: 'Heading',
    defaultProps: { text: 'Hello world', level: 2 },
    render: (props) => {
      const el = document.createElement('h' + (props.level || 2));
      el.textContent = props.text || '';
      el.className = 'text-xl font-semibold';
      return el;
    }
  },
  paragraph: {
    label: 'Paragraph',
    defaultProps: { text: 'Lorem ipsum' },
    render: (props) => {
      const el = document.createElement('p');
      el.textContent = props.text || '';
      return el;
    }
  },
  textarea: {
    label: 'Textarea',
    defaultProps: { placeholder: 'Type here…', rows: 4 },
    render: (props) => {
      const el = document.createElement('textarea');
      el.placeholder = props.placeholder || '';
      el.rows = props.rows || 4;
      return el;
    }
  },
  button: {
    label: 'Button',
    defaultProps: { text: 'Click me' },
    render: (props) => {
      const el = document.createElement('button');
      el.textContent = props.text || '';
      return el;
    }
  }
};

let doc = JSON.parse(localStorage.getItem('demo-html-doc') || '{"nodes":[]}');

function saveDoc() {
  localStorage.setItem('demo-html-doc', JSON.stringify(doc));
}

function renderPalette() {
  const paletteEl = document.getElementById('palette');
  paletteEl.innerHTML = '<h3>Palette</h3>';
  Object.entries(registry).forEach(([type, def]) => {
    const item = document.createElement('div');
    item.className = 'palette-item';
    item.textContent = def.label;
    item.draggable = true;
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('application/x-comp-type', type);
    });
    paletteEl.appendChild(item);
  });
}

function renderCanvas() {
  const canvasEl = document.getElementById('canvas');
  canvasEl.innerHTML = '';
  canvasEl.addEventListener('dragover', (e) => e.preventDefault());
  canvasEl.addEventListener('drop', (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('application/x-comp-type');
    if (!type || !registry[type]) return;
    const def = registry[type];
    const id = crypto.randomUUID();
    const node = { id, type, props: { ...(def.defaultProps || {}) } };
    doc.nodes.push(node);
    doc.selectedId = id;
    saveDoc();
    renderCanvas();
    renderInspector();
  });
  if (doc.nodes.length === 0) {
    const empty = document.createElement('div');
    empty.textContent = 'Drag components here';
    empty.style.color = '#999';
    canvasEl.appendChild(empty);
  }
  doc.nodes.forEach((node) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-node';
    if (doc.selectedId === node.id) wrapper.classList.add('selected');
    wrapper.appendChild(registry[node.type].render(node.props));
    wrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      doc.selectedId = node.id;
      saveDoc();
      renderCanvas();
      renderInspector();
    });
    canvasEl.appendChild(wrapper);
  });
}

function renderInspector() {
  const inspectorEl = document.getElementById('inspector');
  inspectorEl.innerHTML = '<h3>Inspector</h3>';
  const selected = doc.nodes.find((n) => n.id === doc.selectedId);
  if (!selected) {
    const msg = document.createElement('div');
    msg.textContent = 'Select an element';
    msg.style.color = '#999';
    inspectorEl.appendChild(msg);
    return;
  }
  const label = document.createElement('div');
  label.textContent = registry[selected.type].label;
  label.style.fontSize = '0.8rem';
  label.style.textTransform = 'uppercase';
  label.style.color = '#666';
  inspectorEl.appendChild(label);
  Object.entries(selected.props).forEach(([key, value]) => {
    const field = document.createElement('div');
    field.className = 'inspector-field';
    const lab = document.createElement('label');
    lab.textContent = key;
    const input = document.createElement('input');
    input.value = value;
    input.addEventListener('input', (e) => {
      selected.props[key] = e.target.value;
      saveDoc();
      renderCanvas();
      renderInspector();
    });
    field.appendChild(lab);
    field.appendChild(input);
    inspectorEl.appendChild(field);
  });
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.style.color = 'red';
  removeBtn.addEventListener('click', () => {
    doc.nodes = doc.nodes.filter((n) => n.id !== selected.id);
    doc.selectedId = undefined;
    saveDoc();
    renderCanvas();
    renderInspector();
  });
  inspectorEl.appendChild(removeBtn);
}

function init() {
  renderPalette();
  renderCanvas();
  renderInspector();
}

document.addEventListener('DOMContentLoaded', init);
