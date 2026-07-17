'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const expSchema = z.object({
  company: z.string().min(1),
  companyLogoUrl: z.string().url().optional().nullable(),
  position: z.string().min(1),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  current: z.boolean(),
  description: z.string().min(1),
  employmentType: z.string().optional(),
  workType: z.string().optional(),
  responsibilities: z.array(z.string()),
  whatILearned: z.array(z.string()).optional(),
  impact: z.array(z.string()).optional(),
  order: z.number().int().min(0),
})

function revalidateExperiences() {
  revalidatePath('/dashboard/experiences')
  revalidatePath('/')
}

export async function createWorkExperience(data: z.infer<typeof expSchema>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = expSchema.parse(data)
  const exp = await prisma.workExperience.create({
    data: {
      ...validated,
      startDate: new Date(validated.startDate),
      endDate: validated.endDate ? new Date(validated.endDate) : null,
    },
  })

  revalidateExperiences()
  return exp
}

export async function updateWorkExperience(id: string, data: Partial<z.infer<typeof expSchema>>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = expSchema.partial().parse(data)
  const exp = await prisma.workExperience.update({
    where: { id },
    data: {
      ...validated,
      startDate: validated.startDate ? new Date(validated.startDate) : undefined,
      endDate: validated.endDate ? new Date(validated.endDate) : null,
    },
  })

  revalidateExperiences()
  return exp
}

export async function deleteWorkExperience(id: string) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  await prisma.workExperience.delete({ where: { id } })
  revalidateExperiences()
}

export async function getWorkExperiences() {
  return prisma.workExperience.findMany({ orderBy: { order: 'asc' } })
}
