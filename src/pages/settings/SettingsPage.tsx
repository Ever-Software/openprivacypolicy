import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, Mail, Lock, Bell, Palette, Shield, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardTitle } from '@/components/ui/Card'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import type { Theme } from '@/types'
import { cn } from '@/utils/cn'

const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

const passwordSchema = z.object({
  current: z.string().min(6),
  next: z.string().min(8),
  confirm: z.string(),
}).refine((d) => d.next === d.confirm, { message: 'Passwords do not match', path: ['confirm'] })

type ProfileData = z.infer<typeof profileSchema>
type PasswordData = z.infer<typeof passwordSchema>

const TABS = [
  { id: 'profile', label: 'Profile', icon: <User className="size-4" /> },
  { id: 'security', label: 'Security', icon: <Lock className="size-4" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="size-4" /> },
  { id: 'appearance', label: 'Appearance', icon: <Palette className="size-4" /> },
  { id: 'account', label: 'Account', icon: <Shield className="size-4" /> },
] as const

type Tab = (typeof TABS)[number]['id']

function ProfileTab() {
  const { user, updateUser } = useAuthStore()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? '', email: user?.email ?? '' },
  })

  const onSubmit = async (data: ProfileData) => {
    await new Promise((r) => setTimeout(r, 600))
    updateUser(data)
    toast.success('Profile updated')
  }

  return (
    <Card>
      <CardTitle className="mb-5">Profile information</CardTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="size-16 rounded-2xl bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
            <span className="text-2xl font-bold text-brand-700 dark:text-brand-400">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-xs text-gray-400 mt-0.5 capitalize">{user?.plan} plan</p>
          </div>
        </div>
        <Input
          label="Full name"
          leftElement={<User className="size-4" />}
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email address"
          type="email"
          leftElement={<Mail className="size-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" loading={isSubmitting}>Save changes</Button>
      </form>
    </Card>
  )
}

function SecurityTab() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
  })

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 700))
    toast.success('Password updated')
    reset()
  }

  return (
    <Card>
      <CardTitle className="mb-5">Change password</CardTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <Input
          label="Current password"
          type="password"
          leftElement={<Lock className="size-4" />}
          error={errors.current?.message}
          {...register('current')}
        />
        <Input
          label="New password"
          type="password"
          leftElement={<Lock className="size-4" />}
          hint="At least 8 characters"
          error={errors.next?.message}
          {...register('next')}
        />
        <Input
          label="Confirm new password"
          type="password"
          leftElement={<Lock className="size-4" />}
          error={errors.confirm?.message}
          {...register('confirm')}
        />
        <Button type="submit" loading={isSubmitting}>Update password</Button>
      </form>
    </Card>
  )
}

function NotificationsTab() {
  const [settings, setSettings] = useState({
    policyViews: true,
    weeklyReport: true,
    productUpdates: false,
    securityAlerts: true,
  })

  const toggle = (key: keyof typeof settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))

  const notifs = [
    { key: 'policyViews' as const, label: 'Policy views', desc: 'Get notified when someone views your policy.' },
    { key: 'weeklyReport' as const, label: 'Weekly report', desc: 'Summary of your policy analytics each week.' },
    { key: 'productUpdates' as const, label: 'Product updates', desc: 'News about new features and improvements.' },
    { key: 'securityAlerts' as const, label: 'Security alerts', desc: 'Important security notifications for your account.' },
  ]

  return (
    <Card>
      <CardTitle className="mb-5">Notification preferences</CardTitle>
      <div className="space-y-4 max-w-md">
        {notifs.map((n) => (
          <div key={n.key} className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{n.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{n.desc}</p>
            </div>
            <button
              onClick={() => toggle(n.key)}
              className={cn(
                'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
                settings[n.key] ? 'bg-brand-600' : 'bg-gray-200 dark:bg-gray-700'
              )}
            >
              <span
                className={cn(
                  'inline-block size-3.5 transform rounded-full bg-white transition-transform shadow-sm',
                  settings[n.key] ? 'translate-x-4.5' : 'translate-x-0.5'
                )}
              />
            </button>
          </div>
        ))}
        <Button onClick={() => toast.success('Notification settings saved')} className="mt-2">
          Save preferences
        </Button>
      </div>
    </Card>
  )
}

function AppearanceTab() {
  const { theme, setTheme } = useThemeStore()

  const themes: { value: Theme; label: string; desc: string }[] = [
    { value: 'light', label: 'Light', desc: 'Clean white interface' },
    { value: 'dark', label: 'Dark', desc: 'Easy on the eyes at night' },
    { value: 'system', label: 'System', desc: 'Follows your OS preference' },
  ]

  return (
    <Card>
      <CardTitle className="mb-5">Appearance</CardTitle>
      <div className="space-y-3 max-w-md">
        {themes.map((t) => (
          <button
            key={t.value}
            onClick={() => { setTheme(t.value); toast.success(`Theme set to ${t.label}`) }}
            className={cn(
              'w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left',
              theme === t.value
                ? 'border-brand-300 bg-brand-50 dark:bg-brand-900/30 dark:border-brand-700'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            )}
          >
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{t.label}</p>
              <p className="text-xs text-gray-500">{t.desc}</p>
            </div>
            {theme === t.value && (
              <div className="size-5 rounded-full border-2 border-brand-500 bg-brand-500 flex items-center justify-center">
                <span className="size-2 rounded-full bg-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </Card>
  )
}

function AccountTab() {
  return (
    <div className="space-y-4">
      <Card className="border-red-100 dark:border-red-900/30">
        <CardTitle className="mb-2 text-red-600">Danger zone</CardTitle>
        <p className="text-sm text-gray-500 mb-4">
          Permanently delete your account and all associated data. This cannot be undone.
        </p>
        <Button
          variant="danger"
          leftIcon={<Trash2 className="size-4" />}
          onClick={() => toast.error('Account deletion requires email confirmation.')}
        >
          Delete account
        </Button>
      </Card>
    </div>
  )
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')

  const CONTENT: Record<Tab, React.ReactNode> = {
    profile: <ProfileTab />,
    security: <SecurityTab />,
    notifications: <NotificationsTab />,
    appearance: <AppearanceTab />,
    account: <AccountTab />,
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Sidebar nav */}
          <nav className="sm:w-44 flex sm:flex-col gap-1 flex-shrink-0 overflow-x-auto sm:overflow-visible">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                  activeTab === tab.id
                    ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex-1 min-w-0">{CONTENT[activeTab]}</div>
        </div>
      </div>
    </DashboardLayout>
  )
}
