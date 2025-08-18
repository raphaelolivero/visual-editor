import type { EditorDocument } from '@initeelab/core';
/**
 * Mounts the editor into a Vue application. The document is passed into the
 * canvas renderer and the Vue component simply manages the lifecycle of
 * mounting and unmounting.
 */
export declare function mountEditor(document: EditorDocument, selector: string): void;
