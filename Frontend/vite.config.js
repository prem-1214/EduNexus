import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; 

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', 
    emptyOutDir: true, 
  },
  server: {
    proxy: {
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
      '@': path.resolve(__dirname, './srcStyle'), // Use the path module here
    },
  },
  base: "./", 
});