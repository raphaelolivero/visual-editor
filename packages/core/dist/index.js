/**
 * createDocument creates a new empty document with default values.
 */
export function createDocument() {
    const now = new Date();
    return {
        id: "",
        name: "Untitled Document",
        nodes: {},
        createdAt: now,
        updatedAt: now,
    };
}
