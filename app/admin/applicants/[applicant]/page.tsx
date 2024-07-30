"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ReviewTimeline from "@/pages/applicantpage/ReviewTimeline";
import Schedule from "@/pages/dashboardPage/Schedule";
import { useGetApplicantById, useGetJobById, useGetJobCategory } from "@/services/api/JobApi";
import { formatDate } from "@/services/DateFormat";
import React from "react";

const Applicant = ({ params }: any) => {
  const { data: applicantData } = useGetApplicantById(params?.applicant);
  const { data: jobData } = useGetJobById(applicantData?.data.jobId || "");
  const {data: categoryName} = useGetJobCategory(jobData?.data.jobCategory || "")

  const handleResume =(resumeLink: string) =>{
    window.open(resumeLink)
  }

  return (
    <div className="flex gap-x-5 gap-y-5">
      <main className="flex-grow space-y-5">
        <div className="bg-[var(--foreground)] border border-gray-200 rounded-lg p-5 space-y-5">
          <h1 className="text-[18px] font-bold">Applicant Profile</h1>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-5">
              <Avatar className="w-[60px] h-[60px] rounded-full flex justify-center items-center bg-muted">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="w-full h-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-semibold text-[var(--secondary)] text-[20px]">
                {applicantData?.data.applicantName}
              </p>
            </span>
            <span
              className={`text-[12px] p-1 px-2 rounded-xl border-2 font-semibold ${
                applicantData?.data.jobStatus == "accepted"
                  ? "text-green-500 border-green-500 bg-green-50"
                  : applicantData?.data.jobStatus == "rejected"
                  ? "text-red-500 border-red-500 bg-red-50"
                  : "text-yellow-500 border-yellow-500 bg-yellow-50"
              }`}
            >
              {applicantData?.data.jobStatus}
            </span>
          </div>

          <Separator />

          <div className="flex flex-col gap-5">
            <span className="flex items-center">
              <p className="min-w-[180px] font-semibold text-[var(--secondary)]">
                Name:
              </p>
              <p className="text-[14px] font-semibold">
                {applicantData?.data.applicantName}
              </p>
            </span>
            <span className="flex items-center">
              <p className="min-w-[180px] font-semibold text-[var(--secondary)]">
                Email:
              </p>
              <p className="text-[14px] font-semibold">
                {applicantData?.data.applicantEmail}
              </p>
            </span>
            <span className="flex items-center">
              <p className="min-w-[180px] font-semibold text-[var(--secondary)]">
                Phone Number:
              </p>
              <p className="text-[14px] font-semibold">
                {applicantData?.data.phoneNumber}
              </p>
            </span>
            <span className="flex items-center">
              <p className="min-w-[180px] font-semibold text-[var(--secondary)]">
                Age:
              </p>
              <p className="text-[14px] font-semibold">
                {applicantData?.data.applicantAge}
              </p>
            </span>
          </div>
        </div>

        {/* Application Data */}
        <div className="bg-[var(--foreground)] border border-gray-200 rounded-lg p-5">
          <h1 className="text-[18px] font-bold pb-5">Application Data</h1>
          <div className="flex flex-col gap-5">
            <span className="flex items-center">
              <p className="min-w-[180px] font-semibold text-[var(--secondary)]">
                Applied Position:
              </p>
              <p className="text-[14px] font-semibold">
                {jobData?.data.jobTitle}
              </p>
            </span>
            <span className="flex items-center">
              <p className="min-w-[180px] font-semibold text-[var(--secondary)]">
                Position Category:
              </p>
              <p className="text-[14px] font-semibold">
                {categoryName}
              </p>
            </span>
            <span className="flex items-center">
              <p className="min-w-[180px] font-semibold text-[var(--secondary)]">
                Application Date:
              </p>
              <p className="text-[14px] font-semibold">
                {formatDate(applicantData?.data.applicationDate)}
              </p>
            </span>
            <span className="flex items-center">
              <p className="min-w-[180px] font-semibold text-[var(--secondary)]">
                Resume:
              </p>
              <p onClick={()=>handleResume(applicantData?.data.resume)} className="text-[14px] font-semibold underline hover:cursor-pointer">
                {applicantData?.data.resume}
              </p>
            </span>
          </div>
        </div>
      </main>
      <ReviewTimeline jobStatus={applicantData?.data.jobStatus}/>
    </div>
  );
};

export default Applicant;
