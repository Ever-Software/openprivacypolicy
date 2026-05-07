import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Save, Globe, Eye, EyeOff, Plus, Trash2, GripVertical,
  ArrowLeft, CheckCircle, Settings, Copy, ExternalLink,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { StatusBadge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { usePolicyStore } from '@/store/policyStore'
import type { Policy, PolicySection } from '@/types'
import { cn } from '@/utils/cn'

const DEFAULT_SECTIONS: Omit<PolicySection, 'id'>[] = [
  {
    title: 'Introduction',
    content: 'This Privacy Policy describes how [Company Name] ("we," "us," or "our") collects, uses, and shares information about you when you use our services.',
    order: 0,
  },
  {
    title: 'Information We Collect',
    content: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, and payment information.',
    order: 1,
  },
  {
    title: 'How We Use Your Information',
    content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.',
    order: 2,
  },
  {
    title: 'Information Sharing',
    content: 'We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this policy.',
    order: 3,
  },
  {
    title: 'Data Security',
    content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
    order: 4,
  },
  {
    title: 'Your Rights',
    content: 'You have the right to access, correct, or delete your personal data. You may also have the right to object to or restrict certain processing of your data.',
    order: 5,
  },
  {
    title: 'Contact Us',
    content: 'If you have questions about this Privacy Policy, please contact us at [contact email].',
    order: 6,
  },
]

interface SectionEditorProps {
  section: PolicySection
  onUpdate: (id: string, content: string) => void
  onUpdateTitle: (id: string, title: string) => void
  onDelete: (id: string) => void
  isActive: boolean
  onActivate: () => void
}

function SectionEditor({ section, onUpdate, onUpdateTitle, onDelete, isActive, onActivate }: SectionEditorProps) {
  return (
    <div
      className={cn(
        'rounded-xl border transition-all',
        isActive
          ? 'border-brand-200 dark:border-brand-800 bg-white dark:bg-gray-900 shadow-sm'
          : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900'
      )}
      onClick={onActivate}
    >
      <div className="flex items-center gap-2 px-4 pt-4 pb-2">
        <GripVertical className="size-4 text-gray-300 cursor-grab flex-shrink-0" />
        <input
          type="text"
          value={section.title}
          onChange={(e) => onUpdateTitle(section.id, e.target.value)}
          className="flex-1 text-sm font-semibold text-gray-900 dark:text-white bg-transparent border-none outline-none placeholder:text-gray-400"
          placeholder="Section title"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(section.id) }}
          className="p-1 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
      <div className="px-4 pb-4">
        <textarea
          value={section.content}
          onChange={(e) => onUpdate(section.id, e.target.value)}
          rows={isActive ? 5 : 3}
          className={cn(
            'w-full text-sm text-gray-600 dark:text-gray-400 bg-transparent border-none outline-none resize-none leading-relaxed',
            'placeholder:text-gray-300 dark:placeholder:text-gray-600'
          )}
          placeholder="Write section content..."
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  )
}

interface SettingsModalProps {
  policy: Policy
  open: boolean
  onClose: () => void
  onSave: (data: Partial<Policy>) => void
}

function SettingsModal({ policy, open, onClose, onSave }: SettingsModalProps) {
  const [form, setForm] = useState({
    title: policy.title,
    companyName: policy.companyName ?? '',
    websiteUrl: policy.websiteUrl ?? '',
    contactEmail: policy.contactEmail ?? '',
  })

  return (
    <Modal open={open} onClose={onClose} title="Policy settings" size="md">
      <div className="space-y-4">
        <Input
          label="Policy title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Input
          label="Company / App name"
          placeholder="Acme Corp"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        />
        <Input
          label="Website URL"
          type="url"
          placeholder="https://example.com"
          value={form.websiteUrl}
          onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
        />
        <Input
          label="Contact email"
          type="email"
          placeholder="privacy@example.com"
          value={form.contactEmail}
          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
        />
        <div className="flex gap-2 pt-2 justify-end">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => { onSave(form); onClose() }}>Save settings</Button>
        </div>
      </div>
    </Modal>
  )
}

export function PolicyEditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { policies, createPolicy, updatePolicy, publishPolicy, unpublishPolicy, addSection, removeSection } = usePolicyStore()
  const [policy, setPolicy] = useState<Policy | null>(null)
  const [sections, setSections] = useState<PolicySection[]>([])
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const [preview, setPreview] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (id === 'new') {
      const newPolicy = createPolicy({
        title: 'Untitled Policy',
        sections: DEFAULT_SECTIONS.map((s, i) => ({ ...s, id: `s-${i}` })),
      })
      setPolicy(newPolicy)
      setSections(newPolicy.sections)
      navigate(`/dashboard/editor/${newPolicy.id}`, { replace: true })
    } else {
      const found = policies.find((p) => p.id === id)
      if (found) {
        setPolicy(found)
        setSections(found.sections)
      } else {
        navigate('/dashboard/policies')
      }
    }
  }, [id])

  const scheduleSave = useCallback((updatedSections: PolicySection[]) => {
    setSaveState('saving')
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(() => {
      if (policy) {
        updatePolicy(policy.id, { sections: updatedSections })
        setSaveState('saved')
        setTimeout(() => setSaveState('idle'), 2000)
      }
    }, 1000)
  }, [policy, updatePolicy])

  const handleUpdateSection = (sectionId: string, content: string) => {
    const updated = sections.map((s) => s.id === sectionId ? { ...s, content } : s)
    setSections(updated)
    scheduleSave(updated)
  }

  const handleUpdateTitle = (sectionId: string, title: string) => {
    const updated = sections.map((s) => s.id === sectionId ? { ...s, title } : s)
    setSections(updated)
    scheduleSave(updated)
  }

  const handleDeleteSection = (sectionId: string) => {
    const updated = sections.filter((s) => s.id !== sectionId)
    setSections(updated)
    if (policy) removeSection(policy.id, sectionId)
  }

  const handleAddSection = () => {
    const newSection: PolicySection = {
      id: `s-${Date.now()}`,
      title: 'New Section',
      content: '',
      order: sections.length,
    }
    const updated = [...sections, newSection]
    setSections(updated)
    if (policy) addSection(policy.id, { title: newSection.title, content: newSection.content, order: newSection.order })
    setActiveSectionId(newSection.id)
  }

  const handleManualSave = () => {
    if (policy) {
      updatePolicy(policy.id, { sections })
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 2000)
      toast.success('Policy saved')
    }
  }

  const handlePublish = () => {
    if (policy) {
      updatePolicy(policy.id, { sections })
      publishPolicy(policy.id)
      setPolicy({ ...policy, status: 'published' })
      toast.success('Policy published!')
    }
  }

  const handleUnpublish = () => {
    if (policy) {
      unpublishPolicy(policy.id)
      setPolicy({ ...policy, status: 'draft' })
      toast.success('Policy unpublished')
    }
  }

  if (!policy) return null

  return (
    <DashboardLayout>
      {/* Top bar */}
      <div className="sticky top-16 z-10 glass border-b border-gray-100 dark:border-gray-800 px-4 sm:px-6 h-14 flex items-center gap-3">
        <button
          onClick={() => navigate('/dashboard/policies')}
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          <ArrowLeft className="size-4" />
        </button>

        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={policy.title}
            onChange={(e) => {
              setPolicy({ ...policy, title: e.target.value })
              updatePolicy(policy.id, { title: e.target.value })
            }}
            className="text-sm font-semibold text-gray-900 dark:text-white bg-transparent border-none outline-none w-full truncate"
          />
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {saveState === 'saving' && (
            <span className="text-xs text-gray-400 hidden sm:block">Saving...</span>
          )}
          {saveState === 'saved' && (
            <span className="text-xs text-green-600 flex items-center gap-1 hidden sm:flex">
              <CheckCircle className="size-3" /> Saved
            </span>
          )}

          <StatusBadge status={policy.status} />

          <button
            onClick={() => setPreview((v) => !v)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            title="Toggle preview"
          >
            {preview ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>

          <button
            onClick={() => setSettingsOpen(true)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            <Settings className="size-4" />
          </button>

          <Button variant="outline" size="sm" leftIcon={<Save className="size-3.5" />} onClick={handleManualSave}>
            Save
          </Button>

          {policy.status === 'published' ? (
            <div className="flex gap-1.5">
              <Button
                size="sm"
                variant="secondary"
                leftIcon={<Copy className="size-3.5" />}
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/p/${policy.slug}`)
                  toast.success('Link copied!')
                }}
              >
                Copy link
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleUnpublish}
              >
                Unpublish
              </Button>
            </div>
          ) : (
            <Button size="sm" leftIcon={<Globe className="size-3.5" />} onClick={handlePublish}>
              Publish
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-1 h-[calc(100vh-8rem)]">
        {/* Editor pane */}
        {!preview && (
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 scrollbar-thin">
            <div className="max-w-2xl mx-auto space-y-3">
              {sections
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <SectionEditor
                    key={section.id}
                    section={section}
                    onUpdate={handleUpdateSection}
                    onUpdateTitle={handleUpdateTitle}
                    onDelete={handleDeleteSection}
                    isActive={activeSectionId === section.id}
                    onActivate={() => setActiveSectionId(section.id)}
                  />
                ))}
              <button
                onClick={handleAddSection}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-400 hover:text-brand-600 hover:border-brand-300 transition-all"
              >
                <Plus className="size-4" /> Add section
              </button>
            </div>
          </div>
        )}

        {/* Preview pane */}
        {preview && (
          <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 px-4 sm:px-8 py-8 scrollbar-thin">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-6 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-700 dark:text-amber-400">
                <Eye className="size-4 flex-shrink-0" />
                Preview mode — this is how your public policy will look
                {policy.status === 'published' && (
                  <a
                    href={`/p/${policy.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1 hover:underline"
                  >
                    Open public page <ExternalLink className="size-3" />
                  </a>
                )}
              </div>

              <article className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{policy.title}</h1>
                <p className="text-sm text-gray-400 mb-8">
                  Last updated: {new Date(policy.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <div className="space-y-6">
                  {sections.sort((a, b) => a.order - b.order).map((section) => (
                    <div key={section.id}>
                      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{section.title}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        )}
      </div>

      <SettingsModal
        policy={policy}
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSave={(data) => {
          updatePolicy(policy.id, data)
          setPolicy({ ...policy, ...data })
          toast.success('Settings saved')
        }}
      />
    </DashboardLayout>
  )
}
