import { prisma } from '@/lib/prisma'
import AchievementsClient from './achievements-client'

export const dynamic = 'force-dynamic'

export default async function AchievementsPage() {
  let achievements: any[] = []
  let profile: any = null

  try {
    const [rawAch, rawProfile] = await Promise.all([
      prisma.achievement.findMany({ orderBy: { order: 'asc' } }),
      prisma.profile.findFirst(),
    ])

    achievements = rawAch.map(a => ({
      id: a.id,
      title: a.title,
      description: a.description,
      issuer: a.issuer,
      date: a.date?.toISOString(),
      image_url: a.imageUrl,
      category: a.category,
      credential_id: a.credentialId,
      credential_url: a.credentialUrl,
      featured: a.featured,
    }))

    if (rawProfile) {
      profile = { name: rawProfile.fullName }
    }
  } catch {}

  return <AchievementsClient achievements={achievements} profile={profile} />
}
