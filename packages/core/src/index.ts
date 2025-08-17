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
export function createDocument(): EditorDocument {
  const now = new Date();
  return {
    id: "",
    name: "Untitled Document",
    nodes: {},
    createdAt: now,
    updatedAt: now,
  };
}
