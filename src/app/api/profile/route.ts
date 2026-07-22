import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst()
    if (!profile) return NextResponse.json(null)

    return NextResponse.json({
      name: profile.fullName,
      fullName: profile.fullName,
      username: profile.email || 'username',
      bio_home: profile.bioHome,
      bio_about: profile.bioAbout,
      location: profile.location,
      work_status: profile.headline,
      avatar_url: profile.avatarUrl,
      avatarUrl: profile.avatarUrl,
      github_url: profile.githubUrl,
      linkedin_url: profile.linkedinUrl,
      instagram_url: null,
      accent_color: profile.accentColor,
      accentColor: profile.accentColor,
      email: profile.email,
      phone: profile.phone,
      website: profile.website,
      twitterUrl: profile.twitterUrl,
    })
  } catch {
    return NextResponse.json(null)
  }
}
