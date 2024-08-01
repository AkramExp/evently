"use client";

import { IEvent2 } from "@/types";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";
import { getCurrentUser } from "@/lib/services/user";

const CheckoutButton = ({ event }: { event: IEvent2 }) => {
  const [userId, setUserId] = useState("");

  const hasEventFinished = new Date(event.endDateTime) < new Date();

  useEffect(() => {
    getCurrentUser()
      .then((response) => setUserId(response._id))
      .catch((error) => console.log(error.message));
  }, []);

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
            <Checkout event={event} userId={userId} />
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
