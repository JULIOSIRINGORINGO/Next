import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { EducationEditForm } from './form'

interface EditEducationPageProps {
  params: Promise<{ locale: string; id: string }>
}

export default async function EditEducationPage({ params }: EditEducationPageProps) {
  const { id } = await params
  const messages: any = await getMessages()

  const education = messages.education
  const edu = await prisma.education.findUnique({ where: { id } })

  if (!edu) notFound()

  return (
    <div className="space-y-6">
      <EducationEditForm initialData={edu} />
    </div>
  )
}
