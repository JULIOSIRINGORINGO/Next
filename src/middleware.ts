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
  const isLoginPage = pathname.startsWith('/login')

  const session = await getSession(req)
  const isLoggedIn = !!session

  if (isAdminRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (isAdminRoute || isLoginPage) {
    return NextResponse.next()
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
