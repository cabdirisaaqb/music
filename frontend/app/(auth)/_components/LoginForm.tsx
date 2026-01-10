
"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { useState } from "react";

const LoginForm = () => {
   const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-3.5 relative">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                 className="pl-10 py-5"
              />
                <Mail strokeWidth={2}  className="absolute  text-primary bottom-2  left-1.5" />
            </div>
            <div className="flex flex-col gap-3.5 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="pl-10 pr-10 py-5"
              />
              <LockKeyhole strokeWidth={2}   className="absolute  text-primary bottom-2 left-1.5" />
              {
                showPassword ?  <Eye strokeWidth={2}  onClick={()=> setShowPassword(!showPassword)}   className="absolute  text-primary bottom-2 right-1.5" />:  <EyeOff strokeWidth={2}  onClick={()=> setShowPassword(!showPassword)}   className="absolute  text-primary bottom-2 right-1.5" />

              }

            </div>

            <Button className="mt-3">Register</Button>
          </form>
  )
}

export default LoginForm