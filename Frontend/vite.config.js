import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig({
  plugins: [
    react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true, 
  },
  server: {
    proxy: {
      "/auth": { target: "http://localhost:3000", changeOrigin: true },
      "/user": { target: "http://localhost:3000", changeOrigin: true },
      "/video": { target: "http://localhost:3000", changeOrigin: true, secure: false },
      "/faculty": { target: "http://localhost:3000", changeOrigin: true },
      "/file": { target: "http://localhost:3000", changeOrigin: true },
      '/api/generate': {
        target: 'http://localhost:11434',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/generate/, '/api/generate'),
      },  

    },
    port: 5173, 
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './srcStyle'), 
    },
  },
  base: "./", 
});