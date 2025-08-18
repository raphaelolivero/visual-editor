import { createApp, defineComponent, h } from 'vue';
import { render } from '@initeelab/canvas';
/**
 * Mounts the editor into a Vue application. The document is passed into the
 * canvas renderer and the Vue component simply manages the lifecycle of
 * mounting and unmounting.
 */
export function mountEditor(document, selector) {
    const Root = defineComponent({
        mounted() {
            const container = this.$el;
            render(document, container);
        },
        render() {
            return h('div');
        }
    });
    createApp(Root).mount(selector);
}
