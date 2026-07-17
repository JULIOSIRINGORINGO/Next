import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getAchievementById } from '@/actions/achievements'
import { AchievementEditForm } from './form'

interface EditAchievementPageProps {
  params: Promise<{ locale: string; id: string }>
}

export default async function EditAchievementPage({ params }: EditAchievementPageProps) {
  const { locale, id } = await params
  const messages: any = await getMessages()

  const achievements = messages.achievements
  const achievement = await getAchievementById(id)

  if (!achievement) notFound()

  return (
    <div className="space-y-6">
      <AchievementEditForm initialData={achievement} locale={locale} achievementsMessages={achievements} />
    </div>
  )
}
