export interface EditorDocument {
    id: string;
    name: string;
    nodes: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * createDocument creates a new empty document with default values.
 */
export declare function createDocument(): EditorDocument;
