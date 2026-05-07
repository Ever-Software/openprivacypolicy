import { useNavigate } from 'react-router-dom'
import { FileText, ShoppingBag, Smartphone, Monitor, Heart, Sparkles, ArrowRight } from 'lucide-react'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { usePolicyStore } from '@/store/policyStore'
import toast from 'react-hot-toast'
import type { PolicyTemplate } from '@/types'

const TEMPLATES: PolicyTemplate[] = [
  {
    id: 'tpl-general',
    name: 'General Website',
    description: 'A comprehensive privacy policy for general websites. Covers all standard requirements.',
    category: 'general',
    popular: true,
    sections: [
      { title: 'Introduction', content: 'This Privacy Policy explains how [Company Name] collects, uses, and protects your personal information.', order: 0 },
      { title: 'Information We Collect', content: 'We collect information you provide directly to us and information we collect automatically when you use our services.', order: 1 },
      { title: 'How We Use Information', content: 'We use the information we collect to provide and improve our services, communicate with you, and comply with legal obligations.', order: 2 },
      { title: 'Information Sharing', content: 'We do not sell your personal information. We may share information with trusted partners who assist in operating our website.', order: 3 },
      { title: 'Cookies', content: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information.', order: 4 },
      { title: 'Data Security', content: 'We implement security measures to maintain the safety of your personal information.', order: 5 },
      { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data. Contact us to exercise these rights.', order: 6 },
      { title: 'Contact Us', content: 'For questions about this policy, contact us at [email].', order: 7 },
    ],
  },
  {
    id: 'tpl-saas',
    name: 'SaaS Application',
    description: 'Tailored for software-as-a-service products. Includes subscription and account-specific clauses.',
    category: 'saas',
    popular: true,
    sections: [
      { title: 'Introduction', content: 'Welcome to [App Name]. We are committed to protecting your privacy and the data you entrust to us.', order: 0 },
      { title: 'Account Information', content: 'When you register for an account, we collect your name, email address, and billing information.', order: 1 },
      { title: 'Usage Data', content: 'We collect data about how you interact with our platform, including feature usage, performance metrics, and error logs.', order: 2 },
      { title: 'Data Processing', content: 'We process your data to provide the service, send product updates, and improve user experience.', order: 3 },
      { title: 'Data Retention', content: 'We retain your data for as long as your account is active or as needed to provide services.', order: 4 },
      { title: 'Security', content: 'We use industry-standard encryption and security practices to protect your data.', order: 5 },
      { title: 'GDPR Compliance', content: 'If you are a European resident, you have specific data rights under GDPR including access, rectification, and erasure.', order: 6 },
      { title: 'Contact', content: 'Contact our privacy team at [privacy@example.com] for any questions.', order: 7 },
    ],
  },
  {
    id: 'tpl-ecommerce',
    name: 'E-Commerce Store',
    description: 'Built for online stores. Covers payments, shipping data, and customer purchase history.',
    category: 'ecommerce',
    sections: [
      { title: 'Introduction', content: 'At [Store Name], protecting your personal information is important to us.', order: 0 },
      { title: 'Order Information', content: 'When you purchase from us, we collect your name, billing address, shipping address, and payment details.', order: 1 },
      { title: 'Payment Processing', content: 'Payments are processed by secure third-party payment providers. We do not store full credit card numbers.', order: 2 },
      { title: 'Shipping Data', content: 'We share your shipping address with our fulfillment partners to deliver your orders.', order: 3 },
      { title: 'Marketing Communications', content: 'With your consent, we may send you promotional emails about products and offers.', order: 4 },
      { title: 'Returns & Refunds', content: 'We retain order information to process returns and fulfill refund requests.', order: 5 },
      { title: 'Contact', content: 'Contact us at [email] for questions about your data.', order: 6 },
    ],
  },
  {
    id: 'tpl-mobile',
    name: 'Mobile App',
    description: 'For iOS and Android apps. Compliant with App Store and Google Play requirements.',
    category: 'mobile',
    popular: true,
    sections: [
      { title: 'Introduction', content: 'This privacy policy applies to the [App Name] mobile application.', order: 0 },
      { title: 'Device Information', content: 'We may collect information about the mobile device you use, including device model, operating system, and unique device identifiers.', order: 1 },
      { title: 'Location Data', content: 'With your permission, we may collect and use your location data to provide location-based features.', order: 2 },
      { title: 'Push Notifications', content: 'We may send push notifications to your device. You can opt out in your device settings.', order: 3 },
      { title: 'Third-Party SDKs', content: 'Our app uses third-party SDKs including analytics and advertising tools that may collect data.', order: 4 },
      { title: 'Children\'s Privacy', content: 'Our app is not intended for children under 13. We do not knowingly collect data from children.', order: 5 },
      { title: 'Contact', content: 'Email us at [email] with privacy questions.', order: 6 },
    ],
  },
  {
    id: 'tpl-healthcare',
    name: 'Healthcare / HIPAA',
    description: 'Designed for health apps and services. Includes HIPAA compliance considerations.',
    category: 'healthcare',
    sections: [
      { title: 'Introduction', content: 'This policy describes how [Organization Name] handles protected health information (PHI).', order: 0 },
      { title: 'Health Information We Collect', content: 'We collect health-related information you provide, including medical history, symptoms, and wellness data.', order: 1 },
      { title: 'HIPAA Compliance', content: 'We comply with the Health Insurance Portability and Accountability Act (HIPAA) where applicable.', order: 2 },
      { title: 'Use of Health Information', content: 'We use health information solely to provide the services you request and as permitted by law.', order: 3 },
      { title: 'Security Measures', content: 'We implement administrative, physical, and technical safeguards to protect your health information.', order: 4 },
      { title: 'Your Rights', content: 'You have the right to access, correct, and receive copies of your health information.', order: 5 },
      { title: 'Contact', content: 'Contact our Privacy Officer at [email] for questions about your health information.', order: 6 },
    ],
  },
  {
    id: 'tpl-minimal',
    name: 'Minimal / Startup',
    description: 'Simple and concise for early-stage startups. Easy to read and understand.',
    category: 'general',
    sections: [
      { title: 'What We Collect', content: 'We collect only what we need: your email, name, and basic usage data to improve our service.', order: 0 },
      { title: 'How We Use It', content: 'We use your data to run and improve our service. We never sell it.', order: 1 },
      { title: 'Your Data, Your Choice', content: 'You can request your data, correct it, or delete your account at any time.', order: 2 },
      { title: 'Contact', content: 'Questions? Email us at [email].', order: 3 },
    ],
  },
]

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  general: <Monitor className="size-5" />,
  saas: <Sparkles className="size-5" />,
  ecommerce: <ShoppingBag className="size-5" />,
  mobile: <Smartphone className="size-5" />,
  healthcare: <Heart className="size-5" />,
}

const CATEGORIES = ['all', 'general', 'saas', 'ecommerce', 'mobile', 'healthcare'] as const
type FilterCat = (typeof CATEGORIES)[number]

import { useState } from 'react'

export function TemplatesPage() {
  const navigate = useNavigate()
  const { createPolicy } = usePolicyStore()
  const [filter, setFilter] = useState<FilterCat>('all')

  const filtered = TEMPLATES.filter((t) => filter === 'all' || t.category === filter)

  const handleUseTemplate = (template: PolicyTemplate) => {
    const policy = createPolicy({
      title: `${template.name} Privacy Policy`,
      templateId: template.id,
      sections: template.sections.map((s, i) => ({ ...s, id: `s-${i}` })),
    })
    toast.success('Template applied!')
    navigate(`/dashboard/editor/${policy.id}`)
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Templates</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Start from a professionally written template for your use case.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-sm transition-all capitalize ${
                filter === cat
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat === 'all' ? 'All templates' : cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((template) => (
            <Card key={template.id} hover className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                  {CATEGORY_ICONS[template.category] ?? <FileText className="size-5" />}
                </div>
                {template.popular && (
                  <Badge variant="brand" className="text-xs">Popular</Badge>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{template.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{template.description}</p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-gray-400">{template.sections.length} sections</span>
                <Button
                  size="sm"
                  variant="secondary"
                  rightIcon={<ArrowRight className="size-3.5" />}
                  onClick={() => handleUseTemplate(template)}
                >
                  Use template
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
