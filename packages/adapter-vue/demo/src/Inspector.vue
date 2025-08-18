<script setup lang="ts">
import { computed } from 'vue'
import type { Doc, Node } from './doc'
import { saveDoc } from './doc'
import { registry } from './registry'

const props = defineProps<{ doc: Doc }>()
const emit = defineEmits<{ (e:'update:doc', d: Doc): void }>()

const selected = computed(() => props.doc.nodes.find(n => n.id === props.doc.selectedId))
const def = computed(() => selected.value ? registry[selected.value.type] : null)

const updateNodeField = (key: keyof Node, value: any) => {
  if (!selected.value) return
  if (key === 'x' || key === 'y' || key === 'width' || key === 'height') {
    const num = parseFloat(value)
    ;(selected.value as any)[key] = isNaN(num) ? 0 : num
  } else {
    ;(selected.value as any)[key] = value
  }
  const next = { ...props.doc }
  saveDoc(next)
  emit('update:doc', next)
}

const updateProp = (key: string, value: any) => {
  if (!selected.value) return
  selected.value.props = { ...selected.value.props, [key]: value }
  const next = { ...props.doc }
  saveDoc(next)
  emit('update:doc', next)
}

const removeNode = () => {
  if (!selected.value) return
  const nextNodes = props.doc.nodes.filter(n => n.id !== selected.value!.id)
  const next: Doc = { nodes: nextNodes, selectedId: undefined }
  saveDoc(next)
  emit('update:doc', next)
}
</script>

<template>
  <div class="space-y-2">
    <h3 class="font-semibold mb-2">Inspector</h3>
    <div v-if="!selected">
      <div class="text-gray-500 text-sm">Select an element</div>
    </div>
    <div v-else>
      <div class="text-xs uppercase text-gray-500 mb-2">{{ def?.label }}</div>
      <label class="block text-sm mb-1">
        <span class="text-gray-600">x</span>
        <input type="number" class="mt-1 w-full border rounded p-2" :value="selected.x" @input="updateNodeField('x', ($event.target as HTMLInputElement).value)" />
      </label>
      <label class="block text-sm mb-1">
        <span class="text-gray-600">y</span>
        <input type="number" class="mt-1 w-full border rounded p-2" :value="selected.y" @input="updateNodeField('y', ($event.target as HTMLInputElement).value)" />
      </label>
      <label class="block text-sm mb-1">
        <span class="text-gray-600">width</span>
        <input type="number" class="mt-1 w-full border rounded p-2" :value="selected.width" @input="updateNodeField('width', ($event.target as HTMLInputElement).value)" />
      </label>
      <label class="block text-sm mb-1">
        <span class="text-gray-600">height</span>
        <input type="number" class="mt-1 w-full border rounded p-2" :value="selected.height" @input="updateNodeField('height', ($event.target as HTMLInputElement).value)" />
      </label>
      <template v-for="(v, k) in selected.props" :key="k">
        <label class="block text-sm mb-1">
          <span class="text-gray-600">{{ k }}</span>
          <input class="mt-1 w-full border rounded p-2" :value="v" @input="updateProp(k, ($event.target as HTMLInputElement).value)" />
        </label>
      </template>
      <button class="mt-3 text-red-600" @click="removeNode">Remove</button>
    </div>
  </div>
</template>
