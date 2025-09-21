import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RegisterForm from "./RegisterForm";
import Link from "next/link";

export default async function RegisterPage() {
  const session = await auth();
  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl border border-gray-200 bg-white">
        <CardHeader className="space-y-2 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <CardDescription className="text-gray-600">
            It’s quick, easy, and free 🚀
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Already registered?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline hover:opacity-90 transition"
              aria-label="Go to login page"
            >
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
