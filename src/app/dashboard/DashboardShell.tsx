'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from '@/context/ThemeContext'
import { useSession } from 'next-auth/react'
import {
  LayoutDashboard,
  User,
  Code,
  FolderOpen,
  Briefcase,
  GraduationCap,
  Trophy,
  Link2,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  Loader2,
  Palette,
  Settings,
} from 'lucide-react'
import { optimizeCloudinaryUrl } from '@/utils/cloudinary'
import en from '@/messages/en.json'
import id from '@/messages/id.json'

type NavItem =
  | { divider: true }
  | { href: string; labelKey: string; icon: any }

const navItems: NavItem[] = [
  { href: '/dashboard', labelKey: 'admin.overview', icon: LayoutDashboard },
  { divider: true },
  { href: '/dashboard/profile', labelKey: 'admin.profile', icon: User },
  { href: '/dashboard/skills', labelKey: 'admin.skills', icon: Code },
  { href: '/dashboard/projects', labelKey: 'admin.projects', icon: FolderOpen },
  { href: '/dashboard/experiences', labelKey: 'admin.experiences', icon: Briefcase },
  { href: '/dashboard/education', labelKey: 'admin.education', icon: GraduationCap },
  { href: '/dashboard/achievements', labelKey: 'admin.achievements', icon: Trophy },
  { href: '/dashboard/social-links', labelKey: 'admin.social_links', icon: Link2 },
  { divider: true },
  { href: '/dashboard/theme', labelKey: 'admin.theme', icon: Palette },
  { href: '/dashboard/account', labelKey: 'admin.account', icon: Settings },
]

function getPageTitle(pathname: string, t: (key: string) => string): string {
  if (pathname === '/dashboard') return t('admin.overview')
  const segments = pathname.split('/').filter(Boolean)
  const page = segments[segments.length - 1]
  const parent = segments.length > 2 ? segments[segments.length - 2] : ''

  const titleMap: Record<string, string> = {
    profile: 'admin.profile',
    skills: 'admin.skills',
    projects: 'admin.projects',
    experiences: 'admin.experiences',
    education: 'admin.education',
    achievements: 'admin.achievements',
    'social-links': 'admin.social_links',
    theme: 'admin.theme',
    account: 'admin.account',
  }

  if (titleMap[page]) return t(titleMap[page])
  if (page === 'new') return `${t('admin.new_item')} ${parent.charAt(0).toUpperCase() + parent.slice(1).replace(/-/g, ' ')}`
  if (page === 'edit') return `${t('admin.edit_item')} ${parent.charAt(0).toUpperCase() + parent.slice(1).replace(/-/g, ' ')}`
  return page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, ' ')
}

export default function DashboardShell({
  children,
  email,
  profileName,
  profileAvatar,
  profileAccent,
}: {
  children: React.ReactNode
  email?: string | null
  profileName?: string | null
  profileAvatar?: string | null
  profileAccent?: string | null
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { isDark, toggle } = useTheme()
  const { data: session, status } = useSession()
  const router = useRouter()

  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    profileAvatar ? optimizeCloudinaryUrl(profileAvatar) : null
  )
  const [fullName, setFullName] = useState<string>(profileName || '')
  const [locale, setLocale] = useState<'en' | 'id'>('en')

  const t = useMemo(() => {
    const messages = locale === 'id' ? id : en
    return (key: string): string => {
      const parts = key.split('.')
      let val: any = messages
      for (const p of parts) {
        val = val?.[p]
      }
      return typeof val === 'string' ? val : key
    }
  }, [locale])

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_locale') as 'en' | 'id' | null
    if (saved === 'en' || saved === 'id') setLocale(saved)

    const savedColor = localStorage.getItem('accent_color')
    if (savedColor) {
      document.documentElement.style.setProperty('--accent', savedColor)
    }

    if (profileAccent) {
      document.documentElement.style.setProperty('--accent', profileAccent)
      localStorage.setItem('accent_color', profileAccent)
    }

    const onLocaleChanged = () => {
      const saved = localStorage.getItem('portfolio_locale') as 'en' | 'id' | null
      if (saved === 'en' || saved === 'id') setLocale(saved)
    }
    window.addEventListener('locale-changed', onLocaleChanged)
    return () => window.removeEventListener('locale-changed', onLocaleChanged)
  }, [profileAccent])

  function isActive(href: string) {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href) && href !== '/dashboard'
  }

  const pageTitle = getPageTitle(pathname, t)

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-slate-900 dark:bg-slate-950 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto border-r border-slate-800 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-5 border-b border-slate-800 shrink-0">
          <img src="/icon.svg" alt="Logo" className={`h-8 w-8 object-contain${isDark ? ' icon-dark' : ''}`} />
          <div className="flex-1 min-w-0">
            <span className="text-sm font-semibold text-white">Portfolio <span className="text-[10px] text-slate-500 font-normal">v0.5</span></span>
            <span className="block text-[11px] text-slate-400">{t('admin.panel_title')}</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1 text-slate-400 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {navItems.map((item, idx) => {
              if ('divider' in item) {
                return (
                  <li key={idx} className="pt-4 pb-2">
                    <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      {idx === 1 ? t('admin.content') : t('admin.settings')}
                    </span>
                  </li>
                )
              }
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      active
                        ? 'bg-[var(--accent)] text-white'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    {t(item.labelKey)}
                    {active && <ChevronRight size={14} className="ml-auto" />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom */}
        <div className="border-t border-slate-800 px-3 py-3 space-y-1 shrink-0">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          >
            <ExternalLink size={18} />
            {t('admin.view_site')}
          </Link>
          <a
            href="/api/auth/signout"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={18} />
            {t('admin.sign_out')}
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-md p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white lg:hidden"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base font-semibold text-slate-900 dark:text-white">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition"
              title={isDark ? t('admin.switch_to_light') : t('admin.switch_to_dark')}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              {avatarUrl ? (
                <Image src={avatarUrl} alt="Avatar" width={32} height={32} unoptimized className="h-full w-full object-cover" />
              ) : (
                <User size={14} className="text-slate-500 dark:text-slate-400" />
              )}
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900 dark:text-white">{fullName || session?.user?.email?.split('@')[0] || 'Admin'}</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">{session?.user?.email}</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
