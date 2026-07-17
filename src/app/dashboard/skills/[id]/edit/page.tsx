import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SkillEditForm } from './form'

interface EditSkillPageProps {
  params: Promise<{ locale: string; id: string }>
}

export default async function EditSkillPage({ params }: EditSkillPageProps) {
  const { locale, id } = await params
  const messages: any = await getMessages()

  const skills = messages.skills
  const skill = await prisma.skill.findUnique({ where: { id } })

  if (!skill) notFound()

  return (
    <div className="space-y-6">
      <SkillEditForm initialData={skill} locale={locale} skillsMessages={skills} />
    </div>
  )
}
