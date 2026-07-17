import { prisma } from '@/lib/prisma'
import ContactClient from './contact-client'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  let socialLinks: any[] = []
  let profile: any = null

  try {
    const [rawLinks, rawProfile] = await Promise.all([
      prisma.socialLink.findMany({ orderBy: { order: 'asc' } }),
      prisma.profile.findFirst(),
    ])

    socialLinks = rawLinks.map(l => ({
      id: l.id,
      platform: l.platform,
      title: l.title,
      description: l.description,
      url: l.url,
      is_featured: l.isFeatured,
    }))

    if (rawProfile) {
      profile = { name: rawProfile.fullName }
    }
  } catch {}

  return <ContactClient socialLinks={socialLinks} profile={profile} />
}
