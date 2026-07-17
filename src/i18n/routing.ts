export const routing = {
  locales: ['en', 'id'] as const,
  defaultLocale: 'id' as const,
  localePrefix: 'always' as const,
}

export type Locale = (typeof routing.locales)[number]