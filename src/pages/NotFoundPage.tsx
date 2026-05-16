import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center gap-4 px-4 text-center">
      <ShieldCheck className="size-12 text-gray-200 dark:text-gray-700" />
      <p className="text-5xl font-black text-gray-100 dark:text-gray-800">404</p>
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Page not found</p>
      <p className="text-sm text-gray-400 max-w-xs">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button size="sm">Go home</Button>
      </Link>
    </div>
  )
}
