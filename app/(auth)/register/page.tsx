import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";
import registerAction from "./registerAction";
import { Button } from "@/components/ui/button";
import RegisterForm from "./RegisterForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth();
  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div>
      <Card className="max-w-sm w-full rounded-2xl mt-12">
        <CardHeader>
          <h2 className="text-xl font-bold">Register</h2>
          <CardDescription>It's fun (and free)</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
