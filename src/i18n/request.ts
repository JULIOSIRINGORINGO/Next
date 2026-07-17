import { getRequestConfig } from 'next-intl/server'
import { routing, type Locale } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  const validLocale: Locale = routing.locales.includes(locale as Locale) ? (locale as Locale) : routing.defaultLocale

  return {
    locale: validLocale,
    timeZone: 'Asia/Jakarta',
    messages: (await import(`../messages/${validLocale}.json`)).default,
  }
})
