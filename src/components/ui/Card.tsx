import { cn } from '@/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  as?: React.ElementType
  onClick?: () => void
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
}

export function Card({ children, className, hover, padding = 'md', as: Tag = 'div', onClick }: CardProps) {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800',
        'shadow-[0_1px_3px_0_rgb(0_0_0/0.06),0_1px_2px_-1px_rgb(0_0_0/0.04)]',
        hover && 'transition-all duration-200 hover:shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08),0_2px_4px_-2px_rgb(0_0_0/0.06)] hover:-translate-y-0.5 cursor-pointer',
        paddings[padding],
        className
      )}
    >
      {children}
    </Tag>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-between gap-3 mb-4', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-base font-semibold text-gray-900 dark:text-gray-100', className)}>
      {children}
    </h3>
  )
}
