import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

const STEPS = ['Basic Info', 'Data Collection', 'Usage & Sharing', 'Rights & Compliance', 'Review']

interface StepIndicatorProps {
  currentStep: number
  onStepClick?: (step: number) => void
}

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <ol className="flex items-center gap-0 overflow-x-auto scrollbar-none">
          {STEPS.map((label, i) => {
            const done = i < currentStep
            const active = i === currentStep

            return (
              <li key={label} className="flex items-center shrink-0">
                <button
                  type="button"
                  disabled={!done && !active}
                  onClick={() => done && onStepClick?.(i)}
                  className={cn(
                    'flex items-center gap-2 text-sm font-medium transition-colors',
                    done ? 'cursor-pointer' : 'cursor-default',
                    active ? 'text-brand-600 dark:text-brand-400' : done ? 'text-gray-500 dark:text-gray-400 hover:text-gray-700' : 'text-gray-300 dark:text-gray-600'
                  )}
                >
                  <span
                    className={cn(
                      'size-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors',
                      active
                        ? 'bg-brand-600 text-white'
                        : done
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                    )}
                  >
                    {done ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
                  </span>
                  <span className="hidden sm:inline whitespace-nowrap">{label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <span
                    className={cn(
                      'mx-2 sm:mx-3 h-px w-6 sm:w-10 shrink-0 transition-colors',
                      i < currentStep ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-700'
                    )}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
