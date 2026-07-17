'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/context/ThemeContext'
import { ToastProvider } from '@/components/Toast'
import dynamic from 'next/dynamic'

const Toaster = dynamic(
  () => import('sonner').then(mod => mod.Toaster),
  { ssr: false }
)

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
