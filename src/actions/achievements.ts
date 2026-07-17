'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const achievementSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  issuer: z.string().optional(),
  date: z.string().optional(),
  imageUrl: z.string().url().optional().nullable(),
  category: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional().nullable(),
  type: z.string().optional(),
  featured: z.boolean(),
  order: z.number().int().min(0),
  translations: z.array(z.object({
    locale: z.string(),
    title: z.string(),
    description: z.string(),
    issuer: z.string().optional(),
  })).optional(),
})

function revalidateAchievements() {
  revalidatePath('/dashboard/achievements')
  revalidatePath('/')
}

export async function createAchievement(data: z.infer<typeof achievementSchema>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = achievementSchema.parse(data)
  const { translations, ...achievementData } = validated

  const achievement = await prisma.achievement.create({
    data: {
      ...achievementData,
      date: validated.date ? new Date(validated.date) : new Date(),
      imageUrl: validated.imageUrl || null,
      credentialUrl: validated.credentialUrl || null,
      translations: translations ? {
        create: translations.map(t => ({
          locale: t.locale,
          title: t.title,
          description: t.description,
          issuer: t.issuer,
        }))
      } : undefined,
    },
    include: { translations: true },
  })

  revalidateAchievements()
  return achievement
}

export async function updateAchievement(id: string, data: Partial<z.infer<typeof achievementSchema>>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = achievementSchema.partial().parse(data)
  const { translations, ...achievementData } = validated

  const achievement = await prisma.achievement.update({
    where: { id },
    data: {
      ...achievementData,
      date: validated.date ? new Date(validated.date) : undefined,
      imageUrl: validated.imageUrl || null,
      credentialUrl: validated.credentialUrl || null,
      translations: translations ? {
        deleteMany: {},
        create: translations.map(t => ({
          locale: t.locale,
          title: t.title,
          description: t.description,
          issuer: t.issuer,
        }))
      } : undefined,
    },
    include: { translations: true },
  })

  revalidateAchievements()
  return achievement
}

export async function deleteAchievement(id: string) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  await prisma.achievement.delete({ where: { id } })
  revalidateAchievements()
}

export async function getAchievements(featuredOnly = false, locale = 'id') {
  return prisma.achievement.findMany({
    where: featuredOnly ? { featured: true } : {},
    orderBy: { order: 'asc' },
    include: {
      translations: locale ? { where: { locale } } : true,
    },
  })
}

export async function getAchievementById(id: string, locale = 'id') {
  return prisma.achievement.findUnique({
    where: { id },
    include: {
      translations: locale ? { where: { locale } } : true,
    },
  })
}
