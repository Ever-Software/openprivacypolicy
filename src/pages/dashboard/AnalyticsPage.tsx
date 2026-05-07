import { Eye, TrendingUp, FileText, ArrowUpRight } from 'lucide-react'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { usePolicyStore } from '@/store/policyStore'

const CHART_DATA = [
  { date: 'Nov 18', views: 42 },
  { date: 'Nov 19', views: 65 },
  { date: 'Nov 20', views: 58 },
  { date: 'Nov 21', views: 80 },
  { date: 'Nov 22', views: 73 },
  { date: 'Nov 23', views: 95 },
  { date: 'Nov 24', views: 110 },
  { date: 'Nov 25', views: 88 },
  { date: 'Nov 26', views: 102 },
  { date: 'Nov 27', views: 128 },
  { date: 'Nov 28', views: 145 },
  { date: 'Nov 29', views: 132 },
  { date: 'Nov 30', views: 160 },
  { date: 'Dec 1', views: 148 },
]

function MiniChart() {
  const max = Math.max(...CHART_DATA.map((d) => d.views))
  return (
    <div className="flex items-end gap-1 h-20">
      {CHART_DATA.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
          <div
            className="w-full rounded-sm bg-brand-100 dark:bg-brand-900/40 group-hover:bg-brand-500 transition-colors cursor-pointer relative"
            style={{ height: `${(d.views / max) * 100}%`, minHeight: '4px' }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {d.date}: {d.views}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function AnalyticsPage() {
  const { policies } = usePolicyStore()
  const published = policies.filter((p) => p.status === 'published')
  const totalViews = policies.reduce((s, p) => s + p.views, 0)
  const topPolicies = [...policies].sort((a, b) => b.views - a.views).slice(0, 5)

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track how people engage with your privacy policies.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total views', value: totalViews.toLocaleString(), icon: <Eye className="size-5" />, change: '+18%' },
            { label: 'This week', value: '856', icon: <TrendingUp className="size-5" />, change: '+12%' },
            { label: 'Published policies', value: published.length, icon: <FileText className="size-5" />, change: null },
          ].map((stat) => (
            <Card key={stat.label}>
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                  {stat.icon}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              {stat.change && (
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="size-3 text-green-500" />
                  <span className="text-xs text-green-600">{stat.change} vs last period</span>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Views over time</CardTitle>
              <Badge variant="gray">Last 14 days</Badge>
            </CardHeader>
            <MiniChart />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-400">{CHART_DATA[0].date}</span>
              <span className="text-xs text-gray-400">{CHART_DATA[CHART_DATA.length - 1].date}</span>
            </div>
          </Card>

          <Card>
            <CardTitle className="mb-4">Top policies</CardTitle>
            <div className="space-y-3">
              {topPolicies.map((policy, i) => (
                <div key={policy.id} className="flex items-center gap-2.5">
                  <span className="size-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-semibold text-gray-500 flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                      {policy.title}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Eye className="size-3" />{policy.views.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {topPolicies.length === 0 && (
                <p className="text-sm text-gray-400">No analytics yet.</p>
              )}
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic sources</CardTitle>
              <Badge variant="gray">All time</Badge>
            </CardHeader>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { source: 'Direct link', percent: 58, color: 'bg-brand-500' },
                { source: 'Website footer', percent: 32, color: 'bg-green-500' },
                { source: 'Other', percent: 10, color: 'bg-gray-300' },
              ].map((s) => (
                <div key={s.source}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{s.source}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{s.percent}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
