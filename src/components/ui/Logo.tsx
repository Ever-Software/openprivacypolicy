import { ShieldCheck } from 'lucide-react'
import { cn } from '@/utils/cn'

interface LogoProps {
  className?: string
  iconOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { icon: 'size-6', text: 'text-sm', gap: 'gap-2' },
  md: { icon: 'size-8', text: 'text-lg', gap: 'gap-2.5' },
  lg: { icon: 'size-10', text: 'text-xl', gap: 'gap-3' },
}

export function Logo({ className, iconOnly, size = 'md' }: LogoProps) {
  const s = sizes[size]
  return (
    <div className={cn('flex items-center', s.gap, className)}>
      <div className="gradient-brand p-1.5 rounded-xl flex items-center justify-center">
        <ShieldCheck className={cn(s.icon, 'text-white')} strokeWidth={2} />
      </div>
      {!iconOnly && (
        <span className={cn('font-bold text-gray-900 dark:text-white tracking-tight', s.text)}>
          Open<span className="text-brand-600">Privacy</span>
        </span>
      )}
    </div>
  )
}
