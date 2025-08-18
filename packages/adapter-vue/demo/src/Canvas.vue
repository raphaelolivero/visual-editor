<script setup lang="ts">
import { computed } from 'vue'
import type { Doc, Node } from './doc'
import { saveDoc } from './doc'
import { registry } from './registry'

const props = defineProps<{ doc: Doc }>()
const emit = defineEmits<{ (e:'select', id:string): void; (e:'update:doc', d: Doc): void }>()

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  const type = e.dataTransfer?.getData('application/x-comp-type')
  if (!type || !registry[type]) return
  const def = registry[type]
  const id = crypto.randomUUID()
  const node: Node = { id, type, props: { ...(def.defaultProps ?? {}) } }
  const next = { ...props.doc, nodes: [...props.doc.nodes, node] }
  saveDoc(next)
  emit('update:doc', next)
}
const onDragOver = (e: DragEvent) => e.preventDefault()

const select = (id: string) => {
  const next = { ...props.doc, selectedId: id }
  saveDoc(next)
  emit('update:doc', next)
}
const selectedId = computed(() => props.doc.selectedId)
</script>

<template>
  <div class="h-full w-full border rounded bg-white p-4"
       @drop="onDrop" @dragover="onDragOver">
    <div v-if="doc.nodes.length === 0" class="text-gray-500 text-sm">
      Drag components here
    </div>

    <div v-for="n in doc.nodes" :key="n.id"
         @click.stop="select(n.id)"
         :class="['rounded p-2 mb-3 border',
                  n.id === selectedId ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200']">
      <component :is="registry[n.type].render(n.props)" />
    </div>
  </div>
</template>
