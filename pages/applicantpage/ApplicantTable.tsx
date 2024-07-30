"use client";
import Link from "next/link";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { checkDateStatus, formatDate } from "@/services/DateFormat";
import { useGetAllJobName, useGetAllJobs } from "@/services/api/JobApi";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const ApplicantTable = ({ applicantData }: any) => {
  const router = useRouter();
  const { data: jobs } = useGetAllJobName();

  const getJobName = (jobId: string) => {
    for (let i = 0; i <= jobs?.length; i++) {
      if (jobs[i]?.id == jobId) {
        return jobs[i]?.jobName;
      }
    }
  };
  return (
    <div className="col-span-3 bg-[var(--foreground)] border border-gray-200 rounded-lg p-5 flex-grow">
      <span className="flex justify-between items-center pb-5 px-3">
        <h3 className="text-[18px] font-bold">Applicants</h3>
        <Input
          placeholder="Applicant Name"
          className="max-w-[300px] border border-gray-200"
        />
      </span>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="">Role</TableHead>
            <TableHead>Application Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-semibold">
          {applicantData?.map((applicant: any) => (
            <TableRow
              key={applicant._id}
              onClick={() => router.push(`/admin/applicants/${applicant._id}`)}
              className="hover:cursor-pointer"
            >
              <TableCell className="">{applicant.applicantName}</TableCell>
              <TableCell className="">{applicant.applicantEmail}</TableCell>
              <TableCell>{getJobName(applicant.jobId)}</TableCell>
              <TableCell>{formatDate(applicant.applicationDate)}</TableCell>
              <TableCell className="text-right">
                <span
                  className={`text-[12px] p-1 px-2 rounded-xl border ${
                    applicant.jobStatus == "accepted"
                      ? "text-green-500 border-green-500 bg-green-50"
                      : applicant.jobStatus == "rejected"
                      ? "text-red-500 border-red-500 bg-red-50"
                      : "text-yellow-500 border-yellow-500 bg-yellow-50"
                  }`}
                >
                  {applicant.jobStatus}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantTable;
