// import get from "next-auth";
// import ButtonLogout from "./ButtonLogout";
// import { redirect } from "next/navigation";

// export default async function Page() {
//   const session = await getServerSession();

//   if (!session) {
//     redirect("/")
//   }

//   return (
//     <div>
//       <div>Olá, {session?.user?.name}</div>
//       <div>Dashboard</div>
//       <ButtonLogout />
//     </div>
//   );
// }
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return <div>page</div>;
};

export default page;
