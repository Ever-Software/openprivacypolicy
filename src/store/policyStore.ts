import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Policy, PolicySection, PolicyStatus } from '@/types'
import { generateSlug } from '@/utils/date'

const MOCK_POLICIES: Policy[] = []

interface PolicyState {
  policies: Policy[]
  createPolicy: (data: Partial<Policy>) => Policy
  updatePolicy: (id: string, data: Partial<Policy>) => void
  deletePolicy: (id: string) => void
  publishPolicy: (id: string) => void
  unpublishPolicy: (id: string) => void
  updateSection: (policyId: string, sectionId: string, content: string) => void
  addSection: (policyId: string, section: Omit<PolicySection, 'id'>) => void
  removeSection: (policyId: string, sectionId: string) => void
  getPolicyBySlug: (slug: string) => Policy | undefined
}

export const usePolicyStore = create<PolicyState>()(
  persist(
    (set, get) => ({
      policies: MOCK_POLICIES,

      createPolicy: (data) => {
        const policy: Policy = {
          id: `policy-${Date.now()}`,
          userId: 'user-1',
          title: data.title ?? 'Untitled Policy',
          slug: generateSlug(data.title ?? 'untitled-policy'),
          status: 'draft',
          sections: data.sections ?? [],
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          views: 0,
          ...data,
        }
        set((state) => ({ policies: [policy, ...state.policies] }))
        return policy
      },

      updatePolicy: (id, data) =>
        set((state) => ({
          policies: state.policies.map((p) =>
            p.id === id ? { ...p, ...data, lastUpdated: new Date().toISOString() } : p
          ),
        })),

      deletePolicy: (id) =>
        set((state) => ({ policies: state.policies.filter((p) => p.id !== id) })),

      publishPolicy: (id) =>
        set((state) => ({
          policies: state.policies.map((p) =>
            p.id === id
              ? { ...p, status: 'published' as PolicyStatus, publishedAt: new Date().toISOString(), lastUpdated: new Date().toISOString() }
              : p
          ),
        })),

      unpublishPolicy: (id) =>
        set((state) => ({
          policies: state.policies.map((p) =>
            p.id === id ? { ...p, status: 'draft' as PolicyStatus, lastUpdated: new Date().toISOString() } : p
          ),
        })),

      updateSection: (policyId, sectionId, content) =>
        set((state) => ({
          policies: state.policies.map((p) =>
            p.id === policyId
              ? {
                  ...p,
                  lastUpdated: new Date().toISOString(),
                  sections: p.sections.map((s) =>
                    s.id === sectionId ? { ...s, content } : s
                  ),
                }
              : p
          ),
        })),

      addSection: (policyId, section) =>
        set((state) => ({
          policies: state.policies.map((p) =>
            p.id === policyId
              ? {
                  ...p,
                  lastUpdated: new Date().toISOString(),
                  sections: [
                    ...p.sections,
                    { ...section, id: `s-${Date.now()}` },
                  ],
                }
              : p
          ),
        })),

      removeSection: (policyId, sectionId) =>
        set((state) => ({
          policies: state.policies.map((p) =>
            p.id === policyId
              ? {
                  ...p,
                  lastUpdated: new Date().toISOString(),
                  sections: p.sections.filter((s) => s.id !== sectionId),
                }
              : p
          ),
        })),

      getPolicyBySlug: (slug) => get().policies.find((p) => p.slug === slug),
    }),
    {
      name: 'opp-policies',
      version: 1,
      migrate: (state: unknown) => {
        const s = state as { policies?: Policy[] }
        const mockIds = new Set(['policy-1', 'policy-2', 'policy-3'])
        return { ...s, policies: (s.policies ?? []).filter((p) => !mockIds.has(p.id)) }
      },
    }
  )
)
