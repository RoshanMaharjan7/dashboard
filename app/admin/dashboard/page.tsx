'use client'
import ApplicantDashboard from "@/pages/dashboardPage/ApplicantDashboard";
import Highlight from "@/pages/dashboardPage/Highlight";
import JobDashboard from "@/pages/dashboardPage/JobDashboard";
import Schedule from "@/pages/dashboardPage/Schedule";
import { useGetAllJobs, useGetApplicants } from "@/services/api/JobApi";
import React, { useEffect } from "react";

const Dashboard = () => {
  const {data: jobsData } = useGetAllJobs()
  
  const {data: applicantsData} = useGetApplicants()
  return (
    <div className="flex gap-x-5 gap-y-5">
      <main className="flex flex-col gap-y-5 flex-grow">
        <Highlight jobsData={jobsData?.data} applicantsData={applicantsData?.data}/>
        <ApplicantDashboard jobsData={jobsData?.data} applicantsData={applicantsData?.data}/>
        <JobDashboard jobsData={jobsData?.data}/>
      </main>

      <Schedule />
    </div>
  );
};

export default Dashboard;
