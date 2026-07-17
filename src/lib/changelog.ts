export type ChangelogStatus = 'released' | 'planned'

export interface ChangelogChange {
  type: 'feature' | 'fix' | 'improvement' | 'breaking'
  description: string
  descriptionId: string
}

export interface ChangelogEntry {
  version: string
  date: string
  status: ChangelogStatus
  title: string
  titleId: string
  changes: ChangelogChange[]
}

export const changelog: ChangelogEntry[] = [
  {
    version: '0.6',
    date: '',
    status: 'planned',
    title: 'Performance & Security Enhancements',
    titleId: 'Peningkatan Performa & Keamanan',
    changes: [
      { type: 'feature', description: 'Changelog page on admin dashboard', descriptionId: 'Halaman changelog di dashboard admin' },
      { type: 'feature', description: 'Two-factor authentication (2FA)', descriptionId: 'Autentikasi dua faktor (2FA)' },
      { type: 'feature', description: 'Admin activity log & audit trail', descriptionId: 'Log aktivitas admin & jejak audit' },
      { type: 'improvement', description: 'Image optimization with Next.js Image component', descriptionId: 'Optimasi gambar dengan komponen Next.js Image' },
      { type: 'improvement', description: 'Lazy loading for project images', descriptionId: 'Lazy loading untuk gambar proyek' },
      { type: 'improvement', description: 'Rate limiting on API endpoints', descriptionId: 'Pembatasan rate pada endpoint API' },
      { type: 'fix', description: 'Session persistence across page refreshes', descriptionId: 'Pertahanan sesi saat refresh halaman' },
    ],
  },
  {
    version: '0.5',
    date: '2026-07-17',
    status: 'released',
    title: 'Full Stack Migration & Admin Dashboard',
    titleId: 'Migrasi Full Stack & Dashboard Admin',
    changes: [
      { type: 'feature', description: 'Migrated from FastAPI + React (Vite) to Next.js 14 + Prisma + PostgreSQL', descriptionId: 'Migrasi dari FastAPI + React (Vite) ke Next.js 14 + Prisma + PostgreSQL' },
      { type: 'feature', description: 'Admin dashboard with full CRUD (profile, skills, projects, experiences, education, achievements, social links)', descriptionId: 'Dashboard admin dengan CRUD lengkap (profil, keahlian, proyek, pengalaman, pendidikan, pencapaian, tautan sosial)' },
      { type: 'feature', description: 'Dark/light mode with accent color system', descriptionId: 'Mode gelap/terang dengan sistem warna aksen' },
      { type: 'feature', description: 'Bilingual support (ID/EN) with auto-translate via MyMemory API', descriptionId: 'Dukungan dwibahasa (ID/EN) dengan terjemahan otomatis via MyMemory API' },
      { type: 'feature', description: '100+ technology icons with categorized skill display', descriptionId: '100+ ikon teknologi dengan tampilan keahlian terkategorikan' },
      { type: 'feature', description: 'Project image upload via Vercel Blob', descriptionId: 'Unggah gambar proyek via Vercel Blob' },
      { type: 'feature', description: 'Custom domain (juliosiringoringo.space)', descriptionId: 'Domain kustom (juliosiringoringo.space)' },
      { type: 'feature', description: 'SEO optimization (Open Graph, Twitter Card, JSON-LD, sitemap, robots.txt)', descriptionId: 'Optimasi SEO (Open Graph, Twitter Card, JSON-LD, sitemap, robots.txt)' },
      { type: 'feature', description: 'Auto-logout system (15min inactivity + cross-tab sync)', descriptionId: 'Sistem auto-logout (15 menit tidak aktif + sinkron lintas tab)' },
      { type: 'feature', description: 'Vercel Analytics & Speed Insights', descriptionId: 'Vercel Analytics & Speed Insights' },
      { type: 'feature', description: 'Auto-deploy via GitHub integration', descriptionId: 'Auto-deploy via integrasi GitHub' },
      { type: 'improvement', description: 'Responsive design for mobile, tablet, and desktop', descriptionId: 'Desain responsif untuk seluler, tablet, dan desktop' },
      { type: 'improvement', description: 'Animated skill icons with gradient effects', descriptionId: 'Ikon keahlian animasi dengan efek gradien' },
      { type: 'improvement', description: 'Cloudflare DNS setup for custom domain', descriptionId: 'Pengaturan DNS Cloudflare untuk domain kustom' },
      { type: 'fix', description: 'Fixed React error #130 on project cards (icon loading)', descriptionId: 'Perbaikan error React #130 pada kartu proyek (pemuatan ikon)' },
      { type: 'fix', description: 'Fixed skill icons not displaying correctly (Cloudflare, DigitalOcean, etc.)', descriptionId: 'Perbaikan ikon keahlian tidak tampil (Cloudflare, DigitalOcean, dll)' },
      { type: 'fix', description: 'Fixed AI category missing from public homepage', descriptionId: 'Perbaikan kategori AI tidak muncul di halaman publik' },
    ],
  },
]

export function getReleasedVersions(): ChangelogEntry[] {
  return changelog.filter((e) => e.status === 'released')
}

export function getPlannedVersions(): ChangelogEntry[] {
  return changelog.filter((e) => e.status === 'planned')
}

export function getLatestVersion(): ChangelogEntry | null {
  return changelog.find((e) => e.status === 'released') || changelog[0] || null
}
