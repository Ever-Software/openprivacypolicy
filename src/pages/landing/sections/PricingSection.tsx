import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { planContactHref } from '@/config/contact'
import { PLANS } from '@/data/landing'

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge variant="brand" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Simple pricing. No surprises.
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            For less than a cup of coffee a month, your privacy policy is drafted, hosted, and always online.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl overflow-hidden flex flex-col ${
                plan.recommended
                  ? 'bg-white dark:bg-gray-800 border-2 border-brand-500 shadow-xl scale-[1.03]'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm'
              }`}
            >
              {plan.recommended && (
                <>
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600" />
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 bg-brand-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      <Sparkles className="size-3" />
                      Recommended
                    </span>
                  </div>
                </>
              )}

              <div className="p-7 flex flex-col flex-1">
                <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide mb-3">
                  {plan.label}
                </p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-black text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-400 mb-1.5">/ {plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  ≈ <strong className="text-gray-700 dark:text-gray-300">{plan.monthly}</strong>
                </p>

                <div className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5">
                      <CheckCircle className="size-4 text-brand-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{f}</span>
                    </div>
                  ))}
                </div>

                <a href={planContactHref(plan.label)}>
                  <Button
                    size="md"
                    variant={plan.recommended ? 'primary' : 'outline'}
                    className="w-full"
                    rightIcon={<ArrowRight className="size-4" />}
                  >
                    Get started
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-brand-50 dark:bg-brand-900/20 rounded-2xl px-6 py-4 border border-brand-100 dark:border-brand-800">
          <p className="text-xs text-brand-700 dark:text-brand-300 text-center">
            Compare: a single GDPR fine can reach <strong>€20 million</strong>. Legal consultation starts at hundreds per hour. At $5 for 3 months, compliance has never been more accessible.
          </p>
        </div>
      </div>
    </section>
  )
}
