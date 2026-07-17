import { prisma } from '@/lib/prisma'
import AboutClient from './about-client'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  let profile: any = null
  let experiences: any[] = []
  let educations: any[] = []

  try {
    const [rawProfile, rawExps, rawEdus] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.workExperience.findMany({ orderBy: { order: 'asc' } }),
      prisma.education.findMany({ orderBy: { order: 'asc' } }),
    ])

    if (rawProfile) {
      profile = {
        name: rawProfile.fullName,
        bio_home: rawProfile.bioHome,
        bio_about: rawProfile.bioAbout,
        location: rawProfile.location,
        avatar_url: rawProfile.avatarUrl,
      }
    }

    experiences = rawExps.map(e => ({
      id: e.id,
      company_name: e.company,
      company_logo_url: e.companyLogoUrl,
      position: e.position,
      location: e.location,
      start_date: e.startDate?.toISOString(),
      end_date: e.endDate?.toISOString() || null,
      is_current: e.current,
      employment_type: e.employmentType,
      work_type: e.workType,
      responsibilities: e.responsibilities as string[],
      what_i_learned: e.whatILearned as string[],
      impact: e.impact as string[],
    }))

    educations = rawEdus.map(e => ({
      id: e.id,
      institution_name: e.institution,
      institution_logo_url: e.institutionLogoUrl,
      degree: e.degree,
      field_of_study: e.fieldOfStudy,
      location: e.location,
      gpa: e.gpa,
      start_date: e.startDate?.toISOString(),
      end_date: e.endDate?.toISOString() || null,
      is_current: e.current,
      description: e.description,
    }))
  } catch {}

  return <AboutClient profile={profile} experiences={experiences} educations={educations} />
}
