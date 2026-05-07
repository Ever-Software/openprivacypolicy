import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
})

type FormData = z.infer<typeof schema>

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1000))
    setSent(true)
  }

  if (sent) {
    return (
      <AuthLayout title="Check your email" footer={<Link to="/login" className="text-brand-600 font-medium">Back to sign in</Link>}>
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center size-14 rounded-full bg-green-50 dark:bg-green-900/30 mb-4">
            <CheckCircle className="size-7 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            We've sent a password reset link to your email address. Check your inbox and follow the instructions.
          </p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      description="Enter your email and we'll send you a reset link"
      footer={
        <Link to="/login" className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 font-medium">
          <ArrowLeft className="size-3.5" />
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          leftElement={<Mail className="size-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          Send reset link
        </Button>
      </form>
    </AuthLayout>
  )
}
