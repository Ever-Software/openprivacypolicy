import { useParams, Link } from 'react-router-dom'
import { Copy, Share2, Check, ArrowLeft, ShieldCheck, Download } from 'lucide-react'
import { useState } from 'react'
import { usePolicyStore } from '@/store/policyStore'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/utils/date'
import { useSEOMeta } from '@/hooks/useSEOMeta'
import { trackEvent } from '@/utils/analytics'
import { QRCodeModal } from '@/components/policy/QRCodeModal'
import { PolicyFeedback } from '@/components/policy/PolicyFeedback'
import { EmbedBadge } from '@/components/policy/EmbedBadge'

function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    trackEvent('policy_link_copied', { slug })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      leftIcon={copied ? <Check className="size-3.5 text-green-600" /> : <Copy className="size-3.5" />}
      onClick={handleCopy}
    >
      <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy link'}</span>
    </Button>
  )
}

function DownloadPDFButton({ slug }: { slug: string }) {
  function handleDownload() {
    trackEvent('policy_pdf_downloaded', { slug })
    window.print()
  }

  return (
    <Button
      variant="outline"
      size="sm"
      leftIcon={<Download className="size-3.5" />}
      onClick={handleDownload}
      className="print:hidden"
    >
      <span className="hidden sm:inline">Export PDF</span>
    </Button>
  )
}

function ShareButton({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title, url })
      trackEvent('policy_shared', { slug, method: 'native' })
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      trackEvent('policy_shared', { slug, method: 'clipboard' })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      leftIcon={copied ? <Check className="size-3.5 text-green-600" /> : <Share2 className="size-3.5" />}
      onClick={handleShare}
    >
      <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
    </Button>
  )
}

export function PublicPolicyPage() {
  const { slug } = useParams<{ slug: string }>()
  const { getPolicyBySlug } = usePolicyStore()
  const policy = getPolicyBySlug(slug ?? '')
  const isPublished = policy?.status === 'published'

  useSEOMeta(
    isPublished && policy
      ? {
          title: `${policy.title} | OpenPrivacyPolicy`,
          description: `Privacy policy${policy.companyName ? ` by ${policy.companyName}` : ''}. Hosted by OpenPrivacyPolicy.`,
          ogTitle: policy.title,
          ogDescription: `Official privacy policy${policy.companyName ? ` of ${policy.companyName}` : ''}. Hosted by OpenPrivacyPolicy.`,
          ogUrl: `https://openprivacypolicy.com/p/${policy.slug}`,
        }
      : {
          title: 'Policy not found | OpenPrivacyPolicy',
          description: 'This privacy policy does not exist or has not been published yet.',
        }
  )

  if (!isPublished) {
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

  const currentUrl = `https://openprivacypolicy.com/p/${policy.slug}`

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 glass border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2 overflow-hidden">
          <Link to="/">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-2 print:hidden">
            <QRCodeModal url={currentUrl} policySlug={policy.slug} />
            <span className="hidden sm:contents">
              <EmbedBadge url={currentUrl} policySlug={policy.slug} />
            </span>
            <DownloadPDFButton slug={policy.slug} />
            <span className="hidden sm:contents">
              <CopyLinkButton slug={policy.slug} />
            </span>
            <ShareButton title={policy.title} slug={policy.slug} />
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
          <nav aria-label="Table of contents" className="mb-10 p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
            <PolicyFeedback policySlug={policy.slug} />
            <div className="flex items-center gap-2">
              <CopyLinkButton slug={policy.slug} />
            </div>
          </div>

          {policy.contactEmail && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Questions?{' '}
              <a href={`mailto:${policy.contactEmail}`} className="text-brand-600 hover:underline">
                {policy.contactEmail}
              </a>
            </p>
          )}

          <div className="mt-6 pt-6 border-t border-gray-50 dark:border-gray-900 flex items-center gap-2 text-xs text-gray-400 print:hidden">
            <span>Hosted by</span>
            <Link to="/">
              <Logo size="sm" />
            </Link>
          </div>

          <div className="print-footer hidden print:block">
            <p>Hosted by OpenPrivacyPolicy · {currentUrl}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
