"use client";

import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import React from "react";
import Message from "@/components/common/Message";

const Profile = () => {
  const { loginUserQuery } = useAuthentication();

  if (loginUserQuery.status === "pending") {
    return <div>Loading...</div>;
  }

  if (loginUserQuery.status === "error") {
    return (
      <>
        <Message
          key="get_login_user"
          type="error"
          content={loginUserQuery.error.message}
        />
        <div>{loginUserQuery.error.message}</div>
      </>
    );
  }

  if (loginUserQuery.status === "success") {
    return (
      <>
        <div>{loginUserQuery?.data?.email}</div>
      </>
    );
  }
  return null;
};

export default Profile;
