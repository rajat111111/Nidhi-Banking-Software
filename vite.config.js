import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
    host: true,                       
    port: 5179,                        
    allowedHosts: ['ebidgo.in','www.ebidgo.in'], 
  },
  plugins: [react()],
})
