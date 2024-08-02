"use client";

import React from "react";
import { Button } from "../ui/button";
import { logoutUser } from "@/lib/services/user";
import toast from "react-hot-toast";
import { IoLogOutOutline } from "react-icons/io5";

const LogoutButton = () => {
  return (
    <button
      className="text-red-500"
      onClick={() =>
        logoutUser()
          .then((response) => toast(response.message))
          .catch((error) => toast(error.message))
      }
    >
      <IoLogOutOutline className="w-8 h-8" />
    </button>
  );
};

export default LogoutButton;
