import { useParams, Link } from 'react-router-dom'
import { Copy, Share2, Check, ArrowLeft, ShieldCheck } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePolicyStore } from '@/store/policyStore'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/utils/date'

function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      leftIcon={copied ? <Check className="size-3.5 text-green-600" /> : <Copy className="size-3.5" />}
      onClick={handleCopy}
    >
      {copied ? 'Copied!' : 'Copy link'}
    </Button>
  )
}

export function PublicPolicyPage() {
  const { slug } = useParams<{ slug: string }>()
  const { getPolicyBySlug } = usePolicyStore()
  const policy = getPolicyBySlug(slug ?? '')

  useEffect(() => {
    if (!policy || policy.status !== 'published') return
    const prevTitle = document.title
    document.title = `${policy.title} | OpenPrivacyPolicy`

    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc?.getAttribute('content') ?? ''
    const companyPart = policy.companyName ? ` by ${policy.companyName}` : ''
    metaDesc?.setAttribute('content', `Privacy policy${companyPart}. Hosted by OpenPrivacyPolicy.`)

    return () => {
      document.title = prevTitle
      metaDesc?.setAttribute('content', prevDesc)
    }
  }, [policy])

  if (!policy || policy.status !== 'published') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4">
        <ShieldCheck className="size-12 text-gray-300 mb-4" />
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Policy not found</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          This privacy policy doesn't exist or hasn't been published yet.
        </p>
        <Link to="/">
          <Button variant="outline" leftIcon={<ArrowLeft className="size-4" />}>
            Go to homepage
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 glass border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Link to="/">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-2">
            <CopyLinkButton />
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Share2 className="size-3.5" />}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: policy.title, url: window.location.href })
                }
              }}
            >
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Policy header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <ShieldCheck className="size-4 text-brand-500" />
            <span>Privacy Policy</span>
            {policy.companyName && (
              <>
                <span>·</span>
                <span>{policy.companyName}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
            {policy.title}
          </h1>
          <p className="text-sm text-gray-400">
            Last updated: <span className="text-gray-600 dark:text-gray-300">{formatDate(policy.lastUpdated)}</span>
          </p>
          {policy.publishedAt && (
            <p className="text-sm text-gray-400 mt-0.5">
              Published: <span className="text-gray-600 dark:text-gray-300">{formatDate(policy.publishedAt)}</span>
            </p>
          )}
        </div>

        {/* Table of contents */}
        {policy.sections.length > 3 && (
          <nav className="mb-10 p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Contents
            </p>
            <ol className="space-y-1.5">
              {policy.sections.sort((a, b) => a.order - b.order).map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#section-${section.id}`}
                    className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 transition-colors flex gap-2"
                  >
                    <span className="text-gray-400 font-mono text-xs pt-0.5">{(i + 1).toString().padStart(2, '0')}.</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Sections */}
        <article className="space-y-10">
          {policy.sections
            .sort((a, b) => a.order - b.order)
            .map((section, i) => (
              <section id={`section-${section.id}`} key={section.id} className="scroll-mt-20">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-300 dark:text-gray-600">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  {section.title}
                </h2>
                <p className="text-sm leading-7 text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                  {section.content}
                </p>
              </section>
            ))}
        </article>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              {policy.contactEmail && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Questions?{' '}
                  <a href={`mailto:${policy.contactEmail}`} className="text-brand-600 hover:underline">
                    {policy.contactEmail}
                  </a>
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <CopyLinkButton />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-50 dark:border-gray-900 flex items-center gap-2 text-xs text-gray-400">
            <span>Hosted by</span>
            <Link to="/">
              <Logo size="sm" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
