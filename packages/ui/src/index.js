/**
 * A simple headless UI factory. In a real editor this would expose
 * primitives for building inspectors, lists, modals and more without
 * depending on any particular view library.
 *
 * This file has been extended to include a lightweight component
 * registry. Components can be registered by name with a factory
 * function and later instantiated via `createComponent`. This makes
 * it easy for consumers of the UI package to plug in their own
 * controls without tightly coupling to a particular framework.
 */
/**
 * Create a basic editor panel. Panels can contain arbitrary DOM
 * elements and are styled via the `ve-panel` class. In a real system
 * this would likely be far more sophisticated, but for our purposes
 * it is a simple container with a header.
 */
export function createPanel(title) {
    const panel = document.createElement('div');
    panel.className = 've-panel';
    const header = document.createElement('h2');
    header.textContent = title;
    panel.appendChild(header);
    return panel;
}
// Internal registry mapping component names to factory functions. Using a plain
// object instead of a Map makes the registry easy to serialise or inspect.
const componentRegistry = {};
/**
 * Registers a new component factory under a given name. If another factory
 * has already been registered under the same name it will be overwritten.
 *
 * @param name Unique identifier for the component type.
 * @param factory A function that produces an HTMLElement for this component.
 */
export function registerComponent(name, factory) {
    componentRegistry[name] = factory;
}
/**
 * Instantiate a component that has previously been registered. Throws an
 * error if no component with the given name exists in the registry.
 *
 * @param name The name used when the component was registered.
 * @param props Optional props passed through to the factory.
 */
export function createComponent(name, props) {
    const factory = componentRegistry[name];
    if (!factory) {
        throw new Error(`Component \"${name}\" has not been registered`);
    }
    return factory(props);
}
/**
 * Factory function for a `<textarea>` control. Returns a new `<textarea>`
 * configured with the provided props. If called outside of the registry
 * it can still be used directly to create an unregistered textarea.
 */
export function createTextarea(props = {}) {
    const textarea = document.createElement('textarea');
    if (props.placeholder) {
        textarea.placeholder = props.placeholder;
    }
    if (props.value !== undefined) {
        textarea.value = props.value;
    }
    if (props.rows !== undefined) {
        textarea.rows = props.rows;
    }
    if (props.cols !== undefined) {
        textarea.cols = props.cols;
    }
    return textarea;
}
// Register the built‑in textarea component. Consumers can override this
// registration by calling registerComponent('textarea', ...) with their own
// factory if needed.
registerComponent('textarea', createTextarea);
