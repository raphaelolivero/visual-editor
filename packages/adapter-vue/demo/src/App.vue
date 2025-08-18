<script setup lang="ts">
import { ref } from 'vue'
import Palette from './Palette.vue'
import Canvas from './Canvas.vue'
import Inspector from './Inspector.vue'
import { createDoc, type Doc } from './doc'

const doc = ref<Doc>(createDoc())
const update = (d: Doc) => (doc.value = d)
</script>

<template>
  <div class="min-h-screen p-4 bg-gray-100">
    <div class="grid grid-cols-12 gap-4">
      <aside class="col-span-3"><Palette /></aside>
      <main class="col-span-6 h-[80vh]">
        <Canvas :doc="doc" @update:doc="update" />
      </main>
      <aside class="col-span-3">
        <Inspector :doc="doc" @update:doc="update" />
      </aside>
    </div>
  </div>
</template>
