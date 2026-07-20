import { prisma } from '@/lib/prisma'
import { localize } from '@/lib/localize'
import AchievementsClient from './achievements-client'

export const revalidate = 60

export default async function AchievementsPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  let achievements: any[] = []
  let profile: any = null

  try {
    const [rawAch, rawProfile] = await Promise.all([
      prisma.achievement.findMany({
        orderBy: { order: 'asc' },
        include: { translations: { where: { locale } } },
      }),
      prisma.profile.findFirst(),
    ])

    achievements = rawAch.map(a => {
      const t = a.translations[0]
      return {
        id: a.id,
        title: t?.title || a.title,
        description: t?.description || a.description,
        issuer: t?.issuer || a.issuer,
        date: a.date?.toISOString(),
        image_url: a.imageUrl,
        category: a.category,
        credential_id: a.credentialId,
        credential_url: a.credentialUrl,
        featured: a.featured,
      }
    })

    if (rawProfile) {
      profile = { name: rawProfile.fullName }
    }
  } catch {}

  return <AchievementsClient achievements={achievements} profile={profile} />
}
