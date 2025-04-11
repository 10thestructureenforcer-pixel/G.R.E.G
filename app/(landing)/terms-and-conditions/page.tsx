import React from "react";
import { FileText } from "lucide-react";
import { Metadata } from "next";

// In the component, use a static date instead of new Date()
const lastUpdated = "2024-03-20"; // Or whatever date you want to set

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        {/* Hero Section with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent h-[400px] -z-10" />

        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-blue-500/10 mb-6 ring-1 ring-blue-500/20">
                <FileText className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
                Terms and Conditions
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </div>

            {/* Content */}
            <div className="grid gap-8">
              {/* Introduction */}
              <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  This document outlines the Terms and Conditions (ToS) for
                  using G.R.E.G. G.R.E.G is a service designed to provide legal
                  assistance and resources. This agreement governs your use of
                  G.R.E.G and its services.
                </p>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Acceptance of Terms */}
                  <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      Acceptance of Terms
                    </h2>
                    <p className="text-muted-foreground">
                      By accessing and using G.R.E.G, you acknowledge that you
                      have read, understood, and agree to be bound by these
                      Terms and Conditions. If you do not agree with any part of
                      these terms, you must not use G.R.E.G.
                    </p>
                  </div>

                  {/* User Responsibilities */}
                  <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      User Responsibilities
                    </h2>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5" />
                        <span>
                          You agree to use G.R.E.G in compliance with all
                          applicable laws and regulations.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5" />
                        <span>
                          You are prohibited from engaging in any misuse of
                          G.R.E.G, including but not limited to:
                        </span>
                      </li>
                      <ul className="ml-6 space-y-2">
                        <li className="flex items-start gap-3">
                          <div className="w-1 h-1 rounded-full bg-blue-500/30 mt-2" />
                          <span>
                            Unauthorized access to G.R.E.G systems or data.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1 h-1 rounded-full bg-blue-500/30 mt-2" />
                          <span>
                            Attempting to reverse engineer or modify any part of
                            G.R.E.G.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1 h-1 rounded-full bg-blue-500/30 mt-2" />
                          <span>
                            Using G.R.E.G for any illegal or harmful purpose.
                          </span>
                        </li>
                      </ul>
                    </ul>
                  </div>

                  {/* AI Limitations */}
                  <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      AI Limitations
                    </h2>
                    <p className="text-muted-foreground">
                      G.R.E.G provides information and resources for general
                      knowledge and informational purposes only. G.R.E.G is not
                      a substitute for professional advice. You should consult
                      with a qualified professional for advice tailored to your
                      specific situation.
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Intellectual Property */}
                  <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      Intellectual Property
                    </h2>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5" />
                        <span>
                          All content provided by G.R.E.G, including text,
                          graphics, and software, is owned by G.R.E.G.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5" />
                        <span>
                          Any user-generated content submitted to G.R.E.G
                          remains the property of the user. However, by
                          submitting content, you grant G.R.E.G a license to
                          use, reproduce, and distribute the content within the
                          service.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Termination Clause */}
                  <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      Termination Clause
                    </h2>
                    <p className="text-muted-foreground">
                      G.R.E.G reserves the right to terminate your access to the
                      service at any time, with or without cause, including but
                      not limited to violations of these Terms and Conditions.
                    </p>
                  </div>

                  {/* Dispute Resolution */}
                  <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      Dispute Resolution
                    </h2>
                    <p className="text-muted-foreground">
                      Any disputes arising from the use of G.R.E.G will be
                      resolved according to the laws of the jurisdiction where
                      G.R.E.G is registered. The venue for any legal proceedings
                      shall be determined by applicable law.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Modifications to Terms */}
                <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    Modifications to Terms
                  </h2>
                  <p className="text-muted-foreground">
                    G.R.E.G reserves the right to modify these Terms and
                    Conditions at any time. Users will be informed of any
                    changes through email or in-app notification. Continued use
                    of G.R.E.G after such changes constitutes acceptance of the
                    new Terms and Conditions.
                  </p>
                </div>

                {/* Contact Information */}
                <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground mb-3">
                    For any questions or concerns regarding these Terms and
                    Conditions, please contact G.R.E.G at:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5" />
                      <span>Email: info@greglaw.ai</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
