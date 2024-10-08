import EventForm from "@/components/shared/EventForm";
import React from "react";

const CreateEvent = () => {
  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
      <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
      <div className="wrapper py-8">
        <EventForm type="create" />
      </div>
    </section>
  );
};

export default CreateEvent;
