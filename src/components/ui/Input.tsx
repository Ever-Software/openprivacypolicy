import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftElement, rightElement, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && (
            <span className="absolute left-3 text-gray-400 pointer-events-none">
              {leftElement}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-10 px-3 text-sm rounded-xl border transition-all duration-150',
              'bg-white dark:bg-gray-900',
              'text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-400 dark:placeholder:text-gray-600',
              'border-gray-200 dark:border-gray-700',
              'hover:border-gray-300 dark:hover:border-gray-600',
              'focus:outline-none focus:border-brand-400 focus:ring-3 focus:ring-brand-100 dark:focus:ring-brand-900/40',
              error && 'border-red-400 focus:border-red-400 focus:ring-red-100',
              leftElement && 'pl-9',
              rightElement && 'pr-9',
              className
            )}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-3 text-gray-400">
              {rightElement}
            </span>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-3 py-2.5 text-sm rounded-xl border transition-all duration-150 resize-none',
            'bg-white dark:bg-gray-900',
            'text-gray-900 dark:text-gray-100',
            'placeholder:text-gray-400',
            'border-gray-200 dark:border-gray-700',
            'hover:border-gray-300',
            'focus:outline-none focus:border-brand-400 focus:ring-3 focus:ring-brand-100 dark:focus:ring-brand-900/40',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-100',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
