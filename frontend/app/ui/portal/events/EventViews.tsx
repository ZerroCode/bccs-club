"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CalendarSection from "./CalendarSection";
import PastEventsSection from "./PastEventsSection";
import type { Event } from "@/app/utils/types";

export default function EventViews({ events, now, view }: {
  events: Event[];
  now: number;
  view: "list" | "calendar";
}) {
  const router = useRouter();
  return (
    <>
        <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 id="events-heading" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{view === "calendar" ? "Event Calendar" : "Past Events"}</h2>
          <div className="flex w-fit gap-1 rounded-full bg-gray-100 p-1" role="group" aria-label="Event view">
            {(["list", "calendar"] as const).map(option => (
              <Link key={option} href={option === "calendar" ? "/events?view=calendar#event-schedule" : "/events#event-schedule"}
                aria-current={view === option ? "page" : undefined}
                className={`rounded-full px-5 py-2 text-sm font-semibold ${view === option ? "bg-bc-red text-white" : "text-gray-600 hover:text-bc-red"}`}>
                {option === "list" ? "Event list" : "Calendar"}
              </Link>
            ))}
          </div>
        </div>
        {view === "calendar" ? (
          <CalendarSection events={events} handleEventClick={event => router.push(`/events/${event.slug}`)} />
        ) : (
          <PastEventsSection events={events} now={now} />
        )}
    </>
  );
}
