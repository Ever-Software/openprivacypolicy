import { useState } from 'react'
import { QrCode } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/utils/analytics'

interface QRCodeModalProps {
  url: string
  policySlug: string
}

export function QRCodeModal({ url, policySlug }: QRCodeModalProps) {
  const [open, setOpen] = useState(false)

  function handleOpen() {
    setOpen(true)
    trackEvent('policy_qr_opened', { slug: policySlug })
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        leftIcon={<QrCode className="size-3.5" />}
        onClick={handleOpen}
      >
        <span className="hidden sm:inline">QR Code</span>
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="QR Code"
        description="Scan to open this policy on any device"
        size="sm"
      >
        <div className="flex flex-col items-center gap-5">
          <div className="p-4 bg-white rounded-xl border border-gray-100 dark:border-gray-700">
            <QRCodeSVG value={url} size={200} />
          </div>
          <p className="text-xs text-gray-400 text-center break-all max-w-xs">{url}</p>
        </div>
      </Modal>
    </>
  )
}
