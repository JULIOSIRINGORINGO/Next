'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { translateText, translateBatch } from '@/lib/translate'

const expSchema = z.object({
  company: z.string().min(1),
  companyEn: z.string().optional(),
  companyLogoUrl: z.string().url().optional().nullable(),
  position: z.string().min(1),
  positionEn: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  current: z.boolean(),
  description: z.string().min(1),
  descriptionEn: z.string().optional(),
  employmentType: z.string().optional(),
  workType: z.string().optional(),
  responsibilities: z.array(z.string()),
  responsibilitiesEn: z.array(z.string()).optional(),
  whatILearned: z.array(z.string()).optional(),
  whatILearnedEn: z.array(z.string()).optional(),
  impact: z.array(z.string()).optional(),
  impactEn: z.array(z.string()).optional(),
  order: z.number().int().min(0),
})

async function autoTranslateExp(data: z.infer<typeof expSchema>) {
  const r = { ...data }
  if (!r.companyEn && r.company) r.companyEn = await translateText(r.company, 'id', 'en')
  if (!r.company && r.companyEn) r.company = await translateText(r.companyEn, 'en', 'id')
  if (!r.positionEn && r.position) r.positionEn = await translateText(r.position, 'id', 'en')
  if (!r.position && r.positionEn) r.position = await translateText(r.positionEn, 'en', 'id')
  if (!r.descriptionEn && r.description) r.descriptionEn = await translateText(r.description, 'id', 'en')
  if (!r.description && r.descriptionEn) r.description = await translateText(r.descriptionEn, 'en', 'id')

  if (r.responsibilities?.length && !r.responsibilitiesEn?.length) {
    r.responsibilitiesEn = await translateBatch(r.responsibilities, 'id', 'en')
  }
  if (r.responsibilitiesEn?.length && !r.responsibilities?.length) {
    r.responsibilities = await translateBatch(r.responsibilitiesEn, 'en', 'id')
  }
  if (r.whatILearned?.length && !r.whatILearnedEn?.length) {
    r.whatILearnedEn = await translateBatch(r.whatILearned, 'id', 'en')
  }
  if (r.whatILearnedEn?.length && !r.whatILearned?.length) {
    r.whatILearned = await translateBatch(r.whatILearnedEn, 'en', 'id')
  }
  if (r.impact?.length && !r.impactEn?.length) {
    r.impactEn = await translateBatch(r.impact, 'id', 'en')
  }
  if (r.impactEn?.length && !r.impact?.length) {
    r.impact = await translateBatch(r.impactEn, 'en', 'id')
  }
  return r
}

function revalidateExperiences() {
  revalidatePath('/dashboard/experiences')
  revalidatePath('/')
}

export async function createWorkExperience(data: z.infer<typeof expSchema>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = expSchema.parse(data)
  const translated = await autoTranslateExp(validated)

  const exp = await prisma.workExperience.create({
    data: {
      ...translated,
      startDate: new Date(translated.startDate),
      endDate: translated.endDate ? new Date(translated.endDate) : null,
    },
  })

  revalidateExperiences()
  return exp
}

export async function updateWorkExperience(id: string, data: Partial<z.infer<typeof expSchema>>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = expSchema.partial().parse(data)
  let translated = { ...validated }
  if (validated.company || validated.position || validated.description) {
    translated = await autoTranslateExp(validated as any)
  }

  const exp = await prisma.workExperience.update({
    where: { id },
    data: {
      ...translated,
      startDate: validated.startDate ? new Date(validated.startDate) : undefined,
      endDate: validated.endDate !== undefined ? (validated.endDate ? new Date(validated.endDate) : null) : undefined,
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
