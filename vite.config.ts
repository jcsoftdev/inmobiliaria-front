import path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
// TODO: upgrade to v4 when heroui is released
// import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@contracts': path.resolve(__dirname, 'src/contracts'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@store': path.resolve(__dirname, 'src/store'),
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
    outDir: './dist',
  },
})
