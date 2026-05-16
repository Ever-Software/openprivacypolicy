import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import type { GeneratorFormData, Purpose, ThirdPartyService, CustomThirdParty } from '@/store/generatorStore'
import { CustomTagInput } from '@/pages/generator/CustomTagInput'
import { cn } from '@/utils/cn'

interface DataUsageStepProps {
  formData: GeneratorFormData
  onChange: (data: Partial<GeneratorFormData>) => void
}

const PURPOSES: { value: Purpose; label: string; description: string }[] = [
  { value: 'core-service', label: 'Core functionality', description: 'Run the main features of your app' },
  { value: 'analytics', label: 'Analytics', description: 'Understand usage and improve the app' },
  { value: 'marketing', label: 'Marketing', description: 'Promotional emails and communications' },
  { value: 'personalization', label: 'Personalization', description: 'Tailor the experience to each user' },
  { value: 'legal-compliance', label: 'Legal compliance', description: 'Meet regulatory requirements' },
  { value: 'customer-support', label: 'Customer support', description: 'Handle user inquiries and issues' },
]

const THIRD_PARTY_SERVICES: { value: ThirdPartyService; label: string; category: string }[] = [
  { value: 'google-analytics', label: 'Google Analytics', category: 'Analytics' },
  { value: 'firebase', label: 'Firebase', category: 'Analytics' },
  { value: 'admob', label: 'Google AdMob', category: 'Advertising' },
  { value: 'facebook', label: 'Meta / Facebook', category: 'Advertising' },
  { value: 'stripe', label: 'Stripe', category: 'Payments' },
  { value: 'paypal', label: 'PayPal', category: 'Payments' },
  { value: 'aws', label: 'Amazon AWS', category: 'Infrastructure' },
  { value: 'twilio', label: 'Twilio', category: 'Messaging' },
  { value: 'mailchimp', label: 'Mailchimp', category: 'Email' },
  { value: 'apple-sign-in', label: 'Sign in with Apple', category: 'Auth' },
]

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  description?: string
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-start justify-between gap-4 py-3 w-full text-left"
    >
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>
      <span
        className={cn(
          'flex-none mt-0.5 w-10 rounded-full transition-colors relative shrink-0',
          checked ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'
        )}
        style={{ height: '22px' }}
      >
        <span
          className={cn(
            'absolute top-[3px] size-4 bg-white rounded-full shadow-sm transition-transform',
            checked ? 'translate-x-5' : 'translate-x-[3px]'
          )}
        />
      </span>
    </button>
  )
}

function CustomThirdPartyForm({
  items,
  onChange,
}: {
  items: CustomThirdParty[]
  onChange: (items: CustomThirdParty[]) => void
}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [open, setOpen] = useState(false)

  function add() {
    const trimmedName = name.trim()
    if (!trimmedName) return
    const next: CustomThirdParty = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      name: trimmedName,
      description: description.trim(),
    }
    onChange([...items, next])
    setName('')
    setDescription('')
    setOpen(false)
  }

  function remove(id: string) {
    onChange(items.filter(i => i.id !== id))
  }

  const inputClass = cn(
    'w-full h-9 px-3 rounded-lg border text-sm bg-white dark:bg-gray-900',
    'text-gray-900 dark:text-white placeholder:text-gray-400',
    'border-gray-200 dark:border-gray-700',
    'focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-colors'
  )

  return (
    <div className="mt-3">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Other third-party services not listed above</p>

      {items.length > 0 && (
        <div className="space-y-1.5 mb-2">
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-start gap-2 px-3 py-2 rounded-lg bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-brand-700 dark:text-brand-300">{item.name}</p>
                {item.description && (
                  <p className="text-xs text-brand-500 dark:text-brand-400 truncate">{item.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="size-4 flex items-center justify-center text-brand-400 hover:text-brand-700 dark:hover:text-brand-200 shrink-0 mt-0.5 transition-colors"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {open ? (
        <div className="p-3 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 space-y-2 bg-gray-50 dark:bg-gray-900">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Service name *"
            className={inputClass}
            autoFocus
          />
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Brief description (optional)"
            className={inputClass}
            onKeyDown={e => e.key === 'Enter' && add()}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={add}
              disabled={!name.trim()}
              className="h-8 px-4 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => { setOpen(false); setName(''); setDescription('') }}
              className="h-8 px-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400 hover:border-brand-400 hover:text-brand-600 dark:hover:border-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          <Plus className="size-3.5" />
          Add another service
        </button>
      )}
    </div>
  )
}

export function DataUsageStep({ formData, onChange }: DataUsageStepProps) {
  function togglePurpose(p: Purpose) {
    const next = formData.purposes.includes(p)
      ? formData.purposes.filter(x => x !== p)
      : [...formData.purposes, p]
    onChange({ purposes: next })
  }

  function toggleService(svc: ThirdPartyService) {
    const next = formData.thirdPartyServices.includes(svc)
      ? formData.thirdPartyServices.filter(x => x !== svc)
      : [...formData.thirdPartyServices, svc]
    onChange({ thirdPartyServices: next, sharesWithThirdParties: next.length > 0 || formData.sharesWithThirdParties })
  }

  function handleSharingToggle(v: boolean) {
    onChange({
      sharesWithThirdParties: v,
      thirdPartyServices: v ? formData.thirdPartyServices : [],
      customThirdParties: v ? formData.customThirdParties : [],
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Usage & sharing</h2>
        <p className="text-sm text-gray-500 mt-1">
          Explain why you collect data and whether you share it with any services.
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Why do you collect data?
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PURPOSES.map(({ value, label, description }) => {
            const selected = formData.purposes.includes(value)
            return (
              <button
                key={value}
                type="button"
                onClick={() => togglePurpose(value)}
                className={cn(
                  'flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-xl border text-left transition-all',
                  selected
                    ? 'bg-brand-50 border-brand-300 text-brand-700 dark:bg-brand-950/60 dark:border-brand-700 dark:text-brand-300'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600'
                )}
              >
                <span className="text-sm font-medium">{label}</span>
                <span
                  className={cn(
                    'text-xs leading-tight',
                    selected ? 'text-brand-500 dark:text-brand-400' : 'text-gray-400'
                  )}
                >
                  {description}
                </span>
              </button>
            )
          })}
        </div>

        <CustomTagInput
          values={formData.customPurposes}
          onChange={values => onChange({ customPurposes: values })}
          placeholder="e.g. Research & development, Fraud prevention…"
          label="Other purposes not listed above"
        />
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800">
        <Toggle
          checked={formData.sharesWithThirdParties}
          onChange={handleSharingToggle}
          label="Share data with third parties"
          description="Your app uses external services that may receive user data"
        />

        {formData.sharesWithThirdParties && (
          <div className="mt-2 mb-3 space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Which services do you use?
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {THIRD_PARTY_SERVICES.map(({ value, label, category }) => {
                  const selected = formData.thirdPartyServices.includes(value)
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleService(value)}
                      className={cn(
                        'flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-xl border text-left transition-all',
                        selected
                          ? 'bg-brand-50 border-brand-300 text-brand-700 dark:bg-brand-950/60 dark:border-brand-700 dark:text-brand-300'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600'
                      )}
                    >
                      <span className="text-sm font-medium">{label}</span>
                      <span
                        className={cn(
                          'text-xs',
                          selected ? 'text-brand-500 dark:text-brand-400' : 'text-gray-400'
                        )}
                      >
                        {category}
                      </span>
                    </button>
                  )
                })}
              </div>

              <CustomThirdPartyForm
                items={formData.customThirdParties}
                onChange={items => onChange({ customThirdParties: items })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
