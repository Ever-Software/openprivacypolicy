import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type FormData = z.infer<typeof schema>

export function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuthStore()
  const [showPwd, setShowPwd] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch {
      toast.error('Invalid credentials. Please try again.')
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to manage your privacy policies"
      footer={
        <>
          Don't have an account?{' '}
          <Link to="/signup" className="text-brand-600 hover:text-brand-700 font-medium">
            Sign up free
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          placeholder="Your password"
          autoComplete="current-password"
          leftElement={<Lock className="size-4" />}
          rightElement={
            <button type="button" onClick={() => setShowPwd((v) => !v)} className="hover:text-gray-600 transition-colors">
              {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          }
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-brand-600 hover:text-brand-700">
            Forgot your password?
          </Link>
        </div>

        <Button type="submit" className="w-full" size="lg" loading={isLoading}>
          Sign in
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-gray-900 px-3 text-xs text-gray-400">or</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => { login('demo@example.com', 'demo'); navigate('/dashboard') }}
          className="w-full flex items-center justify-center gap-2 h-10 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
        >
          Try the demo account
        </button>
      </form>
    </AuthLayout>
  )
}
