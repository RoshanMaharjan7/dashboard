import React from 'react'
import { GoBriefcase } from "react-icons/go";

type cardData = {
  title: string;
  data: string;
}

const HighlightCard = ({title, data}: cardData) => {
  return (
    <div className='flex justify-between items-center bg-[var(--foreground)] p-4 rounded-lg flex-grow border border-gray-200'>
      <span className='flex flex-col'>
        <h4 className='text-gray-600 text-[14px]'>{title}</h4>
        <p className='font-bold text-[26px]'>{data}</p>
      </span>
      <span className='flex items-center justify-center bg-green-100 p-2 rounded-full'>
        <GoBriefcase className='text-[20px] font-semibold'/>
      </span>
    </div>
  )
}

export default HighlightCard