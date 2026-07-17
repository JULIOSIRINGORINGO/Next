export const CATEGORIES = ['Languages', 'Frontend', 'Backend', 'Mobile', 'Database', 'Tools & DevOps', 'Cloud', 'AI'] as const

const CATEGORY_SLUGS: Record<string, string[]> = {
  Languages: ['html5', 'css3', 'javascript', 'typescript', 'python', 'java', 'csharp', 'c', 'cplusplus', 'go', 'rust', 'kotlin', 'swift', 'dart', 'php', 'ruby', 'scala', 'lua', 'r', 'perl', 'haskell', 'elixir', 'zig'],
  Frontend: ['react', 'nextdotjs', 'vuedotjs', 'nuxtdotjs', 'angular', 'svelte', 'astro', 'remix', 'gatsby', 'tailwindcss', 'bootstrap', 'mui', 'vite', 'webpack'],
  Backend: ['nodedotjs', 'fastapi', 'django', 'flask', 'rubyonrails', 'springboot', 'laravel', 'express', 'fastify', 'nestjs', 'graphql', 'dotnet', 'strapi', 'pytorch', 'tensorflow', 'numpy', 'pandas', 'scikitlearn', 'opencv', 'jupyter', 'poetry'],
  Mobile: ['flutter', 'swiftui', 'ionic'],
  Database: ['postgresql', 'mysql', 'sqlite', 'mongodb', 'redis', 'elasticsearch', 'supabase', 'firebase', 'mariadb', 'planetscale', 'prisma'],
  'Tools & DevOps': ['docker', 'kubernetes', 'terraform', 'git', 'github', 'gitlab', 'bitbucket', 'githubactions', 'jenkins', 'circleci', 'linux', 'vercel', 'netlify', 'figma', 'postman', 'jira', 'grafana', 'prometheus', 'n8n', 'zapier'],
  Cloud: ['amazonaws', 'microsoftazure', 'googlecloud', 'digitalocean', 'cloudflare'],
  AI: ['googlegemini', 'anthropic', 'huggingface', 'langchain', 'openrouter'],
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
