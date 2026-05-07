import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export function SignupPage() {
  const navigate = useNavigate()
  const { signup, isLoading } = useAuthStore()
  const [showPwd, setShowPwd] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await signup(data.name, data.email, data.password)
      toast.success('Account created! Welcome to OpenPrivacy.')
      navigate('/onboarding')
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      description="Get your privacy policy published in minutes"
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 hover:text-brand-700 font-medium">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full name"
          type="text"
          placeholder="Alex Johnson"
          autoComplete="name"
          leftElement={<User className="size-4" />}
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          leftElement={<Mail className="size-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type={showPwd ? 'text' : 'password'}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          leftElement={<Lock className="size-4" />}
          rightElement={
            <button type="button" onClick={() => setShowPwd((v) => !v)} className="hover:text-gray-600 transition-colors">
              {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          }
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label="Confirm password"
          type={showPwd ? 'text' : 'password'}
          placeholder="Repeat your password"
          autoComplete="new-password"
          leftElement={<Lock className="size-4" />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <p className="text-xs text-gray-400 dark:text-gray-500">
          By creating an account you agree to our{' '}
          <a href="#" className="underline hover:text-gray-600">Terms of Service</a> and{' '}
          <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>.
        </p>

        <Button type="submit" className="w-full" size="lg" loading={isLoading}>
          Create free account
        </Button>
      </form>
    </AuthLayout>
  )
}
