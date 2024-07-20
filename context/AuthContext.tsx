"use client";

import { useCurrentUser } from "@/lib/react-query/user";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const intialUser = {
  _id: "",
  name: "",
  username: "",
  email: "",
  photo: "",
};

const intitalState = {
  user: intialUser,
  isLoadingUser: false,
  isAuthenticated: false,
};

export const authContext = createContext(intitalState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, isLoadingUser } = useCurrentUser();

  useEffect(() => {
    if (!isLoadingUser && !user) {
      setIsAuthenticated(false);
      //   router.push("/sign-in");
    } else {
      setIsAuthenticated(true);
    }
  }, [isLoadingUser, user]);

  return (
    <authContext.Provider value={{ user, isLoadingUser, isAuthenticated }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export const useUserContext = () => useContext(authContext);
