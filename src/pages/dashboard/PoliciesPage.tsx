import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Search, Copy, ExternalLink, Edit2, Trash2,
  Globe, Eye, MoreHorizontal, FileText,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/EmptyState'
import { usePolicyStore } from '@/store/policyStore'
import { timeAgo } from '@/utils/date'
import type { Policy } from '@/types'

function PolicyMenu({ policy, onClose }: { policy: Policy; onClose: () => void }) {
  const { deletePolicy, publishPolicy, unpublishPolicy } = usePolicyStore()
  const navigate = useNavigate()

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/p/${policy.slug}`)
    toast.success('Link copied!')
    onClose()
  }

  const handleDelete = () => {
    deletePolicy(policy.id)
    toast.success('Policy deleted')
    onClose()
  }

  return (
    <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08)] p-1 z-10">
      <button
        onClick={() => { navigate(`/dashboard/editor/${policy.id}`); onClose() }}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
      >
        <Edit2 className="size-4 text-gray-400" /> Edit
      </button>
      {policy.status === 'published' ? (
        <>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
          >
            <Copy className="size-4 text-gray-400" /> Copy link
          </button>
          <button
            onClick={() => { navigate(`/p/${policy.slug}`); onClose() }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
          >
            <ExternalLink className="size-4 text-gray-400" /> View public page
          </button>
          <button
            onClick={() => { unpublishPolicy(policy.id); toast.success('Policy unpublished'); onClose() }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
          >
            <Globe className="size-4 text-gray-400" /> Unpublish
          </button>
        </>
      ) : (
        <button
          onClick={() => { publishPolicy(policy.id); toast.success('Policy published!'); onClose() }}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
        >
          <Globe className="size-4 text-gray-400" /> Publish
        </button>
      )}
      <div className="border-t border-gray-100 dark:border-gray-800 my-1" />
      <button
        onClick={handleDelete}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
      >
        <Trash2 className="size-4" /> Delete
      </button>
    </div>
  )
}

function PolicyCard({ policy }: { policy: Policy }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const { publishPolicy } = usePolicyStore()

  return (
    <Card className="relative">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => navigate(`/dashboard/editor/${policy.id}`)}
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
            {policy.title}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Updated {timeAgo(policy.lastUpdated)}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <StatusBadge status={policy.status} />
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <MoreHorizontal className="size-4" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-0" onClick={() => setMenuOpen(false)} />
                <PolicyMenu policy={policy} onClose={() => setMenuOpen(false)} />
              </>
            )}
          </div>
        </div>
      </div>

      {policy.companyName && (
        <p className="text-xs text-gray-500 mb-3">{policy.companyName}</p>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          variant="ghost"
          leftIcon={<Edit2 className="size-3.5" />}
          onClick={() => navigate(`/dashboard/editor/${policy.id}`)}
        >
          Edit
        </Button>
        {policy.status === 'published' ? (
          <>
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<Copy className="size-3.5" />}
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/p/${policy.slug}`)
                toast.success('Link copied!')
              }}
            >
              Copy link
            </Button>
            <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
              <Eye className="size-3" /> {policy.views.toLocaleString()} views
            </span>
          </>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<Globe className="size-3.5" />}
            onClick={() => { publishPolicy(policy.id); toast.success('Policy published!') }}
          >
            Publish
          </Button>
        )}
      </div>
    </Card>
  )
}

export function PoliciesPage() {
  const navigate = useNavigate()
  const { policies } = usePolicyStore()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [deleteModal, setDeleteModal] = useState(false)

  const filtered = policies.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.status === filter
    return matchSearch && matchFilter
  })

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Policies</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {policies.length} {policies.length === 1 ? 'policy' : 'policies'}
            </p>
          </div>
          <Button
            leftIcon={<Plus className="size-4" />}
            onClick={() => navigate('/dashboard/editor/new')}
          >
            New Policy
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search policies..."
              leftElement={<Search className="size-4" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            {(['all', 'published', 'draft'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all capitalize ${
                  filter === f
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm font-medium'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<FileText className="size-8" />}
            title={search ? 'No policies found' : 'No policies yet'}
            description={search ? 'Try a different search term.' : 'Create your first privacy policy to get started.'}
            action={!search ? { label: 'Create policy', onClick: () => navigate('/dashboard/editor/new') } : undefined}
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))}
          </div>
        )}
      </div>

      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete policy"
        description="This action cannot be undone. The policy will be permanently deleted."
        size="sm"
      >
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => setDeleteModal(false)}>Delete</Button>
        </div>
      </Modal>
    </DashboardLayout>
  )
}
