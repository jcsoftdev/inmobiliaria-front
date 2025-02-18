import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// TODO: upgrade to v4 when heroui is released
// import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@libs/utils': path.resolve(__dirname, '../../packages/utils/src'),
    },
  },
  plugins: [
    react(),
    // TODO: upgrade to v4 when heroui is released
    // tailwindcss()
  ],
  build: {
    sourcemap: true,
    target: 'esnext',
    outDir: '../../dist',
  },
})
