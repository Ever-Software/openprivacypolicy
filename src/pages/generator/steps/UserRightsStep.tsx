import type { GeneratorFormData } from '@/store/generatorStore'
import { cn } from '@/utils/cn'

interface UserRightsStepProps {
  formData: GeneratorFormData
  onChange: (data: Partial<GeneratorFormData>) => void
}

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
      className="flex items-start justify-between gap-4 py-3.5 w-full text-left"
    >
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{description}</p>}
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

export function UserRightsStep({ formData, onChange }: UserRightsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Rights & compliance</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure what rights users have and which regulations apply to your app.
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
          User data rights
        </p>
        <div className="divide-y divide-gray-100 dark:divide-gray-800 border-t border-b border-gray-100 dark:border-gray-800">
          <Toggle
            checked={formData.allowsDeletion}
            onChange={v => onChange({ allowsDeletion: v })}
            label="Users can request data deletion"
            description="Users may email you to permanently delete their account and associated data."
          />
          <Toggle
            checked={formData.allowsExport}
            onChange={v => onChange({ allowsExport: v })}
            label="Users can export their data"
            description="Users may request a copy of their data in a portable format (data portability)."
          />
          <Toggle
            checked={formData.allowsOptOut}
            onChange={v => onChange({ allowsOptOut: v })}
            label="Users can opt out of marketing"
            description="Users can unsubscribe from promotional emails and communications at any time."
          />
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
          Audience & regulations
        </p>
        <div className="divide-y divide-gray-100 dark:divide-gray-800 border-t border-b border-gray-100 dark:border-gray-800">
          <Toggle
            checked={formData.targetedAtChildren}
            onChange={v => onChange({ targetedAtChildren: v })}
            label="App targets children under 13"
            description="Enables COPPA compliance language and parental consent requirements."
          />
          <Toggle
            checked={formData.coversGDPR}
            onChange={v => onChange({ coversGDPR: v })}
            label="Users may be located in the EU"
            description="Adds GDPR-specific rights (lawful basis, supervisory authority, consent withdrawal)."
          />
          <Toggle
            checked={formData.coversCCPA}
            onChange={v => onChange({ coversCCPA: v })}
            label="Users may be in California, USA"
            description="Adds California Consumer Privacy Act (CCPA) rights section."
          />
          <Toggle
            checked={formData.coversLGPD}
            onChange={v => onChange({ coversLGPD: v })}
            label="Users may be in Brazil"
            description="Adds LGPD (Lei Geral de Proteção de Dados) rights section."
          />
        </div>
      </div>
    </div>
  )
}
