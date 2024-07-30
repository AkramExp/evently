"use client";

import { IEvent2 } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";
import { getUserIdFromCookies } from "@/lib/getUserIdFromCookies";
import { getCurrentUser } from "@/lib/services/user";

const CheckoutButton = ({ event }: { event: IEvent2 }) => {
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const userId = getCurrentUser();

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="text-red-400 p-2">
          Sorry, tickets are no longer available
        </p>
      ) : (
        <>
          {!userId ? (
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          ) : (
            <Checkout event={event} />
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
