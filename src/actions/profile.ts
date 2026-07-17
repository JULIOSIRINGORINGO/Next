'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const profileSchema = z.object({
  fullName: z.string().min(1),
  headline: z.string().optional(),
  bioHome: z.string().optional(),
  bioAbout: z.string().optional(),
  avatarUrl: z.string().url().optional().or(z.literal('')).nullable(),
  accentColor: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')).nullable(),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')).nullable(),
  githubUrl: z.string().url().optional().or(z.literal('')).nullable(),
  linkedinUrl: z.string().url().optional().or(z.literal('')).nullable(),
  twitterUrl: z.string().url().optional().or(z.literal('')).nullable(),
})

export async function updateProfile(data: z.infer<typeof profileSchema>) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('No user ID')

  const validated = profileSchema.parse(data)
  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: {
      ...validated,
      avatarUrl: validated.avatarUrl || null,
      accentColor: validated.accentColor || '#3B82F6',
      email: validated.email || null,
      website: validated.website || null,
      githubUrl: validated.githubUrl || null,
      linkedinUrl: validated.linkedinUrl || null,
      twitterUrl: validated.twitterUrl || null,
    },
    create: {
      userId: session.user.id,
      ...validated,
      avatarUrl: validated.avatarUrl || null,
      accentColor: validated.accentColor || '#3B82F6',
      email: validated.email || null,
      website: validated.website || null,
      githubUrl: validated.githubUrl || null,
      linkedinUrl: validated.linkedinUrl || null,
      twitterUrl: validated.twitterUrl || null,
    },
  })

  revalidatePath('/dashboard/profile')
  revalidatePath('/')
  return profile
}

export async function getProfile() {
  const session = await auth()
  if (!session?.user?.id) return null

  return prisma.profile.findUnique({ where: { userId: session.user.id } })
}

export async function getPublicProfile() {
  return prisma.profile.findFirst({
    include: { user: { select: { email: true, role: true } } },
  })
}

export async function updateAccentColor(color: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('No user ID')

  await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: { accentColor: color },
    create: {
      userId: session.user.id,
      fullName: 'Admin',
      accentColor: color,
    },
  })

  revalidatePath('/dashboard/profile')
  revalidatePath('/dashboard/theme')
  revalidatePath('/')
}
