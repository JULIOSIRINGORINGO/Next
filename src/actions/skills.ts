'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const skillSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  iconName: z.string().optional(),
  proficiency: z.number().int().min(0).max(100).default(80),
  featured: z.boolean(),
  order: z.number().int().min(0),
})

function revalidateSkills() {
  revalidatePath('/dashboard/skills')
  revalidatePath('/')
}

export async function createSkill(data: z.infer<typeof skillSchema>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = skillSchema.parse(data)
  const skill = await prisma.skill.create({ data: validated })
  revalidateSkills()
  return skill
}

export async function updateSkill(id: string, data: Partial<z.infer<typeof skillSchema>>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = skillSchema.partial().parse(data)
  const skill = await prisma.skill.update({ where: { id }, data: validated })
  revalidateSkills()
  return skill
}

export async function deleteSkill(id: string) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  await prisma.skill.delete({ where: { id } })
  revalidateSkills()
}

export async function getSkills(featuredOnly = false) {
  return prisma.skill.findMany({
    where: featuredOnly ? { featured: true } : {},
    orderBy: { order: 'asc' },
  })
}
