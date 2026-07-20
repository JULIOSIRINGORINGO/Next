import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth-edge'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (/^\/(id|en)\/dashboard/.test(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  const isAdminRoute = pathname.startsWith('/dashboard')

  if (isAdminRoute) {
    const session = await getSession(req)
    const isLoggedIn = !!session

    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
