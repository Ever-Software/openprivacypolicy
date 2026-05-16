import { ShieldCheck, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { STATIC_POLICIES } from '@/data/publicPolicies'

const FEATURED_POLICIES = [
  STATIC_POLICIES.find((p) => p.slug === 'openprivacypolicy')!,
  ...STATIC_POLICIES.filter((p) => p.slug !== 'openprivacypolicy').slice(0, 4),
].filter(Boolean).slice(0, 5)

export function PoliciesSection() {
  return (
    <section id="policies" className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge variant="brand" className="mb-4">Live policies</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Policies hosted by us
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Real privacy policies, published and hosted on our platform.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FEATURED_POLICIES.map((policy) => (
            <Link
              key={policy.slug}
              to={`/privacy-policies/${policy.slug}`}
              className="group flex items-center justify-between gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-700 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="shrink-0 size-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                  <ShieldCheck className="size-5 text-brand-600 dark:text-brand-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {policy.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {policy.appName} · Updated {policy.lastUpdated}
                  </p>
                </div>
              </div>
              <ExternalLink className="size-4 text-gray-300 dark:text-gray-600 group-hover:text-brand-500 flex-shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
