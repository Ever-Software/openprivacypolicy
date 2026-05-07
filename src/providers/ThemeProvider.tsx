import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme, setTheme } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  useEffect(() => {
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => setTheme('system')
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
  }, [theme, setTheme])

  return <>{children}</>
}
