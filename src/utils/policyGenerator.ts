import type { PolicySection } from '@/types'
import type { GeneratorFormData } from '@/store/generatorStore'

const DATA_TYPE_LABELS: Record<string, string> = {
  'full-name': 'Full name and personal identifiers',
  'email': 'Email address',
  'phone': 'Phone number',
  'location': 'Location data (GPS coordinates, IP-based location)',
  'device': 'Device information (model, OS version, unique device identifiers)',
  'usage': 'Usage and interaction data (features used, session duration, navigation patterns)',
  'financial': 'Payment and financial information (processed through secure payment processors)',
  'health': 'Health and fitness data',
  'photos': 'Photos, videos, and media',
  'contacts': 'Contacts and address book data',
}

const PURPOSE_LABELS: Record<string, string> = {
  'core-service': 'To provide and maintain the core functionality of the app',
  'analytics': 'To analyze usage patterns, monitor performance, and improve the app',
  'marketing': 'To send promotional communications and marketing materials (with your consent)',
  'personalization': 'To personalize your experience and deliver relevant content',
  'legal-compliance': 'To comply with applicable laws and legal obligations',
  'customer-support': 'To respond to your inquiries and provide customer support',
}

const THIRD_PARTY_INFO: Record<string, { name: string; description: string; link: string }> = {
  'google-analytics': {
    name: 'Google Analytics',
    description: 'Web analytics service by Google LLC that tracks and reports usage data.',
    link: 'policies.google.com/privacy',
  },
  'firebase': {
    name: 'Firebase (Google)',
    description: 'Backend platform by Google LLC for authentication, database, and cloud services.',
    link: 'policies.google.com/privacy',
  },
  'admob': {
    name: 'Google AdMob',
    description: 'Mobile advertising platform by Google LLC. May collect device identifiers and ad interaction data to serve ads.',
    link: 'policies.google.com/privacy',
  },
  'stripe': {
    name: 'Stripe',
    description: 'Payment processing service. Handles payment card data in accordance with PCI-DSS standards.',
    link: 'stripe.com/privacy',
  },
  'paypal': {
    name: 'PayPal',
    description: 'Online payment platform. Processes payment information per their privacy policy.',
    link: 'paypal.com/webapps/mpp/ua/privacy-full',
  },
  'facebook': {
    name: 'Meta / Facebook',
    description: 'Social media and advertising platform. May collect data for advertising and analytics.',
    link: 'facebook.com/privacy/policy',
  },
  'aws': {
    name: 'Amazon Web Services (AWS)',
    description: 'Cloud infrastructure provider hosting our servers and storing data in secure data centers.',
    link: 'aws.amazon.com/privacy',
  },
  'twilio': {
    name: 'Twilio',
    description: 'Communications platform used for SMS notifications and messaging services.',
    link: 'twilio.com/legal/privacy',
  },
  'mailchimp': {
    name: 'Mailchimp',
    description: 'Email marketing platform for newsletters and promotional communications.',
    link: 'mailchimp.com/legal/privacy',
  },
  'apple-sign-in': {
    name: 'Sign in with Apple',
    description: 'Authentication service by Apple Inc. allowing users to sign in with their Apple ID.',
    link: 'apple.com/legal/privacy',
  },
}

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function generatePolicySections(data: Partial<GeneratorFormData>): PolicySection[] {
  const sections: PolicySection[] = []
  let order = 0

  const app = data.appName?.trim() || 'this application'
  const company = data.companyName?.trim() || 'we'
  const email = data.contactEmail?.trim() || 'our contact email'
  const website = data.websiteUrl?.trim()
  const dateStr = data.effectiveDate ? formatDate(data.effectiveDate) : formatDate(new Date().toISOString().split('T')[0])

  const types = data.dataTypes ?? []
  const customDataTypes = data.customDataTypes ?? []
  const purposes = data.purposes ?? []
  const customPurposes = data.customPurposes ?? []
  const thirdParties = data.thirdPartyServices ?? []
  const customThirdParties = data.customThirdParties ?? []

  // 1. Introduction
  sections.push({
    id: 'intro',
    title: 'Introduction',
    order: order++,
    content: `Welcome to ${app}. This Privacy Policy describes how ${company} ("we", "us", or "our") collects, uses, and protects your personal information when you use ${app}${website ? ` and our website at ${website}` : ''}.

By using ${app}, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree, please do not use our services.

This Privacy Policy is effective as of ${dateStr}.`,
  })

  // 2. Information We Collect
  const allDataTypes = [
    ...types.map(t => `• ${DATA_TYPE_LABELS[t] ?? t}`),
    ...customDataTypes.map(t => `• ${t}`),
  ]

  let collectionContent = `We collect information that you provide directly to us and information collected automatically when you use ${app}.\n\n`

  if (allDataTypes.length > 0) {
    collectionContent += `Personal information you provide:\n${allDataTypes.join('\n')}\n\n`
  }

  if (data.hasUserAccounts) {
    collectionContent += `Account information:\nWhen you create an account, we collect your credentials and any profile information you choose to provide. Passwords are stored in encrypted form and are never accessible in readable format.\n\n`
  }

  if (data.usesCookies) {
    collectionContent += `Automatically collected information:\nWhen you access ${app}, we may automatically collect device data, browser type, IP address, referring URLs, and usage interaction data.\n\n`
  }

  collectionContent += `We only collect information necessary for the purposes described in this Privacy Policy.`

  sections.push({
    id: 'collection',
    title: 'Information We Collect',
    order: order++,
    content: collectionContent,
  })

  // 3. How We Use Your Information
  const allPurposes = [
    ...purposes.map(p => `• ${PURPOSE_LABELS[p] ?? p}`),
    ...customPurposes.map(p => `• ${p}`),
  ]

  const purposeLines =
    allPurposes.length > 0
      ? allPurposes.join('\n')
      : `• To provide and maintain the core functionality of ${app}`

  sections.push({
    id: 'use',
    title: 'How We Use Your Information',
    order: order++,
    content: `We use the information we collect for the following purposes:\n\n${purposeLines}\n\nWe do not sell your personal information to third parties. We will not use your data for purposes not described in this Privacy Policy without first obtaining your consent.`,
  })

  // 4. Information Sharing and Disclosure
  const hasSharing = data.sharesWithThirdParties || thirdParties.length > 0 || customThirdParties.length > 0
  const hasAnyThirdParties = thirdParties.length > 0 || customThirdParties.length > 0

  if (hasSharing && hasAnyThirdParties) {
    let sharingContent = `We may share your information with trusted third-party service providers that assist us in operating ${app}. These providers are contractually obligated to protect your information and may only use it for specified purposes.\n\nThird-party services we use:`

    thirdParties.forEach(svc => {
      const info = THIRD_PARTY_INFO[svc]
      if (info) sharingContent += `\n\n• ${info.name}: ${info.description} (${info.link})`
    })

    customThirdParties.forEach(tp => {
      sharingContent += `\n\n• ${tp.name}${tp.description ? `: ${tp.description}` : ''}`
    })

    sharingContent += `\n\nWe may also disclose your information when required by law or to protect the safety of our users and the public.`
    sections.push({ id: 'sharing', title: 'Information Sharing and Disclosure', order: order++, content: sharingContent })
  } else {
    sections.push({
      id: 'sharing',
      title: 'Information Sharing and Disclosure',
      order: order++,
      content: `We do not sell, trade, or transfer your personal information to third parties except as described in this Privacy Policy.\n\nWe may disclose your information if required by law, court order, or government authority, or when necessary to protect our legal rights or the safety of others.`,
    })
  }

  // 5. Cookies (if applicable)
  if (data.usesCookies) {
    sections.push({
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      order: order++,
      content: `${app} uses cookies and similar tracking technologies to enhance your experience and collect usage information.\n\nWe use cookies to:\n• Remember your preferences and settings\n• Authenticate you and maintain your session\n• Analyze how you use our services and improve performance\n\nYou can instruct your browser to refuse all cookies or alert you when cookies are sent. Disabling cookies may affect the functionality of ${app}.\n\nYou may opt out of interest-based advertising through your device advertising settings or industry opt-out tools.`,
    })
  }

  // 6. Payment Processing (if applicable)
  if (data.collectsPayments) {
    sections.push({
      id: 'payments',
      title: 'Payment Processing',
      order: order++,
      content: `${app} may offer paid features or subscriptions. Payment information is processed by PCI-DSS compliant third-party payment processors.\n\nWe do not store full credit card numbers, CVV codes, or other sensitive payment credentials on our servers. Payment processors receive and handle this data directly in accordance with applicable security standards.\n\nWe retain non-sensitive transaction records (amount, date, plan purchased) for customer support and accounting purposes.\n\nIf ${app} offers subscriptions, you may cancel at any time through your account settings or by contacting us at ${email}. Refund requests are evaluated on a case-by-case basis.`,
    })
  }

  // 7. Data Retention
  sections.push({
    id: 'retention',
    title: 'Data Retention',
    order: order++,
    content: `We retain your personal information for as long as necessary to provide ${app}'s services, fulfill legal obligations, resolve disputes, and enforce our agreements.\n\nWhen data is no longer needed for these purposes, we securely delete or anonymize it. Retention periods vary depending on the type of data and the purpose for which it was collected.\n\n${
      data.allowsDeletion
        ? `You may request deletion of your personal data at any time by contacting us at ${email}. We will process valid deletion requests within 30 days, except where retention is required by law.`
        : `If you wish to request deletion of your personal data, please contact us at ${email}.`
    }`,
  })

  // 8. Data Security
  sections.push({
    id: 'security',
    title: 'Data Security',
    order: order++,
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.\n\nOur security measures include:\n• Data encryption in transit using HTTPS/TLS\n• Access controls with role-based permissions\n• Regular security reviews and vulnerability assessments\n• Minimal access to personal data on a need-to-know basis\n\nWhile we strive to protect your information using commercially reasonable means, no method of internet transmission or electronic storage is completely secure. If you believe your data has been compromised, please notify us immediately at ${email}.`,
  })

  // 9. Your Rights
  const rights = [
    '• Right to access: Request a copy of the personal information we hold about you.',
    '• Right to correction: Request correction of inaccurate or incomplete data.',
    data.allowsDeletion
      ? '• Right to deletion: Request deletion of your personal information, subject to legal exceptions.'
      : null,
    data.allowsExport
      ? '• Right to portability: Request your data in a portable, machine-readable format.'
      : null,
    '• Right to restriction: Request that we restrict processing of your data in certain circumstances.',
    '• Right to object: Object to certain types of data processing, including direct marketing.',
    data.allowsOptOut ? '• Right to opt out: Unsubscribe from marketing communications at any time.' : null,
  ]
    .filter(Boolean)
    .join('\n')

  let rightsContent = `Depending on your location, you have the following rights regarding your personal data:\n\n${rights}`

  if (data.coversGDPR) {
    rightsContent += `\n\nGDPR (European Union):\nIf you are in the EU, you have additional rights under the General Data Protection Regulation, including the right to lodge a complaint with your national supervisory authority. Our legal basis for processing may include consent, contract performance, legal obligation, or legitimate interests. You may withdraw consent at any time.`
  }

  if (data.coversCCPA) {
    rightsContent += `\n\nCCPA (California, USA):\nCalifornia residents have the right to know what personal information we collect and how it is used, to request deletion, and to opt out of the sale of personal data. We do not sell personal data. You will not be discriminated against for exercising your CCPA rights. Contact us at ${email} to submit a request.`
  }

  if (data.coversLGPD) {
    rightsContent += `\n\nLGPD (Brazil):\nBrazilian residents have rights under the Lei Geral de Proteção de Dados, including access, correction, deletion, portability, and revocation of consent. Contact us at ${email} to exercise these rights.`
  }

  rightsContent += `\n\nTo exercise your rights, contact us at ${email}. We will respond within 30 days.`

  sections.push({ id: 'rights', title: 'Your Rights', order: order++, content: rightsContent })

  // 10. Children's Privacy
  if (data.targetedAtChildren) {
    sections.push({
      id: 'children',
      title: "Children's Privacy",
      order: order++,
      content: `${app} may be used by children under 13 only with verifiable parental consent, in accordance with the Children's Online Privacy Protection Act (COPPA) and applicable laws.\n\nFor children's accounts, we:\n• Require verifiable parental consent before collecting personal information.\n• Collect only the minimum information necessary to provide the service.\n• Give parents the ability to review, correct, and delete their child's information.\n• Do not condition participation on providing more information than is reasonably necessary.\n\nParents or guardians with questions about their child's data should contact us at ${email}.`,
    })
  } else {
    sections.push({
      id: 'children',
      title: "Children's Privacy",
      order: order++,
      content: `${app} is not directed at children under the age of 13 (or 16 in the EU). We do not knowingly collect personal information from children under these ages.\n\nIf you are a parent or guardian and believe your child has provided personal information without your consent, please contact us at ${email}. We will take steps to remove such information promptly.`,
    })
  }

  // 11. Changes to This Policy
  sections.push({
    id: 'changes',
    title: 'Changes to This Privacy Policy',
    order: order++,
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. When we make material changes, we will update the effective date and may notify you through the app or by email.\n\nYour continued use of ${app} after any changes constitutes your acceptance of the revised policy. We encourage you to review this Privacy Policy periodically.`,
  })

  // 12. Contact
  sections.push({
    id: 'contact',
    title: 'Contact Us',
    order: order++,
    content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:\n\n${company}\n${email}${website ? `\n${website}` : ''}\n\nWe aim to respond to all privacy-related inquiries within 30 business days.`,
  })

  // 13+. Custom sections
  const customSections = data.customSections ?? []
  customSections.forEach(cs => {
    sections.push({
      id: cs.id,
      title: cs.title,
      order: order++,
      content: cs.content,
    })
  })

  return sections
}

export function generatePolicyTitle(data: Partial<GeneratorFormData>): string {
  return data.appName?.trim() ? `${data.appName.trim()} Privacy Policy` : 'Privacy Policy'
}
