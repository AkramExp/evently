import { IEvent2 } from "@/types";
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/lib/services/order";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: { event: IEvent2; userId: string }) => {
  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    await checkoutOrder(order);
  };
  return (
    <form action={onCheckout}>
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {event.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  );
};

export default Checkout;
