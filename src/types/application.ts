import { ApplicationStatus } from "@prisma/client";

export type ApplicationFormData = {
  company: string;
  role: string;
  jobUrl?: string;
  salaryMin?: number;
  salaryMax?: number;
  notes?: string;
};

export type ApplicationCard = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
};
