import { Providers } from '@/components/Providers'
import { getMessages } from 'next-intl/server'
import { Locale } from '@/i18n/routing'
import SidebarWrapper from '@/components/SidebarWrapper'
import AccentColorLoader from '@/components/AccentColorLoader'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <Providers locale={locale} messages={messages}>
      <AccentColorLoader />
      <div className="h-screen w-full overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-300">
        <div className="max-w-[1200px] mx-auto flex w-full h-full">
          <SidebarWrapper />
          <main className="flex-1 w-full max-w-full px-6 py-12 lg:px-16 lg:ml-[260px] h-screen overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </Providers>
  )
}
