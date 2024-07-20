"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { authContext } from "@/context/AuthContext";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { user } = useContext(authContext);

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
          />
        </Link>

        {user && (
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        )}

        <div className="flex w-32 justify-end gap-3">
          {user && (
            <div className="flex items-center gap-2">
              <LogoutButton />
              <MobileNav />
            </div>
          )}
          {!user && (
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
