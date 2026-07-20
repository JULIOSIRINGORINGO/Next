'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/context/ThemeContext'
import { Toaster } from 'sonner'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <Toaster position="top-center" richColors />
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}
