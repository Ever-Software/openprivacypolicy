import { cn } from '@/utils/cn'
import { Button } from './Button'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      {icon && (
        <div className="mb-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-400">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  )
}
