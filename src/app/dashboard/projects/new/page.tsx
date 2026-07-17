'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Loader2, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { createProject } from '@/actions/projects'

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  techStack: z.array(z.string()),
  featured: z.boolean(),
  order: z.number().int().min(0),
})

type ProjectForm = z.infer<typeof projectSchema>

const DEFAULT_TECH_OPTIONS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'FastAPI',
  'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Vercel', 'Tailwind CSS',
]

export default function NewProjectPage() {
  const router = useRouter()
  const [techStack, setTechStack] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: { techStack: [], featured: false, order: 0 },
  })

  const watchedTechStack = watch('techStack')

  const addTech = (tech: string) => {
    if (tech && !watchedTechStack.includes(tech)) {
      setValue('techStack', [...watchedTechStack, tech], { shouldValidate: true })
    }
  }

  const removeTech = (tech: string) => {
    setValue('techStack', watchedTechStack.filter(t => t !== tech), { shouldValidate: true })
  }

  const onSubmit = async (data: ProjectForm) => {
    setLoading(true)
    try {
      await createProject(data)
      toast.success('Project created successfully')
      router.push('/dashboard/projects')
      router.refresh()
    } catch (error) {
      toast.error('Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
          <input id="title" {...register('title')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent dark:bg-slate-800 dark:text-white dark:border-slate-700" />
          {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
          <textarea id="description" rows={4} {...register('description')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent dark:bg-slate-800 dark:text-white dark:border-slate-700" />
          {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Image URL</label>
            <input id="imageUrl" type="url" {...register('imageUrl')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent dark:bg-slate-800 dark:text-white dark:border-slate-700" placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <label htmlFor="liveUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Live Demo URL</label>
            <input id="liveUrl" type="url" {...register('liveUrl')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent dark:bg-slate-800 dark:text-white dark:border-slate-700" placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <label htmlFor="githubUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300">GitHub URL</label>
            <input id="githubUrl" type="url" {...register('githubUrl')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent dark:bg-slate-800 dark:text-white dark:border-slate-700" placeholder="https://..." />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tech Stack</label>
          <div className="flex flex-wrap gap-2">
            {watchedTechStack.map((tech) => (
              <span key={tech} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm">
                {tech}
                <button type="button" onClick={() => removeTech(tech)} className="text-slate-400 dark:text-slate-500 hover:text-red-500">
                  <span className="sr-only">Remove</span>×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              list="tech-suggestions"
              placeholder="Type or select tech..."
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(e.currentTarget.value); e.currentTarget.value = '' } }}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent dark:bg-slate-800 dark:text-white dark:border-slate-700"
            />
            <datalist id="tech-suggestions">
              {DEFAULT_TECH_OPTIONS.map((tech) => <option key={tech} value={tech} />)}
            </datalist>
            <button type="button" onClick={() => addTech((document.querySelector('input[list="tech-suggestions"]') as HTMLInputElement)?.value || '')} className="px-4 py-2 border rounded-lg dark:bg-slate-800 dark:text-white dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">Add</button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register('featured')} className="h-4 w-4 rounded border-slate-300 text-[var(--accent)] focus:ring-[var(--accent)]" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Featured Project</span>
            </label>
          </div>

          <div className="space-y-2">
            <label htmlFor="order" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Display Order</label>
            <input id="order" type="number" min="0" {...register('order', { valueAsNumber: true })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent dark:bg-slate-800 dark:text-white dark:border-slate-700" />
            {errors.order && <p className="text-sm text-red-500 mt-1">{errors.order.message}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t dark:border-slate-800">
          <Link href="/dashboard/projects" className="px-6 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition">Cancel</Link>
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center gap-2">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating... </> : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  )
}