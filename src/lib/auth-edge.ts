import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function getSession(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! })
    return token ? { user: { id: token.id as string, role: token.role as string, email: token.email as string } } : null
  } catch {
    return null
  }
}
