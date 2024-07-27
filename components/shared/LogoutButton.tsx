"use client";

import React from "react";
import { Button } from "../ui/button";
import { logoutUser } from "@/lib/services/user";
import toast from "react-hot-toast";
// import { useLogoutUser } from "@/lib/react-query/user";

const LogoutButton = () => {
  // const { logoutUser, isLogingOut } = useLogoutUser();

  return (
    <Button
      className="bg-red-500 hover:bg-red-600"
      onClick={() =>
        logoutUser()
          .then((response) => toast(response.message))
          .catch((error) => toast(error.message))
      }
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
