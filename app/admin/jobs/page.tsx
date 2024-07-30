import Schedule from '@/pages/dashboardPage/Schedule'
import JobTable from '@/pages/jobPage/JobTable'
import React from 'react'

const Jobs = () => {
  return (
    <div className="flex gap-x-5 gap-y-5">
      <JobTable/>
      <Schedule/>
    </div>
  )
}

export default Jobs