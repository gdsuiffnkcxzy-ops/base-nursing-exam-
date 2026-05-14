import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nursing-exam/', // تأكد أن الاسم هنا مطابق تماماً لاسم المستودع على جيت هب
})
