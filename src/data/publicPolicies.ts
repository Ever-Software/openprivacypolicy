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
    lastUpdated: 'May 15, 2026',
    sections: [
      {
        id: 'intro',
        title: 'Introduction',
        content: `OpenPrivacyPolicy is a service developed by Ever Software House that allows individuals and companies to create, host, and share privacy policies through a permanent public URL.

This Privacy Policy describes what information we collect, how we use it, who we share it with, and what rights you have regarding your data when you use our platform at openprivacypolicy.com.

By accessing or using OpenPrivacyPolicy, you agree to the terms described in this document. If you do not agree, please discontinue use of the service.`,
      },
      {
        id: 'collection',
        title: 'Information We Collect',
        content: `We collect information in two ways: information you provide directly and information collected automatically.

Information you provide:
• Account data — name and email address used to create and manage your account.
• Policy content — text, sections, and metadata of the privacy policies you create and publish through our editor.
• Communications — messages you send us via email or the contact form.

Information collected automatically:
• Usage data — pages visited, features used, session duration, and navigation paths within the platform.
• Device and browser data — browser type, operating system, screen resolution, and referring URL, collected to improve compatibility and performance.
• IP address — used for security, fraud prevention, and approximate geographic analytics (country/region level only).
• Cookies and similar technologies — see the Cookie Policy section below for details.

We do not collect payment information directly. If a paid tier is introduced, payments will be processed by a third-party provider and we will never store your card details.`,
      },
      {
        id: 'use',
        title: 'How We Use Your Information',
        content: `We use the information we collect for the following purposes:

• To provide the service — creating, storing, and serving your published privacy policies via their public URLs.
• To manage your account — authentication, account settings, and password recovery.
• To improve the platform — analyzing aggregated usage patterns to identify bugs, optimize performance, and prioritize new features.
• To communicate with you — responding to support requests, sending important service updates, and, with your consent, sharing product news.
• To ensure security — detecting and preventing fraudulent, abusive, or unauthorized use of the platform.
• To comply with legal obligations — fulfilling requirements under applicable laws and regulations.

We do not use your policy content to train machine learning models or sell it to third parties.`,
      },
      {
        id: 'sharing',
        title: 'How We Share Your Information',
        content: `We do not sell your personal data. We share information only in the following limited circumstances:

Service providers:
We work with trusted third-party companies that help us operate the platform — including cloud hosting, error monitoring, and analytics. These providers access data only to perform services on our behalf and are contractually bound to protect it.

Public policy pages:
Policies you choose to publish are intentionally accessible to anyone with the public URL. The content of published policies is public by design — do not include sensitive personal information in policy text itself.

Legal requirements:
We may disclose information if required by law, court order, or government authority, or when we believe disclosure is necessary to protect the safety of our users or the public.

Business transfers:
In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction. We will notify you before such a transfer occurs.`,
      },
      {
        id: 'cookies',
        title: 'Cookies and Tracking',
        content: `We use cookies and similar technologies to operate and improve the service.

Essential cookies:
Required for core functionality such as maintaining your login session and remembering your preferences (e.g., theme). These cannot be disabled without affecting service functionality.

Analytics cookies:
Used to understand how visitors interact with the platform — which pages are most visited, where users drop off, and how features are used. Data is aggregated and does not identify individual users. We use privacy-respecting analytics tools that anonymize IP addresses.

We do not use advertising cookies or track you across third-party websites.

You can control cookie preferences through your browser settings. Note that disabling essential cookies will impair your ability to use the service.`,
      },
      {
        id: 'retention',
        title: 'Data Retention',
        content: `We retain your data for as long as your account is active or as needed to provide the service.

• Account data is kept for the lifetime of your account.
• Published policies remain accessible at their public URL until you delete them or close your account.
• Usage and analytics data is retained in aggregated form for up to 24 months.
• If you delete your account, your personal data and all associated policies are permanently removed within 30 days, except where retention is required by law.`,
      },
      {
        id: 'security',
        title: 'Data Security',
        content: `We implement reasonable technical and organizational measures to protect your information:

• All data transmitted between your browser and our servers is encrypted via HTTPS/TLS.
• Account passwords are hashed using industry-standard algorithms — we never store plaintext passwords.
• Access to production systems is restricted to authorized personnel only.
• We monitor our infrastructure for suspicious activity and unauthorized access attempts.

No method of transmission or storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security. If you believe your account has been compromised, contact us immediately at eversoftwarehouse@gmail.com.`,
      },
      {
        id: 'rights',
        title: 'Your Rights',
        content: `Depending on your location, you may have the following rights regarding your personal data:

• Access — request a copy of the personal data we hold about you.
• Correction — request correction of inaccurate or incomplete information.
• Deletion — request that we delete your account and associated data.
• Portability — request an export of your policy content in a machine-readable format.
• Objection — object to certain processing activities, such as analytics.
• Withdraw consent — where processing is based on consent, you may withdraw it at any time.

To exercise any of these rights, contact us at eversoftwarehouse@gmail.com. We will respond within 30 days. We may ask you to verify your identity before processing your request.`,
      },
      {
        id: 'thirdParty',
        title: 'Third-Party Services',
        content: `OpenPrivacyPolicy relies on the following categories of third-party infrastructure:

• Cloud hosting — our servers and databases are hosted on reputable cloud providers with SOC 2 compliance.
• Error monitoring — we use error tracking tools to detect and diagnose application bugs. Error reports may include anonymized stack traces and browser metadata.
• Analytics — we use privacy-focused analytics that do not fingerprint individual users or share data with advertising networks.

Links to third-party websites may appear within the platform (e.g., in documentation or blog posts). We are not responsible for the privacy practices of those sites. We encourage you to review their policies before providing any personal information.`,
      },
      {
        id: 'children',
        title: "Children's Privacy",
        content: `OpenPrivacyPolicy is not directed at children under the age of 13 (or 16 in the European Union). We do not knowingly collect personal data from children.

If you are a parent or guardian and believe your child has created an account or provided personal data, please contact us at eversoftwarehouse@gmail.com and we will promptly delete the information.`,
      },
      {
        id: 'changes',
        title: 'Changes to This Policy',
        content: `We may update this Privacy Policy periodically to reflect changes in our practices, legal requirements, or the features we offer.

When we make material changes, we will notify you by:
• Updating the "Last Updated" date at the top of this page.
• Sending an email notification to registered users (for significant changes).

Your continued use of the service after the effective date of any update constitutes acceptance of the revised policy. If you do not agree with the changes, you may delete your account before the changes take effect.`,
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
