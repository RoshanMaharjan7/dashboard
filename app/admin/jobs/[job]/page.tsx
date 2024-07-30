"use client";
import ApplicantTable from "@/pages/applicantpage/ApplicantTable";
import Schedule from "@/pages/dashboardPage/Schedule";
import JobCard from "@/pages/jobPage/JobCard";
import { useGetApplicants, useGetJobById, useGetJobCategory } from "@/services/api/JobApi";
import React, { useEffect } from "react";

const JobPage = ({ params }: any) => {
  const jobId = params.job;

  const { data: jobData } = useGetJobById(jobId);
  const { data: categoryName } = useGetJobCategory(jobData?.data.jobCategory);
  const {data: applicantsData} = useGetApplicants()
  const applicantByJob = applicantsData?.data.filter((applicant:any)=> applicant.jobId == params.job)

  return (
    <div className="flex gap-x-5 gap-y-5">
      <main className="flex-grow space-y-5">
        <JobCard jobData={jobData?.data} categoryName={categoryName} />
        <ApplicantTable applicantData={applicantByJob}/>
      </main>

      <Schedule />
    </div>
  );
};

export default JobPage;
