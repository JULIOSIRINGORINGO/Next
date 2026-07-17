import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import Link from 'next/link'
import { Code, FolderOpen, Trophy, Briefcase, GraduationCap, Link2, ArrowUpRight, TrendingUp, User } from 'lucide-react'

export default async function DashboardPage() {
  const session = await auth()
  const name = session?.user?.email?.split('@')[0] || 'Admin'

  const [projectsCount, achievementsCount, skillsCount, experiencesCount, educationCount, socialLinksCount, featuredCount] = await Promise.all([
    prisma.project.count(),
    prisma.achievement.count(),
    prisma.skill.count(),
    prisma.workExperience.count(),
    prisma.education.count(),
    prisma.socialLink.count(),
    prisma.project.count({ where: { featured: true } }),
  ])

  const total = projectsCount + achievementsCount + skillsCount + experiencesCount + educationCount + socialLinksCount

  const stats = [
    { label: 'Skills', count: skillsCount, icon: Code, href: '/dashboard/skills', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', bar: 'bg-blue-500' },
    { label: 'Projects', count: projectsCount, icon: FolderOpen, href: '/dashboard/projects', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', bar: 'bg-emerald-500' },
    { label: 'Experiences', count: experiencesCount, icon: Briefcase, href: '/dashboard/experiences', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', bar: 'bg-amber-500' },
    { label: 'Education', count: educationCount, icon: GraduationCap, href: '/dashboard/education', color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-500/10', bar: 'bg-violet-500' },
    { label: 'Achievements', count: achievementsCount, icon: Trophy, href: '/dashboard/achievements', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-500/10', bar: 'bg-rose-500' },
    { label: 'Social Links', count: socialLinksCount, icon: Link2, href: '/dashboard/social-links', color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-500/10', bar: 'bg-cyan-500' },
  ]

  const shortcuts = [
    { label: 'Edit Profile', href: '/dashboard/profile', icon: User },
    { label: 'Add Skill', href: '/dashboard/skills/new', icon: Code },
    { label: 'Add Project', href: '/dashboard/projects/new', icon: FolderOpen },
    { label: 'Add Experience', href: '/dashboard/experiences/new', icon: Briefcase },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome back, <span className="text-[var(--accent)]">{name}</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your portfolio content from here</p>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2">
          <TrendingUp size={16} className="text-[var(--accent)]" />
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{total}</span>
          <span className="text-sm text-slate-500 dark:text-slate-400">total items</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.count}</p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}>
                  <Icon size={20} className={stat.color} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-400 dark:text-slate-500 group-hover:text-[var(--accent)] transition-colors">
                Manage
                <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className={`absolute bottom-0 left-0 h-1 w-full ${stat.bar} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </Link>
          )
        })}
      </div>

      {/* Shortcuts */}
      <div>
        <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3">Quick Actions</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {shortcuts.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white hover:shadow-sm"
              >
                <Icon size={16} className="text-slate-400 dark:text-slate-500" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
