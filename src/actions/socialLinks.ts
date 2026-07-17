'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { translateText } from '@/lib/translate'

const socialSchema = z.object({
  platform: z.string().min(1),
  title: z.string().min(1),
  titleEn: z.string().optional(),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  url: z.string().url(),
  isFeatured: z.boolean(),
  order: z.number().int().min(0),
})

async function autoTranslateSocial(data: z.infer<typeof socialSchema>) {
  const r = { ...data }
  if (!r.titleEn && r.title) r.titleEn = await translateText(r.title, 'id', 'en')
  if (!r.title && r.titleEn) r.title = await translateText(r.titleEn, 'en', 'id')
  if (!r.descriptionEn && r.description) r.descriptionEn = await translateText(r.description, 'id', 'en')
  if (!r.description && r.descriptionEn) r.description = await translateText(r.descriptionEn, 'en', 'id')
  return r
}

function revalidateSocialLinks() {
  revalidatePath('/dashboard/social-links')
  revalidatePath('/')
}

export async function createSocialLink(data: z.infer<typeof socialSchema>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = socialSchema.parse(data)
  const translated = await autoTranslateSocial(validated)
  const link = await prisma.socialLink.create({ data: translated })
  revalidateSocialLinks()
  return link
}

export async function updateSocialLink(id: string, data: Partial<z.infer<typeof socialSchema>>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = socialSchema.partial().parse(data)
  let translated = { ...validated }
  if (validated.title) {
    translated = await autoTranslateSocial(validated as any)
  }

  const link = await prisma.socialLink.update({ where: { id }, data: translated })
  revalidateSocialLinks()
  return link
}

export async function deleteSocialLink(id: string) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  await prisma.socialLink.delete({ where: { id } })
  revalidateSocialLinks()
}

export async function getSocialLinks(featuredOnly = false) {
  return prisma.socialLink.findMany({
    where: featuredOnly ? { isFeatured: true } : {},
    orderBy: { order: 'asc' },
  })
}
