<script setup lang="ts">
import { computed, ref, reactive, onMounted, onUnmounted } from 'vue'
import type { Doc, Node } from './doc'
import { saveDoc } from './doc'
import { registry } from './registry'

const props = defineProps<{ doc: Doc }>()
const emit = defineEmits<{ (e:'update:doc', d: Doc): void }>()

const draggingId = ref<string | null>(null)
const resizingId = ref<string | null>(null)
const dragOffset = reactive({ x: 0, y: 0 })
const resizeOffset = reactive({ x: 0, y: 0 })

const findNode = (id: string) => props.doc.nodes.find(n => n.id === id)

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  const type = e.dataTransfer?.getData('application/x-comp-type')
  if (!type || !registry[type]) return
  const def = registry[type]
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const size = def.defaultSize ?? { width: 200, height: 50 }
  const node: Node = {
    id: crypto.randomUUID(),
    type,
    props: { ...(def.defaultProps ?? {}) },
    x,
    y,
    width: size.width,
    height: size.height
  }
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

const startDrag = (id: string, e: PointerEvent) => {
  draggingId.value = id
  const node = findNode(id)
  if (!node) return
  dragOffset.x = e.clientX - node.x
  dragOffset.y = e.clientY - node.y
}

const startResize = (id: string, e: PointerEvent) => {
  resizingId.value = id
  const node = findNode(id)
  if (!node) return
  resizeOffset.x = e.clientX - (node.x + node.width)
  resizeOffset.y = e.clientY - (node.y + node.height)
}

const onMove = (e: PointerEvent) => {
  if (draggingId.value) {
    const node = findNode(draggingId.value)
    if (node) {
      node.x = e.clientX - dragOffset.x
      node.y = e.clientY - dragOffset.y
      const next = { ...props.doc }
      saveDoc(next)
      emit('update:doc', next)
    }
  } else if (resizingId.value) {
    const node = findNode(resizingId.value)
    if (node) {
      node.width = e.clientX - resizeOffset.x - node.x
      node.height = e.clientY - resizeOffset.y - node.y
      const next = { ...props.doc }
      saveDoc(next)
      emit('update:doc', next)
    }
  }
}

const onUp = () => {
  draggingId.value = null
  resizingId.value = null
}

onMounted(() => {
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
})
onUnmounted(() => {
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
})

const selectedId = computed(() => props.doc.selectedId)
</script>

<template>
  <div class="h-full w-full border rounded bg-white relative overflow-hidden"
       @drop="onDrop" @dragover="onDragOver">
    <div v-if="props.doc.nodes.length === 0" class="text-gray-500 text-sm p-4">
      Drag components here
    </div>
    <div v-for="n in props.doc.nodes" :key="n.id"
         :style="{ position: 'absolute', left: n.x + 'px', top: n.y + 'px', width: n.width + 'px', height: n.height + 'px' }"
         class="border border-gray-300 rounded">
      <component :is="registry[n.type].render(n.props)" />
      <div v-if="n.id === selectedId" class="absolute inset-0 ring-2 ring-blue-500 pointer-events-none"></div>
      <div v-if="n.id === selectedId" class="absolute right-0 bottom-0 w-3 h-3 bg-blue-500 cursor-nwse-resize"
           @pointerdown.stop.prevent="select(n.id); startResize(n.id, $event)"></div>
      <div class="absolute inset-0 cursor-move"
           @pointerdown.stop.prevent="select(n.id); startDrag(n.id, $event)"></div>
    </div>
  </div>
</template>
