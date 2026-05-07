import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  footer?: React.ReactNode
}

export function AuthLayout({ children, title, description, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <Logo size="lg" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {description}
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)] p-8">
          {children}
        </div>

        {footer && (
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
