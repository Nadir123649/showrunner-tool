import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
    // If you run into CORS with Replicate API in browser,
    // you can add a proxy here.
    // proxy: {
    //   '/api/replicate': {
    //     target: 'https://api.replicate.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api\/replicate/, ''),
    //   },
    // },
  }
})
