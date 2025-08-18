export type Node = { id: string; type: string; props: Record<string, any> }
export type Doc = { nodes: Node[]; selectedId?: string }

export const createDoc = (): Doc => {
  const saved = localStorage.getItem('demo-doc')
  if (saved) return JSON.parse(saved)
  return { nodes: [] }
}

export const saveDoc = (d: Doc) => localStorage.setItem('demo-doc', JSON.stringify(d))
