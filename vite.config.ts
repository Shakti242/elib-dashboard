import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';

// Ensure PORT is always a string (fallback to default)
const PORT = process.env.PORT || "4173";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': process.env, // Ensures environment variables are accessible
  },
  server: {
    host: true, // Enables external access
    port: parseInt(PORT), // Safely parse the port number
  },
  preview: {
    port: parseInt(PORT), // Ensure preview server respects the same port
  },
});
