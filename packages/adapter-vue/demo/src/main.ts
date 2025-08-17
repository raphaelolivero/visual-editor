import { mountEditor } from '@yourorg/adapter-vue';
import { createDocument } from '@yourorg/core';

// Create a dummy document and mount the editor
const document = createDocument();
mountEditor(document, '#app');
