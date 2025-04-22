import Stripe from "stripe";

export interface RecentCases {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  casesummary: CaseSummary | null;
}

export interface CaseSummary {
  id: string;
  caseFileId: string | null;
  summary: string | null;
  createdAt: Date;
  status: STATUS | null;
}

export type STATUS = "SUCCESS" | "FAILED" | "PENDING";

export interface RecentCasesInterface {
  recentCases: RecentCases[];
}

export interface Session {
  user: {
    id: string;
    email: string;
  };
}

export interface Client {
  id: string;
  clientFirstName: string;
  clientLastName: string;
  clientMiddleName: string | null;
  clientEmail: string;
  clientAddress: string;
  clientPhone: string;
  dateOfBirth: string;
  nationality: string;
  visaStatus: string;
  legalConcern: string;
  A_number: string;
  sponsorCompany: string;
  opposingParty: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conflict {
  type: string;
  message: string;
  matches: Matches[];
}

export interface Matches {
  clientName: string;
  A_number: string;
  sponsorCompany: string;
  opposingParty: string;
  type?: string;
}

export interface AnalysisData {
  status: string;
  conflictFound: boolean;
  conflicts: Conflict[];
}

export interface VisaHistoryType {
  id: string;
  visaType: string[];
  userId: string;
  clientName: string;
  clientId: string;
  gptOutput: string;
}

export interface SettingsUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  isPro: boolean;
  client: Client[];
}

export interface RecentChallengeWork {
  id: string;
  userId: string;
  clientId: string;
  draftContent: string;
  clientName: string;
  responseType: string;
  challengeWorkOutput: string;
  refinedOutput: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface stripePriceType {
  id: string;
  productId: string;
  unitAmount: number | null;
  currency: string;
  interval: Stripe.Price.Recurring.Interval | undefined;
  trialPeriodDays: number | null | undefined;
}

export interface stripeProductType {
  id: string;
  name: string;
  description: string | null;
  defaultPriceId: string | undefined;
}
