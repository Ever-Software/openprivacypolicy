import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { useThemeStore } from '@/store/themeStore'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/utils/cn'
import type { Theme } from '@/types'

const NAV_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#pricing', label: 'Pricing' },
]

function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()
  const options: { value: Theme; icon: React.ReactNode }[] = [
    { value: 'light', icon: <Sun className="size-4" /> },
    { value: 'dark', icon: <Moon className="size-4" /> },
    { value: 'system', icon: <Monitor className="size-4" /> },
  ]
  return (
    <div className="flex items-center gap-0.5 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => setTheme(o.value)}
          className={cn(
            'p-1.5 rounded-lg transition-all',
            theme === o.value
              ? 'bg-white dark:bg-gray-700 text-brand-600 shadow-sm'
              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
          )}
          aria-label={`${o.value} mode`}
        >
          {o.icon}
        </button>
      ))}
    </div>
  )
}

interface AppLayoutProps {
  children: React.ReactNode
  transparent?: boolean
}

export function AppLayout({ children, transparent }: AppLayoutProps) {
  const { isAuthenticated } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-200',
          transparent && location.pathname === '/'
            ? 'bg-transparent'
            : 'glass border-b border-gray-100 dark:border-gray-800'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm">Sign in</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Get started</Button>
                </Link>
              </>
            )}
            <button
              className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 pb-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2.5 text-sm text-gray-700 dark:text-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo className="mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              The simplest way to create, host, and manage your privacy policies.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Product</p>
            <div className="flex flex-col gap-2">
              {['Features', 'Templates', 'Pricing', 'Changelog'].map((l) => (
                <a key={l} href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Company</p>
            <div className="flex flex-col gap-2">
              {['About', 'Blog', 'Careers', 'Contact'].map((l) => (
                <a key={l} href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Legal</p>
            <div className="flex flex-col gap-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((l) => (
                <a key={l} href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 px-4 sm:px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} OpenPrivacyPolicy. All rights reserved.</p>
          <div className="flex gap-4">
            {['Twitter', 'GitHub', 'LinkedIn'].map((s) => (
              <a key={s} href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
