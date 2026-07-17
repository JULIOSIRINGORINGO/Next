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
          bioAbout: 'Full bio about me...',
          email: 'contact@example.com',
          location: 'Indonesia',
        },
      },
    },
    include: { profile: true },
  })

  console.log('User created:', user.email)

  await prisma.project.deleteMany()

  const projects = [
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio built with Next.js',
      imageUrl: null,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
      featured: true,
      order: 0,
    },
    {
      title: 'E-commerce API',
      description: 'REST API for e-commerce platform',
      imageUrl: null,
      liveUrl: null,
      githubUrl: 'https://github.com',
      techStack: ['FastAPI', 'PostgreSQL', 'Docker'],
      featured: true,
      order: 1,
    },
  ]

  for (const p of projects) {
    await prisma.project.create({ data: p })
  }
  console.log('Projects seeded')

  await prisma.skill.deleteMany()

  const skills = [
    { name: 'TypeScript', category: 'Languages', iconName: 'typescript', proficiency: 90, featured: true, order: 0 },
    { name: 'React', category: 'Frontend', iconName: 'react', proficiency: 85, featured: true, order: 1 },
    { name: 'Next.js', category: 'Frontend', iconName: 'nextdotjs', proficiency: 85, featured: true, order: 2 },
    { name: 'Node.js', category: 'Backend', iconName: 'nodedotjs', proficiency: 80, featured: true, order: 3 },
    { name: 'PostgreSQL', category: 'Database', iconName: 'postgresql', proficiency: 80, featured: false, order: 4 },
    { name: 'Tailwind CSS', category: 'Frontend', iconName: 'tailwindcss', proficiency: 90, featured: false, order: 5 },
    { name: 'Docker', category: 'Tools & DevOps', iconName: 'docker', proficiency: 70, featured: false, order: 6 },
    { name: 'Git', category: 'Tools & DevOps', iconName: 'git', proficiency: 85, featured: false, order: 7 },
  ]

  for (const s of skills) {
    await prisma.skill.create({ data: s })
  }
  console.log('Skills seeded')

  await prisma.socialLink.deleteMany()

  const socialLinks = [
    { platform: 'github', title: 'GitHub', url: 'https://github.com/yourusername', order: 0, isFeatured: true },
    { platform: 'linkedin', title: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', order: 1, isFeatured: true },
    { platform: 'twitter', title: 'Twitter', url: 'https://twitter.com/yourusername', order: 2, isFeatured: false },
  ]

  for (const s of socialLinks) {
    await prisma.socialLink.create({ data: s })
  }
  console.log('Social links seeded')

  // Work Experiences
  await prisma.workExperience.deleteMany()

  await prisma.workExperience.create({
    data: {
      company: 'Tech Corp',
      position: 'Senior Full Stack Developer',
      location: 'Remote',
      startDate: new Date('2023-01-01'),
      current: true,
      description: 'Lead developer building scalable web applications and microservices.',
      employmentType: 'Full-time',
      workType: 'Remote',
      responsibilities: ['Lead development of microservices architecture', 'Mentor junior developers', 'Architect scalable systems'],
      whatILearned: ['System design patterns', 'Team leadership', 'Cloud infrastructure'],
      impact: ['Reduced API response time by 40%', 'Led migration to Next.js', 'Onboarded 5 new engineers'],
    },
  })

  await prisma.workExperience.create({
    data: {
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      location: 'Jakarta, Indonesia',
      startDate: new Date('2021-06-01'),
      endDate: new Date('2022-12-31'),
      current: false,
      description: 'Built responsive web applications and optimized frontend performance.',
      employmentType: 'Full-time',
      workType: 'Hybrid',
      responsibilities: ['Built responsive web applications', 'Implemented UI/UX designs', 'Optimized performance'],
      whatILearned: ['React ecosystem', 'Agile methodology', 'CI/CD pipelines'],
      impact: ['Improved page load speed by 60%', 'Delivered 10+ features on time'],
    },
  })
  console.log('Experiences seeded')

  // Educations
  await prisma.education.deleteMany()

  await prisma.education.create({
    data: {
      institution: 'University of Indonesia',
      degree: 'Bachelor of Computer Science',
      fieldOfStudy: 'Computer Science',
      location: 'Depok, Indonesia',
      gpa: '3.8',
      startDate: new Date('2017-08-01'),
      endDate: new Date('2021-06-30'),
      current: false,
      description: 'Dean\'s list student with focus on software engineering and distributed systems.',
    },
  })
  console.log('Educations seeded')

  // Achievements
  await prisma.achievement.deleteMany()

  await prisma.achievement.create({
    data: {
      title: 'AWS Certified Solutions Architect',
      description: 'Professional certification for designing distributed systems on AWS',
      issuer: 'Amazon Web Services',
      date: new Date('2023-08-15'),
      category: 'Certification',
      credentialId: 'AWS-SAA-12345',
      type: 'certificate',
    },
  })

  await prisma.achievement.create({
    data: {
      title: 'Hackathon Winner',
      description: 'First place at national hackathon for building an AI-powered edtech platform',
      issuer: 'TechNation',
      date: new Date('2023-03-01'),
      category: 'Award',
      type: 'award',
    },
  })
  console.log('Achievements seeded')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
