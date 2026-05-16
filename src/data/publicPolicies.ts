export interface StaticPolicySection {
  id: string
  title: string
  content: string
}

export interface StaticPolicy {
  slug: string
  title: string
  appName: string
  companyName: string
  contactEmail: string
  lastUpdated: string
  sections: StaticPolicySection[]
}

export const STATIC_POLICIES: StaticPolicy[] = [
  {
    slug: 'openprivacypolicy',
    title: 'OpenPrivacyPolicy Privacy Policy',
    appName: 'OpenPrivacyPolicy',
    companyName: 'Ever Software House',
    contactEmail: 'eversoftwarehouse@gmail.com',
    lastUpdated: 'May 16, 2026',
    sections: [
      {
        id: 'intro',
        title: 'Introduction',
        content: `OpenPrivacyPolicy is a service developed by Ever Software House that hosts and publishes privacy policies for individuals and companies through permanent public URLs.

This Privacy Policy describes what information we collect, how we use it, and what rights you have when you visit openprivacypolicy.com or contact us to publish a policy.

OpenPrivacyPolicy does not require users to create accounts or log in. Policies are published by our team on request, submitted via email. By accessing this website or contacting us, you agree to the practices described here.`,
      },
      {
        id: 'collection',
        title: 'Information We Collect',
        content: `We collect minimal information, limited to what is necessary to operate the website, process payments, and respond to publishing requests.

Information you provide:
• Email contact — when you send us a request to publish a privacy policy, we receive your email address and any content you include in the message (e.g., your app name, company name, and the policy text).
• Payment information — when you purchase a hosting plan, payment is processed by our third-party payment provider. We receive confirmation of the transaction (amount, date, and plan period) but do not store your full card number, CVV, or sensitive payment credentials.

Information collected automatically:
• Usage data — aggregated page views and navigation data used to understand how visitors interact with the website.
• Device and browser data — browser type, operating system, and referring URL, collected solely for performance and compatibility purposes.
• IP address — used for security and approximate geographic analytics (country/region level only). Not linked to any personal identity.`,
      },
      {
        id: 'use',
        title: 'How We Use Your Information',
        content: `We use the information we collect only for the following purposes:

• To respond to your publishing request — processing your email submission, reviewing the submitted policy content, and publishing it with a permanent public URL.
• To operate and improve the website — analyzing aggregated usage patterns to detect bugs, improve performance, and guide future improvements.
• To ensure security — detecting and preventing abusive or unauthorized access attempts.
• To comply with legal obligations — fulfilling requirements under applicable laws and regulations.

We do not use your information to send marketing emails, sell data to third parties, or train machine learning models.`,
      },
      {
        id: 'payments',
        title: 'Payments and Billing',
        content: `OpenPrivacyPolicy offers three hosting plans:

• Starter — $4.99 for 3 months. Includes policy drafting, review, publishing, and hosting for three months, with 1 update included.
• Professional — $12.99 per year. Includes everything in Starter plus 12 months of hosting, unlimited updates, and priority support.
• Business — $29 per year. Includes everything in Professional plus support for multiple policies, advanced customization, team access, and dedicated support.

Payment processing:
• Payments are handled by a PCI-compliant third-party payment processor. We do not store full card numbers or sensitive financial credentials on our servers.
• Upon successful payment, we receive a transaction confirmation (amount, date, plan expiration) which is used solely to activate and maintain your hosting period.

Billing records:
• We retain transaction records (email, amount, plan period) for accounting and support purposes, in accordance with applicable financial and tax regulations.
• These records are kept for up to 5 years as required by law, and are not used for marketing or shared with third parties outside of legal obligations.

Renewal:
• Hosting plans are not auto-renewed. When your plan period is near expiration, you may renew by contacting us again. We will not charge you without an explicit new request.

Refunds:
• Requests for refunds are evaluated on a case-by-case basis. Contact us at eversoftwarehouse@gmail.com within 7 days of purchase if you believe a refund is warranted.`,
      },
      {
        id: 'sharing',
        title: 'How We Share Your Information',
        content: `We do not sell your personal data. We share information only in the following limited circumstances:

Hosting infrastructure:
The website is hosted on Vercel. By accessing the site, your request data (including IP address) passes through Vercel's infrastructure in accordance with their privacy policy (vercel.com/legal/privacy-policy).

Public policy pages:
The privacy policies we publish on your behalf are intentionally accessible to anyone with the public URL. Policy content is public by design — do not include sensitive personal information in the policy text itself.

Legal requirements:
We may disclose information if required by law, court order, or government authority, or when we believe disclosure is necessary to protect the safety of users or the public.`,
      },
      {
        id: 'cookies',
        title: 'Cookies and Tracking',
        content: `OpenPrivacyPolicy uses only functional storage — specifically, your theme preference (light, dark, or system) is saved in your browser's localStorage so the site remembers your display settings between visits.

We do not use advertising cookies, third-party tracking scripts, or behavioral analytics that identify individual users.

You can clear localStorage at any time through your browser settings. This will reset your theme preference to the default.`,
      },
      {
        id: 'retention',
        title: 'Data Retention',
        content: `• Email communications — messages you send us are kept only as long as necessary to fulfill the publishing request and handle any follow-up questions.
• Published policies — policies remain accessible at their public URL indefinitely, or until you request their removal by contacting us.
• Usage and analytics data — aggregated, anonymized data is retained for up to 24 months.

To request deletion of a published policy or any personal data associated with your email, contact us at eversoftwarehouse@gmail.com.`,
      },
      {
        id: 'security',
        title: 'Data Security',
        content: `We implement reasonable technical measures to protect your information:

• All data transmitted between your browser and our servers is encrypted via HTTPS/TLS.
• The website is served as a static application hosted on Vercel, minimizing attack surface.
• We do not operate databases that store personal user accounts or passwords.

No method of transmission or storage is 100% secure. If you have concerns, contact us at eversoftwarehouse@gmail.com.`,
      },
      {
        id: 'rights',
        title: 'Your Rights',
        content: `Depending on your location, you may have the following rights regarding your personal data:

• Access — request information about what data we hold related to your email address.
• Correction — request correction of inaccurate information.
• Deletion — request removal of a published policy or any data associated with your email.
• Objection — object to processing activities related to your data.

To exercise any of these rights, contact us at eversoftwarehouse@gmail.com. We will respond within 30 days.`,
      },
      {
        id: 'thirdParty',
        title: 'Third-Party Services',
        content: `OpenPrivacyPolicy uses the following third-party infrastructure:

• Vercel — static site hosting and global CDN delivery. Vercel may collect request metadata (IP address, headers) as part of normal CDN operation. See vercel.com/legal/privacy-policy.

We do not integrate advertising networks, social login providers, payment processors, or behavioral tracking tools.`,
      },
      {
        id: 'children',
        title: "Children's Privacy",
        content: `OpenPrivacyPolicy is not directed at children under the age of 13 (or 16 in the European Union). We do not knowingly collect personal data from children.

If you are a parent or guardian and believe your child has submitted personal data via email contact, please reach out at eversoftwarehouse@gmail.com and we will promptly delete the information.`,
      },
      {
        id: 'changes',
        title: 'Changes to This Policy',
        content: `We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements.

When changes are made, we will update the "Last Updated" date at the top of this page. Continued use of the website after the effective date constitutes acceptance of the revised policy.`,
      },
      {
        id: 'contact',
        title: 'Contact',
        content: `If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please reach out to us:

Ever Software House
eversoftwarehouse@gmail.com

We aim to respond to all privacy-related inquiries within 30 business days.`,
      },
    ],
  },
  {
    slug: 'financial-me',
    title: 'Financial ME Privacy Policy',
    appName: 'Financial ME',
    companyName: 'Ever Software House',
    contactEmail: 'eversoftwarehouse@gmail.com',
    lastUpdated: 'May 10, 2026',
    sections: [
      {
        id: 'intro',
        title: 'Introduction',
        content: `Welcome to Financial ME, a personal finance management application developed by Ever Software House. This Privacy Policy explains how Financial ME handles your information when you use the app.

Financial ME is designed with a privacy-first approach: all data you enter is stored exclusively on your device and is never transmitted to any external server, cloud service, or third party.

By using Financial ME, you agree to the practices described here.`,
      },
      {
        id: 'collection',
        title: 'Information We Collect',
        content: `Financial ME only processes information that you voluntarily provide through the app.

Financial Data:
• Expenses (amount, category, description, date, payment status)
• Income entries (amount, description, date)
• Investments (amount, type, institution, description)
• Installment plans and recurring expenses
• Monthly budgets per category
• Savings goals (name, target amount, deadline)

Profile and Preferences:
• Your name and email address (used only for display and report headers)
• Language and currency preference
• Theme preference (light / dark)
• Monthly budget limit
• App lock settings (PIN hash or biometric preference)

Purpose of Use:
All information is used solely to provide the app's core functionality: tracking your personal finances, generating reports, and displaying financial summaries. None of this information is shared with or accessible by anyone other than you.`,
      },
      {
        id: 'storage',
        title: 'Data Storage',
        content: `All data is stored locally on your device.

Financial ME uses a SQLite database stored in your device's private app storage. This means:

• Your financial data never leaves your device.
• No data is synced to the cloud.
• No remote servers store or have access to your information.
• Uninstalling the app permanently deletes all stored data.

Backup and Export (User-Initiated Only):
The app offers optional export features:

• JSON Backup: Exports your data to a .json file saved temporarily in your device's cache, then shared via the native share dialog. You control where this file goes.
• PDF Report: Generates a financial report as a .pdf file locally on your device, shared via the native share dialog. No external service is involved.

You are solely responsible for the security of any exported files.`,
      },
      {
        id: 'permissions',
        title: 'Permissions',
        content: `Financial ME requests only the permissions necessary to deliver its features. No permission is used for data collection or tracking.

• File System Access — Required to generate and temporarily store export files (PDF and JSON) in your device's cache directory before sharing.
• Document Picker — Used when you choose to import a previously exported JSON backup file. Only activated on your explicit action.
• Share / Send — Used to share generated PDF and JSON files via your device's native share sheet.
• Biometric Authentication — Optional. Used only if you enable fingerprint or face unlock in Settings. Authentication is performed entirely by your device's OS. No biometric data is accessed or stored by the app.

Financial ME does not request access to your camera, microphone, location, contacts, or calendar.`,
      },
      {
        id: 'auth',
        title: 'Authentication and Security',
        content: `Financial ME offers two optional app-lock mechanisms to protect your financial data:

• Biometric Lock: Uses your device's native biometric system (fingerprint / face recognition). The app never accesses or stores your biometric data.
• PIN Lock: A 4-digit PIN you define. Only a one-way hash of the PIN is stored locally. The original PIN is never stored.

Both mechanisms operate entirely on-device. Authentication data is never transmitted externally.`,
      },
      {
        id: 'thirdParty',
        title: 'Third-Party Services',
        content: `Financial ME does not integrate analytics platforms, crash reporting services, cloud storage, social login, or payment processors. The app does not collect or transmit your financial data to any third party.

The app uses standard open-source development libraries (React Native, Redux, i18next) solely as a programming framework. These libraries operate locally and do not collect user data.

Advertising — Google AdMob:
Financial ME displays interstitial ads provided by Google AdMob to keep the app free. Google AdMob may collect and process device data to serve ads, including device identifiers, IP address, and ad interaction data. This data is handled in accordance with Google's Privacy Policy (policies.google.com/privacy).

Google may use this data to personalize ads based on your interests. To manage personalized ad preferences, visit your Google settings on your device.`,
      },
      {
        id: 'security',
        title: 'Data Security',
        content: `We take reasonable measures to protect your data:

• All data is stored in your device's private, sandboxed app storage, inaccessible to other apps.
• Optional PIN or biometric app lock adds an extra layer of protection.
• Exported files are created in a temporary cache directory. Their security after export depends on how you handle them.

Since no data is transmitted over the internet, there is no risk of server-side breaches affecting your financial information.`,
      },
      {
        id: 'children',
        title: "Children's Privacy",
        content: `Financial ME is not directed at children under the age of 13. The app does not knowingly collect information from children. Since all data is voluntarily entered by the user and stored locally, no personal data is accessible to us.

If you believe a child has entered personal information into the app, you can clear all data via Settings → Clear all data.`,
      },
      {
        id: 'changes',
        title: 'Changes to This Policy',
        content: `We may update this Privacy Policy from time to time to reflect changes in the app's features or applicable regulations. When changes are made, we will update the date at the top of this document.

Continued use of the app after changes constitutes acceptance of the updated policy.`,
      },
      {
        id: 'contact',
        title: 'Contact',
        content: `If you have any questions, concerns, or requests regarding this Privacy Policy, please contact:

Ever Software House
eversoftwarehouse@gmail.com`,
      },
    ],
  },
]

export function getStaticPolicy(slug: string): StaticPolicy | undefined {
  return STATIC_POLICIES.find((p) => p.slug === slug)
}
