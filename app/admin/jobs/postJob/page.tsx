import Schedule from '@/pages/dashboardPage/Schedule'
import PostJobForm from '@/pages/jobPage/PostJobForm'
import React from 'react'

const PostJobPage = () => {
  return (
    <div className="flex gap-x-5 gap-y-5">
      <PostJobForm/>
      <Schedule/>
    </div>
  )
}

export default PostJobPage