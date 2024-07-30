import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

const ApplicantDashboard = ({ jobsData, applicantsData }: any) => {
  const getApplicantData = (jobID:string) => {
    const filteredData = applicantsData?.filter((applicant:any)=>applicant.jobId == jobID)
    const totalNumber = filteredData?.length
    const pendingNumber = filteredData?.filter((applicant:any) => applicant.jobStatus == "pending").length
    const rejectedNumber = filteredData?.filter((applicant:any)=>applicant.jobStatus == "rejected").length

    return {totalNumber: totalNumber, pendingNumber:pendingNumber, rejectedNumber: rejectedNumber }
  }
  return (
    <div className="flex col-span-3 gap-5">
      {/* data */}
      <div className="bg-[var(--foreground)] border border-gray-200 rounded-lg p-5 w-[60%] space-y-5">
        <span className="flex justify-between items-center">
          <h3 className="text-[16px] font-bold">Applicants</h3>
          <Link
            href={"/admin/applicants"}
            className="text-[14px] font-semibold text-[var(--secondary)]"
          >
            View all
          </Link>
        </span>
        {jobsData
          ?.reverse()
          .slice(0, 2)
          .map(({ jobId, jobTitle }: { jobId: string; jobTitle: string }) => (
            <div className="flex flex-col">
              <h4 className="text-[14px] font-semibold">{jobTitle}</h4>
              <div className="w-full flex bg-green-50 rounded-md p-4 space-x-4">
                <span className="flex flex-col flex-grow">
                  <h5 className="font-bold">{getApplicantData(jobId).totalNumber || 0}</h5>
                  <p className="text-[14px]">Received</p>
                </span>
                <Separator orientation="vertical" className=" h-[45px]" />
                <span className="flex flex-col flex-grow">
                  <h5 className="font-bold">{getApplicantData(jobId).pendingNumber || 0}</h5>
                  <p className="text-[14px]">Pending</p>
                </span>
                <Separator orientation="vertical" className=" h-[45px]" />
                <span className="flex flex-col flex-grow">
                  <h5 className="font-bold">{getApplicantData(jobId).rejectedNumber || 0}</h5>
                  <p className="text-[14px]">Rejected</p>
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Chart */}
      <div className="bg-[var(--foreground)] border border-gray-200 rounded-lg p-5 flex-grow"></div>
    </div>
  );
};

export default ApplicantDashboard;
