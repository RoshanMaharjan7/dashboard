'use client'
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
import { useRouter } from "next/navigation";

const JobDashboard = ({jobsData}:any) => {
  const router = useRouter()
  
  return (
    <div className="col-span-3 bg-[var(--foreground)] border border-gray-200 rounded-lg p-5">
      <span className="flex justify-between items-center pb-5 px-3">
        <h3 className="text-[18px] font-bold">Jobs Feed</h3>
        <Link
          href={"/admin/jobs"}
          className="text-[14px] font-semibold text-[var(--secondary)]"
        >
          View all
        </Link>
      </span>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Role</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-semibold">
            {jobsData?.reverse().slice(0,5).map((job:any)=>(
                <TableRow key={job._id} onClick={() => router.push(`/admin/jobs/${job._id}`)} className="hover:cursor-pointer">
                <TableCell className="">{job.jobTitle}</TableCell>
                <TableCell className="capitalize">{job.jobType}</TableCell>
                <TableCell>{formatDate(job.datePosted)}</TableCell>
                <TableCell>{formatDate(job.applicationDeadline)}</TableCell>
                <TableCell className="text-right"><span className={`text-[12px] p-1 px-2 rounded-xl border ${checkDateStatus(job.applicationDeadline)== "Applying"?'text-green-500 border-green-500 bg-green-50':'text-red-500 border-red-500 bg-red-50' }`}>{checkDateStatus(job.applicationDeadline)}</span></TableCell>
              </TableRow>
            ))}
          
        </TableBody>
      </Table>
    </div>
  );
};

export default JobDashboard;
