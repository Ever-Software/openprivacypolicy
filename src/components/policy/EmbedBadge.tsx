import { Code, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/utils/analytics'

interface EmbedBadgeProps {
  url: string
  policySlug: string
}

const BASE_URL = 'https://openprivacypolicy.com'

export function EmbedBadge({ url, policySlug }: EmbedBadgeProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState<'link' | 'badge' | null>(null)

  const linkCode = `<a href="${url}" target="_blank" rel="noopener noreferrer">Privacy Policy</a>`
  const badgeCode = `<a href="${url}" target="_blank" rel="noopener noreferrer">\n  <img src="${BASE_URL}/hosted-badge.svg" alt="Privacy Policy hosted on OpenPrivacyPolicy" width="230" height="20" />\n</a>`

  async function copy(text: string, type: 'link' | 'badge') {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    trackEvent('embed_code_copied', { slug: policySlug, type })
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        leftIcon={<Code className="size-3.5" />}
        onClick={() => setOpen(true)}
      >
        Embed
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Embed on your website"
        description="Add a link to this policy on your website or app store listing"
        size="md"
      >
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Simple link
            </p>
            <div className="flex items-start gap-2">
              <code className="flex-1 block text-xs bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2.5 font-mono text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 break-all">
                {linkCode}
              </code>
              <Button
                variant="outline"
                size="sm"
                leftIcon={copied === 'link' ? <Check className="size-3.5 text-green-600" /> : <Copy className="size-3.5" />}
                onClick={() => copy(linkCode, 'link')}
                className="shrink-0"
              >
                {copied === 'link' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Badge
            </p>
            <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <img
                src="/hosted-badge.svg"
                alt="Privacy Policy hosted on OpenPrivacyPolicy"
                width="230"
                height="20"
              />
            </div>
            <div className="flex items-start gap-2">
              <code className="flex-1 block text-xs bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2.5 font-mono text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 whitespace-pre overflow-x-auto">
                {badgeCode}
              </code>
              <Button
                variant="outline"
                size="sm"
                leftIcon={copied === 'badge' ? <Check className="size-3.5 text-green-600" /> : <Copy className="size-3.5" />}
                onClick={() => copy(badgeCode, 'badge')}
                className="shrink-0"
              >
                {copied === 'badge' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
