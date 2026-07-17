export const CATEGORIES = ['Languages', 'Frontend', 'Backend', 'Mobile', 'Database', 'Tools & DevOps', 'Cloud'] as const

const CATEGORY_SLUGS: Record<string, string[]> = {
  Languages: ['html5', 'css3', 'javascript', 'typescript', 'python', 'java', 'csharp', 'go', 'kotlin', 'swift', 'dart', 'php'],
  Frontend: ['react', 'nextdotjs', 'vuedotjs', 'nuxtdotjs', 'angular', 'svelte', 'astro', 'tailwindcss', 'bootstrap', 'vite'],
  Backend: ['nodedotjs', 'fastapi', 'django', 'flask', 'laravel', 'express', 'nestjs', 'graphql', 'dotnet'],
  Mobile: ['flutter', 'reactnative'],
  Database: ['postgresql', 'mysql', 'sqlite', 'mongodb', 'redis', 'supabase', 'firebase'],
  'Tools & DevOps': ['docker', 'git', 'github', 'githubactions', 'linux', 'vercel', 'netlify', 'figma', 'postman'],
  Cloud: ['amazonaws', 'microsoftazure', 'googlecloud'],
}

export function getCategoryForSlug(slug: string): string {
  for (const [category, slugs] of Object.entries(CATEGORY_SLUGS)) {
    if (slugs.includes(slug)) return category
  }
  return 'Other'
}

export function filterByCategory(slug: string, category: string): boolean {
  return CATEGORY_SLUGS[category]?.includes(slug) ?? false
}
