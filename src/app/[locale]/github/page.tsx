import { prisma } from '@/lib/prisma'
import GithubClient from './github-client'

export const revalidate = 60

export default async function GithubPage() {
  let profile: any = null

  try {
    const rawProfile = await prisma.profile.findFirst()
    if (rawProfile) {
      profile = { name: rawProfile.fullName }
    }
  } catch {}

  return <GithubClient profile={profile} />
}
