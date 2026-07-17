import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ProjectEditForm } from './form'

interface EditProjectPageProps {
  params: Promise<{ locale: string; id: string }>
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { locale, id } = await params
  const messages: any = await getMessages()

  const projects = messages.projects
  const project = await prisma.project.findUnique({ where: { id } })

  if (!project) notFound()

  return (
    <div className="space-y-6">
      <ProjectEditForm initialData={project} locale={locale} projectsMessages={projects} />
    </div>
  )
}
