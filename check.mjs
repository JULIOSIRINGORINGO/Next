import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
const r = await p.profile.findFirst()
console.log(JSON.stringify({ fullName: r?.fullName, avatarUrl: r?.avatarUrl?.substring(0, 80) }, null, 2))
await p.$disconnect()
