import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

const MOCK_USER: User = {
  id: 'user-1',
  email: 'alex@example.com',
  name: 'Alex Johnson',
  plan: 'pro',
  createdAt: '2024-01-15T00:00:00Z',
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, _password: string) => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 900))
        set({
          user: { ...MOCK_USER, email },
          isAuthenticated: true,
          isLoading: false,
        })
      },

      signup: async (name: string, email: string, _password: string) => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 1000))
        set({
          user: { ...MOCK_USER, name, email, plan: 'free' },
          isAuthenticated: true,
          isLoading: false,
        })
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    { name: 'opp-auth' }
  )
)
