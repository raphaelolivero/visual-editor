import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@initeelab/core': resolve(__dirname, '../core/src'),
      '@initeelab/canvas': resolve(__dirname, '../canvas/src'),
      '@initeelab/adapter-vue': resolve(__dirname, 'src')
    }
  }
});