# Portfolio - Julio Siringoringo

Personal portfolio built with Next.js, deployed on Vercel.

**Live:** [portofolio-nextjs-neon.vercel.app](https://portofolio-nextjs-neon.vercel.app)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Auth:** NextAuth.js
- **Styling:** Tailwind CSS
- **i18n:** next-intl (EN/ID)
- **Deployment:** Vercel

## Features

- Responsive public portfolio (About, Projects, Achievements, Contact)
- Dark/light mode with accent color system
- Admin dashboard with full CRUD
- GitHub contributions integration
- Bilingual support (English & Indonesian)
- SEO optimized with dynamic metadata

## Getting Started

```bash
npm install
npx prisma generate
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
GITHUB_TOKEN=ghp_...
GITHUB_USERNAME=JULIOSIRINGORINGO
```

## Deploy

Push to `main` branch triggers auto-deploy on Vercel.

```bash
git push origin main
```

## Login

- **Email:** admin@portfolio.com
- **Password:** admin123
