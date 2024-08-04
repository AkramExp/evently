"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const AuthProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
