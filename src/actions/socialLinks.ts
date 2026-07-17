'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const socialSchema = z.object({
  platform: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  url: z.string().url(),
  isFeatured: z.boolean(),
  order: z.number().int().min(0),
})

function revalidateSocialLinks() {
  revalidatePath('/dashboard/social-links')
  revalidatePath('/')
}

export async function createSocialLink(data: z.infer<typeof socialSchema>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = socialSchema.parse(data)
  const link = await prisma.socialLink.create({ data: validated })
  revalidateSocialLinks()
  return link
}

export async function updateSocialLink(id: string, data: Partial<z.infer<typeof socialSchema>>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = socialSchema.partial().parse(data)
  const link = await prisma.socialLink.update({ where: { id }, data: validated })
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
