import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from './Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

export function Modal({ open, onClose, title, description, children, className, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative w-full bg-white dark:bg-gray-900 rounded-2xl shadow-[0_20px_25px_-5px_rgb(0_0_0/0.15)]',
          'border border-gray-100 dark:border-gray-800',
          'animate-in fade-in-0 zoom-in-95 duration-200',
          sizes[size],
          className
        )}
      >
        {(title || description) && (
          <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 size-8 p-0"
          aria-label="Close modal"
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  )
}
