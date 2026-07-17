'use client'

import { Suspense, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

function LoginFormInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl,
    })

    setLoading(false)

    if (res?.error) {
      setError('Invalid email or password')
    } else {
      router.push(callbackUrl)
      router.refresh()
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="glass-card p-8">
        <div className="text-center mb-8">
          <img src="/icon.svg" alt="Logo" className="w-12 h-12 mx-auto mb-4 object-contain" style={{ filter: 'var(--icon-invert, none)' }} />
          <h1 className="text-3xl font-extrabold text-black dark:text-white">Access</h1>
          <p className="text-black dark:text-white mt-2 font-bold">Authentication required to access the dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="input-field"
              placeholder="Username or Email"
              disabled={loading}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="input-field"
              placeholder="Password"
              disabled={loading}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-black dark:text-white font-bold">
          Default: admin@portfolio.com / admin123
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-4">
      <Suspense fallback={<div className="skeleton w-full max-w-md h-96" />}>
        <LoginFormInner />
      </Suspense>
    </div>
  )
}
