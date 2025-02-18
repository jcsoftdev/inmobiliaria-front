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
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@contracts': path.resolve(__dirname, 'src/contracts'),
      '@services': path.resolve(__dirname, 'src/services'),
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
