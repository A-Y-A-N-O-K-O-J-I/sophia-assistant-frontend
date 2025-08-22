import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    host:"0.0.0.0",
    allowedHosts: [
      'f5ca3fc84777.ngrok-free.app', // Add your ngrok domain
      'localhost',
      '127.0.0.1'
    ]
  },
})
