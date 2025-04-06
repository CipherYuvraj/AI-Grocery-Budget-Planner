// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['ai-grocery-budget-planner-1.onrender.com'], // ✅ add your Render backend domain here
  },
});
