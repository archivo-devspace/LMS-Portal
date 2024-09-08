"use client";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import React from "react";

const Profile = () => {
  const { loginUserQuery } = useAuthentication();

  if (loginUserQuery.status === "pending") {
    return <div>Loading...</div>;
  }

  if (loginUserQuery.status === "error") {
    return <div>Error</div>;
  }

  console.log("data", loginUserQuery.data);
  return <div>{loginUserQuery.data.email}</div>;
};

export default Profile;
