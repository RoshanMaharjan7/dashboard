"use client";
import React, { useEffect } from "react";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAdminLogin, useHRLogin } from "@/services/api/Authentication";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LoginForm = () => {
  useEffect(() => {
    if (Cookies.get("token")) {
      router.push("/dashboard");
    }
  }, []);
  type FormValues = {
    email: string;
    password: string;
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Router
  const router = useRouter();

  // Login Process
  const { mutate: mutateAdmin, isLoading: isLoadingAdmin } = useAdminLogin();
  const { mutate: mutateHR, isLoading: isLoadingHR } = useHRLogin();
  const onsubmit = (data: FormValues) => {
    console.log(data);
    const postData = {
      email: data.email,
      password: data.password,
    };
    console.log("post data", postData);

    console.log("Admin");
    mutateAdmin(postData, {
      onSuccess: (data) => {
        console.log(" Admin Log in success");
        router.push("/dashboard");
      },
      onError: () => {
        mutateHR(postData, {
          onSuccess: (data) => {
            console.log("HR Log in success");
            router.push("/dashboard");
          },
        });
      },
    });
  };
  return (
    <main className="flex justify-center items-center h-screen bg-[var(--background)]">
      <div className="w-[480px] p-7 border border-gray-300 rounded-lg bg-[var(--foreground  )]">
        <form
          action=""
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col text-[var(--primary)]"
        >
          <FormItem className="flex flex-col ">
            <Label className=" text-[27px] " htmlFor="jobTitle">
              Email
            </Label>
            <Input
              className=" text-[16px]  h-[40px]  rounded-[12px] "
              {...register("email", {
                required: true,
                minLength: 3,
              })}
              placeholder="Email"
            />
            {errors.email && (
              <Label className="text-sm font-medium flex  justify-between text-destructive">
                <span>Invalid email</span>
              </Label>
            )}
          </FormItem>
          <FormItem className="flex flex-col">
            <span className=" flex justify-between items-center">
              <Label className="text-[27px] " htmlFor="jobTitle">
                Password
              </Label>
              <Link href={"/"} className="text-[16px] font-light">
                Forgot Password?
              </Link>
            </span>

            <Input
              className=" text-[16px]  h-[40px]  rounded-[12px] "
              {...register("password", {
                required: true,
                minLength: 3,
              })}
              placeholder="password"
            />
            {errors.password && (
              <Label className="text-sm font-medium text-destructive">
                Invalid password
              </Label>
            )}
          </FormItem>
          <Button type="submit" className="bg-[#00A991] h-[45px] text-[27px]">
            {isLoadingAdmin || isLoadingHR ? "Logging In.." : "Login"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
