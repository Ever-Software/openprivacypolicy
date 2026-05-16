import {
  ShieldCheck, Zap, Globe, FileText, BarChart3, Lock,
  Users, TrendingUp, Award,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { STATIC_POLICIES } from '@/data/publicPolicies'

export interface Feature {
  Icon: ComponentType<{ className?: string }>
  title: string
  description: string
}

export interface Testimonial {
  name: string
  role: string
  avatar: string
  content: string
  rating: number
}

export interface Plan {
  id: string
  label: string
  price: string
  period: string
  monthly: string
  recommended: boolean
  features: string[]
}

export interface Faq {
  q: string
  a: string
}

export interface Stat {
  value: string
  label: string
  Icon: ComponentType<{ className?: string }>
}

export const FEATURES: Feature[] = [
  { Icon: Zap, title: 'Instant Publishing', description: 'Publish your privacy policy in seconds with a clean, professional public URL.' },
  { Icon: Globe, title: 'Public Shareable Links', description: 'Share a clean, branded link your users can trust and bookmark.' },
  { Icon: FileText, title: 'Professional Templates', description: 'Start from expertly crafted templates for SaaS, e-commerce, mobile apps, and more.' },
  { Icon: BarChart3, title: 'Analytics Dashboard', description: 'Track how many people read your policy and which sections get the most attention.' },
  { Icon: Lock, title: 'Secure Management', description: 'Your policies are stored securely with version history and easy editing.' },
  { Icon: ShieldCheck, title: 'SEO Optimized', description: 'Every policy page is structured for search engines to help users find your policy.' },
]

export const TESTIMONIALS: Testimonial[] = [
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

export const PLANS: Plan[] = [
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

export const FAQS: Faq[] = [
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

export const STATS: Stat[] = [
  { value: `${STATIC_POLICIES.length}+`, label: 'Policies published', Icon: FileText },
  { value: '1+', label: 'Companies trust us', Icon: Users },
  { value: '99.99%', label: 'Uptime guaranteed', Icon: TrendingUp },
  { value: '4.9/5', label: 'Customer rating', Icon: Award },
]

export const HOW_IT_WORKS = [
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
]

export const HERO_TRUST_ITEMS = ['LGPD, GDPR & CCPA ready', 'Permanent public URL', 'Response within 24 hours']

export const BENEFITS = [
  'Required by law in most jurisdictions',
  'Required by Apple, Google, and major platforms',
  'Builds user trust and reduces churn',
  'Protects your business from liability',
]

export const CONTACT_FEATURES = [
  'Policy tailored to your product',
  'Clean, permanent public URL',
  'LGPD, GDPR & CCPA compliant',
]
