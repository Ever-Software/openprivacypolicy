import type { GeneratorFormData } from '@/store/generatorStore'
import { cn } from '@/utils/cn'

interface BasicInfoStepProps {
  formData: GeneratorFormData
  onChange: (data: Partial<GeneratorFormData>) => void
  errors: Record<string, string>
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
        {label}
      </label>
      {hint && <p className="text-xs text-gray-400 mb-1.5">{hint}</p>}
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}

const inputClass = (error?: string) =>
  cn(
    'w-full h-10 px-3 rounded-xl border text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 transition-colors outline-none',
    'focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500',
    error
      ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
  )

export function BasicInfoStep({ formData, onChange, errors }: BasicInfoStepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Basic information</h2>
        <p className="text-sm text-gray-500 mt-1">Tell us about your app or product so we can generate an accurate policy.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="App / Product name *" error={errors.appName}>
          <input
            type="text"
            value={formData.appName}
            onChange={e => onChange({ appName: e.target.value })}
            placeholder="e.g. MyApp"
            className={inputClass(errors.appName)}
            autoFocus
          />
        </Field>

        <Field label="Company / Developer name *" error={errors.companyName}>
          <input
            type="text"
            value={formData.companyName}
            onChange={e => onChange({ companyName: e.target.value })}
            placeholder="e.g. Acme Corp"
            className={inputClass(errors.companyName)}
          />
        </Field>
      </div>

      <Field
        label="Contact email *"
        hint="Users will use this email to submit privacy-related requests."
        error={errors.contactEmail}
      >
        <input
          type="email"
          value={formData.contactEmail}
          onChange={e => onChange({ contactEmail: e.target.value })}
          placeholder="privacy@yourcompany.com"
          className={inputClass(errors.contactEmail)}
        />
      </Field>

      <Field
        label="Website URL"
        hint="Optional. Include if your app has a public website."
        error={errors.websiteUrl}
      >
        <input
          type="url"
          value={formData.websiteUrl}
          onChange={e => onChange({ websiteUrl: e.target.value })}
          placeholder="https://yourapp.com"
          className={inputClass(errors.websiteUrl)}
        />
      </Field>

      <Field
        label="Policy effective date *"
        hint="The date from which this policy is valid."
        error={errors.effectiveDate}
      >
        <input
          type="date"
          value={formData.effectiveDate}
          onChange={e => onChange({ effectiveDate: e.target.value })}
          className={inputClass(errors.effectiveDate)}
        />
      </Field>
    </div>
  )
}
