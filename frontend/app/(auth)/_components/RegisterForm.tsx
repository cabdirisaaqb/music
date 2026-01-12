"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Eye, EyeOff, Loader2, LockKeyhole, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, RegisterSchema } from "@/lib/User.zod";
import { RegisterUserHook } from "@/hooks/User.hook";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema as any),
  });
  const { mutate, isPending, status } = RegisterUserHook();
  const onSubmit: SubmitHandler<RegisterFormValues> = (
    data: RegisterFormValues,
  ) => {
    mutate(data, {
      onSuccess: () => {
        router.replace("/login");
      },
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex flex-col gap-3.5">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Enter your name"
          className="py-5 pl-10"
          {...register("name")}
        />
        <User
          strokeWidth={2}
          className="text-primary absolute bottom-2 left-1.5"
        />
      </div>
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

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
          "Register"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
