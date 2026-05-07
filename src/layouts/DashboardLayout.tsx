import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, FileText, LayoutTemplate, BarChart3,
  Settings, LogOut, Menu, Plus, Bell, ChevronDown,
} from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { cn } from '@/utils/cn'
import { Sun, Moon } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { href: '/dashboard/policies', label: 'My Policies', icon: FileText },
  { href: '/dashboard/templates', label: 'Templates', icon: LayoutTemplate },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuthStore()
  const { theme, setTheme } = useThemeStore()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-4 h-16 flex items-center border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
        <Link to="/" onClick={() => setSidebarOpen(false)}>
          <Logo size="sm" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="mb-4">
          <Button
            className="w-full justify-start gap-2"
            size="sm"
            onClick={() => { navigate('/dashboard/editor/new'); setSidebarOpen(false) }}
            leftIcon={<Plus className="size-4" />}
          >
            New Policy
          </Button>
        </div>

        <nav className="space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                )
              }
            >
              <item.icon className="size-4 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="px-3 pb-4 border-t border-gray-100 dark:border-gray-800 pt-3 flex-shrink-0">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl">
          <div className="size-8 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-brand-700 dark:text-brand-400">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-1 flex items-center gap-2.5 px-3 py-2 w-full rounded-xl text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-600 transition-all"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 h-16 glass border-b border-gray-100 dark:border-gray-800 flex items-center px-4 sm:px-6 gap-4">
          <button
            className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-5" />
          </button>

          <div className="flex-1" />

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <button className="relative p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-1.5 bg-brand-500 rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen((v) => !v)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <div className="size-7 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
                <span className="text-xs font-semibold text-brand-700 dark:text-brand-400">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.name.split(' ')[0]}
              </span>
              <ChevronDown className="size-3.5 text-gray-400" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08)] p-1">
                <Link
                  to="/dashboard/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                >
                  <Settings className="size-4 text-gray-400" />
                  Settings
                </Link>
                <button
                  onClick={() => { setUserMenuOpen(false); handleLogout() }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                >
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}
