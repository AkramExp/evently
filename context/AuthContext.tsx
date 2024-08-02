"use client";

import { getCurrentUser } from "@/lib/services/user";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialUser = {
  _id: "",
  name: "",
  username: "",
  email: "",
  photo: "",
};

const intitalState = {
  user: initialUser,
  isAuthenticated: false,
};

export const authContext = createContext(intitalState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    getCurrentUser()
      .then((response) => setUser(response))
      .catch((error) => toast(error.message));
  }, []);

  // useEffect(() => {
  //   if (!isLoadingUser && !user) {
  //     setIsAuthenticated(false);
  //     //   router.push("/sign-in");
  //   } else {
  //     setIsAuthenticated(true);
  //   }
  // }, [isLoadingUser, user]);

  return (
    <authContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export const useUserContext = () => useContext(authContext);
