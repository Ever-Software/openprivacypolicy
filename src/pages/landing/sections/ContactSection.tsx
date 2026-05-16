import { ArrowRight, CheckCircle, Mail } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CONTACT_HREF } from '@/config/contact'
import { CONTACT_FEATURES } from '@/data/landing'

export function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge variant="brand" className="mb-4">Contact us</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Ready to publish your privacy policy?
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Get in touch and we take care of everything: we draft, review, and publish a professional privacy policy tailored to your product.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="shrink-0 size-14 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
              <Mail className="size-7 text-brand-600 dark:text-brand-400" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Talk to our team
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Send us an email describing your system, platform, or app. We respond within 24 hours with a personalized proposal.
              </p>
              <a href={CONTACT_HREF}>
                <Button size="lg" rightIcon={<ArrowRight className="size-4" />}>
                  Send an email
                </Button>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 grid sm:grid-cols-3 gap-4">
            {CONTACT_FEATURES.map((text) => (
              <div key={text} className="flex items-center gap-2.5">
                <CheckCircle className="size-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
