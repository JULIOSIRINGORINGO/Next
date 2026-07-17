import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { routing } from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default auth((req) => {
  const pathname = req.nextUrl.pathname
  const isLoggedIn = !!req.auth

  // /id/dashboard or /en/dashboard → redirect to /dashboard (admin)
  if (/^\/(id|en)\/dashboard/.test(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  const isAdminRoute = pathname.startsWith('/dashboard')
  const isLoginPage = pathname.startsWith('/login')

  if (isAdminRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (isAdminRoute) {
    return NextResponse.next()
  }

  if (isLoginPage) {
    return NextResponse.next()
  }

  return intlMiddleware(req as any)
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
