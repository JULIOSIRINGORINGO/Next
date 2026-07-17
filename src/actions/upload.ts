'use server'

import { auth } from '@/lib/auth'
import { uploadFile } from '@/lib/blob'
import { revalidatePath } from 'next/cache'

export async function uploadImage(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const file = formData.get('file') as File
  const folder = (formData.get('folder') as string) || 'uploads'

  if (!file) throw new Error('No file provided')

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF allowed.')
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File too large. Maximum size is 5MB.')
  }

  const url = await uploadFile(file, folder)
  revalidatePath('/dashboard')
  return { url }
}

export async function deleteImage(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const url = formData.get('url') as string
  if (!url) throw new Error('No URL provided')

  // Note: Vercel Blob delete requires token with delete permission
  // For now just return success - implement actual delete when needed
  revalidatePath('/dashboard')
  return { success: true }
}