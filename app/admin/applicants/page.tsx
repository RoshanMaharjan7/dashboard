'use client'
import ApplicantTable from '@/pages/applicantpage/ApplicantTable'
import Schedule from '@/pages/dashboardPage/Schedule'
import { useGetApplicants } from '@/services/api/JobApi'
import React from 'react'

const Applicants = () => {
  const {data: applicantsData} = useGetApplicants()
  return (
    <div className="flex gap-x-5 gap-y-5">
      <ApplicantTable applicantData={applicantsData?.data}/>
      <Schedule/>
    </div>
  )
}

export default Applicants