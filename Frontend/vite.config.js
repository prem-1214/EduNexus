import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3000', // Backend for auth routes
        changeOrigin: true,
      },
      '/user': {
        target: 'http://localhost:3000', // Backend for user routes
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
