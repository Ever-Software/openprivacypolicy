import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type DataType =
  | 'full-name'
  | 'email'
  | 'phone'
  | 'location'
  | 'device'
  | 'usage'
  | 'financial'
  | 'health'
  | 'photos'
  | 'contacts'

export type Purpose =
  | 'core-service'
  | 'analytics'
  | 'marketing'
  | 'personalization'
  | 'legal-compliance'
  | 'customer-support'

export type ThirdPartyService =
  | 'google-analytics'
  | 'firebase'
  | 'admob'
  | 'stripe'
  | 'paypal'
  | 'facebook'
  | 'aws'
  | 'twilio'
  | 'mailchimp'
  | 'apple-sign-in'

export interface CustomThirdParty {
  id: string
  name: string
  description: string
}

export interface CustomSection {
  id: string
  title: string
  content: string
}

export interface GeneratorFormData {
  // Step 1
  appName: string
  companyName: string
  websiteUrl: string
  contactEmail: string
  effectiveDate: string
  // Step 2
  dataTypes: DataType[]
  customDataTypes: string[]
  usesCookies: boolean
  hasUserAccounts: boolean
  collectsPayments: boolean
  // Step 3
  purposes: Purpose[]
  customPurposes: string[]
  sharesWithThirdParties: boolean
  thirdPartyServices: ThirdPartyService[]
  customThirdParties: CustomThirdParty[]
  // Step 4
  allowsDeletion: boolean
  allowsExport: boolean
  allowsOptOut: boolean
  targetedAtChildren: boolean
  coversGDPR: boolean
  coversCCPA: boolean
  coversLGPD: boolean
  // Review
  customSections: CustomSection[]
}

const DEFAULT_FORM: GeneratorFormData = {
  appName: '',
  companyName: '',
  websiteUrl: '',
  contactEmail: '',
  effectiveDate: new Date().toISOString().split('T')[0],
  dataTypes: [],
  customDataTypes: [],
  usesCookies: false,
  hasUserAccounts: false,
  collectsPayments: false,
  purposes: [],
  customPurposes: [],
  sharesWithThirdParties: false,
  thirdPartyServices: [],
  customThirdParties: [],
  allowsDeletion: true,
  allowsExport: false,
  allowsOptOut: true,
  targetedAtChildren: false,
  coversGDPR: false,
  coversCCPA: false,
  coversLGPD: false,
  customSections: [],
}

interface GeneratorState {
  currentStep: number
  formData: GeneratorFormData
  setStep: (step: number) => void
  updateFormData: (data: Partial<GeneratorFormData>) => void
  reset: () => void
}

export const useGeneratorStore = create<GeneratorState>()(
  persist(
    (set) => ({
      currentStep: 0,
      formData: DEFAULT_FORM,
      setStep: (step) => set({ currentStep: step }),
      updateFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      reset: () => set({ currentStep: 0, formData: DEFAULT_FORM }),
    }),
    {
      name: 'opp-generator',
      version: 2,
      migrate: (state: unknown) => {
        const s = state as { formData?: Partial<GeneratorFormData> }
        return {
          ...s,
          formData: {
            ...DEFAULT_FORM,
            ...(s.formData ?? {}),
          },
        }
      },
    }
  )
)
