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
}

export interface Conflict {
  type: string;
  message: string;
  matches: Array<{
    clientFirstName: string;
    clientLastName: string;
    A_number: string;
    sponsorCompany: string;
  }>;
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
