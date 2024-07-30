"use client";
import React, { useEffect } from "react";
import { Form, useForm, Controller } from "react-hook-form";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetJobById, useGetJobCategories } from "@/services/api/JobApi";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

type FormValues = {
  jobTitle: string;
  jobCategory: string;
  jobType: string;
  applicationDeadline: string;
  salaryType: string;
  applicantsType: string;
  jobResponsibilities: string;
  jobRequirements: string;
  jobRequiredSkills: string;
  jobWhyUs: string;
  serviceType: string;
};

const jobDataDefaults = {
    jobTitle: "",
    jobType: "",
    salaryType: "",
    applicantsType: "",
    serviceType: "",
  };

const EditJobForm = ({jobId}:{jobId:string}) => {
    const {data: jobData} = useGetJobById(jobId)

    const form = useForm<FormValues>({
    defaultValues: {
      jobTitle: jobData?.data.jobTitle || "",
      jobCategory: "",
      jobType: jobData?.data.jobType || "",
      applicationDeadline: "",
      salaryType: jobData?.data.salaryType || "",
      applicantsType: jobData?.data.applicantsType || "",
      jobResponsibilities: "",
      jobRequirements: "",
      jobRequiredSkills: "",
      jobWhyUs: "",
      serviceType: jobData?.data.serviceType || "",
    },
  });

  useEffect(() => {
    reset({
      jobTitle: jobData?.data.jobTitle || "",
      jobCategory: "",
      jobType: jobData?.data.jobType || "",
      applicationDeadline: "",
      salaryType: jobData?.data.salaryType || "",
      applicantsType: jobData?.data.applicantsType || "",
      jobResponsibilities: "",
      jobRequirements: "",
      jobRequiredSkills: "",
      jobWhyUs: "",
      serviceType: jobData?.data.serviceType || "",
    });
  }, [jobData, form.reset]);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = form;

  const handleChange = (event:any) => {
    const { value } = event.target;
    const lines = value.split('\n');
    const bulletText = lines.map((line:any) => line ? `• ${line}` : '').join('\n');
    setValue('jobResponsibilities', bulletText);
};

  const textAreaData = [
    {
      id: 1,
      registerName: "jobResponsibilities",
      label: "Job Responsibilities",
    },
    {
      id: 2,
      registerName: "jobRequirements",
      label: "Job Requirements",
    },
    {
      id: 3,
      registerName: "jobRequiredSkills",
      label: "Required Skills",
    },
    {
      id: 4,
      registerName: "jobWhyUs",
      label: "Why Join Us?",
    },
  ];

  const { data: Categories } = useGetJobCategories();

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <div className="bg-[var(--foreground)] border border-gray-200 rounded-lg p-5 flex-grow flex flex-col">
      <span className=" pb-8">
        <h2 className="text-[18px] font-bold">Post Job</h2>
        <p className="text-[12px] font-semibold text-gray-500">
          Describe the role and responsibilities of the position
        </p>
      </span>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormItem className="grid grid-cols-3">
          <Label className="text-[var(--secondary)] col-span-1 flex flex-col gap-3">
            Job Title
            <p className="text-gray-500 text-[12px]">Add position name</p>
          </Label>
          <Input
            className="col-span-2 border border-gray-200 bg-gray-50 rounded-lg"
            {...register("jobTitle", {
              required: true,
              minLength: 3,
            })}
            placeholder="Enter Job Title"
          />
        </FormItem>

        <Separator />

        <FormItem className="grid grid-cols-3">
          <Label className="text-[var(--secondary)] col-span-1 flex flex-col gap-3">
            Job Description
            <p className="text-gray-500 text-[12px]">
              Add position description
            </p>
          </Label>
          <Textarea
            className="col-span-2 border border-gray-200 bg-gray-50 rounded-lg min-h-[160px] p-2 text-[14px] resize-none"
            placeholder="Enter Job Description"
          />
        </FormItem>

        <Separator />

        <FormItem className="grid grid-cols-3">
          <Label className="text-[var(--secondary)] col-span-1 flex flex-col gap-3">
            Job Department
            <p className="text-gray-500 text-[12px]">
              Add position description
            </p>
          </Label>
          <Controller
            name="jobCategory"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-[40px] col-span-2 w-full border border-gray-200 bg-gray-50 rounded-lg">
                  <SelectValue placeholder="Choose Your Applicant Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Categories?.data.map(({ _id, name }: any) => (
                      <SelectItem key={_id} value={_id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </FormItem>

        <Separator />

        <FormItem className="grid grid-cols-3">
          <Label className="text-[var(--secondary)] col-span-1 flex flex-col gap-3">
            Job Type
            <p className="text-gray-500 text-[12px]">Add position timing</p>
          </Label>

          <span className="col-span-2 flex gap-10   ">
            <span className="flex gap-3 items-center">
              <Input
                type="radio"
                value="full-time"
                className="w-5 h-5 accent-[var(--secondary)]"
                {...register("jobType", {
                  required: true,
                })}
              />
              <Label>Full-Time</Label>
            </span>
            <span className="flex gap-2 items-center">
              <Input
                type="radio"
                value="part-time"
                className="w-5 h-5 accent-[var(--secondary)]"
                {...register("jobType", {
                  required: true,
                })}
              />
              <Label>Part-Time</Label>
            </span>
          </span>
        </FormItem>

        <Separator />

        <FormItem className="grid grid-cols-3">
          <Label className="text-[var(--secondary)] col-span-1 flex flex-col gap-3">
            Applicants Type
            <p className="text-gray-500 text-[12px]">
              Add position applicant type
            </p>
          </Label>

          <span className="col-span-2 flex gap-10   ">
            <span className="flex gap-3 items-center">
              <Input
                type="radio"
                value="Outsiders"
                className="w-5 h-5 accent-[var(--secondary)]"
                {...register("applicantsType", {
                  required: true,
                })}
              />
              <Label>All Applicants</Label>
            </span>
            <span className="flex gap-2 items-center">
              <Input
                type="radio"
                value="Students"
                className="w-5 h-5 accent-[var(--secondary)]"
                {...register("applicantsType", {
                  required: true,
                })}
              />
              <Label>Students Only</Label>
            </span>
          </span>
        </FormItem>
        <Separator />

        <FormItem className="grid grid-cols-3">
          <Label className="text-[var(--secondary)] col-span-1 flex flex-col gap-3">
            Salary Type
            <p className="text-gray-500 text-[12px]">
              Add position salary type
            </p>
          </Label>

          <span className="col-span-2 flex gap-10   ">
            <span className="flex gap-3 items-center">
              <Input
                type="radio"
                value="paid"
                className="w-5 h-5 accent-[var(--secondary)]"
                {...register("salaryType", {
                  required: true,
                })}
              />
              <Label>Paid</Label>
            </span>
            <span className="flex gap-2 items-center">
              <Input
                type="radio"
                value="unpaid"
                className="w-5 h-5 accent-[var(--secondary)]"
                {...register("salaryType", {
                  required: true,
                })}
              />
              <Label>Unpaid</Label>
            </span>
          </span>
        </FormItem>
        <Separator />

        <FormItem className="grid grid-cols-3">
          <Label className="text-[var(--secondary)] col-span-1 flex flex-col gap-3">
            Service Type
            <p className="text-gray-500 text-[12px]">
              Add position service type
            </p>
          </Label>

          <span className="col-span-2 flex gap-10   ">
            <span className="flex gap-3 items-center">
              <Input
                type="radio"
                value="job"
                className="w-5 h-5 accent-[var(--secondary)]"
                {...register("serviceType", {
                  required: true,
                })}
              />
              <Label>Job</Label>
            </span>
            <span className="flex gap-2 items-center">
              <Input
                type="radio"
                value="intern"
                className="w-5 h-5 accent-[var(--secondary)]"
                {...register("serviceType", {
                  required: true,
                })}
              />
              <Label>Intern</Label>
            </span>
          </span>
        </FormItem>
        <Separator />

        <FormItem className="grid grid-cols-3">
          <Label className="text-[var(--secondary)] col-span-1 flex flex-col gap-3">
            Job Deadline
            <p className="text-gray-500 text-[12px]">
              Add position deadline date
            </p>
          </Label>
          <Controller
            name="applicationDeadline"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full col-span-2 pl-3 text-left font-normal border border-gray-200 bg-gray-50 rounded-lg",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date)}
                      disabled={(date) => {
                        const today = new Date();
                        const yesterday = new Date(today);
                        yesterday.setDate(today.getDate() - 1);
                        return date < yesterday;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </FormItem>

        <Separator />

        {textAreaData.map(({ id, label, registerName }) => (
          <>
            <FormItem key={id} className="grid grid-cols-3">
            <Label className="text-[var(--secondary)] col-span-1 flex flex-col gap-3">
            {label}
            <p className="text-gray-500 text-[12px]">
              Add position {label}
            </p>
          </Label>
              <Textarea
                {...register(
                  registerName as
                    | "jobResponsibilities"
                    | "jobRequirements"
                    | "jobRequiredSkills"
                    | "jobWhyUs",
                  {
                    required: true,
                    minLength: 3,
                  }
                )}
                className="col-span-2 border border-gray-200 bg-gray-50 rounded-lg min-h-[160px] p-2 text-[14px] resize-none"
              />
              {errors[registerName as keyof FormValues] && (
                <Label className="text-sm font-medium text-destructive">
                  Invalid {label}
                </Label>
              )}
            </FormItem>
            <Separator/>
          </>
        ))}

        <button
          className=" self-start px-[18px] py-[12px] bg-[#75C043] rounded-[12px] text-white text-[16px"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default EditJobForm;
