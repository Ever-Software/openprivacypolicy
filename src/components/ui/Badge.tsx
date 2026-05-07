import { cn } from '@/utils/cn'
import type { PolicyStatus } from '@/types'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'brand' | 'gray'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
  dot?: boolean
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  success: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  danger: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  brand: 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400',
  gray: 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
}

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-gray-400',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  brand: 'bg-brand-500',
  gray: 'bg-gray-400',
}

export function Badge({ variant = 'default', children, className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {dot && (
        <span className={cn('size-1.5 rounded-full', dotColors[variant])} />
      )}
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: PolicyStatus }) {
  const map: Record<PolicyStatus, { variant: BadgeVariant; label: string }> = {
    published: { variant: 'success', label: 'Published' },
    draft: { variant: 'warning', label: 'Draft' },
    archived: { variant: 'gray', label: 'Archived' },
  }
  const { variant, label } = map[status]
  return <Badge variant={variant} dot>{label}</Badge>
}
