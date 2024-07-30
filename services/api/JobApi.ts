import { Axios } from "../axiosInstance";
import { Endpoints } from "../Endpoints";
import { useMutation, useQuery } from "react-query";


type filtered = {
  timing: string;
  salary: string;
  datePosted: string;
}

// Fetch All Jobs with Filter
export const useGetAllJobs = () => {
  return useQuery<any>({
    queryKey: ["jobs"],
    queryFn: async ():Promise<any> => {
        const res = await  Axios.get(Endpoints.JobPost)
        console.log(res.data)
        return await res.data
    },
  });
};


// Fetch Job By ID
export const useGetJobById = (jobID: string) => {
  return useQuery<any>({
    queryKey: [jobID],
    queryFn: async (id: any):Promise<any> => {
        const res = await  Axios.get(Endpoints.JobById+id.queryKey[0])
        console.log(res.data)
        return await res.data
    },
  });
};

// Post Job
export const useJobCreate = () => {
  return useMutation({
      mutationFn: async (postData) => {
          const res = await Axios.post(Endpoints.JobCreate,postData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          return await res.data
      }
  })
};


// Fetch All Job Categories/Departments
export const useGetJobCategories = () => {
  return useQuery<any>({
    queryKey: ["JobCategories"],
    queryFn: async ():Promise<any> => {
        const res = await  Axios.get(Endpoints.JobCategories)
        console.log(res.data)
        return await res.data
    },
  });
};

// Fetch All Applicants
export const useGetApplicants = () => {
  return useQuery<any>({
    queryKey: ["Applicants"],
    queryFn: async ():Promise<any> => {
        const res = await  Axios.get(Endpoints.Applicants)
        console.log(res.data)
        return await res.data
    },
  });
};


// Fetch Job 
export const useGetAllJobName = () => {
  return useQuery<any>({
    queryKey: ["jobName"],
    queryFn: async ():Promise<any> => {
        const res = await  Axios.get(Endpoints.JobPost)
        console.log(res.data)
        return await res.data
    },
    select: (jobs) => jobs.data.map((job:any) =>({id: job._id, jobName: job.jobTitle}))
  });
};

// Fetch Applicant By ID
export const useGetApplicantById = (applciantID: string) => {
  return useQuery<any>({
    queryKey: [applciantID],
    queryFn: async (id: any):Promise<any> => {
        const res = await  Axios.get(Endpoints.ApplicantById+id.queryKey[0])
        console.log(res.data)
        return await res.data
    },
  });
};

// Fetch Applicant By ID
export const useRejectApplicant = () => {
  return useMutation({
      mutationFn: async (applicantID:string) => {
          const res = await Axios.patch(Endpoints.RejectApplicant+applicantID)
          return await res.data
      }
  })
};

// Fetch Applicant By ID
export const useAcceptApplicant = () => {
  return useMutation({
      mutationFn: async (applicantID:string) => {
          const res = await Axios.patch(Endpoints.ApproveApplicant+applicantID,{
            "meetingDate": "2024-07-18",
            "meetingTime": "12:00 AM"
          }
          )
          return await res.data
      }
  })
};


// Get All HR
export const useGetAllHR = () => {
  return useQuery<any>({
    queryKey: ["HR"],
    queryFn: async ():Promise<any> => {
        const res = await  Axios.get(Endpoints.HR)
        console.log(res.data)
        return await res.data
    },
  });
};

// Get Meeting Data
export const useGetAllInterview = () => {
  return useQuery<any>({
    queryKey: ["Interview"],
    queryFn: async ():Promise<any> => {
        const res = await  Axios.get(Endpoints.Interview)
        console.log(res.data)
        return await res.data
    },
  });
};

// Fetch All Job Categories/Departments Name
export const useGetJobCategory = (categoryId: string) => {
  return useQuery<any>({
    queryKey: [categoryId],
    queryFn: async (id:any):Promise<any> => {
        const res = await  Axios.get(Endpoints.JobCategories+id.queryKey[0])
        console.log(res.data)
        return await res.data
    },
    select: (res) => res.data.name
  });
};

// Delete Job By ID
export const useDeleteJob = () => {
  return useMutation({
      mutationFn: async (jobID:string) => {
          const res = await Axios.delete(Endpoints.JobById+jobID)
          return await res.data
      }
  })
};


// Fetch User By ID
export const useGetUserById = (userID: string) => {
  return useQuery<any>({
    queryKey: [userID],
    queryFn: async (id: any):Promise<any> => {
        console.log(id)
        const res = await  Axios.get(Endpoints.User+id.queryKey[0])
        console.log(res.data)
        return await res.data
    },
  });
};