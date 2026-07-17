import { put, del } from '@vercel/blob'

export async function uploadFile(file: File, folder: string): Promise<string> {
  const filename = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
  const blob = await put(filename, file, { access: 'public' })
  return blob.url
}

export async function deleteFile(url: string) {
  await del(url)
}