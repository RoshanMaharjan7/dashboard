'use client'
import Schedule from '@/pages/dashboardPage/Schedule'
import EditJobForm from '@/pages/jobPage/EditJobForm'
import React from 'react'

const EditJobPage = ({params}:any) => {
    
  return (
    <div className="flex gap-x-5 gap-y-5">
      <EditJobForm jobId={params?.job}/>
      <Schedule/>
    </div>
  )
}

export default EditJobPage