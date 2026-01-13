import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "../_components/LoginForm";
import Link from "next/link";

function Login() {
  return (
    <div>
      <Card className="w-[350px]  md:w-[640px]   ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            <p className="text-ring">Please enter your details to create</p>
            <p className="text-ring"> your account</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className="flex w-full items-center justify-center">
            Ahave an account?{"  "}
            <Link href={"/register"} className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
