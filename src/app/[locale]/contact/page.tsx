import { prisma } from '@/lib/prisma'
import { localize } from '@/lib/localize'
import ContactClient from './contact-client'

export const revalidate = 60

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  let socialLinks: any[] = []
  let profile: any = null

  try {
    const [rawLinks, rawProfile] = await Promise.all([
      prisma.socialLink.findMany({ orderBy: { order: 'asc' } }),
      prisma.profile.findFirst(),
    ])

    socialLinks = rawLinks.map(l => {
      const t = localize(l, locale, ['title', 'description'])
      return {
        id: l.id,
        platform: l.platform,
        title: t.title,
        description: t.description,
        url: l.url,
        is_featured: l.isFeatured,
      }
    })

    if (rawProfile) {
      profile = { name: rawProfile.fullName }
    }
  } catch {}

  return <ContactClient socialLinks={socialLinks} profile={profile} />
}
