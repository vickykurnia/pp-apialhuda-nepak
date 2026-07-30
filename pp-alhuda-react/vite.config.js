import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 🆕 KUNCI UTAMA TAILWIND V4
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 🆕 Pastikan fungsi ini dipanggil di dalam array plugins!
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})