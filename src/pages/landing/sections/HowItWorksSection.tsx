import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CONTACT_HREF } from '@/config/contact'
import { HOW_IT_WORKS } from '@/data/landing'

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="brand" className="mb-4">How it works</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Your policy, hosted in minutes
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            We don't write your policy — we host it with a clean, permanent URL.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item, i) => (
            <div key={item.step} className="relative">
              {i < 2 && (
                <div className="hidden md:block absolute top-8 left-full w-8 -translate-x-4 border-t-2 border-dashed border-gray-200 dark:border-gray-700 z-0" />
              )}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="text-3xl font-black text-brand-100 dark:text-brand-900 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href={CONTACT_HREF}>
            <Button size="lg" rightIcon={<ArrowRight className="size-4" />}>
              Contact us
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
