import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { useState } from 'react'
import { trackEvent } from '@/utils/analytics'

interface PolicyFeedbackProps {
  policySlug: string
}

type FeedbackState = 'idle' | 'positive' | 'negative'

export function PolicyFeedback({ policySlug }: PolicyFeedbackProps) {
  const [state, setState] = useState<FeedbackState>('idle')

  function handleFeedback(value: 'positive' | 'negative') {
    if (state !== 'idle') return
    setState(value)
    trackEvent(value === 'positive' ? 'policy_feedback_positive' : 'policy_feedback_negative', {
      slug: policySlug,
    })
  }

  if (state !== 'idle') {
    return (
      <p className="text-sm text-gray-400">Thanks for your feedback!</p>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500 dark:text-gray-400">Was this helpful?</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleFeedback('positive')}
          className="p-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-green-950 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
          aria-label="Yes, helpful"
        >
          <ThumbsUp className="size-4" />
        </button>
        <button
          onClick={() => handleFeedback('negative')}
          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          aria-label="No, not helpful"
        >
          <ThumbsDown className="size-4" />
        </button>
      </div>
    </div>
  )
}
