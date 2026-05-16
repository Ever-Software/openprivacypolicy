import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface CustomTagInputProps {
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  label?: string
}

export function CustomTagInput({ values, onChange, placeholder = 'Add custom value', label }: CustomTagInputProps) {
  const [input, setInput] = useState('')

  function add() {
    const trimmed = input.trim()
    if (!trimmed || values.includes(trimmed)) return
    onChange([...values, trimmed])
    setInput('')
  }

  function remove(value: string) {
    onChange(values.filter(v => v !== value))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      add()
    }
  }

  return (
    <div className="mt-3">
      {label && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{label}</p>
      )}

      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {values.map(v => (
            <span
              key={v}
              className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 bg-brand-50 border border-brand-200 text-brand-700 dark:bg-brand-950/60 dark:border-brand-800 dark:text-brand-300 rounded-lg text-xs font-medium"
            >
              {v}
              <button
                type="button"
                onClick={() => remove(v)}
                className="size-3.5 flex items-center justify-center rounded text-brand-400 hover:text-brand-700 dark:hover:text-brand-200 transition-colors"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'flex-1 h-8 px-3 rounded-lg border text-sm bg-white dark:bg-gray-900',
            'text-gray-900 dark:text-white placeholder:text-gray-400',
            'border-dashed border-gray-300 dark:border-gray-600',
            'focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:border-solid',
            'transition-colors'
          )}
        />
        <button
          type="button"
          onClick={add}
          disabled={!input.trim()}
          className="h-8 px-3 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-brand-400 hover:text-brand-600 dark:hover:border-brand-600 dark:hover:text-brand-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 text-sm"
        >
          <Plus className="size-3.5" />
          Add
        </button>
      </div>
    </div>
  )
}
