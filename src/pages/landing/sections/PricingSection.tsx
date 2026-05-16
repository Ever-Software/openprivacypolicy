import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { planContactHref } from '@/config/contact'
import { PLANS } from '@/data/landing'

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <Badge variant="brand" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Simple pricing. No surprises.
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            For less than a cup of coffee a month, your privacy policy is drafted, hosted, and always online.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:items-end">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl overflow-hidden flex flex-col transition-shadow ${
                plan.recommended
                  ? 'bg-white dark:bg-gray-800 border-2 border-brand-500 shadow-2xl md:-translate-y-4'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600" />
              )}

              {plan.badge && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 bg-brand-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    <Sparkles className="size-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className={`p-7 flex flex-col flex-1 ${plan.recommended ? 'pt-9' : ''}`}>
                <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide mb-0.5">
                  {plan.label}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                  {plan.subtitle}
                </p>

                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <span className={`font-black text-gray-900 dark:text-white leading-none ${plan.recommended ? 'text-5xl' : 'text-4xl'}`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-400 mb-1 text-sm">/{plan.period}</span>
                  </div>
                  {plan.savings ? (
                    <span className="inline-block mt-2.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {plan.savings}
                    </span>
                  ) : (
                    <div className="mt-2.5 h-6" />
                  )}
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle className="size-4 text-brand-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{f}</span>
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
                    {plan.cta}
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-brand-50 dark:bg-brand-900/20 rounded-2xl px-6 py-4 border border-brand-100 dark:border-brand-800">
          <p className="text-xs text-brand-700 dark:text-brand-300 text-center">
            Compare: a single GDPR fine can reach <strong>€20 million</strong>. Legal consultation starts at hundreds per hour. At $4.99, compliance has never been more accessible.
          </p>
        </div>
      </div>
    </section>
  )
}
