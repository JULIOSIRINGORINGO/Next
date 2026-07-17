'use client'

import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react'
import { ToastProvider } from '@/components/Toast'
import { ThemeProvider } from '@/context/ThemeContext'

interface ProvidersProps {
  children: ReactNode
  locale: string
  messages: any
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <SessionProvider>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Jakarta">
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  )
}
