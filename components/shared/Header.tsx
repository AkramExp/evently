import { getCurrentUser } from "@/lib/services/user";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import LogoutButton from "./LogoutButton";
import MobileNav from "./MobileNav";
import NavItems from "./NavItems";

const Header = async () => {
  const user = await getCurrentUser();

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
            <div className="flex items-center gap-4">
              <Link href="/profile">
                <img
                  src={user.photo || "/assets/icons/profile-placeholder.svg"}
                  alt="user"
                  className="object-cover rounded-full w-10 h-10"
                />
              </Link>
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
