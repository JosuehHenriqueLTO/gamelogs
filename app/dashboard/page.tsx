import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      dashboard
    </div>
  );
};

export default page;
