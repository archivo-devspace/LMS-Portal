"use client";

import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import React from "react";
import Cookies from "js-cookie";

const REFRESH_TOKEN_KEY = process.env.NEXT_PUBLIC_USER_REFRESH_TOKEN as string;

const Profile = () => {
  const { loginUserQuery } = useAuthentication();

  const refreshToken = Cookies.get("USER_REFRESH_TOKEN");
  console.log("refresh token >>", refreshToken);

  console.log("data", loginUserQuery.data);

  if (loginUserQuery.status === "pending") {
    return <div>Loading...</div>;
  }

  if (loginUserQuery.status === "error") {
    return <div>Error</div>;
  }

  if (loginUserQuery.status === "success") {
    return <div>{loginUserQuery.data.email}</div>;
  }
};

export default Profile;
