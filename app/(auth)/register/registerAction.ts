"use server";

import database from "@/lib/database";
import { hashSync } from "bcrypt-ts";
import { error } from "console";
import { success } from "zod";

export default async function registerAction(
  _prevState: any,
  formData: FormData
) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries) as {
    name: string;
    nickname: string;
    password: string;
    email: string;
  };

  console.log(data);

  if (!data.email || !data.name || !data.password) {
    return {
      message: "check if all fields are filled in",
      success: false,
    };
  }

  try {
    await database.user.create({
      data: {
        email: data.email,
        password: hashSync(data.password),
        nickname: data.nickname || "",
        name: data.name,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      const target = error.meta?.target;
      if (target.includes("email")) {
        return {
          message: "Email already in use",
          success: false,
        };
      } else if (target.includes("nickname")) {
        return {
          message: "Nickname already in use",
          success: false,
        };
      }
    }
    console.error("Registration error:", error);
    throw new Error("Failed to create user");
  }
}
