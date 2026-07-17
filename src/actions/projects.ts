'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().url().optional().nullable(),
  liveUrl: z.string().url().optional().nullable(),
  githubUrl: z.string().url().optional().nullable(),
  techStack: z.array(z.string()),
  featured: z.boolean(),
  order: z.number().int().min(0),
})

function revalidateProjects() {
  revalidatePath('/dashboard/projects')
  revalidatePath('/')
}

export async function createProject(data: z.infer<typeof projectSchema>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = projectSchema.parse(data)
  const project = await prisma.project.create({ data: validated })
  revalidateProjects()
  return project
}

export async function updateProject(id: string, data: Partial<z.infer<typeof projectSchema>>) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const validated = projectSchema.partial().parse(data)
  const project = await prisma.project.update({ where: { id }, data: validated })
  revalidateProjects()
  return project
}

export async function deleteProject(id: string) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  await prisma.project.delete({ where: { id } })
  revalidateProjects()
}
