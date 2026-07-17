import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ExperienceEditForm } from './form'

interface EditExperiencePageProps {
  params: Promise<{ locale: string; id: string }>
}

export default async function EditExperiencePage({ params }: EditExperiencePageProps) {
  const { id } = await params
  const messages: any = await getMessages()

  const experience = messages.experience
  const exp = await prisma.workExperience.findUnique({ where: { id } })

  if (!exp) notFound()

  return (
    <div className="space-y-6">
      <ExperienceEditForm initialData={exp} />
    </div>
  )
}
