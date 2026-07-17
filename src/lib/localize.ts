export function localize<T extends Record<string, any>>(obj: T, locale: string, fields: string[]): T {
  if (locale === 'en') {
    const result = { ...obj }
    for (const field of fields) {
      const enField = `${field}En`
      if (enField in obj && obj[enField]) {
        result[field] = obj[enField]
      }
    }
    return result
  }
  return obj
}
