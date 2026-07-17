# Deployment Guide: Vercel

## Prerequisites

- Akun GitHub
- Akun Vercel (gratis)
- Neon PostgreSQL (gratis)

---

## 1. Push ke GitHub

```bash
cd E:\JS\portofolio-nextjs
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/JULIOSIRINGORINGO/portfolio-nextjs.git
git push -u origin main
```

---

## 2. Import ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Klik **Add New Project**
4. Pilih repo `portfolio-nextjs`
5. Klik **Import**

---

## 3. Environment Variables

Tambahkan di Vercel Dashboard > Settings > Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` (dari Neon) | Production, Preview, Development |
| `NEXTAUTH_SECRET` | `isi-dengan-random-string` | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://portfolio-nextjs.vercel.app` | Production, Preview, Development |
| `GITHUB_TOKEN` | `ghp_xxxxx` | Production, Preview, Development |
| `GITHUB_USERNAME` | `JULIOSIRINGORINGO` | Production, Preview, Development |

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## 4. Build Settings

Vercel otomatis mendeteksi Next.js. Biasanya tidak perlu ubah apapun.

Kalau build error, coba set:

- **Framework Preset**: Next.js
- **Build Command**: `npx prisma generate && next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

---

## 5. Database Setup (Neon)

1. Buka [neon.tech](https://neon.tech)
2. Login
3. Buka project `ep-bold-rain-aodhehfp`
4. Copy **Connection string** (Password mode)
5. Paste ke `DATABASE_URL` di Vercel

Kalau belum migrate:
```bash
npx prisma migrate deploy
```

Kalau belum seed:
```bash
npx prisma db seed
```

---

## 6. Deploy

```bash
# Push trigger auto-deploy
git add .
git commit -m "deploy"
git push
```

Vercel akan otomatis build dan deploy. Status bisa dilihat di Dashboard > Deployments.

---

## 7. Custom Domain (Opsional)

1. Vercel Dashboard > Project > Settings > Domains
2. Tambahkan domain kamu
3. Ikuti instruksi DNS (CNAME atau A Record)
4. Tunggu propagation (5-30 menit)

---

## 8. Checklist Sebelum Deploy

- [ ] `npm run build` berhasil tanpa error
- [ ] `DATABASE_URL` benar dan bisa connect
- [ ] `NEXTAUTH_SECRET` sudah di-generate
- [ ] `NEXTAUTH_URL` sesuai domain Vercel
- [ ] Prisma schema sudah di-migrate ke Neon
- [ ] Data sudah di-seed

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Build error Prisma | Tambah `npx prisma generate` di build command |
| 500 error | Cek DATABASE_URL di Vercel |
| Login gagal | Cek NEXTAUTH_SECRET dan NEXTAUTH_URL |
| Image tidak muncul | Cek Next.js image domains di next.config |
| Dark mode flash | Inline script di root layout sudah handle |
