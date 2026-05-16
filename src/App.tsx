import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/providers/ThemeProvider'

import { LandingPage } from '@/pages/landing/LandingPage'
import { PublicPolicyPage } from '@/pages/public/PublicPolicyPage'
import { StaticPolicyPage } from '@/pages/public/StaticPolicyPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/p/:slug" element={<PublicPolicyPage />} />
          <Route path="/privacy-policies/:slug" element={<StaticPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
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
