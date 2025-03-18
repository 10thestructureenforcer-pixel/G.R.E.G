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
