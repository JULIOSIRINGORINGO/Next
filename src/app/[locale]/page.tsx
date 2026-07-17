import { prisma } from '@/lib/prisma'
import HomeClient from './home-client'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let profile: any = null
  let skills: any[] = []

  try {
    const [rawProfile, rawSkills] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.skill.findMany({ orderBy: { order: 'asc' } }),
    ])

    if (rawProfile) {
      profile = {
        name: rawProfile.fullName,
        location: rawProfile.location,
        work_status: rawProfile.headline,
        bio_home: rawProfile.bioHome,
        avatar_url: rawProfile.avatarUrl,
      }
    }

    skills = rawSkills.map(s => ({
      id: s.id,
      name: s.name,
      iconName: s.iconName,
      category: s.category,
    }))
  } catch {}

  return <HomeClient profile={profile} skills={skills} />
}
