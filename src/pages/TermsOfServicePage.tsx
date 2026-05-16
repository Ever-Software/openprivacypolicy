import { Link } from 'react-router-dom'
import { FileText, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useSEOMeta } from '@/hooks/useSEOMeta'

const LAST_UPDATED = 'May 16, 2026'
const CURRENT_URL = 'https://openprivacypolicy.com/terms-of-service'
const CONTACT_EMAIL = 'eversoftwarehouse@gmail.com'

const SECTIONS = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: `By accessing or using OpenPrivacyPolicy ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.

These terms apply to all visitors and users who access the Service or contact Ever Software House to request policy publishing.`,
  },
  {
    id: 'description',
    title: 'Description of Service',
    content: `OpenPrivacyPolicy is a service developed by Ever Software House that hosts and publishes privacy policies for individuals and businesses through permanent public URLs.

You do not need to create an account or log in to use the Service. To publish a policy, you submit a request via email. Our team reviews the submission, drafts or finalizes the document with you, and publishes it at a permanent public URL.

The Service is available exclusively through paid hosting plans. There is no free tier.`,
  },
  {
    id: 'request-process',
    title: 'Publishing Request Process',
    content: `To publish a policy through OpenPrivacyPolicy:

1. Contact us at eversoftwarehouse@gmail.com with your request, including your app name, company name, contact email, and a description of your app's data practices (or the policy text itself).
2. Our team reviews your submission and may follow up with clarifying questions.
3. Upon payment confirmation, we draft, finalize, and publish the policy at a permanent public URL.
4. You receive the public URL and can start linking to it immediately.

We reserve the right to decline publishing requests that contain false, misleading, or illegal content.`,
  },
  {
    id: 'plans-and-payments',
    title: 'Plans and Payments',
    content: `OpenPrivacyPolicy offers the following paid hosting plans:

• Starter — $4.99 for 3 months. Includes policy drafting, review, publishing, and hosting for three months, with 1 update included.
• Professional — $12.99 per year. Includes everything in Starter plus 12 months of hosting, unlimited updates, and priority support.
• Business — $29 per year. Includes everything in Professional plus support for multiple policies, advanced customization, team access, and dedicated support.

All fees are stated in US dollars. Payments are non-refundable except where required by law or granted at our sole discretion within 7 days of purchase.

Hosting plans are not auto-renewed. When your plan period is near expiration, you may renew by contacting us. We will not charge you without an explicit new request.

We reserve the right to change pricing with at least 30 days' notice to customers with active plans.`,
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use',
    content: `You agree to use the Service only for lawful purposes. You must not submit requests to publish content that:

• Is false, misleading, or fraudulent about your data practices;
• Violates any applicable local, national, or international law or regulation;
• Impersonates any person or organization;
• Infringes upon the intellectual property rights of others.

We reserve the right to remove published content and refuse future requests from parties that violate these guidelines.`,
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content: `The Service and its original content, features, and functionality are owned by Ever Software House and are protected by international copyright, trademark, and other intellectual property laws.

You retain ownership of the policy content you submit. By submitting content for publication, you grant Ever Software House a non-exclusive, worldwide, royalty-free license to host, display, and distribute that content solely for the purpose of providing the Service.

You may not copy, modify, distribute, sell, or lease any part of the Service or its underlying software without our explicit written permission.`,
  },
  {
    id: 'privacy',
    title: 'Privacy',
    content: `Your use of the Service is also governed by our Privacy Policy, available at openprivacypolicy.com/privacy-policies/openprivacypolicy. Please review it to understand our data practices.

We collect minimal information — limited to what is necessary to process your publishing request, handle payments, and operate the website. We do not require account creation and do not store passwords or user credentials.`,
  },
  {
    id: 'published-content',
    title: 'Published Content',
    content: `Policies published through the Service are intentionally accessible to anyone with the public URL. Published content is public by design — do not include sensitive personal information in the policy text itself.

Published policies remain accessible at their public URL for the duration of your active hosting plan. After plan expiration, you may renew to keep the policy accessible. Unpublishing a policy can be requested at any time by contacting us.`,
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers',
    content: `The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied.

OpenPrivacyPolicy does not warrant that the policies drafted through the Service are legally sufficient for your jurisdiction or use case. Policy documents should be reviewed by a qualified legal professional before use. Ever Software House is not a law firm and does not provide legal advice.`,
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of Liability',
    content: `To the maximum extent permitted by applicable law, Ever Software House shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Service.

Our total liability for any claims arising from or related to the Service shall not exceed the amount you paid us in the twelve months preceding the claim.`,
  },
  {
    id: 'termination',
    title: 'Termination',
    content: `We may suspend or terminate your access to the Service at any time, with or without cause, and with or without notice, at our sole discretion. Grounds for termination include violation of these Terms or conduct we determine to be harmful to the Service or to other users.

Upon termination, your right to use the Service will immediately cease. You may request unpublishing of your policy by contacting us at any time.`,
  },
  {
    id: 'changes',
    title: 'Changes to Terms',
    content: `We reserve the right to modify these Terms at any time. When we make material changes, we will update the "Last updated" date at the top of this page and, where appropriate, notify active customers by email.

Your continued use of the Service after changes become effective constitutes your acceptance of the revised Terms.`,
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of Brazil, without regard to its conflict of law provisions. Any disputes arising from or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts located in Brazil.

If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will continue in full force and effect.`,
  },
  {
    id: 'contact',
    title: 'Contact',
    content: `If you have any questions or concerns about these Terms of Service, please contact us:

Ever Software House
eversoftwarehouse@gmail.com

We aim to respond to all inquiries within 30 business days.`,
  },
]

function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href)
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

export function TermsOfServicePage() {
  useSEOMeta({
    title: 'Terms of Service | OpenPrivacyPolicy',
    description: 'Terms of Service for OpenPrivacyPolicy — a service by Ever Software House for hosting and publishing privacy policies.',
    ogTitle: 'Terms of Service — OpenPrivacyPolicy',
    ogDescription: 'Terms governing your use of the OpenPrivacyPolicy publishing service.',
    ogUrl: CURRENT_URL,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Terms of Service',
      description: 'Terms of Service for OpenPrivacyPolicy.',
      url: CURRENT_URL,
      dateModified: LAST_UPDATED,
      publisher: {
        '@type': 'Organization',
        name: 'Ever Software House',
        email: CONTACT_EMAIL,
      },
    },
  })

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
          <CopyLinkButton />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <FileText className="size-4 text-brand-500" />
            <span>Legal</span>
            <span>·</span>
            <span>OpenPrivacyPolicy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400">
            Last updated: <span className="text-gray-600 dark:text-gray-300">{LAST_UPDATED}</span>
          </p>
        </div>

        <nav aria-label="Table of contents" className="mb-10 p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Contents
          </p>
          <ol className="space-y-1.5">
            {SECTIONS.map((section, i) => (
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
          {SECTIONS.map((section, i) => (
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
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Questions?{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-600 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            <CopyLinkButton />
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <Link
              to="/privacy-policies/openprivacypolicy"
              className="text-sm text-brand-600 dark:text-brand-400 hover:underline"
            >
              Privacy Policy →
            </Link>
            <Link to="/" className="text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
