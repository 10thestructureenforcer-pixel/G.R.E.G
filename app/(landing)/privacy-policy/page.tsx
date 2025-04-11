import React from "react";
import { ShieldCheck } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        {/* Hero Section with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/50 to-transparent dark:from-green-950/20 dark:to-transparent h-[400px] -z-10" />

        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-green-500/10 mb-6 ring-1 ring-green-500/20">
                <ShieldCheck className="w-8 h-8 text-green-500 dark:text-green-400" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8">
              {/* Introduction */}
              <section className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  This Privacy Policy explains G.R.E.G&apos;s commitment to
                  protecting the privacy of its users and describes how personal
                  data is collected, used, and shared.
                </p>
              </section>

              {/* Information Collection */}
              <section className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Information Collection
                </h2>
                <p className="text-muted-foreground mb-4">
                  G.R.E.G collects the following types of personal data:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>Names</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>
                      Contact information (email address, phone number)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>
                      Usage data (how users interact with the service)
                    </span>
                  </li>
                </ul>
              </section>

              {/* Use of Information */}
              <section className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Use of Information
                </h2>
                <p className="text-muted-foreground mb-4">
                  The collected data is used for the following purposes:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>To improve G.R.E.G&apos;s services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>
                      To communicate with users regarding updates and support
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>To personalize user experience</span>
                  </li>
                </ul>
              </section>

              {/* Data Sharing and Disclosure */}
              <section className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Data Sharing and Disclosure
                </h2>
                <p className="text-muted-foreground mb-4">
                  Data may be shared with third parties under the following
                  circumstances:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>To comply with legal obligations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>With service providers assisting in operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>With user consent</span>
                  </li>
                </ul>
              </section>

              {/* Data Security */}
              <section className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Data Security
                </h2>
                <p className="text-muted-foreground mb-4">
                  G.R.E.G implements the following measures to protect user
                  data:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>Encryption of sensitive data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>Regular security audits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>Access controls to limit data access</span>
                  </li>
                </ul>
              </section>

              {/* User Rights */}
              <section className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  User Rights
                </h2>
                <p className="text-muted-foreground mb-4">
                  Users have the following rights regarding their data:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>Right to access their personal data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>Right to correct inaccurate data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>Right to request deletion of their data</span>
                  </li>
                </ul>
              </section>

              {/* Cookies and Tracking */}
              <section className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Cookies and Tracking Technologies
                </h2>
                <p className="text-muted-foreground mb-4">
                  G.R.E.G uses cookies and similar tracking technologies to:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>Analyze user behavior</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>Personalize content</span>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Users can manage cookie preferences in their browser settings.
                </p>
              </section>

              {/* Third-Party Links */}
              <section className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Third-Party Links
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  G.R.E.G is not responsible for the privacy practices of
                  external websites linked from its service. Users should review
                  the privacy policies of those sites.
                </p>
              </section>

              {/* Policy Updates */}
              <section className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Policy Updates
                </h2>
                <p className="text-muted-foreground mb-4">
                  Users will be notified of changes to the Privacy Policy
                  through:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>Email notification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>Posting on the G.R.E.G website</span>
                  </li>
                </ul>
              </section>

              {/* Contact Information */}
              <section className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-4">
                  For questions or concerns about personal data, users can
                  contact G.R.E.G at:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>Email: privacy@greg.com</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5" />
                    <span>Address: 123 Main Street, Trumbull, CT</span>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
