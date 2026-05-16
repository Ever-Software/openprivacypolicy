import {
  ShieldCheck, Zap, Globe, FileText, BarChart3, Lock,
  ArrowRight, CheckCircle, Star, ChevronDown, ChevronUp,
  Users, TrendingUp, Award, Mail, Sparkles, ExternalLink,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { AppLayout } from '@/layouts/AppLayout'
import { STATIC_POLICIES } from '@/data/publicPolicies'

const CONTACT_EMAIL = 'eversoftwarehouse@gmail.com'
const CONTACT_SUBJECT = 'Privacy policy publishing request'

const FEATURES = [
  {
    icon: <Zap className="size-5" />,
    title: 'Instant Publishing',
    description: 'Publish your privacy policy in seconds with a clean, professional public URL.',
  },
  {
    icon: <Globe className="size-5" />,
    title: 'Public Shareable Links',
    description: 'Share a clean, branded link your users can trust and bookmark.',
  },
  {
    icon: <FileText className="size-5" />,
    title: 'Professional Templates',
    description: 'Start from expertly crafted templates for SaaS, e-commerce, mobile apps, and more.',
  },
  {
    icon: <BarChart3 className="size-5" />,
    title: 'Analytics Dashboard',
    description: 'Track how many people read your policy and which sections get the most attention.',
  },
  {
    icon: <Lock className="size-5" />,
    title: 'Secure Management',
    description: 'Your policies are stored securely with version history and easy editing.',
  },
  {
    icon: <ShieldCheck className="size-5" />,
    title: 'SEO Optimized',
    description: 'Every policy page is structured for search engines to help users find your policy.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Founder at NovaSaaS',
    avatar: 'SC',
    content: 'OpenPrivacy took us from zero to a professional privacy policy page in under 5 minutes. Our lawyers were impressed.',
    rating: 5,
  },
  {
    name: 'Marcus Wright',
    role: 'CTO at BuildFlow',
    avatar: 'MW',
    content: 'The templates saved us hours of work. The public pages look clean and trustworthy — exactly what we needed.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Product Lead at AppNest',
    avatar: 'PP',
    content: "I love how simple it is. Create, edit, publish — done. And the analytics help me know our policy is actually being read.",
    rating: 5,
  },
]

const PLANS = [
  {
    id: '3m',
    label: '3-Month Plan',
    price: '$5',
    period: '3 months',
    monthly: '$1.67/mo',
    recommended: false,
    features: [
      'Policy drafted and reviewed',
      'Permanent public URL',
      'LGPD, GDPR & CCPA compliance',
      'Hosted for 3 months',
      'Update requests included',
      '24-hour response time',
    ],
  },
  {
    id: '6m',
    label: '6-Month Plan',
    price: '$10',
    period: '6 months',
    monthly: '$1.67/mo',
    recommended: false,
    features: [
      'Policy drafted and reviewed',
      'Permanent public URL',
      'LGPD, GDPR & CCPA compliance',
      'Hosted for 6 months',
      'Update requests included',
      '24-hour response time',
    ],
  },
  {
    id: '1y',
    label: '1-Year Plan',
    price: '$14.99',
    period: '1 year',
    monthly: '$1.25/mo',
    recommended: true,
    features: [
      'Policy drafted and reviewed',
      'Permanent public URL',
      'LGPD, GDPR & CCPA compliance',
      'Hosted for 12 months',
      'Update requests included',
      '24-hour response time',
    ],
  },
]

const FAQS = [
  {
    q: 'How much does it cost?',
    a: 'We charge $5 for 3 months of hosting — less than $2 per month. That includes policy drafting, review, publishing, and hosting for the full period. Renewal is just as simple: send us a message.',
  },
  {
    q: 'How does the publishing process work?',
    a: 'Just reach out by email describing your system, app, or platform. Our team drafts, reviews, and publishes a tailored privacy policy with a permanent public URL.',
  },
  {
    q: 'Is my policy publicly accessible?',
    a: 'Yes, once published, your policy gets a clean public URL that you can link anywhere — app stores, websites, or directly in your app.',
  },
  {
    q: 'Can I update my policy after publishing?',
    a: 'Absolutely. You can request updates anytime. Changes are reflected immediately on the public page.',
  },
  {
    q: 'What makes this different from a generic privacy policy generator?',
    a: "OpenPrivacy hosts and manages your policy in one place, with a branded public page and permanent URL — not just a downloadable document. We also handle the technical publication for you.",
  },
  {
    q: 'Which regulations are covered?',
    a: 'Our policies are crafted to cover the main regulations applicable to your product, including LGPD (Brazil), GDPR (Europe), and CCPA (California). We tailor the policy to the specifics of your system.',
  },
]

const STATS = [
  { value: `${STATIC_POLICIES.length}+`, label: 'Policies published', icon: <FileText className="size-5" /> },
  { value: '1+', label: 'Companies trust us', icon: <Users className="size-5" /> },
  { value: '99.99%', label: 'Uptime guaranteed', icon: <TrendingUp className="size-5" /> },
  { value: '4.9/5', label: 'Customer rating', icon: <Award className="size-5" /> },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 dark:border-gray-800">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-brand-600 transition-colors"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{q}</span>
        {open ? (
          <ChevronUp className="size-4 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="size-4 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <p className="pb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{a}</p>
      )}
    </div>
  )
}

export function LandingPage() {
  return (
    <AppLayout transparent>
      {/* Hero */}
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
            <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`}>
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
            {['LGPD, GDPR & CCPA ready', 'Permanent public URL', 'Response within 24 hours'].map((f) => (
              <div key={f} className="flex items-center gap-1.5">
                <CheckCircle className="size-3.5 text-green-500" />
                {f}
              </div>
            ))}
          </div>

          {/* Hero visual */}
          <div className="mt-16 relative max-w-4xl mx-auto">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-[0_20px_25px_-5px_rgb(0_0_0/0.10)] overflow-hidden bg-white dark:bg-gray-900">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-amber-400" />
                <div className="size-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-3 h-6 bg-white dark:bg-gray-700 rounded-lg flex items-center px-3">
                  <span className="text-xs text-gray-400">openprivacypolicy.com/p/acme-corp</span>
                </div>
              </div>
              <div className="p-8 text-left">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Acme Corp Privacy Policy</h2>
                    <p className="text-sm text-gray-400 mt-1">Last updated: November 20, 2024</p>
                  </div>
                  <Badge variant="success" dot>Published</Badge>
                </div>
                <div className="space-y-4">
                  {['Introduction', 'Information We Collect', 'How We Use Your Information', 'Data Security'].map((s) => (
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

      {/* Stats */}
      <section className="py-16 border-y border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center size-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 mb-3">
                {stat.icon}
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge variant="brand" className="mb-4">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
              Everything you need to stay compliant
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Built for founders and teams who want professional results without the complexity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature) => (
              <Card key={feature.title} hover className="flex flex-col gap-3">
                <div className="inline-flex items-center justify-center size-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
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
            {[
              {
                step: '01',
                title: 'Send your policy',
                description: 'Share your existing privacy policy and a brief description of your app or platform. Our team reviews your submission and responds within 24 hours.',
              },
              {
                step: '02',
                title: 'We review and assist',
                description: 'We check your policy, flag anything that may be missing or unclear, and format it professionally. We help — but the policy is yours.',
              },
              {
                step: '03',
                title: 'We publish and share',
                description: 'We publish your policy with a clean, permanent public URL ready to be linked from your app store listing, website, or app.',
              },
            ].map((item, i) => (
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
            <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`}>
              <Button size="lg" rightIcon={<ArrowRight className="size-4" />}>
                Contact us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
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
              {[
                'Required by law in most jurisdictions',
                'Required by Apple, Google, and major platforms',
                'Builds user trust and reduces churn',
                'Protects your business from liability',
              ].map((b) => (
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

      {/* Pricing */}
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

                  <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_SUBJECT + ' - ' + plan.label)}`}>
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

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge variant="brand" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Loved by teams everywhere
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
                    <span className="text-xs font-semibold text-brand-700 dark:text-brand-400">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Published Policies */}
      <section id="policies" className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="brand" className="mb-4">Live policies</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
              Policies hosted by us
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Real privacy policies, published and hosted on our platform.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              STATIC_POLICIES.find((p) => p.slug === 'openprivacypolicy')!,
              ...STATIC_POLICIES.filter((p) => p.slug !== 'openprivacypolicy').slice(0, 4),
            ]
              .filter(Boolean)
              .slice(0, 5)
              .map((policy) => (
                <Link
                  key={policy.slug}
                  to={`/privacy-policies/${policy.slug}`}
                  className="group flex items-center justify-between gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-700 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="shrink-0 size-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                      <ShieldCheck className="size-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {policy.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {policy.appName} · Updated {policy.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="size-4 text-gray-300 dark:text-gray-600 group-hover:text-brand-500 flex-shrink-0 transition-colors" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="brand" className="mb-4">FAQ</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Frequently asked questions
            </h2>
          </div>
          <div>
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
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
                <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`}>
                  <Button size="lg" rightIcon={<ArrowRight className="size-4" />}>
                    Send an email
                  </Button>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 grid sm:grid-cols-3 gap-4">
              {[
                'Policy tailored to your product',
                'Clean, permanent public URL',
                'LGPD, GDPR & CCPA compliant',
              ].map((text) => (
                <div key={text} className="flex items-center gap-2.5">
                  <CheckCircle className="size-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="gradient-brand p-12 rounded-3xl text-white">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Ready to get compliant?
            </h2>
            <p className="text-brand-100 leading-relaxed mb-8 max-w-md mx-auto">
              Join companies already using OpenPrivacy to manage their privacy policies professionally.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`}>
                <Button size="lg" variant="secondary" className="bg-white text-brand-700 hover:bg-brand-50">
                  Contact us
                </Button>
              </a>
              <a href="/#how-it-works">
                <Button size="lg" className="bg-brand-700/50 hover:bg-brand-700 text-white border-0">
                  How it works
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}
