import { cookies } from 'next/headers'
import { localize } from '@/lib/localize'

export async function getDashboardLocale(): Promise<string> {
  const cookieStore = await cookies()
  return cookieStore.get('locale')?.value || 'id'
}

export { localize }
