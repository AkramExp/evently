import { formatDateTime } from "@/lib/utils";
import { IEvent2 } from "@/types";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  event: IEvent2;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const isEventCreator = true;

  return (
    <div className="group relative flex min-h-[380px] w-full max-h-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/event/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      >
        {isEventCreator && !hidePrice && (
          <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-2 shadow-sm transition-all">
            <Link href={`/events/${event._id}/update`}>
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                width={20}
                height={20}
              />
            </Link>
          </div>
        )}
        <Link
          href={`/events/${event._id}`}
          className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
        >
          {!hidePrice && (
            <div className="flex gap-2">
              <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
                {event.isFree ? "FREE" : `$${event.price}`}
              </span>
              <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500"></p>
            </div>
          )}
          <p className="p-medium-16 md:p-medium-18 text-grey-500">
            {formatDateTime(event.startDateTime).dateTime}
          </p>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {event.title}
          </p>

          <div className="flex-between w-full">
            <p className="p-medium-14  md:p-medium-16 text-grey-600">
              {event.organizer.name}
            </p>
            {hasOrderLink && (
              <Link
                href={`/orders?eventId=${event._id}`}
                className="flex gap-2"
              >
                <p className="text-primary-500">Order Details</p>
                <Image
                  src="/assets/icons/arrow.svg"
                  alt="arrow"
                  width={10}
                  height={10}
                />
              </Link>
            )}
          </div>
        </Link>
      </Link>
    </div>
  );
};

export default Card;
