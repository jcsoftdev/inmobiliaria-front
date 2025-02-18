import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@libs/ui': path.resolve(__dirname, '../../packages/ui/src'),
    }
  },
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: true,
    target: 'esnext',
    outDir: '../../dist',
  },
})
