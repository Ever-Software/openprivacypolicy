import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ArrowRight, Building, Globe, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Logo } from '@/components/ui/Logo'
import { usePolicyStore } from '@/store/policyStore'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/utils/cn'

const STEPS = ['Welcome', 'Your business', 'Create policy'] as const

export function OnboardingPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { createPolicy } = usePolicyStore()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ companyName: '', website: '', email: user?.email ?? '' })
  const [selectedTemplate, setSelectedTemplate] = useState('general')

  const templates = [
    { id: 'general', label: 'General website', icon: '🌐' },
    { id: 'saas', label: 'SaaS app', icon: '⚡' },
    { id: 'ecommerce', label: 'Online store', icon: '🛍️' },
    { id: 'mobile', label: 'Mobile app', icon: '📱' },
  ]

  const handleFinish = () => {
    createPolicy({
      title: `${form.companyName || 'My Company'} Privacy Policy`,
      companyName: form.companyName,
      websiteUrl: form.website,
      contactEmail: form.email,
      sections: [
        { id: 's1', title: 'Introduction', content: `This Privacy Policy describes how ${form.companyName || '[Company Name]'} handles your data.`, order: 0 },
        { id: 's2', title: 'Information We Collect', content: 'We collect information you provide directly to us when using our services.', order: 1 },
        { id: 's3', title: 'How We Use Information', content: 'We use the information collected to provide, maintain, and improve our services.', order: 2 },
        { id: 's4', title: 'Contact Us', content: `Contact us at ${form.email || '[contact email]'} for privacy questions.`, order: 3 },
      ],
    })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Logo size="lg" className="justify-center mb-6" />
          <div className="flex items-center justify-center gap-2 mb-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={cn(
                    'size-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all',
                    i < step ? 'bg-green-500 text-white' : i === step ? 'bg-brand-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  )}
                >
                  {i < step ? <CheckCircle className="size-3.5" /> : i + 1}
                </div>
                <span className={cn('text-xs hidden sm:block', i === step ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-400')}>{s}</span>
                {i < STEPS.length - 1 && <div className="w-8 h-px bg-gray-200 dark:bg-gray-700" />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-8">
          {step === 0 && (
            <div className="text-center">
              <div className="text-5xl mb-4">👋</div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome, {user?.name.split(' ')[0]}!
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                Let's set up your first privacy policy in just a few steps. It only takes 2 minutes.
              </p>
              <Button size="lg" className="w-full" rightIcon={<ArrowRight className="size-4" />} onClick={() => setStep(1)}>
                Let's get started
              </Button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Tell us about your business</h2>
              <div className="space-y-4">
                <Input
                  label="Company or app name"
                  placeholder="Acme Corp"
                  leftElement={<Building className="size-4" />}
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                />
                <Input
                  label="Website URL"
                  type="url"
                  placeholder="https://example.com"
                  leftElement={<Globe className="size-4" />}
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
                <Input
                  label="Privacy contact email"
                  type="email"
                  placeholder="privacy@example.com"
                  leftElement={<Mail className="size-4" />}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="flex gap-2 mt-6">
                <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
                <Button className="flex-1" rightIcon={<ArrowRight className="size-4" />} onClick={() => setStep(2)}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Choose a template</h2>
              <p className="text-sm text-gray-500 mb-4">Pick the one that best fits your product.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all',
                      selectedTemplate === t.id
                        ? 'border-brand-400 bg-brand-50 dark:bg-brand-900/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    )}
                  >
                    <span className="text-2xl">{t.icon}</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{t.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1" onClick={handleFinish}>
                  Create my policy
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
