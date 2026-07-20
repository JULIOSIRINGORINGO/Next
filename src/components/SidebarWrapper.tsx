'use client'

import dynamic from 'next/dynamic'

const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false })

export default function SidebarWrapper({ profile }: { profile: any }) {
  return <Sidebar profile={profile} />
}
