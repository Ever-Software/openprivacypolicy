export const CONTACT_EMAIL = 'eversoftwarehouse@gmail.com'
export const CONTACT_SUBJECT = 'Privacy policy publishing request'
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`

export function planContactHref(planLabel: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${CONTACT_SUBJECT} - ${planLabel}`)}`
}
