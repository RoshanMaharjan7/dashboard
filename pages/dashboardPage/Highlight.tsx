import HighlightCard from '@/components/HighlightCard'
import React from 'react'

const Highlight = ({jobsData, applicantsData}:any) => {
  const jobsNumber = jobsData?.length
  const applicantsNumber = applicantsData?.length
  const shorlistNumber = applicantsData?.filter((applicant:any)=>applicant.jobStatus == "accepted").length
  
  return (
    <div className='col-span-3 flex justify-between gap-5'>
        <HighlightCard title='Active Jobs' data={jobsNumber||0}/>
        <HighlightCard title='Applicants' data={applicantsNumber || 0}/>
        <HighlightCard title='Shortlist' data={shorlistNumber||0}/>

    </div>
  )
}

export default Highlight