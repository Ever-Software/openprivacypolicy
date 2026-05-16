import { Link, useParams } from 'react-router-dom'
import { Copy, Share2, Check, ShieldCheck, Sparkles, FileText, Globe } from 'lucide-react'
import { useState } from 'react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { getStaticPolicy } from '@/data/publicPolicies'
import { useSEOMeta } from '@/hooks/useSEOMeta'
import { trackEvent } from '@/utils/analytics'
import { QRCodeModal } from '@/components/policy/QRCodeModal'
import { PolicyFeedback } from '@/components/policy/PolicyFeedback'

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
      {copied ? 'Copied!' : 'Copy link'}
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
      {copied ? 'Copied!' : 'Share'}
    </Button>
  )
}

function PolicyNotFound({ slug }: { slug: string | undefined }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center gap-4">
      <ShieldCheck className="size-12 text-gray-300" />
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Policy not found</p>
      <p className="text-sm text-gray-400">
        No policy exists for <code className="font-mono">{slug}</code>.
      </p>
      <Link to="/">
        <Button variant="ghost" size="sm">Go home</Button>
      </Link>
    </div>
  )
}

export function StaticPolicyPage() {
  const { slug } = useParams<{ slug: string }>()
  const policy = getStaticPolicy(slug ?? '')
  const currentUrl = `https://openprivacypolicy.com/privacy-policies/${slug}`

  useSEOMeta(
    policy
      ? {
          title: `${policy.title} — ${policy.companyName} | OpenPrivacyPolicy`,
          description: `Privacy policy of ${policy.appName} by ${policy.companyName}. Last updated ${policy.lastUpdated}. Hosted by OpenPrivacyPolicy.`,
          ogTitle: `${policy.title} — ${policy.companyName}`,
          ogDescription: `Official privacy policy of ${policy.appName}. Compliant with LGPD, GDPR, and CCPA.`,
          ogUrl: currentUrl,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: policy.title,
            description: `Privacy policy of ${policy.appName} by ${policy.companyName}.`,
            url: currentUrl,
            dateModified: policy.lastUpdated,
            publisher: {
              '@type': 'Organization',
              name: policy.companyName,
              email: policy.contactEmail,
            },
          },
        }
      : { title: 'Policy not found | OpenPrivacyPolicy', description: 'This policy does not exist.' }
  )

  if (!policy) return <PolicyNotFound slug={slug} />

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="fixed bottom-6 right-6 z-50 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
        <ThemeToggle />
      </div>
      <header className="sticky top-0 z-10 glass border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Link to="/">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-2">
            <QRCodeModal url={currentUrl} policySlug={policy.slug} />
            <ShareButton title={`${policy.appName} — Privacy Policy`} slug={policy.slug} />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <ShieldCheck className="size-4 text-brand-500" />
            <span>Privacy Policy</span>
            <span>·</span>
            <span>{policy.appName}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
            {policy.title}
          </h1>
          <p className="text-sm text-gray-400">
            Last updated: <span className="text-gray-600 dark:text-gray-300">{policy.lastUpdated}</span>
          </p>
        </div>

        <nav aria-label="Table of contents" className="mb-10 p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Contents
          </p>
          <ol className="space-y-1.5">
            {policy.sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#section-${section.id}`}
                  className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 transition-colors flex gap-2"
                >
                  <span className="text-gray-400 font-mono text-xs pt-0.5">
                    {(i + 1).toString().padStart(2, '0')}.
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="space-y-10">
          {policy.sections.map((section, i) => (
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

        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Questions?{' '}
                <a href={`mailto:${policy.contactEmail}`} className="text-brand-600 hover:underline">
                  {policy.contactEmail}
                </a>
              </p>
            </div>
            <CopyLinkButton slug={policy.slug} />
          </div>

          <div className="mt-6">
            <PolicyFeedback policySlug={policy.slug} />
          </div>

          {slug !== 'openprivacypolicy' && (
            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
              <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 size-10 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center">
                    <Sparkles className="size-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      Hosted by{' '}
                      <Link to="/" className="text-brand-600 dark:text-brand-400 hover:underline">
                        OpenPrivacyPolicy
                      </Link>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                      OpenPrivacyPolicy is a platform for creating, hosting, and sharing privacy policies. Developers and businesses can publish their policies with a permanent public URL
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="flex items-start gap-2.5">
                        <FileText className="size-4 text-brand-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Form-based editor</p>
                          <p className="text-xs text-gray-400 leading-relaxed">Create policies step by step using guided forms and ready-made section templates.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Globe className="size-4 text-brand-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Permanent public URL</p>
                          <p className="text-xs text-gray-400 leading-relaxed">Each policy gets a dedicated, always-available public link — ready to paste into app stores or websites.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Sparkles className="size-4 text-brand-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">AI-assisted drafts</p>
                          <p className="text-xs text-gray-400 leading-relaxed">Describe your app and let AI generate a tailored first draft. You review, edit, and publish.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
