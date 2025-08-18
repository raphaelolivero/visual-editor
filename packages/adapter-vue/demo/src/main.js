import { mountEditor } from '@initeelab/adapter-vue';
import { createDocument } from '@initeelab/core';
// Create a dummy document and mount the editor
const document = createDocument();
mountEditor(document, '#app');
