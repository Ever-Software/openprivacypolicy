import { Sun, Moon, Monitor } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { cn } from '@/utils/cn'
import type { Theme } from '@/types'

interface ThemeToggleProps {
  iconSize?: 'sm' | 'md'
}

export function ThemeToggle({ iconSize = 'md' }: ThemeToggleProps) {
  const { theme, setTheme } = useThemeStore()
  const sz = iconSize === 'sm' ? 'size-3.5' : 'size-4'

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun className={sz} /> },
    { value: 'dark', label: 'Dark', icon: <Moon className={sz} /> },
    { value: 'system', label: 'System', icon: <Monitor className={sz} /> },
  ]

  return (
    <div className="flex items-center gap-0.5 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => setTheme(o.value)}
          aria-label={`${o.label} mode`}
          className={cn(
            'p-1.5 rounded-lg transition-all',
            theme === o.value
              ? 'bg-white dark:bg-gray-700 text-brand-600 shadow-sm'
              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
          )}
        >
          {o.icon}
        </button>
      ))}
    </div>
  )
}
