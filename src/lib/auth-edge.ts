import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET

export async function getSession(req: NextRequest) {
  try {
    const token = await getToken({ req, secret })
    return token ? { user: { id: token.id as string, role: token.role as string, email: token.email as string } } : null
  } catch {
    return null
  }
}
