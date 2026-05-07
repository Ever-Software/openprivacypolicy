export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  plan: 'free' | 'pro' | 'business'
  createdAt: string
}

export type PolicyStatus = 'draft' | 'published' | 'archived'

export interface PolicySection {
  id: string
  title: string
  content: string
  order: number
}

export interface Policy {
  id: string
  userId: string
  title: string
  slug: string
  status: PolicyStatus
  sections: PolicySection[]
  templateId?: string
  lastUpdated: string
  createdAt: string
  publishedAt?: string
  views: number
  companyName?: string
  websiteUrl?: string
  contactEmail?: string
}

export interface PolicyTemplate {
  id: string
  name: string
  description: string
  category: 'general' | 'ecommerce' | 'saas' | 'mobile' | 'healthcare'
  sections: Omit<PolicySection, 'id'>[]
  popular?: boolean
}

export interface Analytics {
  totalViews: number
  weeklyViews: number
  monthlyViews: number
  topPolicies: Array<{ policyId: string; title: string; views: number }>
  viewsOverTime: Array<{ date: string; views: number }>
}

export type Theme = 'light' | 'dark' | 'system'
