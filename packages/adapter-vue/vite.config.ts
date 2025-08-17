import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@yourorg/core': resolve(__dirname, '../core/src'),
      '@yourorg/canvas': resolve(__dirname, '../canvas/src'),
      '@yourorg/adapter-vue': resolve(__dirname, 'src')
    }
  }
});
