# Migration Plan: FastAPI → Next.js (Vercel)

## 📋 Project Overview
- **Current**: FastAPI + React (Vite) + SQLite, deployed on Railway
- **Target**: Next.js 14+ (App Router) + Prisma + PostgreSQL, deployed on Vercel
- **Goal**: 100% feature parity, better performance, zero cost

---

## 🎯 Phase 0: Preparation (Day 0)

### 0.1 Feature Audit ✅
| Feature | Status | Notes |
|---------|--------|-------|
| JWT Auth (login/register) | ✅ | Migrate to NextAuth v5 |
| Profile CRUD | ✅ | bio, avatar, accent_color |
| Projects CRUD + Image | ✅ | tech_stack as String[] |
| Achievements CRUD + Image | ✅ | i18n support needed |
| Skills CRUD + Icon | ✅ | icon_slug → iconName |
| Work Experiences CRUD | ✅ | JSON fields for arrays |
| Educations CRUD | ✅ | |
| Social Links CRUD | ✅ | |
| Dashboard Admin | ✅ | Stats + manage all |
| Public Pages (Home, About, Projects, Contact) | ✅ | SSR/ISR in Next.js |
| i18n (EN/ID) | ✅ | next-intl |
| Theme (dark/light) | ✅ | next-themes |
| SEO (sitemap, robots, meta) | ✅ | Next.js Metadata API |
| File Upload (local) | ⚠️ | **Must change** → Vercel Blob/Cloudinary |
| Auto-migration + Seed | ⚠️ | Prisma Migrate + seed script |

### 0.2 Accounts Setup (Free Tier)
- [ ] **Vercel** - GitHub login, connect repo
- [ ] **Neon** (PostgreSQL) - GitHub login, create `portfolio-db`
- [ ] **Vercel Blob** - Enable in Vercel dashboard (1GB free)
- [ ] **Cloudinary** (backup) - 25GB free
- [ ] **Resend** (email) - 3000 emails/month free (optional)

### 0.3 New Repo
```bash
git init portofolio-nextjs
cd portofolio-nextjs
```

---

## 🗄️ Phase 1: Database & Schema (Day 1)

### 1.1 Prisma Schema Created ✅
Location: `prisma/schema.prisma`

**Key Mappings:**
| SQLAlchemy | Prisma | Notes |
|------------|--------|-------|
| `Integer` PK | `String @id @default(cuid())` | CUID for distributed IDs |
| `DateTime` | `DateTime` | |
| `Date` | `DateTime` | Prisma uses DateTime for both |
| `Text` | `String @db.Text` | |
| `JSON` | `Json` | Native JSON support |
| `String` (JSON string) | `String[]` | tech_stack → array |
| `accent_color` | `accentColor` | camelCase convention |

**New Models for NextAuth:**
- `Account`, `Session`, `VerificationToken` - Required for NextAuth adapter
- `AchievementTranslation` - For i18n (EN/ID)

### 1.2 Initialize Prisma
```bash
npm install -D prisma
npx prisma init
# Replace schema.prisma with created one
npx prisma migrate dev --name init
npx prisma generate
```

### 1.3 Seed Script
Create `prisma/seed.ts` from `backend/seed_dummy.py`:
```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
      email: 'admin@portfolio.com',
      passwordHash,
      role: 'admin',
      profile: {
        create: {
          fullName: 'Your Name',
          headline: 'Full Stack Developer',
          bioHome: 'Passionate developer...',
          email: 'contact@example.com',
          location: 'Indonesia',
        }
      }
    },
    include: { profile: true }
  })

  // Seed projects, achievements, skills, work_experiences, educations, social_links
  // Copy data from seed_dummy.py
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
```

```bash
npm install -D tsx @types/bcryptjs
npm install bcryptjs
npx tsx prisma/seed.ts
```

---

## 🔐 Phase 2: Authentication (Day 1-2)

### 2.1 Install Dependencies
```bash
npm install next-auth@beta @auth/prisma-adapter bcryptjs jose
npm install -D @types/bcryptjs
```

### 2.2 Auth Config: `lib/auth.ts`
```typescript
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const parsed = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }).safeParse(credentials)

        if (!parsed.success) return null

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        })

        if (!user || !user.passwordHash) return null

        const valid = await bcrypt.compare(parsed.data.password, user.passwordHash)
        if (!valid) return null

        return { id: user.id, email: user.email, role: user.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
})
```

### 2.3 API Route: `app/api/auth/[...nextauth]/route.ts`
```typescript
export { handlers as GET, handlers as POST } from '@/lib/auth'
```

### 2.4 Middleware: `middleware.ts`
```typescript
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAdminRoute = req.nextUrl.pathname.startsWith('/dashboard')
  const isLoginPage = req.nextUrl.pathname === '/login'

  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
```

### 2.5 Login Page: `app/login/page.tsx`
- Copy UI from `frontend/src/components/LoginModal.tsx`
- Use `signIn` from `next-auth/react`
- Server Action for form submission

---

## 📤 Phase 3: File Upload (Day 2)

### 3.1 Vercel Blob Setup
```bash
npm install @vercel/blob
```
Add `BLOB_READ_WRITE_TOKEN` in Vercel Environment Variables.

### 3.2 Upload Helper: `lib/blob.ts`
```typescript
import { put, del } from '@vercel/blob'

export async function uploadFile(file: File, folder: string): Promise<string> {
  const filename = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
  const blob = await put(filename, file, { access: 'public' })
  return blob.url
}

export async function deleteFile(url: string) {
  await del(url)
}
```

### 3.3 Upload API: `app/api/upload/route.ts`
```typescript
import { auth } from '@/lib/auth'
import { uploadFile } from '@/lib/blob'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File
  const folder = formData.get('folder') as string || 'uploads'

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
  }

  const url = await uploadFile(file, folder)
  return NextResponse.json({ url })
}
```

---

## 🌐 Phase 4: Frontend Migration (Day 2-4)

### 4.1 Project Setup
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```
Or manual setup:
```bash
npm install next@latest react@latest react-dom@latest
npm install -D typescript @types/react @types/react-dom @types/node tailwindcss postcss autoprefixer eslint
```

### 4.2 Copy Components
```
frontend/src/components/  →  src/components/
frontend/src/hooks/       →  src/hooks/
frontend/src/context/     →  src/context/
frontend/src/i18n/        →  src/lib/i18n/ (use next-intl)
frontend/src/lib/         →  src/lib/
frontend/src/pages/       →  src/app/(public)/
frontend/src/utils/       →  src/lib/utils/
```

### 4.3 Key Adaptations

| Vite/React | Next.js App Router |
|------------|-------------------|
| `react-router-dom` | `next/link`, `next/navigation` |
| Client-side fetch (axios) | Server Components + Server Actions / SWR |
| `react-helmet-async` | `metadata` export / `generateMetadata` |
| Context providers | Wrap in `Providers` component in layout |
| CSS imports | Tailwind + `globals.css` |

### 4.4 i18n Setup
```bash
npm install next-intl
```
Configure `src/middleware.ts` for locale routing.

### 4.5 Public Routes (SSR/ISR)
```
src/app/
├── (public)/
│   ├── layout.tsx          # Providers, metadata, fonts
│   ├── page.tsx            # Home (ISR)
│   ├── about/page.tsx      # About (ISR)
│   ├── projects/page.tsx   # Projects (ISR)
│   ├── achievements/page.tsx
│   └── contact/page.tsx
├── (admin)/
│   ├── layout.tsx          # Auth check, sidebar
│   ├── dashboard/page.tsx
│   └── ...
├── api/
│   ├── auth/[...nextauth]/route.ts
│   ├── projects/route.ts
│   ├── upload/route.ts
│   └── ...
└── actions/
    ├── projects.ts         # Server Actions
    ├── achievements.ts
    └── ...
```

---

## 🔄 Phase 5: API Routes & Server Actions (Day 3-4)

### 5.1 REST API Routes (for external access)
```
app/api/
├── auth/[...nextauth]/route.ts
├── projects/
│   ├── route.ts            # GET (list), POST (create)
│   └── [id]/route.ts       # GET, PUT, DELETE
├── achievements/
├── skills/
├── work-experiences/
├── educations/
├── social-links/
├── profile/route.ts
├── upload/route.ts
└── dashboard/stats/route.ts
```

### 5.2 Server Actions (for admin mutations)
```typescript
// src/actions/projects.ts
'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createProject(data: ProjectInput) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const project = await prisma.project.create({ data })
  revalidatePath('/dashboard/projects')
  revalidatePath('/projects')
  return project
}

export async function updateProject(id: string, data: ProjectInput) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const project = await prisma.project.update({ where: { id }, data })
  revalidatePath('/dashboard/projects')
  revalidatePath('/projects')
  return project
}

export async function deleteProject(id: string) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  await prisma.project.delete({ where: { id } })
  revalidatePath('/dashboard/projects')
  revalidatePath('/projects')
}
```

---

## 🚀 Phase 6: Deployment (Day 4-5)

### 6.1 Vercel Setup
1. Push to GitHub
2. Import project in Vercel
3. Add Environment Variables:
   ```
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
   NEXTAUTH_URL="https://your-project.vercel.app"
   BLOB_READ_WRITE_TOKEN="vercel_blob_token"
   ```

### 6.2 Build Command
```bash
# vercel.json or package.json
"build": "prisma generate && next build"
```

### 6.3 Post-Deploy
- Run `npx prisma migrate deploy` in Vercel CLI or GitHub Action
- Seed database if empty

---

## ✅ Verification Checklist

### Functionality
- [ ] Login/Logout works
- [ ] Dashboard accessible only when authenticated
- [ ] Profile CRUD (avatar upload → Vercel Blob)
- [ ] Projects CRUD + image upload
- [ ] Achievements CRUD + i18n + image upload
- [ ] Skills CRUD + icon picker
- [ ] Work Experiences CRUD + logo upload
- [ ] Educations CRUD + logo upload
- [ ] Social Links CRUD
- [ ] Public pages render correctly (Home, About, Projects, Contact)
- [ ] i18n switching (EN/ID)
- [ ] Theme toggle (dark/light)
- [ ] SEO meta tags present
- [ ] Sitemap.xml / robots.txt generated

### Performance
- [ ] Lighthouse score > 90
- [ ] Images optimized (next/image)
- [ ] Fonts optimized (next/font)
- [ ] ISR working (revalidate on data change)

### Deployment
- [ ] Vercel auto-deploy on push
- [ ] Preview deployments for PRs
- [ ] Environment variables configured
- [ ] Database connected (Neon)
- [ ] Blob storage working

---

## 📦 Dependencies Summary

### Production
```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "next-auth": "^5.0.0-beta.18",
  "@auth/prisma-adapter": "^2.0.0",
  "@prisma/client": "^5.14.0",
  "@vercel/blob": "^0.24.0",
  "bcryptjs": "^2.4.3",
  "zod": "^3.23.0",
  "next-intl": "^3.13.0",
  "next-themes": "^0.3.0",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.400.0",
  "react-hook-form": "^7.51.0",
  "@hookform/resolvers": "^3.3.0",
  "sonner": "^1.5.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.3.0"
}
```

### Development
```json
{
  "typescript": "^5.4.0",
  "@types/node": "^20.12.0",
  "@types/react": "^18.3.0",
  "@types/react-dom": "^18.3.0",
  "@types/bcryptjs": "^2.4.6",
  "prisma": "^5.14.0",
  "tsx": "^4.7.0",
  "tailwindcss": "^3.4.0",
  "postcss": "^8.4.38",
  "autoprefixer": "^10.4.19",
  "eslint": "^8.57.0",
  "eslint-config-next": "^14.2.0",
  "prettier": "^3.2.0",
  "prettier-plugin-tailwindcss": "^0.5.0"
}
```

---

## 🔑 Key Differences to Remember

| Aspect | FastAPI (Railway) | Next.js (Vercel) |
|--------|-------------------|------------------|
| **Runtime** | Persistent Python | Serverless Node.js |
| **Database** | SQLite (file) | PostgreSQL (Neon) |
| **Uploads** | Local `/uploads` | Vercel Blob / Cloudinary |
| **Auth** | Custom JWT | NextAuth v5 |
| **API** | REST routers | API Routes + Server Actions |
| **Frontend** | Vite SPA | App Router (RSC + Client) |
| **Deploy** | Manual/CLI | Git push → Auto |
| **Cost** | Credits-based | Free tier generous |

---

## 📅 Estimated Timeline

| Phase | Days | Cumulative |
|-------|------|------------|
| 0: Prep | 0.5 | 0.5 |
| 1: Database | 1 | 1.5 |
| 2: Auth | 1 | 2.5 |
| 3: Upload | 0.5 | 3 |
| 4: Frontend | 2-3 | 5-6 |
| 5: API/Actions | 1-2 | 6-8 |
| 6: Deploy | 0.5 | 6.5-8.5 |
| **Total** | **~7-9 days** | |

---

## 🆘 Rollback Plan

If migration fails:
1. Keep Railway deployment running
2. Point custom domain to Railway temporarily
3. Debug Next.js locally
4. Deploy to Vercel only when 100% ready

---

## 📝 Notes

- **SQLite → PostgreSQL**: Data types differ slightly (Date → DateTime, JSON string → native Json)
- **CUID vs Auto-increment**: All IDs become CUID strings
- **File paths**: All local upload URLs must be migrated to Blob URLs
- **CORS**: Not needed in Next.js (same origin)
- **Background jobs**: Use Vercel Cron or Inngest/Trigger.dev