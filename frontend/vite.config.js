import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
    resolve: {
    alias: {
      'react-dom/client': 'react-dom/client'
    }
  },
  optimizeDeps: {
    include: ['react-dom/client']
  },
  server: {
    port: 5002,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
      },
      '/socket.io': {
        target: 'http://localhost:5001',
        rewriteWsOrigin: true,
        ws: true,
      }
    }
  }
})