import { Link, useNavigate } from 'react-router-dom'
import { Plus, ArrowRight, Eye, FileText, TrendingUp, Globe } from 'lucide-react'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/Badge'
import { useAuthStore } from '@/store/authStore'
import { usePolicyStore } from '@/store/policyStore'
import { timeAgo } from '@/utils/date'

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string | number; sub?: string }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
        <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
          {icon}
        </div>
      </div>
    </Card>
  )
}

export function DashboardOverview() {
  const { user } = useAuthStore()
  const { policies } = usePolicyStore()
  const navigate = useNavigate()

  const publishedPolicies = policies.filter((p) => p.status === 'published')
  const totalViews = policies.reduce((sum, p) => sum + p.views, 0)
  const recentPolicies = [...policies].sort(
    (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  ).slice(0, 5)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {greeting}, {user?.name.split(' ')[0]} 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Here's an overview of your privacy policies.
            </p>
          </div>
          <Button
            leftIcon={<Plus className="size-4" />}
            onClick={() => navigate('/dashboard/editor/new')}
            className="flex-shrink-0"
          >
            New Policy
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<FileText className="size-5" />}
            label="Total policies"
            value={policies.length}
            sub={`${publishedPolicies.length} published`}
          />
          <StatCard
            icon={<Globe className="size-5" />}
            label="Published"
            value={publishedPolicies.length}
          />
          <StatCard
            icon={<Eye className="size-5" />}
            label="Total views"
            value={totalViews.toLocaleString()}
            sub="All time"
          />
          <StatCard
            icon={<TrendingUp className="size-5" />}
            label="This month"
            value="+18%"
            sub="vs last month"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent policies */}
          <div className="lg:col-span-2">
            <Card padding="none">
              <CardHeader className="px-5 pt-5 pb-0 mb-0">
                <CardTitle>Recent policies</CardTitle>
                <Link to="/dashboard/policies" className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1">
                  View all <ArrowRight className="size-3.5" />
                </Link>
              </CardHeader>
              <div className="divide-y divide-gray-50 dark:divide-gray-800">
                {recentPolicies.map((policy) => (
                  <div
                    key={policy.id}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/dashboard/editor/${policy.id}`)}
                  >
                    <div className="size-9 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center flex-shrink-0">
                      <FileText className="size-4 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {policy.title}
                      </p>
                      <p className="text-xs text-gray-400">{timeAgo(policy.lastUpdated)}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {policy.status === 'published' && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Eye className="size-3" />{policy.views.toLocaleString()}
                        </span>
                      )}
                      <StatusBadge status={policy.status} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick actions */}
          <div className="space-y-4">
            <Card>
              <CardTitle className="mb-4">Quick actions</CardTitle>
              <div className="space-y-2">
                {[
                  { label: 'Create new policy', href: '/dashboard/editor/new', icon: <Plus className="size-4" /> },
                  { label: 'Browse templates', href: '/dashboard/templates', icon: <FileText className="size-4" /> },
                  { label: 'View analytics', href: '/dashboard/analytics', icon: <TrendingUp className="size-4" /> },
                ].map((a) => (
                  <Link
                    key={a.label}
                    to={a.href}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <span className="text-brand-600 dark:text-brand-400">{a.icon}</span>
                    {a.label}
                  </Link>
                ))}
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-brand-500 to-brand-700 border-0">
              <p className="text-sm font-semibold text-white mb-1">Upgrade to Pro</p>
              <p className="text-xs text-brand-200 mb-3 leading-relaxed">
                Unlock unlimited policies, custom domains, and priority support.
              </p>
              <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30 border-0">
                Learn more
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
