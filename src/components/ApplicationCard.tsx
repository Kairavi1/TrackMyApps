"use client";

import { ApplicationStatus } from "@prisma/client";
import StatusDropdown from "./StatusDropdown";

type ApplicationCardProps = {
  application: {
    id: string;
    company: string;
    role: string;
    link: string | null;
    salaryMin: number | null;
    salaryMax: number | null;
    notes: string | null;
    status: ApplicationStatus;
    appliedAt: Date;
  };
};

export default function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <div
      className="
        border 
        rounded-xl 
        p-5 
        shadow-sm 
        hover:shadow-md 
        transition
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{application.company}</h3>

          <p className="text-gray-600">{application.role}</p>
        </div>

        <StatusDropdown id={application.id} status={application.status} />
      </div>

      <div className="mt-5 space-y-3">
        {application.salaryMin && application.salaryMax ? (
          <p className="text-sm">
            💰 Salary: {application.salaryMin}
            {" - "}
            {application.salaryMax}
          </p>
        ) : null}

        {application.link ? (
          <a
            href={application.link}
            target="_blank"
            className="text-blue-600 underline text-sm"
          >
            View Job Posting
          </a>
        ) : null}

        {application.notes ? (
          <p className="text-gray-600 text-sm">{application.notes}</p>
        ) : null}

        <p className="text-xs text-gray-400">
          Applied: {new Date(application.appliedAt).toLocaleDateString("en-IN")}
        </p>
      </div>
    </div>
  );
}
