"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRightIcon, CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import HeroSection from "@/app/ui/portal/events/HeroSection";
import CalendarSection from "@/app/ui/portal/events/CalendarSection";
import { Event } from "@/app/utils/types";
import getEventsAction from "@/app/lib/actions/getEventsAction";
import clubPhoto from "@/app/images/club-event/coffee-and-code-night.jpg";

export const runtime = "edge";

function EventCard({ event }: { event: Event }) {
  const start = new Date(event.startTime);
  const validDate = Number.isFinite(start.getTime());
  const date = validDate ? start.toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York",
  }) : "Date to be announced";
  const time = validDate ? start.toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", timeZone: "America/New_York", timeZoneName: "short",
  }) : "";
  return (
    <Link href={`/events/${event.slug}`} className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-bc-red/40 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bc-red">
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="rounded-full bg-bc-red/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-bc-red">{event.rrule ? "Recurring event" : "Upcoming event"}</span>
        <ArrowUpRightIcon aria-hidden="true" className="h-5 w-5 text-bc-red" />
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-bc-red">{event.title}</h3>
      <div className="mt-4 space-y-2 text-sm leading-6 text-gray-600">
        <p className="flex items-start gap-2"><CalendarDaysIcon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" /><span>{event.rrule ? "Repeats — see calendar for dates" : `${date}${time ? ` · ${time}` : ""}`}</span></p>
        <p className="flex items-start gap-2"><MapPinIcon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" /><span>{event.location || "Location to be announced"}</span></p>
      </div>
      <p className="mb-6 mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{event.description}</p>
      <span className="mt-auto pt-2 text-sm font-semibold text-bc-red">View event details <span aria-hidden="true">→</span></span>
    </Link>
  );
}

export default function Page() {
  const [events, setEvents] = useState<Event[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [view, setView] = useState<"list" | "calendar">("list");
  const [attempt, setAttempt] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    async function loadEvents() {
      try {
        const data = await getEventsAction();
        if (!Array.isArray(data)) throw new Error("Invalid events response");
        if (!cancelled) {
          setEvents(data.filter(event => event.isActive));
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }
    loadEvents();
    return () => { cancelled = true; };
  }, [attempt]);

  const now = Date.now();
  const upcoming = events.filter(event => !event.rrule && new Date(event.endTime || event.startTime).getTime() >= now)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  const recurring = events.filter(event => event.rrule && (!event.rrule.until || new Date(event.rrule.until).getTime() >= now));

  return (
    <main className="club-page-gradient">
      <HeroSection />
      <section aria-labelledby="club-hours-heading" className="mx-auto max-w-6xl px-6 py-14 sm:py-20 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl bg-[#faf6ef] lg:grid-cols-2">
          <div className="relative min-h-64 lg:min-h-96">
            <Image src={clubPhoto} alt="Students spending time together at a club event" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" placeholder="blur" />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bc-red">Your campus community</p>
            <h2 id="club-hours-heading" className="mt-4 text-4xl font-bold tracking-tight text-gray-900">Club Hours</h2>
            <p className="mt-4 text-lg font-semibold text-bc-red">12:00 PM – 2:00 PM</p>
            <p className="mt-5 flex items-start gap-2 text-sm font-medium text-gray-700"><MapPinIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-bc-red" />Room 0317, Ingersoll Hall</p>
            <p className="mt-5 text-base leading-7 text-gray-600">Working on a project? Looking for study buddies? Come meet other students interested in tech, share ideas, and get to know the club. All experience levels are welcome.</p>
            <a href="#event-schedule" onClick={() => setView("calendar")} className="mt-7 inline-flex w-fit items-center gap-3 border-b-2 border-bc-yellow pb-1 text-sm font-semibold text-bc-red">Check the event calendar <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section id="event-schedule" aria-labelledby="events-heading" className="mx-auto max-w-6xl scroll-mt-28 px-6 pb-16 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-bc-red">Find your next event</p><h2 id="events-heading" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Upcoming Events</h2></div>
          <div className="flex w-fit gap-1 rounded-full bg-gray-100 p-1" role="group" aria-label="Event view">
            {(["list", "calendar"] as const).map(option => <button key={option} type="button" aria-pressed={view === option} onClick={() => setView(option)} className={`rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-bc-red ${view === option ? "bg-bc-red text-white shadow-sm" : "text-gray-600 hover:text-bc-red"}`}>{option === "list" ? "Event list" : "Calendar"}</button>)}
          </div>
        </div>
        {status === "loading" && <div role="status" className="rounded-2xl border border-gray-200 px-6 py-16 text-center text-gray-600">Loading events…</div>}
        {status === "error" && <div role="alert" className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-12 text-center"><p className="font-semibold text-gray-900">We couldn’t load the schedule.</p><p className="mt-2 text-sm text-gray-600">Please try again, or <Link href="/contact" className="underline">contact the club</Link> for event information.</p><button type="button" onClick={() => setAttempt(value => value + 1)} className="mt-5 rounded-lg bg-bc-red px-5 py-2 text-sm font-semibold text-white">Try again</button></div>}
        {status === "ready" && (view === "calendar" ? <CalendarSection handleEventClick={event => router.push(`/events/${event.slug}`)} events={events} /> : <>
          {upcoming.length > 0 ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{upcoming.map(event => <EventCard key={event.id} event={event} />)}</div> : <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center"><CalendarDaysIcon aria-hidden="true" className="mx-auto mb-4 h-8 w-8 text-bc-red" /><p className="font-semibold text-gray-900">More events are on the way.</p><p className="mt-2 text-sm text-gray-600">Check back soon for new workshops, talks, and meetups.</p></div>}
          {recurring.length > 0 && <div className="mt-12"><h3 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">Regular Meetups</h3><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{recurring.map(event => <EventCard key={event.id} event={event} />)}</div></div>}
        </>)}
      </section>
      <section className="bg-bc-red px-6 py-12 text-center text-white">
        <h2 className="text-2xl font-bold sm:text-3xl">There’s always room for one more.</h2>
        <p className="mx-auto mt-3 max-w-lg leading-7 text-white/80">Join the Brooklyn College tech community and be part of what’s next.</p>
        <a href="https://www.clubs.brooklyn.cuny.edu/ComputerScienceClub/club_signup" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-bc-yellow px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-white">Join the Club <span className="ml-3" aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
