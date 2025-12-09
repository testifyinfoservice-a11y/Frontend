import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const devPort = Number(process.env.VITE_PORT) || 5173
export default defineConfig({
  plugins: [react()],
  server: {
    port: devPort,
    host: true,
    proxy: {
      '/api': 'http://localhost:8082'
    }
  }
})
