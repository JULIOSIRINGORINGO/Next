import { prisma } from '@/lib/prisma'
import { localize } from '@/lib/localize'
import AboutClient from './about-client'

export const revalidate = 60

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const { locale } = params
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
      const p = localize(rawProfile, locale, ['fullName', 'headline', 'bioHome', 'bioAbout'])
      profile = {
        name: p.fullName,
        bio_home: p.bioHome,
        bio_about: p.bioAbout,
        location: p.location,
        avatar_url: p.avatarUrl,
      }
    }

    experiences = rawExps.map(e => {
      const l = localize(e, locale, ['company', 'position', 'description', 'responsibilities', 'whatILearned', 'impact'])
      return {
        id: e.id,
        company_name: l.company,
        company_logo_url: e.companyLogoUrl,
        position: l.position,
        location: e.location,
        start_date: e.startDate?.toISOString(),
        end_date: e.endDate?.toISOString() || null,
        is_current: e.current,
        employment_type: e.employmentType,
        work_type: e.workType,
        responsibilities: l.responsibilities as string[],
        what_i_learned: l.whatILearned as string[],
        impact: l.impact as string[],
      }
    })

    educations = rawEdus.map(e => {
      const l = localize(e, locale, ['institution', 'degree', 'fieldOfStudy', 'description'])
      return {
        id: e.id,
        institution_name: l.institution,
        institution_logo_url: e.institutionLogoUrl,
        degree: l.degree,
        field_of_study: l.fieldOfStudy,
        location: e.location,
        gpa: e.gpa,
        start_date: e.startDate?.toISOString(),
        end_date: e.endDate?.toISOString() || null,
        is_current: e.current,
        description: l.description,
      }
    })
  } catch {}

  return <AboutClient profile={profile} experiences={experiences} educations={educations} />
}
