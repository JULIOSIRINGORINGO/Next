import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const revalidate = 60

export async function GET() {
  try {
    const [totalProjects, featuredProjects, totalAchievements] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { featured: true } }),
      prisma.achievement.count(),
    ])

    return NextResponse.json({
      total_projects: totalProjects,
      featured_projects: featuredProjects,
      total_achievements: totalAchievements,
    })
  } catch {
    return NextResponse.json({ total_projects: 0, featured_projects: 0, total_achievements: 0 })
  }
}
