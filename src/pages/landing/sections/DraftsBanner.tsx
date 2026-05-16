import { Link } from 'react-router-dom'
import { ArrowRight, Pencil, ShieldCheck } from 'lucide-react'
import { usePolicyStore } from '@/store/policyStore'
import { useGeneratorStore } from '@/store/generatorStore'

export function DraftsBanner() {
  const { policies } = usePolicyStore()
  const { formData, currentStep } = useGeneratorStore()

  const draftPolicies = policies.filter(p => p.status === 'draft')
  const hasInProgress = formData.appName.trim() !== '' || currentStep > 0

  // Nothing to show
  if (draftPolicies.length === 0 && !hasInProgress) return null

  const draftCount = draftPolicies.length

  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <div className="size-7 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center shrink-0">
            <ShieldCheck className="size-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="min-w-0">
            {hasInProgress && draftCount === 0 && (
              <p className="text-sm text-amber-800 dark:text-amber-300 font-medium truncate">
                You have an unfinished policy in progress
              </p>
            )}
            {!hasInProgress && draftCount > 0 && (
              <p className="text-sm text-amber-800 dark:text-amber-300 font-medium truncate">
                You have {draftCount} draft {draftCount === 1 ? 'policy' : 'policies'} waiting to be finished
              </p>
            )}
            {hasInProgress && draftCount > 0 && (
              <p className="text-sm text-amber-800 dark:text-amber-300 font-medium truncate">
                You have {draftCount} draft {draftCount === 1 ? 'policy' : 'policies'} and an unfinished generator session
              </p>
            )}
            <p className="text-xs text-amber-600 dark:text-amber-400 truncate">
              Pick up where you left off — your progress is saved
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {hasInProgress && (
            <Link
              to="/generate"
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium transition-colors"
            >
              <Pencil className="size-3.5" />
              Continue generator
              <ArrowRight className="size-3" />
            </Link>
          )}
          {draftCount > 0 && (
            <Link
              to="/generate"
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-xs font-medium transition-colors"
            >
              <ShieldCheck className="size-3.5" />
              View my policies
              <ArrowRight className="size-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
