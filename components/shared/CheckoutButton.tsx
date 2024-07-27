import { IEvent2 } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent2 }) => {
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="text-red-400 p-2">
          Sorry, tickets are no longer available
        </p>
      ) : (
        <>
          <Button asChild className="button rounded-full" size="lg">
            <Link href="/sign-in">Get Tickets</Link>
          </Button>

          <Checkout />
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
