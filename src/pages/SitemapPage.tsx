import { Link } from 'react-router-dom'
import { ShieldCheck, ExternalLink, ArrowLeft } from 'lucide-react'
import { STATIC_POLICIES } from '@/data/publicPolicies'
import { Logo } from '@/components/ui/Logo'
import { useSEOMeta } from '@/hooks/useSEOMeta'

export function SitemapPage() {
  useSEOMeta({
    title: 'Published Policies — OpenPrivacyPolicy',
    description: 'Directory of all privacy policies published and hosted by OpenPrivacyPolicy.',
    ogTitle: 'Published Policies — OpenPrivacyPolicy',
    ogDescription: 'Browse privacy policies hosted by OpenPrivacyPolicy.',
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <header className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/">
            <Logo size="sm" />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Published Policies
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            All privacy policies currently hosted on OpenPrivacyPolicy.
          </p>
        </div>

        <section>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Official Policies
          </p>
          <ul className="space-y-3">
            {STATIC_POLICIES.map((policy) => (
              <li key={policy.slug}>
                <Link
                  to={`/privacy-policies/${policy.slug}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-brand-200 dark:hover:border-brand-800 hover:bg-brand-50/30 dark:hover:bg-brand-950/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="size-5 text-brand-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
                        {policy.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {policy.companyName} · Updated {policy.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="size-4 text-gray-300 dark:text-gray-600 group-hover:text-brand-400 transition-colors shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 text-xs text-gray-400">
          <span>Hosted by</span>
          <Link to="/">
            <Logo size="sm" />
          </Link>
        </div>
      </main>
    </div>
  )
}
