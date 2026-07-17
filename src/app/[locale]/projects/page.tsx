import { prisma } from '@/lib/prisma'
import ProjectsClient from './projects-client'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  let projects: any[] = []
  let profile: any = null

  try {
    const [rawProjects, rawProfile] = await Promise.all([
      prisma.project.findMany({ orderBy: { order: 'asc' } }),
      prisma.profile.findFirst(),
    ])

    projects = rawProjects.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image_url: p.imageUrl,
      live_url: p.liveUrl,
      github_url: p.githubUrl,
      tech_stack: JSON.stringify(p.techStack),
      featured: p.featured,
      order_index: p.order,
    }))

    if (rawProfile) {
      profile = { name: rawProfile.fullName }
    }
  } catch {}

  return <ProjectsClient projects={projects} profile={profile} />
}
