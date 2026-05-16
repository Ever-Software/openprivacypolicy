import { Link } from 'react-router-dom'
import { ExternalLink, Pencil, Trash2, ShieldCheck, Globe, FileText } from 'lucide-react'
import toast from 'react-hot-toast'
import { usePolicyStore } from '@/store/policyStore'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/utils/date'
import { cn } from '@/utils/cn'

interface MyPoliciesPanelProps {
  onEdit: (policyId: string) => void
  onNewPolicy: () => void
}

const STATUS_STYLES = {
  published: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800',
  draft: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800',
  archived: 'bg-gray-100 text-gray-400 border-gray-200 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-700',
}

const STATUS_LABELS = {
  published: 'Published',
  draft: 'Draft',
  archived: 'Archived',
}

export function MyPoliciesPanel({ onEdit, onNewPolicy }: MyPoliciesPanelProps) {
  const { policies, deletePolicy } = usePolicyStore()

  function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    deletePolicy(id)
    toast.success('Policy deleted')
  }

  if (policies.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
        <div className="size-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="size-7 text-gray-300 dark:text-gray-600" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">No policies yet</h3>
        <p className="text-sm text-gray-400 mb-6 max-w-xs mx-auto">
          Use the generator to create your first privacy policy in minutes.
        </p>
        <Button onClick={onNewPolicy} leftIcon={<FileText className="size-4" />}>
          Create a policy
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {policies.length} {policies.length === 1 ? 'policy' : 'policies'}
        </p>
        <Button size="sm" onClick={onNewPolicy} leftIcon={<FileText className="size-3.5" />}>
          New policy
        </Button>
      </div>

      <div className="space-y-2">
        {policies
          .slice()
          .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
          .map(policy => (
            <div
              key={policy.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 flex items-start gap-4 group hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              {/* Icon */}
              <div className="size-9 rounded-xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="size-4 text-brand-500" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-0.5 flex-wrap">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {policy.title}
                  </h3>
                  <span
                    className={cn(
                      'inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border shrink-0',
                      STATUS_STYLES[policy.status]
                    )}
                  >
                    {STATUS_LABELS[policy.status]}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-400">
                  {policy.companyName && <span>{policy.companyName}</span>}
                  <span>Updated {formatDate(policy.lastUpdated)}</span>
                  <span>{policy.sections.length} sections</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => onEdit(policy.id)}
                  className="h-8 px-3 flex items-center gap-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Pencil className="size-3.5" />
                  <span className="hidden sm:inline">Edit</span>
                </button>

                {policy.status === 'published' && (
                  <Link
                    to={`/p/${policy.slug}`}
                    target="_blank"
                    className="h-8 px-3 flex items-center gap-1.5 rounded-lg text-xs font-medium text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 transition-colors"
                  >
                    <Globe className="size-3.5" />
                    <span className="hidden sm:inline">View</span>
                    <ExternalLink className="size-3" />
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(policy.id, policy.title)}
                  className="size-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
