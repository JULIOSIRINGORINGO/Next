import { prisma } from '@/lib/prisma'
import { localize } from '@/lib/localize'
import HomeClient from './home-client'

export const revalidate = 60

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  let profile: any = null
  let skills: any[] = []

  try {
    const [rawProfile, rawSkills] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.skill.findMany({ orderBy: { order: 'asc' } }),
    ])

    if (rawProfile) {
      const p = localize(rawProfile, locale, ['fullName', 'headline', 'bioHome', 'location'])
      profile = {
        name: p.fullName,
        location: p.location,
        work_status: p.headline,
        bio_home: p.bioHome,
        avatar_url: p.avatarUrl,
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
