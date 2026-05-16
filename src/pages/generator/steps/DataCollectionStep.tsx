import type { GeneratorFormData, DataType } from '@/store/generatorStore'
import { CustomTagInput } from '@/pages/generator/CustomTagInput'
import { cn } from '@/utils/cn'

interface DataCollectionStepProps {
  formData: GeneratorFormData
  onChange: (data: Partial<GeneratorFormData>) => void
}

const DATA_TYPES: { value: DataType; label: string; description: string }[] = [
  { value: 'full-name', label: 'Full name', description: 'Name and personal identifiers' },
  { value: 'email', label: 'Email address', description: 'Contact email' },
  { value: 'phone', label: 'Phone number', description: 'Mobile or landline' },
  { value: 'location', label: 'Location', description: 'GPS or IP-based location' },
  { value: 'device', label: 'Device info', description: 'Model, OS, device IDs' },
  { value: 'usage', label: 'Usage data', description: 'Features used, session data' },
  { value: 'financial', label: 'Financial data', description: 'Payments, billing info' },
  { value: 'health', label: 'Health & fitness', description: 'Health metrics, activity' },
  { value: 'photos', label: 'Photos & media', description: 'Images, video, files' },
  { value: 'contacts', label: 'Contacts', description: 'Address book access' },
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
      className="flex items-start justify-between gap-4 py-3 w-full text-left group"
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

export function DataCollectionStep({ formData, onChange }: DataCollectionStepProps) {
  function toggleDataType(type: DataType) {
    const next = formData.dataTypes.includes(type)
      ? formData.dataTypes.filter(t => t !== type)
      : [...formData.dataTypes, type]
    onChange({ dataTypes: next })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Data collection</h2>
        <p className="text-sm text-gray-500 mt-1">
          Select the types of personal data your app collects. Select all that apply.
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Personal data collected
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {DATA_TYPES.map(({ value, label, description }) => {
            const selected = formData.dataTypes.includes(value)
            return (
              <button
                key={value}
                type="button"
                onClick={() => toggleDataType(value)}
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
          values={formData.customDataTypes}
          onChange={values => onChange({ customDataTypes: values })}
          placeholder="e.g. Biometric data, Survey responses…"
          label="Other data types not listed above"
        />

        {formData.dataTypes.length === 0 && formData.customDataTypes.length === 0 && (
          <p className="text-xs text-gray-400 mt-2">
            Not selecting any data types is valid — your policy will reflect minimal data collection.
          </p>
        )}
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-100 dark:border-gray-800">
        <Toggle
          checked={formData.hasUserAccounts}
          onChange={v => onChange({ hasUserAccounts: v })}
          label="Users create accounts"
          description="Your app has user registration and login"
        />
        <Toggle
          checked={formData.usesCookies}
          onChange={v => onChange({ usesCookies: v })}
          label="Uses cookies or tracking"
          description="Web cookies, localStorage, or device tracking technologies"
        />
        <Toggle
          checked={formData.collectsPayments}
          onChange={v => onChange({ collectsPayments: v })}
          label="Processes payments"
          description="In-app purchases, subscriptions, or billing"
        />
      </div>
    </div>
  )
}
