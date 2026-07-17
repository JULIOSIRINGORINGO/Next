import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
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
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://portofolio-nextjs-neon.vercel.app',
      siteName: `Portfolio | ${name}`,
      title: `Portfolio | ${name}`,
      description: 'Personal portfolio showcasing projects, skills, and experience',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Portfolio Preview',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Portfolio | ${name}`,
      description: 'Personal portfolio showcasing projects, skills, and experience',
      images: ['/og-image.png'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
