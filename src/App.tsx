import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { PublicOnlyRoute } from '@/routes/ProtectedRoute'

import { LandingPage } from '@/pages/landing/LandingPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
// import { OnboardingPage } from '@/pages/onboarding/OnboardingPage'
// import { DashboardOverview } from '@/pages/dashboard/DashboardOverview'
// import { PoliciesPage } from '@/pages/dashboard/PoliciesPage'
// import { AnalyticsPage } from '@/pages/dashboard/AnalyticsPage'
// import { PolicyEditorPage } from '@/pages/editor/PolicyEditorPage'
// import { TemplatesPage } from '@/pages/templates/TemplatesPage'
// import { SettingsPage } from '@/pages/settings/SettingsPage'
import { PublicPolicyPage } from '@/pages/public/PublicPolicyPage'
import { StaticPolicyPage } from '@/pages/public/StaticPolicyPage'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/p/:slug" element={<PublicPolicyPage />} />
          <Route path="/privacy-policies/:slug" element={<StaticPolicyPage />} />

          {/* Auth routes (redirect to dashboard if logged in) */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Protected routes */}
          {/*<Route element={<ProtectedRoute />}>
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/dashboard/policies" element={<PoliciesPage />} />
            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
            <Route path="/dashboard/templates" element={<TemplatesPage />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
            <Route path="/dashboard/editor/:id" element={<PolicyEditorPage />} />
          </Route>*/}
        </Routes>
      </BrowserRouter>

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '!bg-white dark:!bg-gray-900 !text-gray-900 dark:!text-gray-100 !shadow-lg !border !border-gray-100 dark:!border-gray-800 !rounded-xl !text-sm',
          success: { iconTheme: { primary: '#5b73f5', secondary: '#fff' } },
        }}
      />
    </ThemeProvider>
  )
}
