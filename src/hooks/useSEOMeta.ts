import { useEffect } from 'react'

interface SEOMeta {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  jsonLd?: Record<string, unknown>
}

export function useSEOMeta({ title, description, ogTitle, ogDescription, jsonLd }: SEOMeta) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc?.getAttribute('content') ?? ''
    metaDesc?.setAttribute('content', description)

    document.querySelector('meta[property="og:title"]')?.setAttribute('content', ogTitle ?? title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', ogDescription ?? description)

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
      document.getElementById('page-ld')?.remove()
    }
  }, [title, description, ogTitle, ogDescription, jsonLd])
}
