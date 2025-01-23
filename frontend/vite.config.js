import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
});
