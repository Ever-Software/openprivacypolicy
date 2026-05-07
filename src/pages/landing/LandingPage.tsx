import { Link } from 'react-router-dom'
import {
  ShieldCheck, Zap, Globe, FileText, BarChart3, Lock,
  ArrowRight, CheckCircle, Star, ChevronDown, ChevronUp,
  Users, TrendingUp, Award,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { AppLayout } from '@/layouts/AppLayout'

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

const FAQS = [
  {
    q: 'Do I need a lawyer to use this?',
    a: 'No — our templates are written by legal professionals and cover the most common use cases. However, for complex situations we recommend consulting a lawyer.',
  },
  {
    q: 'Is my policy publicly accessible?',
    a: 'Yes, once published, your policy gets a clean public URL that you can link anywhere.',
  },
  {
    q: 'Can I edit my policy after publishing?',
    a: 'Absolutely. You can update your policy anytime. Changes are reflected immediately on the public page.',
  },
  {
    q: 'What makes this different from a generic privacy policy generator?',
    a: "OpenPrivacy lets you host and manage your policy in one place, with analytics, version tracking, and a branded public page — not just a downloadable PDF.",
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes! Our free plan lets you create and publish one privacy policy. Upgrade for unlimited policies, analytics, and custom domains.',
  },
]

const STATS = [
  { value: '12,000+', label: 'Policies published', icon: <FileText className="size-5" /> },
  { value: '3,500+', label: 'Companies trust us', icon: <Users className="size-5" /> },
  { value: '99.9%', label: 'Uptime guaranteed', icon: <TrendingUp className="size-5" /> },
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
            ✨ Now with AI-powered policy generation
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
            Privacy policies your{' '}
            <span className="text-gradient">users can trust</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Create, host, and manage professional privacy policy pages in minutes.
            No legal expertise required. Start free today.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link to="/signup">
              <Button size="lg" rightIcon={<ArrowRight className="size-4" />}>
                Create your policy — free
              </Button>
            </Link>
            <Link to="/#how-it-works">
              <Button size="lg" variant="outline">
                See how it works
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            {['No credit card required', 'Publish in 5 minutes', 'GDPR & CCPA ready'].map((f) => (
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
              From zero to published in minutes
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Three simple steps to get your privacy policy online.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create your account',
                description: 'Sign up free and get instant access to all templates and the policy editor.',
              },
              {
                step: '02',
                title: 'Generate or edit your policy',
                description: 'Choose a template or start from scratch. Customize every section to fit your business.',
              },
              {
                step: '03',
                title: 'Publish and share',
                description: 'Hit publish and get a clean, shareable URL to link from your website or app.',
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
            <Link to="/signup">
              <Button size="lg" rightIcon={<ArrowRight className="size-4" />}>
                Get started for free
              </Button>
            </Link>
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
              GDPR, CCPA, and dozens of other regulations require you to clearly communicate how you collect and use data. Non-compliance carries serious fines and damages user trust.
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

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="gradient-brand p-12 rounded-3xl text-white">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Ready to get compliant?
            </h2>
            <p className="text-brand-100 leading-relaxed mb-8 max-w-md mx-auto">
              Join 3,500+ companies already using OpenPrivacy to manage their privacy policies professionally.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="bg-white text-brand-700 hover:bg-brand-50">
                  Create your policy — free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" className="bg-brand-700/50 hover:bg-brand-700 text-white border-0">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}
