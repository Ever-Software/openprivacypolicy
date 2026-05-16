import { useState } from 'react'
import { Download, FileJson, Globe, Sparkles, Check, Plus, X, Pencil, Info, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { CONTACT_HREF } from '@/config/contact'
import type { GeneratorFormData, CustomSection } from '@/store/generatorStore'
import type { PolicySection } from '@/types'
import { cn } from '@/utils/cn'

interface ReviewStepProps {
  formData: GeneratorFormData
  sections: PolicySection[]
  policyTitle: string
  onFormChange: (data: Partial<GeneratorFormData>) => void
  onExportPDF: () => void
  onExportJSON: () => void
  onPublish: () => void
  publishing: boolean
}

function SummaryItem({ label, value }: { label: string; value: string | boolean | string[] }) {
  if (typeof value === 'boolean') {
    return (
      <div className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800">
        <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
        <span
          className={cn(
            'text-xs font-medium px-2 py-0.5 rounded-full',
            value
              ? 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400'
              : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
          )}
        >
          {value ? 'Yes' : 'No'}
        </span>
      </div>
    )
  }
  if (Array.isArray(value)) {
    return (
      <div className="flex items-start justify-between gap-4 py-2 border-b border-gray-50 dark:border-gray-800">
        <span className="text-sm text-gray-600 dark:text-gray-400 shrink-0">{label}</span>
        <span className="text-xs text-gray-500 text-right">{value.length === 0 ? 'None' : value.join(', ')}</span>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[55%] text-right">
        {value || '—'}
      </span>
    </div>
  )
}

function CustomSectionsManager({
  sections,
  onChange,
}: {
  sections: CustomSection[]
  onChange: (sections: CustomSection[]) => void
}) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  function newId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2)
  }

  function startAdd() {
    setAdding(true)
    setEditingId(null)
    setTitle('')
    setContent('')
  }

  function startEdit(section: CustomSection) {
    setEditingId(section.id)
    setAdding(false)
    setTitle(section.title)
    setContent(section.content)
  }

  function cancel() {
    setAdding(false)
    setEditingId(null)
    setTitle('')
    setContent('')
  }

  function save() {
    if (!title.trim() || !content.trim()) return
    if (editingId) {
      onChange(sections.map(s => s.id === editingId ? { ...s, title: title.trim(), content: content.trim() } : s))
      setEditingId(null)
    } else {
      onChange([...sections, { id: newId(), title: title.trim(), content: content.trim() }])
      setAdding(false)
    }
    setTitle('')
    setContent('')
  }

  function remove(id: string) {
    onChange(sections.filter(s => s.id !== id))
  }

  const inputClass = cn(
    'w-full px-3 rounded-xl border text-sm bg-white dark:bg-gray-900',
    'text-gray-900 dark:text-white placeholder:text-gray-400',
    'border-gray-200 dark:border-gray-700',
    'focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-colors'
  )

  const showForm = adding || editingId !== null

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Custom sections
        </p>
        {!showForm && (
          <button
            type="button"
            onClick={startAdd}
            className="flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium transition-colors"
          >
            <Plus className="size-3.5" />
            Add section
          </button>
        )}
      </div>

      {sections.length === 0 && !showForm && (
        <button
          type="button"
          onClick={startAdd}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 text-sm text-gray-400 hover:border-brand-400 hover:text-brand-600 dark:hover:border-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          <Plus className="size-4" />
          Add a custom section to your policy
        </button>
      )}

      {sections.length > 0 && (
        <div className="space-y-2 mb-3">
          {sections.map(section => (
            <div key={section.id}>
              {editingId === section.id ? (
                <div className="p-3 rounded-xl border border-brand-300 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-950/20 space-y-2">
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Section title *"
                    className={cn(inputClass, 'h-9')}
                    autoFocus
                  />
                  <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Section content *"
                    rows={4}
                    className={cn(inputClass, 'py-2 resize-none leading-relaxed')}
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={save}
                      disabled={!title.trim() || !content.trim()}
                      className="h-8 px-4 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancel}
                      className="h-8 px-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{section.title}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{section.content}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => startEdit(section)}
                      className="size-7 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(section.id)}
                      className="size-7 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {adding && (
        <div className="p-3 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 space-y-2 bg-gray-50 dark:bg-gray-900">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Section title *"
            className={cn(inputClass, 'h-9')}
            autoFocus
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Section content *"
            rows={4}
            className={cn(inputClass, 'py-2 resize-none leading-relaxed')}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={save}
              disabled={!title.trim() || !content.trim()}
              className="h-8 px-4 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Add section
            </button>
            <button
              type="button"
              onClick={cancel}
              className="h-8 px-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function ReviewStep({
  formData,
  sections,
  policyTitle,
  onFormChange,
  onExportPDF,
  onExportJSON,
  onPublish,
  publishing,
}: ReviewStepProps) {
  const dataTypeLabels: Record<string, string> = {
    'full-name': 'Name', 'email': 'Email', 'phone': 'Phone', 'location': 'Location',
    'device': 'Device', 'usage': 'Usage', 'financial': 'Financial', 'health': 'Health',
    'photos': 'Photos', 'contacts': 'Contacts',
  }

  const allDataTypes = [
    ...formData.dataTypes.map(t => dataTypeLabels[t] || t),
    ...formData.customDataTypes,
  ]

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Check className="size-5 text-green-500" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your policy is ready</h2>
        </div>
        <p className="text-sm text-gray-500">
          Review the summary, add custom sections if needed, then export or get a preview link.
        </p>
      </div>

      {/* Summary card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{policyTitle}</p>
          <p className="text-xs text-gray-400">{sections.length} sections generated</p>
        </div>
        <div className="px-4 py-1">
          <SummaryItem label="App name" value={formData.appName} />
          <SummaryItem label="Company" value={formData.companyName} />
          <SummaryItem label="Contact email" value={formData.contactEmail} />
          {formData.websiteUrl && <SummaryItem label="Website" value={formData.websiteUrl} />}
          <SummaryItem label="Data collected" value={allDataTypes} />
          <SummaryItem label="Cookies / tracking" value={formData.usesCookies} />
          <SummaryItem label="User accounts" value={formData.hasUserAccounts} />
          <SummaryItem label="Payment processing" value={formData.collectsPayments} />
          <SummaryItem label="Third-party sharing" value={formData.sharesWithThirdParties} />
          <SummaryItem label="Data deletion right" value={formData.allowsDeletion} />
          <SummaryItem label="GDPR (EU)" value={formData.coversGDPR} />
          <SummaryItem label="CCPA (California)" value={formData.coversCCPA} />
          <SummaryItem label="LGPD (Brazil)" value={formData.coversLGPD} />
        </div>
      </div>

      {/* Custom sections */}
      <CustomSectionsManager
        sections={formData.customSections}
        onChange={cs => onFormChange({ customSections: cs })}
      />

      {/* Export options */}
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Export
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onExportPDF}
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all text-left"
          >
            <div className="size-9 rounded-lg bg-red-50 dark:bg-red-950/50 flex items-center justify-center shrink-0">
              <Download className="size-4 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Export as PDF</p>
              <p className="text-xs text-gray-400">Print-ready, with discrete watermark</p>
            </div>
          </button>

          <button
            type="button"
            onClick={onExportJSON}
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all text-left"
          >
            <div className="size-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center shrink-0">
              <FileJson className="size-4 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Export as JSON</p>
              <p className="text-xs text-gray-400">Machine-readable, structured format</p>
            </div>
          </button>
        </div>
      </div>

      {/* Preview link CTA */}
      <div className="rounded-2xl border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-950/30 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="hidden sm:flex shrink-0 size-10 rounded-xl bg-brand-100 dark:bg-brand-900 items-center justify-center">
            <Globe className="size-5 text-brand-600 dark:text-brand-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
              Create a shareable preview link
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
              Generates a temporary URL stored in your browser — useful for sharing a draft or testing the layout. The link works only on this device and browser.
            </p>

            {/* Clarification notice */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-4">
              <Info className="size-3.5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                <strong>This is not permanent hosting.</strong> The preview link lives in your browser's local storage and will not be accessible from other devices. For a stable, public URL that works anywhere, you need managed hosting.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onPublish}
                loading={publishing}
                leftIcon={<Globe className="size-4" />}
                variant="secondary"
                className="w-full sm:w-auto justify-center"
              >
                Create preview link
              </Button>

              <a href={CONTACT_HREF} className="block sm:inline-block">
                <Button
                  variant="outline"
                  leftIcon={<Sparkles className="size-4" />}
                  className="w-full sm:w-auto justify-center"
                >
                  Request permanent hosting
                </Button>
              </a>
            </div>

            <div className="mt-4 pt-4 border-t border-brand-100 dark:border-brand-900 grid sm:grid-cols-2 gap-3">
              {[
                { icon: <Globe className="size-3.5 text-brand-500" />, title: 'Permanent public URL', desc: 'Stable link, accessible from any device, forever' },
                { icon: <Check className="size-3.5 text-brand-500" />, title: 'Managed & reviewed', desc: 'Our team reviews and publishes it for you' },
                { icon: <Sparkles className="size-3.5 text-brand-500" />, title: 'QR code & embed', desc: 'Share via link, QR code, or embed badge' },
                { icon: <Mail className="size-3.5 text-brand-500" />, title: 'Simple process', desc: 'Send us your policy via email — we handle the rest' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-2">
                  <div className="mt-0.5">{icon}</div>
                  <div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{title}</p>
                    <p className="text-xs text-gray-400 leading-tight">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Need permanent hosting?{' '}
              <Link to="/#pricing" className="text-brand-600 dark:text-brand-400 hover:underline">
                View our plans
              </Link>
              {' '}or{' '}
              <a href={CONTACT_HREF} className="text-brand-600 dark:text-brand-400 hover:underline">
                get in touch
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
