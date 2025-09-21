import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import LoginForm from "./LoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();
  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div>
      <LoginForm />
    </div>
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
    //   <Card className="w-full max-w-md rounded-2xl shadow-lg border border-gray-200 bg-white">
    //     <CardHeader className="space-y-2 text-center">
    //       <CardTitle className="text-3xl font-bold text-gray-900">
    //         Welcome Back 👋
    //       </CardTitle>
    //       <CardDescription className="text-gray-600">
    //         Enter your email and password to access your account.
    //       </CardDescription>
    //     </CardHeader>

    //     <CardContent>
    //       <LoginForm />
    //     </CardContent>

    //     <CardFooter className="flex justify-center">
    //       <p className="text-sm text-gray-500">
    //         Not registered yet?{" "}
    //         <Link
    //           href="/register"
    //           className="text-primary font-medium hover:underline hover:opacity-90 transition"
    //           aria-label="Register here"
    //         >
    //           Register here
    //         </Link>
    //       </p>
    //     </CardFooter>
    //   </Card>
    // </div>
  );
};

export default LoginPage;
