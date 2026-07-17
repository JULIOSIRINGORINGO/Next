import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SocialLinkEditForm } from './form'

interface EditSocialLinkPageProps {
  params: Promise<{ locale: string; id: string }>
}

export default async function EditSocialLinkPage({ params }: EditSocialLinkPageProps) {
  const { id } = await params
  const messages: any = await getMessages()

  const socialLinks = messages.socialLinks
  const link = await prisma.socialLink.findUnique({ where: { id } })

  if (!link) notFound()

  return (
    <div className="space-y-6">
      <SocialLinkEditForm initialData={link} />
    </div>
  )
}
