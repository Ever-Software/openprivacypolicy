import { CheckCircle, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { BENEFITS } from '@/data/landing'

export function BenefitsSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Badge variant="brand" className="mb-4">Why it matters</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Privacy policies are not optional anymore
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
            LGPD, GDPR, CCPA, and dozens of other regulations require you to clearly communicate how you collect and use data. Non-compliance carries serious fines and damages user trust.
          </p>
          <div className="space-y-3">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-2.5">
                <CheckCircle className="size-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{b}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-900/40 rounded-2xl p-8">
          <ShieldCheck className="size-12 text-brand-600 mb-6" />
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            "Trust is your most valuable asset."
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            A professional privacy policy signals to your users that you take their data seriously — and that you're a business worth trusting.
          </p>
        </div>
      </div>
    </section>
  )
}
