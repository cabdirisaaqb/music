import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <Card className="p-10">

      <h2 className="text-4xl font-black text-center ">  <span className="text-primary">404</span> <br/> Page Not Found </h2>
      <p className="text-center">Could not find requested resource</p>
      <Link href="/" className="text-primary hover:underline text-center">Return Home</Link>
      </Card>
    </div>
  );
}
