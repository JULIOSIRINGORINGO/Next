import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { prisma } from '@/lib/prisma'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

async function getProfileName(): Promise<string> {
  try {
    const profile = await prisma.profile.findFirst()
    return profile?.fullName || 'Portfolio'
  } catch {
    return 'Portfolio'
  }
}

const BASE_URL = 'https://juliosiringoringo.space'

export async function generateMetadata(): Promise<Metadata> {
  const name = await getProfileName()
  return {
    title: {
      default: `Portfolio | ${name}`,
      template: `%s | ${name}`,
    },
    description: 'Personal portfolio showcasing projects, skills, and experience',
    keywords: ['developer', 'portfolio', 'full stack', 'React', 'Next.js', 'TypeScript', 'Python', 'FastAPI'],
    authors: [{ name }],
    creator: name,
    publisher: name,
    metadataBase: new URL(BASE_URL),
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: BASE_URL,
      siteName: `Portfolio | ${name}`,
      title: `Portfolio | ${name}`,
      description: 'Personal portfolio showcasing projects, skills, and experience',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Portfolio | ${name}`,
      description: 'Personal portfolio showcasing projects, skills, and experience',
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const name = await getProfileName()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: 'https://juliosiringoringo.space',
    jobTitle: 'Full Stack Developer',
    sameAs: [],
  }

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
