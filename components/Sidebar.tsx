"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { FaSuitcase } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { BsFillPersonVcardFill } from "react-icons/bs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sidebar = () => {
  const pathname = usePathname();

  const [accordionValue, setAccordionValue] = useState("");

  useEffect(() => {
    if (pathname?.startsWith("/admin/jobs")) {
      setAccordionValue("item-1");
    } else {
      setAccordionValue("");
    }
  }, [pathname]);

  const handleAccordionChange = (value: any) => {
    setAccordionValue(value === accordionValue ? "" : value);
  };

  return (
    <nav className="fixed top-0 left-0 h-screen w-[260px] bg-[var(--foreground)] py-12 px-3 flex flex-col items-center gap-12">
      <Image
        src={"/herald-logo.png"}
        width={200}
        height={48}
        alt="Herald Logo"
      />

      <div className="w-full flex flex-col gap-4 text-gray-600">
        <Link
          href={"/admin/dashboard"}
          className={`px-4 py-3 rounded-md flex gap-3 items-center font-medium border-l-4 ${
            pathname?.startsWith("/admin/dashboard")
              ? "bg-[#c7f6c7a5] border-green-500 text-[var(--primary)]"
              : "border-transparent"
          }`}
        >
          <AiFillAppstore className="text-[24px]" />
          Dashboard
        </Link>
        <Accordion
          type="single"
          collapsible
          value={accordionValue}
          onValueChange={handleAccordionChange}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger
              className={`px-4 py-3 rounded-md flex gap-3 items-center font-medium border-l-4 w-full ${
                pathname?.startsWith("/admin/jobs")
                  ? "bg-[#c7f6c7a5] border-green-500 text-[var(--primary)]"
                  : "border-transparent"
              }`}
            >
              <span className="flex gap-3">
                <FaSuitcase className="text-[24px]" />
                Jobs
              </span>
            </AccordionTrigger>
            <AccordionContent className="ml-8">
              <Link
                href={"/admin/jobs"}
                className={`px-4 py-3 flex gap-3 items-center  border-b-4 w-full ${
                  pathname == "/admin/jobs"
                    ? " border-green-500 text-[var(--secondary)] font-semibold"
                    : "border-transparent font-medium"
                }`}
              >
                All Jobs
              </Link>
              <Link href={"jobs/postJob"} className={`px-4 py-3 flex gap-3 items-center font-medium border-b-4 w-full ${
                pathname?.startsWith("/admin/jobs/postJob")
                  ? "border-green-500 text-[var(--secondary)]"
                  : "border-transparent"
              }`}>Post Jobs</Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Link
          href={"/admin/applicants"}
          className={`px-4 py-3 rounded-md flex gap-3 items-center font-medium border-l-4 ${
            pathname?.startsWith("/admin/applicants")
              ? "bg-[#c7f6c7a5] border-green-500 text-[var(--primary)]"
              : "border-transparent"
          }`}
        >
          <IoPerson className="text-[24px]" />
          Applicants
        </Link>
        <Link
          href={"/admin/resources"}
          className={`px-4 py-3 rounded-md flex gap-3 items-center font-medium border-l-4 ${
            pathname?.startsWith("/admin/recources")
              ? "bg-[#c7f6c7a5] border-green-500 text-[var(--primary)]"
              : "border-transparent"
          }`}
        >
          <BsFillPersonVcardFill className="text-[24px]" />
          Resources
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
