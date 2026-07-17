'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { translateText, translateBatch } from '@/lib/translate'

const eduSchema = z.object({
  institution: z.string().min(1),
  institutionEn: z.string().optional(),
  institutionLogoUrl: z.string().url().optional().nullable(),
  degree: z.string().min(1),
  degreeEn: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  fieldOfStudyEn: z.string().optional(),
  location: z.string().optional(),
  gpa: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  current: z.boolean(),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  order: z.number().int().min(0),
})

async function autoTranslateEdu(data: z.infer<typeof eduSchema>) {
  const r = { ...data }
  if (!r.institutionEn && r.institution) r.institutionEn = await translateText(r.institution, 'id', 'en')
  if (!r.institution && r.institutionEn) r.institution = await translateText(r.institutionEn, 'en', 'id')
  if (!r.degreeEn && r.degree) r.degreeEn = await translateText(r.degree, 'id', 'en')
  if (!r.degree && r.degreeEn) r.degree = await translateText(r.degreeEn, 'en', 'id')
  if (!r.fieldOfStudyEn && r.fieldOfStudy) r.fieldOfStudyEn = await translateText(r.fieldOfStudy, 'id', 'en')
  if (!r.fieldOfStudy && r.fieldOfStudyEn) r.fieldOfStudy = await translateText(r.fieldOfStudyEn, 'en', 'id')
  if (!r.descriptionEn && r.description) r.descriptionEn = await translateText(r.description, 'id', 'en')
  if (!r.description && r.descriptionEn) r.description = await translateText(r.descriptionEn, 'en', 'id')
  return r
}

function revalidateEducation() {
  revalidatePath('/dashboard/education')
  revalidatePath('/')
}

export async function createEducation(data: z.infer<typeof eduSchema>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = eduSchema.parse(data)
  const translated = await autoTranslateEdu(validated)

  const edu = await prisma.education.create({
    data: {
      ...translated,
      startDate: new Date(translated.startDate),
      endDate: translated.endDate ? new Date(translated.endDate) : null,
    },
  })

  revalidateEducation()
  return edu
}

export async function updateEducation(id: string, data: Partial<z.infer<typeof eduSchema>>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = eduSchema.partial().parse(data)
  let translated = { ...validated }
  if (validated.institution || validated.degree) {
    translated = await autoTranslateEdu(validated as any)
  }

  const edu = await prisma.education.update({
    where: { id },
    data: {
      ...translated,
      startDate: validated.startDate ? new Date(validated.startDate) : undefined,
      endDate: validated.endDate !== undefined ? (validated.endDate ? new Date(validated.endDate) : null) : undefined,
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
