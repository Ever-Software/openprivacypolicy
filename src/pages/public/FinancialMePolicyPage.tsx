import { Link } from 'react-router-dom'
import { Copy, Share2, Check, ShieldCheck, Sun, Moon, Monitor, Sparkles, FileText, Globe } from 'lucide-react'
import { useState } from 'react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { useThemeStore } from '@/store/themeStore'
import { cn } from '@/utils/cn'
import type { Theme } from '@/types'

function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()
  const options: { value: Theme; icon: React.ReactNode }[] = [
    { value: 'light', icon: <Sun className="size-3.5" /> },
    { value: 'dark', icon: <Moon className="size-3.5" /> },
    { value: 'system', icon: <Monitor className="size-3.5" /> },
  ]
  return (
    <div className="flex items-center gap-0.5 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => setTheme(o.value)}
          className={cn(
            'p-1.5 rounded-lg transition-all',
            theme === o.value
              ? 'bg-white dark:bg-gray-700 text-brand-600 shadow-sm'
              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
          )}
          aria-label={`${o.value} mode`}
        >
          {o.icon}
        </button>
      ))}
    </div>
  )
}

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

const SECTIONS = [
  {
    id: 'intro',
    title: 'Introduction',
    content: `Welcome to Financial ME, a personal finance management application developed by Ever Software House. This Privacy Policy explains how Financial ME handles your information when you use the app.

Financial ME is designed with a privacy-first approach: all data you enter is stored exclusively on your device and is never transmitted to any external server, cloud service, or third party.

By using Financial ME, you agree to the practices described here.`,
  },
  {
    id: 'collection',
    title: 'Information We Collect',
    content: `Financial ME only processes information that you voluntarily provide through the app.

Financial Data:
• Expenses (amount, category, description, date, payment status)
• Income entries (amount, description, date)
• Investments (amount, type, institution, description)
• Installment plans and recurring expenses
• Monthly budgets per category
• Savings goals (name, target amount, deadline)

Profile and Preferences:
• Your name and email address (used only for display and report headers)
• Language and currency preference
• Theme preference (light / dark)
• Monthly budget limit
• App lock settings (PIN hash or biometric preference)

Purpose of Use:
All information is used solely to provide the app's core functionality: tracking your personal finances, generating reports, and displaying financial summaries. None of this information is shared with or accessible by anyone other than you.`,
  },
  {
    id: 'storage',
    title: 'Data Storage',
    content: `All data is stored locally on your device.

Financial ME uses a SQLite database stored in your device's private app storage. This means:

• Your financial data never leaves your device.
• No data is synced to the cloud.
• No remote servers store or have access to your information.
• Uninstalling the app permanently deletes all stored data.

Backup and Export (User-Initiated Only):
The app offers optional export features:

• JSON Backup: Exports your data to a .json file saved temporarily in your device's cache, then shared via the native share dialog. You control where this file goes.
• PDF Report: Generates a financial report as a .pdf file locally on your device, shared via the native share dialog. No external service is involved.

You are solely responsible for the security of any exported files.`,
  },
  {
    id: 'permissions',
    title: 'Permissions',
    content: `Financial ME requests only the permissions necessary to deliver its features. No permission is used for data collection or tracking.

• File System Access — Required to generate and temporarily store export files (PDF and JSON) in your device's cache directory before sharing.
• Document Picker — Used when you choose to import a previously exported JSON backup file. Only activated on your explicit action.
• Share / Send — Used to share generated PDF and JSON files via your device's native share sheet.
• Biometric Authentication — Optional. Used only if you enable fingerprint or face unlock in Settings. Authentication is performed entirely by your device's OS. No biometric data is accessed or stored by the app.

Financial ME does not request access to your camera, microphone, location, contacts, or calendar.`,
  },
  {
    id: 'auth',
    title: 'Authentication and Security',
    content: `Financial ME offers two optional app-lock mechanisms to protect your financial data:

• Biometric Lock: Uses your device's native biometric system (fingerprint / face recognition). The app never accesses or stores your biometric data.
• PIN Lock: A 4-digit PIN you define. Only a one-way hash of the PIN is stored locally. The original PIN is never stored.

Both mechanisms operate entirely on-device. Authentication data is never transmitted externally.`,
  },
  {
    id: 'thirdParty',
    title: 'Third-Party Services',
    content: `Financial ME does not integrate analytics platforms, crash reporting services, cloud storage, social login, or payment processors. The app does not collect or transmit your financial data to any third party.

The app uses standard open-source development libraries (React Native, Redux, i18next) solely as a programming framework. These libraries operate locally and do not collect user data.

Advertising — Google AdMob:
Financial ME displays interstitial ads provided by Google AdMob to keep the app free. Google AdMob may collect and process device data to serve ads, including device identifiers, IP address, and ad interaction data. This data is handled in accordance with Google's Privacy Policy (policies.google.com/privacy).

Google may use this data to personalize ads based on your interests. To manage personalized ad preferences, visit your Google settings on your device.`,
  },
  {
    id: 'security',
    title: 'Data Security',
    content: `We take reasonable measures to protect your data:

• All data is stored in your device's private, sandboxed app storage, inaccessible to other apps.
• Optional PIN or biometric app lock adds an extra layer of protection.
• Exported files are created in a temporary cache directory. Their security after export depends on how you handle them.

Since no data is transmitted over the internet, there is no risk of server-side breaches affecting your financial information.`,
  },
  {
    id: 'children',
    title: "Children's Privacy",
    content: `Financial ME is not directed at children under the age of 13. The app does not knowingly collect information from children. Since all data is voluntarily entered by the user and stored locally, no personal data is accessible to us.

If you believe a child has entered personal information into the app, you can clear all data via Settings → Clear all data.`,
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in the app's features or applicable regulations. When changes are made, we will update the date at the top of this document.

Continued use of the app after changes constitutes acceptance of the updated policy.`,
  },
  {
    id: 'contact',
    title: 'Contact',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy, please contact:

Ever Software House
eversoftwarehouse@gmail.com`,
  },
]

export function FinancialMePolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <header className="sticky top-0 z-10 glass border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Link to="/">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <CopyLinkButton />
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Share2 className="size-3.5" />}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'Financial ME — Privacy Policy', url: window.location.href })
                }
              }}
            >
              Share
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <ShieldCheck className="size-4 text-brand-500" />
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Financial ME</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
            Financial ME Privacy Policy
          </h1>
          <p className="text-sm text-gray-400">
            Last updated: <span className="text-gray-600 dark:text-gray-300">May 2, 2026</span>
          </p>
        </div>

        <nav className="mb-10 p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
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
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Questions?{' '}
                <a href="mailto:eversoftwarehouse@gmail.com" className="text-brand-600 hover:underline">
                  eversoftwarehouse@gmail.com
                </a>
              </p>
            </div>
            <CopyLinkButton />
          </div>

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
        </div>
      </main>
    </div>
  )
}
