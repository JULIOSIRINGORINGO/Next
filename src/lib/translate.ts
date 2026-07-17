const MYMEMORY_API = 'https://api.mymemory.translated.net/get'

export async function translateText(text: string, from: 'id' | 'en', to: 'id' | 'en'): Promise<string> {
  if (!text || text.trim() === '') return text
  if (from === to) return text

  try {
    const res = await fetch(`${MYMEMORY_API}?q=${encodeURIComponent(text)}&langpair=${from}|${to}`)
    const data = await res.json()
    if (data?.responseData?.translatedText) {
      return data.responseData.translatedText
    }
    return text
  } catch {
    return text
  }
}

export async function translateBatch(texts: string[], from: 'id' | 'en', to: 'id' | 'en'): Promise<string[]> {
  const results: string[] = []
  for (const text of texts) {
    if (!text || text.trim() === '') {
      results.push(text)
    } else {
      results.push(await translateText(text, from, to))
    }
  }
  return results
}
