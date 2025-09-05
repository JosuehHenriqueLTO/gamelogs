"use server";

import { signOut } from "@/auth";
import React from "react";

const logoutAction = async () => {
  return await signOut;
};

export default logoutAction;
