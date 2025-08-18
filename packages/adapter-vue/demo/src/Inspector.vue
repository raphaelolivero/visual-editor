<script setup lang="ts">
import { computed } from 'vue'
import type { Doc } from './doc'
import { saveDoc } from './doc'
import { registry } from './registry'

const props = defineProps<{ doc: Doc }>()
const emit = defineEmits<{ (e:'update:doc', d: Doc): void }>()

const selected = computed(() => props.doc.nodes.find(n => n.id === props.doc.selectedId))
const def = computed(() => selected.value ? registry[selected.value.type] : null)

const updateProp = (key: string, val: any) => {
  if (!selected.value) return
  selected.value.props = { ...selected.value.props, [key]: val }
  const next = { ...props.doc }
  saveDoc(next)
  emit('update:doc', next)
}

const removeNode = () => {
  if (!selected.value) return
  const nextNodes = props.doc.nodes.filter(n => n.id !== selected.value!.id)
  const next = { nodes: nextNodes, selectedId: undefined }
  saveDoc(next)
  emit('update:doc', next)
}
</script>

<template>
  <div>
    <h3 class="font-semibold mb-2">Inspector</h3>
    <div v-if="!selected" class="text-gray-500 text-sm">Select an element</div>
    <div v-else class="space-y-2">
      <div class="text-xs uppercase text-gray-500">{{ def?.label }}</div>
      <template v-for="(v, k) in selected.props" :key="k">
        <label class="block text-sm">
          <span class="text-gray-600">{{ k }}</span>
          <input class="mt-1 w-full border rounded p-2"
                 :value="v"
                 @input="updateProp(k, ($event.target as HTMLInputElement).value)" />
        </label>
      </template>
      <button class="mt-2 text-red-600" @click="removeNode">Remove</button>
    </div>
  </div>
</template>
