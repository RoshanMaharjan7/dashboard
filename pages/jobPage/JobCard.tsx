'use client'
import { Button } from "@/components/ui/button";
import { useDeleteJob } from "@/services/api/JobApi";
import { formatDate } from "@/services/DateFormat";
import Link from "next/link";
import React from "react";

const JobCard = ({
  jobData,
  categoryName,
}: {
  jobData: any;
  categoryName: string;
}) => {

    const {mutate} = useDeleteJob()
    const handleDelete = (jobID:string) =>{
        mutate(jobID)
    }

  return (
    <div className="bg-[var(--foreground)] border border-gray-200 rounded-lg p-5 flex-grow h-fit space-y-5">
      <div className="flex justify-between items-center">
        <span className="flex flex-col">
          <h2 className="text-[24px] font-semibold text-[var(--secondary)]">
            {jobData?.jobTitle}
          </h2>
          <p className="text-[16px] font-semibold">{categoryName}</p>
        </span>
        <span>
          <Link
            href={"/admin/jobs/"+jobData?._id+"/edit"}
            className="text-[14px] font-semibold text-[var(--secondary)]"
          >
            Edit
          </Link>
          <Button className="text-red-600 text-[14px] font-semibold" onClick={()=>handleDelete(jobData?._id)}>Delete</Button>
        </span>
      </div>
      <div className="flex justify-between">
        <span className="flex flex-col">
            <h3 className="font-semibold text-[14px] text-gray-400">Job Type:</h3>
            <p className="font-semibold text-[18px] capitalize">{jobData?.jobType}</p>
        </span>
        <span className="flex flex-col">
            <h3 className="font-semibold text-[14px] text-gray-400">Salary Type:</h3>
            <p className="font-semibold text-[18px] capitalize">{jobData?.salaryType}</p>
        </span>
        <span className="flex flex-col">
            <h3 className="font-semibold text-[14px] text-gray-400">Service Type:</h3>
            <p className="font-semibold text-[18px] capitalize">{jobData?.serviceType}</p>
        </span>
        <span className="flex flex-col">
            <h3 className="font-semibold text-[14px] text-gray-400">Applicants Type:</h3>
            <p className="font-semibold text-[18px] capitalize">{jobData?.applicantsType}</p>
        </span>
        <span className="flex flex-col">
            <h3 className="font-semibold text-[14px] text-gray-400">Created At:</h3>
            <p className="font-semibold text-[18px] capitalize">{formatDate(jobData?.datePosted)}</p>
        </span>
        <span className="flex flex-col">
            <h3 className="font-semibold text-[14px] text-gray-400">Deadline:</h3>
            <p className="font-semibold text-[18px] capitalize">{formatDate(jobData?.applicationDeadline)}</p>
        </span>
      </div>
    </div>
  );
};

export default JobCard;
