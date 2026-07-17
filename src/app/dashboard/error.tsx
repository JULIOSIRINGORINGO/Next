'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center p-8 max-w-sm">
        <AlertTriangle className="h-10 w-10 text-red-400 mx-auto mb-3" />
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Something went wrong</h2>
        <p className="text-sm text-slate-500 mb-6">An unexpected error occurred. Please try again.</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold hover:opacity-90 transition"
        >
          <RefreshCw size={14} />
          Try Again
        </button>
      </div>
    </div>
  )
}
