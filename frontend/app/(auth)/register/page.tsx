import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "../_components/RegisterForm";
import { Car } from "lucide-react";
import Link from "next/link";

function Register() {
  return (
    <div>
      <Card className="w-[450px] sm:w-[490px] md:w-[700px] md:py-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>
            <p className="text-ring">Please enter your details to create</p>
            <p className="text-ring"> your account</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>

        <CardFooter>
          <p className="flex w-full items-center justify-center ">
            Already have an account?{"  "}
            <Link href={"/login"} className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
