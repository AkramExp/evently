"use client";

import React from "react";
import { Button } from "../ui/button";
import { logoutUser } from "@/lib/services/user";
import { useLogoutUser } from "@/lib/react-query/user";

const LogoutButton = () => {
  const { logoutUser, isLogingOut } = useLogoutUser();

  return (
    <Button
      className="bg-red-500 hover:bg-red-600"
      onClick={() => logoutUser()}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
