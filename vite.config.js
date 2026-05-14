import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // هذا السطر يخبر المتصفح أن موقعك موجود داخل هذا المسار تحديداً
  base: '/base-nursing-exam-/', 
})

