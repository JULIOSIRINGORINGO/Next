'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const eduSchema = z.object({
  institution: z.string().min(1),
  institutionLogoUrl: z.string().url().optional().nullable(),
  degree: z.string().min(1),
  fieldOfStudy: z.string().optional(),
  location: z.string().optional(),
  gpa: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  current: z.boolean(),
  description: z.string().optional(),
  order: z.number().int().min(0),
})

function revalidateEducation() {
  revalidatePath('/dashboard/education')
  revalidatePath('/')
}

export async function createEducation(data: z.infer<typeof eduSchema>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = eduSchema.parse(data)
  const edu = await prisma.education.create({
    data: {
      ...validated,
      startDate: new Date(validated.startDate),
      endDate: validated.endDate ? new Date(validated.endDate) : null,
    },
  })

  revalidateEducation()
  return edu
}

export async function updateEducation(id: string, data: Partial<z.infer<typeof eduSchema>>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = eduSchema.partial().parse(data)
  const edu = await prisma.education.update({
    where: { id },
    data: {
      ...validated,
      startDate: validated.startDate ? new Date(validated.startDate) : undefined,
      endDate: validated.endDate ? new Date(validated.endDate) : null,
    },
  })

  revalidateEducation()
  return edu
}

export async function deleteEducation(id: string) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  await prisma.education.delete({ where: { id } })
  revalidateEducation()
}

export async function getEducations() {
  return prisma.education.findMany({ orderBy: { order: 'asc' } })
}
