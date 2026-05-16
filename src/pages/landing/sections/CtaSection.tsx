import { Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { CONTACT_HREF } from '@/config/contact'

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="gradient-brand p-12 rounded-3xl text-white">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to get compliant?
          </h2>
          <p className="text-brand-100 leading-relaxed mb-8 max-w-md mx-auto">
            Generate a professional privacy policy in minutes — free. Or let us handle everything for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/generate">
              <Button size="lg" variant="secondary" className="bg-white text-brand-700 hover:bg-brand-50" leftIcon={<Sparkles className="size-4" />}>
                Generate free policy
              </Button>
            </Link>
            <a href={CONTACT_HREF}>
              <Button size="lg" className="bg-brand-700/50 hover:bg-brand-700 text-white border-0" rightIcon={<ArrowRight className="size-4" />}>
                Request managed hosting
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
