import type { EditorDocument } from '@initeelab/core';
/**
 * Renders the provided document into a container element. This placeholder
 * implementation simply writes a message to the DOM. A real canvas would
 * handle hit-testing, drawing bounding boxes, selection, etc., independently
 * of any framework.
 */
export declare function render(document: EditorDocument, container: HTMLElement): void;
