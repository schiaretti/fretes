import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para as requisições da API
      '/api': {
        target: 'https://sauloapi-production-0262.up.railway.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // Configurações adicionais se necessário
        headers: {
          'Connection': 'keep-alive'
        }
      }
    }
  },
  base: "/",
})