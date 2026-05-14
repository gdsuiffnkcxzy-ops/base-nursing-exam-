import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // يجب أن يكون base مساوياً لاسم المستودع مع شرطتين مائلتين في البداية والنهاية
  base: '/base-nursing-exam/',
})
