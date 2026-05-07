import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '@/types'

interface ThemeState {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolve(theme: Theme): 'light' | 'dark' {
  return theme === 'system' ? getSystemTheme() : theme
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      resolvedTheme: 'light',
      setTheme: (theme) => {
        const resolved = resolve(theme)
        document.documentElement.classList.toggle('dark', resolved === 'dark')
        set({ theme, resolvedTheme: resolved })
      },
    }),
    { name: 'opp-theme' }
  )
)
