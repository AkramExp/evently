import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/services/event";
import { SearchParamProps } from "@/types";
import React from "react";

const UpdateEvent = async ({ params: { id } }: SearchParamProps) => {
  const event = await getEventById(id);

  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
      <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
      <div className="wrapper py-8">
        <EventForm type="update" event={event} />
      </div>
    </section>
  );
};

export default UpdateEvent;
