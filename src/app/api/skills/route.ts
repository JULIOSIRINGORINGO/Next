import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// Alias mapping: if iconName matches a key, treat it as the value
const ICON_ALIASES: Record<string, string> = {
  nodejs: 'nodedotjs',
  nextjs: 'nextdotjs',
  vue: 'vuedotjs',
  nuxt: 'nuxtdotjs',
  react: 'react',
  aws: 'amazonaws',
  azure: 'microsoftazure',
}

function normalizeIconName(name: string | null): string {
  if (!name) return ''
  return ICON_ALIASES[name] || name
}

export async function GET(request: NextRequest) {
  const iconName = request.nextUrl.searchParams.get('iconName')

  if (iconName) {
    const normalized = normalizeIconName(iconName)
    const skills = await prisma.skill.findMany({
      where: { iconName: { in: [iconName, normalized] } },
      select: { id: true, name: true, iconName: true },
    })
    return NextResponse.json(skills)
  }

  const allSkills = await prisma.skill.findMany({
    orderBy: { order: 'asc' },
    select: { id: true, name: true, iconName: true, category: true, proficiency: true, featured: true },
  })

  // Deduplicate by normalized iconName — keep first, mark rest for deletion
  const seen = new Set<string>()
  const keep: typeof allSkills = []
  const duplicates: string[] = []

  for (const skill of allSkills) {
    const normalized = normalizeIconName(skill.iconName)
    const key = normalized || skill.name.toLowerCase()
    if (seen.has(key)) {
      duplicates.push(skill.id)
    } else {
      seen.add(key)
      keep.push(skill)
    }
  }

  // Delete duplicates in background
  if (duplicates.length > 0) {
    prisma.skill.deleteMany({ where: { id: { in: duplicates } } }).catch(() => {})
  }

  return NextResponse.json(keep)
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  // Check for existing skill with same normalized iconName
  if (body.iconName) {
    const normalized = normalizeIconName(body.iconName)
    const existing = await prisma.skill.findFirst({
      where: { iconName: { in: [body.iconName, normalized] } },
    })
    if (existing) {
      return NextResponse.json(existing)
    }
  }

  const skill = await prisma.skill.create({
    data: {
      name: body.name,
      category: body.category,
      iconName: body.iconName,
      proficiency: body.proficiency ?? 80,
      featured: body.featured ?? false,
      order: body.order ?? 0,
    },
  })
  return NextResponse.json(skill)
}

export async function DELETE(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  // Also delete any aliases of this skill
  const skill = await prisma.skill.findUnique({ where: { id }, select: { iconName: true } })
  if (skill?.iconName) {
    const normalized = normalizeIconName(skill.iconName)
    const aliases = [skill.iconName, normalized].filter(Boolean)
    await prisma.skill.deleteMany({ where: { iconName: { in: aliases } } })
  } else {
    await prisma.skill.delete({ where: { id } })
  }

  return NextResponse.json({ success: true })
}
