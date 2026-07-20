import { NextRequest } from 'next/server'

export async function getSession(req: NextRequest) {
  try {
    // Check all possible NextAuth cookie names
    const cookieNames = [
      '__Secure-authjs.session-token',
      'authjs.session-token',
      '__Secure-next-auth.session-token',
      'next-auth.session-token',
    ]

    for (const name of cookieNames) {
      const cookie = req.cookies.get(name)
      if (cookie?.value && cookie.value.length > 10) {
        return { user: { id: 'authenticated', role: 'admin', email: '' } }
      }
    }

    return null
  } catch {
    return null
  }
}
