import { Metadata } from 'next'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Award, Calendar, ExternalLink, BadgeCheck, Trophy, Medal } from 'lucide-react'
import { prisma } from '@/lib/prisma'

interface AchievementDetailPageProps {
  params: Promise<{ locale: string; id: string }>
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: AchievementDetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params
    const achievement = await prisma.achievement.findUnique({ where: { id } }).catch(() => null)
    if (!achievement) return { title: 'Achievement Not Found' }
    return { title: achievement.title, description: achievement.description }
  } catch {
    return { title: 'Achievement' }
  }
}

export default async function AchievementDetailPage({ params }: AchievementDetailPageProps) {
  const { locale, id } = await params
  const [messages, achievement] = await Promise.all([
    getMessages({ locale }) as any,
    prisma.achievement.findUnique({ where: { id }, include: { translations: true } }).catch(() => null),
  ])

  const achievements = messages.achievements
  const common = messages.common

  if (!achievement) notFound()

  const iconMap: Record<string, any> = {
    certification: BadgeCheck,
    award: Trophy,
    competition: Medal,
    recognition: Award,
    course: Award,
  }
  const Icon = (achievement.category ? iconMap[achievement.category] : null) || Award

  return (
    <main className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <Link href={`/${locale}/achievements`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            {common.back}
          </Link>
          <article className="max-w-3xl mx-auto text-center">
            <header className="mb-8">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground mb-4">
                {achievement.category}
              </span>
              {achievement.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber/10 text-amber-600 dark:text-amber-400 text-sm font-medium rounded-full mb-4">
                  ⭐ {common.featured}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{achievement.title}</h1>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(achievement.date).toLocaleDateString(locale, { year: 'numeric', month: 'long' })}
                </span>
                {achievement.issuer && (
                  <span className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    {achievement.issuer}
                  </span>
                )}
              </div>
            </header>

            <div className="prose prose-muted dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">{achievement.description}</p>
            </div>

            {achievement.credentialUrl && (
              <div className="mt-8">
                <Link
                  href={achievement.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
                >
                  <ExternalLink className="h-5 w-5" />
                  {achievements.verifyCredential}
                </Link>
              </div>
            )}

            <div className="mt-8">
              <Link href={`/${locale}/achievements`} className="inline-flex items-center gap-2 text-primary hover:underline">
                <ArrowLeft className="h-5 w-5" />
                {common.back}
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
