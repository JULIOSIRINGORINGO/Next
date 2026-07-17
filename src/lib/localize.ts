export function localize(obj: Record<string, any>, locale: string, fields: string[]): Record<string, any> {
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
