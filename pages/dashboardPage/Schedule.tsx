'use client'
import { formatDate, getRelativeDate, getTodayDate } from "@/services/DateFormat";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllInterview } from "@/services/api/JobApi";

type meetingType = {
  _id: string;
  meetingDate: string;
  meetingTime: string[];
  userId: string;
  jobId: string;
}

const Schedule = () => {
  const today = getTodayDate();
  const {data:meetingData} = useGetAllInterview()
  const filteredMeetings = meetingData?.meetings
  .filter((meeting: meetingType) => {
    const meetingDate = meeting.meetingDate.split('T')[0];
    return meetingDate >= new Date().toISOString().split('T')[0];
  })
  .sort((a: meetingType, b: meetingType) => {
    const dateA = new Date(a.meetingDate).getTime();
    const dateB = new Date(b.meetingDate).getTime();
    return dateA - dateB;
  });

 
  return (
    <section className="flex-1 space-y-2 min-w-[280px] max-w-[280px]">
      <div className="py-4">
        <h3 className="text-[var(--muted)] text-[14px] font-semibold">
          Today's Date
        </h3>
        <p className="font-bold text-[20px]">
          <span className="text-[var(--secondary)] text-[36px]">
            {today.day}
          </span>{" "}
          {today.month}, {today.year}
        </p>
      </div>

      <div className="bg-[var(--foreground)] border border-gray-200 rounded-lg p-2 py-4 col-span-1">
        <h3 className="text-[var(--muted)] text-[14px] font-semibold px-2">
          Interviews
        </h3>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Date</TableHead>
                <TableHead className="">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-semibold text-[14px]">
              {filteredMeetings?.map((meeting:meetingType) => (
                <TableRow key={meeting._id} >
                  <TableCell className="flex items-center gap-1 px-2">
                    <span className={`rounded-full w-2 h-2 ${getRelativeDate(meeting.meetingDate) == 'today' ? 'bg-green-500' :
                         getRelativeDate(meeting.meetingDate) == 'tomorrow' ? 'bg-blue-500' :
                         getRelativeDate(meeting.meetingDate) == 'this week' ? 'bg-yellow-500' : 'bg-transparent'}`}></span>
                    {formatDate(meeting.meetingDate)}
                  </TableCell>
                  <TableCell className="">{meeting.meetingTime[0]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </section>
  );
};

export default Schedule;
