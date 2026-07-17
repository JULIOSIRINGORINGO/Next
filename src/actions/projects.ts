'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { translateText, translateBatch } from '@/lib/translate'

const projectSchema = z.object({
  title: z.string().min(1),
  titleEn: z.string().optional(),
  description: z.string().min(1),
  descriptionEn: z.string().optional(),
  imageUrl: z.string().url().optional().nullable(),
  liveUrl: z.string().url().optional().nullable(),
  githubUrl: z.string().url().optional().nullable(),
  techStack: z.array(z.string()),
  featured: z.boolean(),
  order: z.number().int().min(0),
})

async function autoTranslateProject(data: z.infer<typeof projectSchema>) {
  const result = { ...data }
  if (!result.titleEn && result.title) result.titleEn = await translateText(result.title, 'id', 'en')
  if (!result.title && result.titleEn) result.title = await translateText(result.titleEn, 'en', 'id')
  if (!result.descriptionEn && result.description) result.descriptionEn = await translateText(result.description, 'id', 'en')
  if (!result.description && result.descriptionEn) result.description = await translateText(result.descriptionEn, 'en', 'id')
  return result
}

function revalidateProjects() {
  revalidatePath('/dashboard/projects')
  revalidatePath('/')
}

export async function createProject(data: z.infer<typeof projectSchema>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = projectSchema.parse(data)
  const translated = await autoTranslateProject(validated)

  const project = await prisma.project.create({
    data: {
      ...translated,
      imageUrl: translated.imageUrl || null,
      liveUrl: translated.liveUrl || null,
      githubUrl: translated.githubUrl || null,
    },
  })

  revalidateProjects()
  return project
}

export async function updateProject(id: string, data: Partial<z.infer<typeof projectSchema>>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = projectSchema.partial().parse(data)

  // Only auto-translate if at least one field is provided
  let translated = { ...validated }
  if (validated.title || validated.description) {
    translated = await autoTranslateProject(validated as any)
  }

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...translated,
      imageUrl: validated.imageUrl !== undefined ? (validated.imageUrl || null) : undefined,
      liveUrl: validated.liveUrl !== undefined ? (validated.liveUrl || null) : undefined,
      githubUrl: validated.githubUrl !== undefined ? (validated.githubUrl || null) : undefined,
    },
  })

  revalidateProjects()
  return project
}

export async function deleteProject(id: string) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  await prisma.project.delete({ where: { id } })
  revalidateProjects()
}

export async function getProjects() {
  return prisma.project.findMany({ orderBy: { order: 'asc' } })
}
