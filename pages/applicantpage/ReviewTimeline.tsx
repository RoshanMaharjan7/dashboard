import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@material-tailwind/react";
import { ScrollArea } from "@/components/ui/scroll-area";

const ReviewTimeline = ({ jobStatus }: { jobStatus: any }) => {
  const reviews = [
    {
      id: 1,
      status: "pending",
      statement:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam laborum corporis ratione! Ipsum minus voluptas odit, animi optio soluta non iusto mollitia blanditiis.",
    },
    {
      id: 2,
      status: "accepted",
      statement:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam laborum corporis ratione! Ipsum minus voluptas odit, animi optio soluta non iusto mollitia blanditiis.",
    },
  ];
  return (
    <section className="flex-1 space-y-2 min-w-[320px] max-w-[320px]">
      <div className="bg-[var(--foreground)] border border-gray-200 rounded-lg p-4 space-y-4">
        <h3 className="text-[var(--muted)] text-[16px] font-semibold">
          Reviews
        </h3>
        <ScrollArea className="h-[230px]">
          <div className="space-y-4">
            {reviews.map(({ id, status, statement }: any) => (
              <div key={id} className="bg-green-50 p-2 space-y-2 rounded-md">
                <div className="flex justify-between items-center">
                  <p className="text-[14px] font-semibold">HR Maam</p>
                  <span
                    className={`text-[10px] p-1 px-2 rounded-xl border-2 font-medium ${
                      status == "accepted"
                        ? "text-green-500 border-green-500 bg-green-50"
                        : status == "rejected"
                        ? "text-red-500 border-red-500 bg-red-50"
                        : "text-yellow-500 border-yellow-500 bg-yellow-50"
                    }`}
                  >
                    {status}
                  </span>
                </div>
                <Separator />
                <p className="text-[12px] font-medium">{statement}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="bg-[var(--foreground)] border border-gray-200 rounded-lg p-4 space-y-4">
        <h3 className="text-[var(--muted)] text-[16px] font-semibold">
          Write a Review
        </h3>

        <p className="text-[12px] font-semibold">
          Current Status :{" "}
          <span
            className={`text-[10px] p-1 px-2 rounded-xl border-2 font-medium ${
              jobStatus == "accepted"
                ? "text-green-500 border-green-500 bg-green-50"
                : jobStatus == "rejected"
                ? "text-red-500 border-red-500 bg-red-50"
                : "text-yellow-500 border-yellow-500 bg-yellow-50"
            }`}
          >
            {jobStatus}
          </span>
        </p>

        <textarea className="border border-gray-200 bg-gray-50 rounded-lg min-h-[140px] p-2 text-[14px] resize-none w-full"></textarea>
        <button className="bg-[var(--secondary)] text-white p-1 px-2 rounded-md text-[14px]">
          Post Review
        </button>
      </div>
    </section>
  );
};

export default ReviewTimeline;
