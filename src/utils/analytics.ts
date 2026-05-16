declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type GaParams = Record<string, string | number | boolean>

export function trackEvent(name: string, params?: GaParams) {
  window.gtag?.('event', name, params)
}
