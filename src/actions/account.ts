'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

export async function changeEmail(newEmail: string, currentPassword: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')

  const parsed = z.object({ email: z.string().email() }).safeParse({ email: newEmail })
  if (!parsed.success) throw new Error('Invalid email')

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) throw new Error('User not found')

  const valid = await bcrypt.compare(currentPassword, user.passwordHash)
  if (!valid) throw new Error('Current password is incorrect')

  const existing = await prisma.user.findUnique({ where: { email: newEmail } })
  if (existing && existing.id !== user.id) throw new Error('Email already in use')

  await prisma.user.update({ where: { id: user.id }, data: { email: newEmail } })

  return { success: true }
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')

  const parsed = z.object({ password: z.string().min(6) }).safeParse({ password: newPassword })
  if (!parsed.success) throw new Error('Password must be at least 6 characters')

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) throw new Error('User not found')

  const valid = await bcrypt.compare(currentPassword, user.passwordHash)
  if (!valid) throw new Error('Current password is incorrect')

  const newHash = await bcrypt.hash(newPassword, 12)
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: newHash } })

  return { success: true }
}
