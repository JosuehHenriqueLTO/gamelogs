import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import LoginForm from "./LoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <div>
      <Card className="max-w-sm w-full rounded-2xl mt-12">
        <CardHeader>
          <h2 className="text-xl font-bold">Welcome!</h2>
          <CardDescription>
            Use your email and password to login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground mt-3">
        Isn't registered yet?{" "}
        <Link className="text-gray-800 hover:underline" href="/register">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default page;
