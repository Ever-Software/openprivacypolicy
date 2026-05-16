import { useEffect } from 'react'

interface SEOMeta {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogUrl?: string
  jsonLd?: Record<string, unknown>
}

export function useSEOMeta({ title, description, ogTitle, ogDescription, ogUrl, jsonLd }: SEOMeta) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc?.getAttribute('content') ?? ''
    metaDesc?.setAttribute('content', description)

    const ogTitleEl = document.querySelector('meta[property="og:title"]')
    const prevOgTitle = ogTitleEl?.getAttribute('content') ?? ''
    ogTitleEl?.setAttribute('content', ogTitle ?? title)

    const ogDescEl = document.querySelector('meta[property="og:description"]')
    const prevOgDesc = ogDescEl?.getAttribute('content') ?? ''
    ogDescEl?.setAttribute('content', ogDescription ?? description)

    const ogUrlEl = document.querySelector('meta[property="og:url"]')
    const prevOgUrl = ogUrlEl?.getAttribute('content') ?? ''
    if (ogUrl) ogUrlEl?.setAttribute('content', ogUrl)

    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'page-ld'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      document.title = prevTitle
      metaDesc?.setAttribute('content', prevDesc)
      ogTitleEl?.setAttribute('content', prevOgTitle)
      ogDescEl?.setAttribute('content', prevOgDesc)
      ogUrlEl?.setAttribute('content', prevOgUrl)
      document.getElementById('page-ld')?.remove()
    }
  }, [title, description, ogTitle, ogDescription, ogUrl, jsonLd])
}
