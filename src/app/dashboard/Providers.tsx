'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/context/ThemeContext'
import { ToastProvider } from '@/components/Toast'
import { Toaster } from 'sonner'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <ToastProvider>
          <Toaster position="top-center" richColors />
          {children}
        </ToastProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
