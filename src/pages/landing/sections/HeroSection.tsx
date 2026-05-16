import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CONTACT_HREF } from '@/config/contact'
import { HERO_TRUST_ITEMS } from '@/data/landing'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <Badge variant="brand" className="mb-6">
          ✨ Professional privacy policies, published for you
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
          Privacy policies your{' '}
          <span className="text-gradient">users can trust</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Create, host, and manage professional privacy policy pages in minutes.
          No legal expertise required. Get in touch and we handle everything for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <a href={CONTACT_HREF}>
            <Button size="lg" rightIcon={<ArrowRight className="size-4" />}>
              Request my policy
            </Button>
          </a>
          <a href="/#how-it-works">
            <Button size="lg" variant="outline">
              See how it works
            </Button>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
          {HERO_TRUST_ITEMS.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <CheckCircle className="size-3.5 text-green-500" />
              {f}
            </div>
          ))}
        </div>

        <div className="mt-16 relative max-w-4xl mx-auto">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-[0_20px_25px_-5px_rgb(0_0_0/0.10)] overflow-hidden bg-white dark:bg-gray-900">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
              <div className="size-3 rounded-full bg-red-400" />
              <div className="size-3 rounded-full bg-amber-400" />
              <div className="size-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-3 h-6 bg-white dark:bg-gray-700 rounded-lg flex items-center px-3">
                <span className="text-xs text-gray-400">openprivacypolicy.com/p/financial-me</span>
              </div>
            </div>
            <div className="p-8 text-left">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Me Privacy Policy</h2>
                  <p className="text-sm text-gray-400 mt-1">Last updated: May 16, 2026</p>
                </div>
                <Badge variant="success" dot>Published</Badge>
              </div>
              <div className="space-y-4">
                {['Introduction', 'Financial Data We Collect', 'How We Use Your Data', 'Data Security'].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{s}</p>
                      <div className="mt-1 h-2 bg-gray-100 dark:bg-gray-800 rounded w-64" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
