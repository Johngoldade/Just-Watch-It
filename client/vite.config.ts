import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/',
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/tmdb': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      },
      '/db': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      },
      '/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
