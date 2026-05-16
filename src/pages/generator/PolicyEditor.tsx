import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, Globe, ExternalLink, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { usePolicyStore } from '@/store/policyStore'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/utils/date'
import { cn } from '@/utils/cn'
import type { PolicySection } from '@/types'

interface PolicyEditorProps {
  policyId: string
  onBack: () => void
}

const inputClass = cn(
  'w-full px-3 rounded-xl border text-sm bg-white dark:bg-gray-900',
  'text-gray-900 dark:text-white placeholder:text-gray-400',
  'border-gray-200 dark:border-gray-700',
  'focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-colors'
)

function SectionCard({
  section,
  index,
  onContentChange,
  onTitleChange,
  onRemove,
}: {
  section: PolicySection
  index: number
  onContentChange: (content: string) => void
  onTitleChange: (title: string) => void
  onRemove: () => void
}) {
  const [editingTitle, setEditingTitle] = useState(false)
  const [titleDraft, setTitleDraft] = useState(section.title)

  function commitTitle() {
    if (titleDraft.trim() && titleDraft.trim() !== section.title) {
      onTitleChange(titleDraft.trim())
    } else {
      setTitleDraft(section.title)
    }
    setEditingTitle(false)
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden group">
      {/* Section header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <span className="text-xs font-mono text-gray-300 dark:text-gray-600 shrink-0">
          {(index + 1).toString().padStart(2, '0')}
        </span>

        {editingTitle ? (
          <div className="flex-1 flex items-center gap-1.5">
            <input
              autoFocus
              value={titleDraft}
              onChange={e => setTitleDraft(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={e => { if (e.key === 'Enter') commitTitle(); if (e.key === 'Escape') { setTitleDraft(section.title); setEditingTitle(false) } }}
              className="flex-1 h-7 px-2 rounded-lg border border-brand-400 bg-white dark:bg-gray-900 text-sm font-medium text-gray-900 dark:text-white outline-none"
            />
            <button type="button" onClick={commitTitle} className="size-6 flex items-center justify-center text-green-500 hover:text-green-600">
              <Check className="size-3.5" />
            </button>
            <button type="button" onClick={() => { setTitleDraft(section.title); setEditingTitle(false) }} className="size-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
              <X className="size-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditingTitle(true)}
            className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300 text-left hover:text-brand-600 dark:hover:text-brand-400 transition-colors truncate"
            title="Click to edit title"
          >
            {section.title}
          </button>
        )}

        <button
          type="button"
          onClick={onRemove}
          className="size-6 flex items-center justify-center rounded text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all shrink-0"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>

      {/* Content */}
      <textarea
        value={section.content}
        onChange={e => onContentChange(e.target.value)}
        rows={Math.max(4, section.content.split('\n').length + 1)}
        className="w-full px-4 py-3 text-sm leading-7 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-950 resize-none outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500/20 transition-shadow"
        placeholder="Section content…"
      />
    </div>
  )
}

function AddSectionForm({ onAdd }: { onAdd: (section: Omit<PolicySection, 'id'>) => void }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  function submit() {
    if (!title.trim() || !content.trim()) return
    onAdd({ title: title.trim(), content: content.trim(), order: 9999 })
    setTitle('')
    setContent('')
    setOpen(false)
    toast.success('Section added')
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 text-sm text-gray-400 hover:border-brand-400 hover:text-brand-600 dark:hover:border-brand-600 dark:hover:text-brand-400 transition-colors"
      >
        <Plus className="size-4" />
        Add custom section
      </button>
    )
  }

  return (
    <div className="rounded-xl border border-dashed border-brand-300 dark:border-brand-700 overflow-hidden bg-brand-50/30 dark:bg-brand-950/20">
      <div className="px-4 py-2.5 bg-brand-50 dark:bg-brand-950/40 border-b border-brand-100 dark:border-brand-900">
        <input
          autoFocus
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Section title *"
          className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
        />
      </div>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={4}
        placeholder="Section content *"
        className="w-full px-4 py-3 text-sm leading-7 text-gray-700 dark:text-gray-300 bg-transparent resize-none outline-none"
      />
      <div className="flex gap-2 px-4 py-2.5 border-t border-brand-100 dark:border-brand-900">
        <button
          type="button"
          onClick={submit}
          disabled={!title.trim() || !content.trim()}
          className="h-8 px-4 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Add section
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setTitle(''); setContent('') }}
          className="h-8 px-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export function PolicyEditor({ policyId, onBack }: PolicyEditorProps) {
  const { policies, updatePolicy, updateSection, addSection, removeSection, publishPolicy, unpublishPolicy } = usePolicyStore()
  const policy = policies.find(p => p.id === policyId)

  const [title, setTitle] = useState(policy?.title ?? '')
  const [companyName, setCompanyName] = useState(policy?.companyName ?? '')
  const [contactEmail, setContactEmail] = useState(policy?.contactEmail ?? '')
  const [websiteUrl, setWebsiteUrl] = useState(policy?.websiteUrl ?? '')
  const [infoSaved, setInfoSaved] = useState(false)

  if (!policy) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400">Policy not found.</p>
        <button type="button" onClick={onBack} className="mt-4 text-sm text-brand-600 hover:underline">
          Go back
        </button>
      </div>
    )
  }

  const sortedSections = [...policy.sections].sort((a, b) => a.order - b.order)

  function saveBasicInfo() {
    if (!title.trim()) { toast.error('Title is required'); return }
    updatePolicy(policyId, {
      title: title.trim(),
      companyName: companyName.trim() || undefined,
      contactEmail: contactEmail.trim() || undefined,
      websiteUrl: websiteUrl.trim() || undefined,
    })
    setInfoSaved(true)
    setTimeout(() => setInfoSaved(false), 2000)
    toast.success('Changes saved')
  }

  function handleSectionContent(sectionId: string, content: string) {
    updateSection(policyId, sectionId, content)
  }

  function handleSectionTitle(sectionId: string, newTitle: string) {
    const sections = policy.sections.map(s =>
      s.id === sectionId ? { ...s, title: newTitle } : s
    )
    updatePolicy(policyId, { sections })
  }

  function handleRemoveSection(sectionId: string) {
    if (!window.confirm('Remove this section?')) return
    removeSection(policyId, sectionId)
  }

  function handleAddSection(section: Omit<PolicySection, 'id'>) {
    addSection(policyId, { ...section, order: policy.sections.length })
  }

  function handleTogglePublish() {
    if (policy.status === 'published') {
      unpublishPolicy(policyId)
      toast.success('Policy unpublished — it is now a draft')
    } else {
      publishPolicy(policyId)
      toast.success('Policy published!')
    }
  }

  return (
    <div className="space-y-5">
      {/* Editor header */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={cn(inputClass, 'h-10 text-base font-semibold mb-3')}
              placeholder="Policy title"
            />
            <div className="grid sm:grid-cols-3 gap-2">
              <input
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                className={cn(inputClass, 'h-9')}
                placeholder="Company name"
              />
              <input
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                className={cn(inputClass, 'h-9')}
                placeholder="Contact email"
              />
              <input
                type="url"
                value={websiteUrl}
                onChange={e => setWebsiteUrl(e.target.value)}
                className={cn(inputClass, 'h-9')}
                placeholder="Website URL"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span
              className={cn(
                'px-2 py-0.5 rounded-full border font-medium',
                policy.status === 'published'
                  ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800'
                  : 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800'
              )}
            >
              {policy.status === 'published' ? 'Published' : 'Draft'}
            </span>
            <span>Last updated {formatDate(policy.lastUpdated)}</span>
            <span>{policy.sections.length} sections</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={infoSaved ? 'secondary' : 'outline'}
              leftIcon={infoSaved ? <Check className="size-3.5 text-green-600" /> : undefined}
              onClick={saveBasicInfo}
            >
              {infoSaved ? 'Saved' : 'Save info'}
            </Button>

            <Button
              size="sm"
              variant={policy.status === 'published' ? 'ghost' : 'primary'}
              onClick={handleTogglePublish}
              leftIcon={<Globe className="size-3.5" />}
            >
              {policy.status === 'published' ? 'Unpublish' : 'Publish'}
            </Button>

            {policy.status === 'published' && (
              <Link to={`/p/${policy.slug}`} target="_blank">
                <Button size="sm" variant="ghost" rightIcon={<ExternalLink className="size-3.5" />}>
                  View
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-2">
        {sortedSections.map((section, index) => (
          <SectionCard
            key={section.id}
            section={section}
            index={index}
            onContentChange={content => handleSectionContent(section.id, content)}
            onTitleChange={newTitle => handleSectionTitle(section.id, newTitle)}
            onRemove={() => handleRemoveSection(section.id)}
          />
        ))}

        <AddSectionForm onAdd={handleAddSection} />
      </div>

      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to my policies
      </button>
    </div>
  )
}
