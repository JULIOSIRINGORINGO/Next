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
  hidden?: boolean
}

export const changelog: ChangelogEntry[] = [
  {
    version: '1.1',
    date: '',
    status: 'planned',
    title: 'Security & Reliability',
    titleId: 'Keamanan & Keandalan',
    changes: [
      { type: 'feature', description: 'Two-factor authentication (2FA)', descriptionId: 'Autentikasi dua faktor (2FA)' },
      { type: 'feature', description: 'Admin activity log & audit trail', descriptionId: 'Log aktivitas admin & jejak audit' },
      { type: 'improvement', description: 'Rate limiting on API endpoints', descriptionId: 'Pembatasan rate pada endpoint API' },
      { type: 'fix', description: 'Session persistence across page refreshes', descriptionId: 'Pertahanan sesi saat refresh halaman' },
    ],
  },
  {
    version: '1.0.1',
    date: '2026-07-21',
    status: 'released',
    title: 'Performance Optimization & UX Polish',
    titleId: 'Optimasi Performa & Perbaikan UX',
    changes: [
      { type: 'improvement', description: 'Removed filter: drop-shadow on all elements — was causing GPU compositing on every element, main cause of 10fps lag', descriptionId: 'Menghapus filter: drop-shadow pada semua elemen — menyebabkan GPU compositing di setiap elemen, penyebab utama lag 10fps' },
      { type: 'improvement', description: 'Removed transition-colors from layout elements (body, aside, nav, main, header, footer) — eliminated typing lag and navigation delay', descriptionId: 'Menghapus transition-colors dari elemen layout — menghilangkan lag mengetik dan delay navigasi' },
      { type: 'improvement', description: 'Removed page-enter animation that caused flash/blank screen on every navigation', descriptionId: 'Menghapus animasi page-enter yang menyebabkan layar kosong di setiap navigasi' },
      { type: 'improvement', description: 'Home page bundle reduced from 171 kB to 109 kB (-36%)', descriptionId: 'Bundle halaman home dikurangi dari 171 kB menjadi 109 kB (-36%)' },
      { type: 'improvement', description: 'Removed backdrop-blur from SkillIcon (30+ GPU layers), TechBadge, project buttons, featured badge', descriptionId: 'Menghapus backdrop-blur dari SkillIcon (30+ GPU layer), TechBadge, tombol proyek, badge featured' },
      { type: 'improvement', description: 'Added will-change: transform to SkillIcon rotation animation for GPU acceleration', descriptionId: 'Menambahkan will-change: transform ke animasi rotasi SkillIcon untuk akselerasi GPU' },
      { type: 'improvement', description: 'Sidebar mobile slide reduced from 500ms to 200ms', descriptionId: 'Slide sidebar mobile dikurangi dari 500ms menjadi 200ms' },
      { type: 'improvement', description: 'Added loading=lazy and decoding=async to all below-fold images', descriptionId: 'Menambahkan loading=lazy dan decoding=async ke semua gambar di bawah fold' },
      { type: 'improvement', description: 'Language toggle now uses optimistic update — switches visually instantly, skeleton shows in content area during navigation', descriptionId: 'Toggle bahasa sekarang pakai optimistic update — langsung berpindah secara visual, skeleton muncul di area konten saat navigasi' },
      { type: 'improvement', description: 'Skills page: useMemo for filtered/grouped lists — search no longer causes jank', descriptionId: 'Halaman skills: useMemo untuk list filtered/grouped — search tidak lagi menyebabkan jank' },
      { type: 'improvement', description: 'Skills page: transition duration reduced from 300ms to 150ms, skeleton count reduced from 30 to 12', descriptionId: 'Halaman skills: durasi transisi dikurangi dari 300ms menjadi 150ms, jumlah skeleton dikurangi dari 30 menjadi 12' },
      { type: 'improvement', description: 'Dashboard admin: throttled mousemove activity listener (was firing 60x/sec, now 1x/30sec)', descriptionId: 'Dashboard admin: throttle mousemove activity listener (sebelumnya 60x/detik, sekarang 1x/30detik)' },
      { type: 'improvement', description: 'Dashboard admin: sidebar slide reduced from 300ms to 150ms', descriptionId: 'Dashboard admin: slide sidebar dikurangi dari 300ms menjadi 150ms' },
      { type: 'improvement', description: 'Dashboard overview: consolidated 7 separate DB queries into single raw query — faster TTFB', descriptionId: 'Dashboard overview: menggabungkan 7 query DB terpisah menjadi satu raw query — TTFB lebih cepat' },
      { type: 'improvement', description: 'Removed 8 unused dependencies (@auth/prisma-adapter, jose, next-themes, clsx, react-easy-crop, pg, and their types)', descriptionId: 'Menghapus 8 dependensi yang tidak digunakan' },
      { type: 'improvement', description: 'Consolidated dual toast system into single sonner — deleted custom Toast.tsx', descriptionId: 'Menggabungkan dua sistem toast menjadi satu sonner — menghapus Toast.tsx kustom' },
      { type: 'fix', description: 'Fixed sidebar staying within centered container on wide screens (changed from fixed to sticky)', descriptionId: 'Memperbaiki sidebar tetap dalam container yang terpusat di layar lebar (dari fixed menjadi sticky)' },
      { type: 'fix', description: 'Fixed login flow — removed redundant /login page, unauthenticated dashboard access now redirects to home', descriptionId: 'Memperbaiki alur login — menghapus halaman /login yang redundan, akses dashboard tanpa autentikasi sekarang redirect ke home' },
      { type: 'fix', description: 'Fixed auto-logout — removed maxAge from session config, now uses session cookie (auto-logout on tab close)', descriptionId: 'Memperbaiki auto-logout — menghapus maxAge dari config session, sekarang pakai session cookie (auto-logout saat tutup tab)' },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-07-20',
    status: 'released',
    title: 'Production Release — Performance, Cleanup & Consolidation',
    titleId: 'Rilis Produksi — Performa, Pembersihan & Konsolidasi',
    changes: [
      { type: 'feature', description: 'Changelog page on admin dashboard', descriptionId: 'Halaman changelog di dashboard admin' },
      { type: 'improvement', description: 'Replaced framer-motion with CSS animations on all pages — reduced About page by 24.7%, Achievements by 25.7%', descriptionId: 'Mengganti framer-motion dengan animasi CSS di semua halaman — mengurangi halaman About 24.7%, Achievements 25.7%' },
      { type: 'improvement', description: 'Removed framer-motion dependency entirely (uninstalled)', descriptionId: 'Menghapus dependensi framer-motion sepenuhnya (di-uninstall)' },
      { type: 'improvement', description: 'Optimized middleware bundle from 130 kB to 51.5 kB using lightweight JWT check', descriptionId: 'Mengoptimalkan bundle middleware dari 130 kB menjadi 51.5 kB dengan pengecekan JWT ringan' },
      { type: 'improvement', description: 'Lazy loaded @vercel/analytics and @vercel/speed-insights — no longer block main bundle', descriptionId: 'Lazy load @vercel/analytics dan @vercel/speed-insights — tidak lagi memblokir bundle utama' },
      { type: 'improvement', description: 'Added AVIF/WebP image format optimization via next.config', descriptionId: 'Menambahkan optimasi format gambar AVIF/WebP via next.config' },
      { type: 'improvement', description: 'Consolidated dual toast system into single sonner — deleted custom Toast.tsx (74 lines), all pages now use one toast library', descriptionId: 'Menggabungkan dua sistem toast menjadi satu sonner — menghapus Toast.tsx kustom (74 baris), semua halaman sekarang pakai satu library toast' },
      { type: 'improvement', description: 'Split icon metadata from icon registry — cleaner module separation', descriptionId: 'Memisahkan metadata ikon dari registry ikon — pemisahan modul yang lebih bersih' },
      { type: 'improvement', description: 'Removed render-blocking Google Fonts CSS @import — fonts now loaded via next/font (zero layout shift)', descriptionId: 'Menghapus CSS @import Google Fonts yang memblokir render — font dimuat via next/font (zero layout shift)' },
      { type: 'improvement', description: 'Grand Hotel font now loaded via next/font instead of blocking CSS @import', descriptionId: 'Font Grand Hotel sekarang dimuat via next/font alih-alih CSS @import yang memblokir' },
      { type: 'improvement', description: 'Removed unoptimized flag from public page images — Next.js Image optimization now active', descriptionId: 'Menghapus flag unoptimized dari gambar halaman publik — optimasi gambar Next.js sekarang aktif' },
      { type: 'improvement', description: 'Removed 8 unused dependencies (@auth/prisma-adapter, jose, next-themes, clsx, react-easy-crop, pg, and their types)', descriptionId: 'Menghapus 8 dependensi yang tidak digunakan' },
      { type: 'improvement', description: 'Deleted dead files: ConfirmDialog.tsx (zero imports), api/upload/route.ts (duplicate of server action), root not-found.tsx + error.tsx (unreachable by middleware), useIdleLogout.ts (orphaned hook)', descriptionId: 'Menghapus file mati: ConfirmDialog.tsx (zero import), api/upload/route.ts (duplikat server action), root not-found.tsx + error.tsx (tidak terjangkau middleware), useIdleLogout.ts (hook terasing)' },
      { type: 'improvement', description: 'Cleaned dead code: unused exports (getReleasedVersions, getPlannedVersions, getPublicProfile, deleteImage), dead CSS (.icon-dark, .sidebar-logo), redundant scrollbar rules, dead UI block (achievement.type)', descriptionId: 'Membersihkan kode mati: export yang tidak digunakan, CSS mati (.icon-dark, .sidebar-logo), aturan scrollbar redundan, blok UI mati (achievement.type)' },
      { type: 'improvement', description: 'Deleted 7 unused CSS animation classes and keyframes (slide-in-left, modal-in/out, fade-in-fast)', descriptionId: 'Menghapus 7 class animasi CSS dan keyframes yang tidak digunakan' },
      { type: 'improvement', description: 'Removed legacy FastAPI localhost:8000 URL fallback from about and projects pages', descriptionId: 'Menghapus fallback URL localhost:8000 dari halaman about dan projects' },
      { type: 'improvement', description: 'Removed duplicate Inter font load (was loaded both via next/font and CSS @import)', descriptionId: 'Menghapus duplikasi load font Inter (sebelumnya dimuat via next/font dan CSS @import)' },
      { type: 'fix', description: 'Fixed LoginModal double-mount — modal now renders once outside duplicated sidebar content', descriptionId: 'Memperbaiki LoginModal mount ganda — modal sekarang dirender sekali di luar konten sidebar yang terduplikasi' },
    ],
  },
  {
    version: '0.5',
    date: '2026-07-17',
    status: 'released',
    title: 'Full Stack Migration & Admin Dashboard',
    titleId: 'Migrasi Full Stack & Dashboard Admin',
    hidden: true,
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

export function getLatestVersion(): ChangelogEntry | null {
  return changelog.find((e) => e.status === 'released') || changelog[0] || null
}
