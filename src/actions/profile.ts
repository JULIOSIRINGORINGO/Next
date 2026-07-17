'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { translateText } from '@/lib/translate'

const profileSchema = z.object({
  fullName: z.string().min(1),
  fullNameEn: z.string().optional(),
  headline: z.string().optional(),
  headlineEn: z.string().optional(),
  bioHome: z.string().optional(),
  bioHomeEn: z.string().optional(),
  bioAbout: z.string().optional(),
  bioAboutEn: z.string().optional(),
  avatarUrl: z.string().url().optional().or(z.literal('')).nullable(),
  accentColor: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')).nullable(),
  phone: z.string().optional(),
  location: z.string().optional(),
  locationEn: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')).nullable(),
  githubUrl: z.string().url().optional().or(z.literal('')).nullable(),
  linkedinUrl: z.string().url().optional().or(z.literal('')).nullable(),
  twitterUrl: z.string().url().optional().or(z.literal('')).nullable(),
})

async function autoTranslateProfile(data: z.infer<typeof profileSchema>) {
  const result = { ...data }

  if (!result.fullNameEn && result.fullName) {
    result.fullNameEn = await translateText(result.fullName, 'id', 'en')
  }
  if (!result.fullName && result.fullNameEn) {
    result.fullName = await translateText(result.fullNameEn, 'en', 'id')
  }
  if (!result.headlineEn && result.headline) {
    result.headlineEn = await translateText(result.headline, 'id', 'en')
  }
  if (!result.headline && result.headlineEn) {
    result.headline = await translateText(result.headlineEn, 'en', 'id')
  }
  if (!result.bioHomeEn && result.bioHome) {
    result.bioHomeEn = await translateText(result.bioHome, 'id', 'en')
  }
  if (!result.bioHome && result.bioHomeEn) {
    result.bioHome = await translateText(result.bioHomeEn, 'en', 'id')
  }
  if (!result.bioAboutEn && result.bioAbout) {
    result.bioAboutEn = await translateText(result.bioAbout, 'id', 'en')
  }
  if (!result.bioAbout && result.bioAboutEn) {
    result.bioAbout = await translateText(result.bioAboutEn, 'en', 'id')
  }
  if (!result.locationEn && result.location) {
    result.locationEn = await translateText(result.location, 'id', 'en')
  }
  if (!result.location && result.locationEn) {
    result.location = await translateText(result.locationEn, 'en', 'id')
  }

  return result
}

export async function updateProfile(data: z.infer<typeof profileSchema>) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('No user ID')

  const validated = profileSchema.parse(data)
  const translated = await autoTranslateProfile(validated)

  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: {
      ...translated,
      avatarUrl: translated.avatarUrl || null,
      accentColor: translated.accentColor || '#3B82F6',
      email: translated.email || null,
      website: translated.website || null,
      githubUrl: translated.githubUrl || null,
      linkedinUrl: translated.linkedinUrl || null,
      twitterUrl: translated.twitterUrl || null,
    },
    create: {
      userId: session.user.id,
      ...translated,
      avatarUrl: translated.avatarUrl || null,
      accentColor: translated.accentColor || '#3B82F6',
      email: translated.email || null,
      website: translated.website || null,
      githubUrl: translated.githubUrl || null,
      linkedinUrl: translated.linkedinUrl || null,
      twitterUrl: translated.twitterUrl || null,
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
