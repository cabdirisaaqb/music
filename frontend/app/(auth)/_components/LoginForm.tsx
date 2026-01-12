"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { LoginUserHook } from "@/hooks/User.hook";
import { LoginFormValues, LoginSchema } from "@/lib/User.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema as any),
  });
  const { mutate, isPending, status } = LoginUserHook();
  const onSubmit: SubmitHandler<LoginFormValues> = (data: LoginFormValues) => {
    mutate(data, {
      onSuccess: () => {
        router.replace("/");
      },
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="relative flex flex-col gap-3.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          {...register("email")}
          placeholder="Enter your email"
          className="py-5 pl-10"
        />
        <Mail
          strokeWidth={2}
          className="text-primary absolute bottom-2 left-1.5"
        />
      </div>
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <div className="relative flex flex-col gap-3.5">
        <Label htmlFor="password">Password</Label>
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          {...register("password")}
          placeholder="Enter your password"
          className="py-5 pr-10 pl-10"
        />
        <LockKeyhole
          strokeWidth={2}
          className="text-primary absolute bottom-2 left-1.5"
        />
        {showPassword ? (
          <Eye
            strokeWidth={2}
            onClick={() => setShowPassword(!showPassword)}
            className="text-primary absolute right-1.5 bottom-2 cursor-pointer"
          />
        ) : (
          <EyeOff
            strokeWidth={2}
            onClick={() => setShowPassword(!showPassword)}
            className="text-primary absolute right-1.5 bottom-2 cursor-pointer"
          />
        )}
      </div>
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <Button type="submit" className="mt-3 cursor-pointer">
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            {" "}
            <Loader2 strokeWidth={2} className="animate-spin" /> Loading...
          </span>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
