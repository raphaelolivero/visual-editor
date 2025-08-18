<script setup lang="ts">
import { registry } from './registry'
const items = Object.values(registry)
const onDragStart = (e: DragEvent, type: string) => {
  e.dataTransfer?.setData('application/x-comp-type', type)
  e.dataTransfer?.setData('text/plain', type)
}
</script>

<template>
  <div class="space-y-2">
    <h3 class="font-semibold mb-2">Palette</h3>
    <div v-for="it in items" :key="it.type"
         draggable="true"
         @dragstart="onDragStart($event, it.type)"
         class="border rounded px-2 py-1 bg-white cursor-grab hover:bg-gray-50">
      {{ it.label }}
    </div>
  </div>
</template>
