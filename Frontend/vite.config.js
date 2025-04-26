import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import the path module
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    autoprefixer(),
    react()],
  build: {
    outDir: 'dist', // Ensure the output directory is within the frontend folder
    emptyOutDir: true, // Clear the output directory before building
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
    port: 5173, // Optional: Specify the development server port
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './srcStyle'), // Use the path module here
    },
  },
  base: "./", // Ensures correct routing
});