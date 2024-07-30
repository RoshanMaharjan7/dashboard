import { Axios } from "../axiosInstance";
import { Endpoints } from "../Endpoints";
import { useMutation, useQuery } from "react-query";
import Cookies from "js-cookie";

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: async (postData: any) => {
      const res = await Axios.post(Endpoints.AdminLogin, postData);
      Cookies.set("token", res.data.token);
      return await res.data;
    },
  });
};

export const useHRLogin = () => {
  return useMutation({
    mutationFn: async (postData: any) => {
      const res = await Axios.post(Endpoints.HRLogin, postData);
      Cookies.set("token", res.data.token);
      return await res.data;
    },
  });
};
export const userHRSignUp = () => {
  return useMutation({
    mutationFn: async (postData: any) => {
      const res = await Axios.post(Endpoints.HRSignUp, postData);
      return await res.data;
    },
  });
};

export const HrRequest = () => {
  return useMutation({
    mutationFn: async (postData: any) => {
      const res = await Axios.post(Endpoints.HrRequest, postData);
      return await res.data;
    },
  });
};

// Get All HR
export const useGetCurrent = () => {
  return useQuery<any>({
    queryKey: ["CurrentUser"],
    queryFn: async ():Promise<any> => {
        const res = await  Axios.get(Endpoints.CurrentUser)
        console.log(res.data)
        return await res.data.decodedToken
    },
  });
};