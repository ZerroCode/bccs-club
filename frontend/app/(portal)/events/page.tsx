import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";
import clubPhoto from "@/app/images/club-event/coffee-and-code-night.jpg";
import HeroSection from "@/app/ui/portal/events/HeroSection";
import EventViews from "@/app/ui/portal/events/EventViews";
import getEventsAction from "@/app/lib/actions/getEventsAction";

export const runtime = "edge";
export const dynamic = "force-dynamic";

async function Schedule({ view }: { view: "list" | "calendar" }) {
  try {
    const events = await getEventsAction();
    return <EventViews view={view} events={events.filter(event => event.isActive)} now={Date.now()} />;
  } catch {
    return <p role="alert">The calendar could not be loaded. Please try again later.</p>;
  }
}

export default function Page({ searchParams }: { searchParams: { view?: string } }) {
  const view = searchParams.view === "calendar" ? "calendar" : "list";
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
            <Link href="/events?view=calendar#event-schedule" className="mt-7 inline-flex w-fit items-center gap-3 border-b-2 border-bc-yellow pb-1 text-sm font-semibold text-bc-red">Check the event calendar <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section id="event-schedule" aria-label="Event schedule" className="mx-auto max-w-6xl scroll-mt-28 px-6 pb-16 lg:px-8">
        <Suspense fallback={<p role="status">Loading events…</p>}>
          <Schedule view={view} />
        </Suspense>
      </section>
      <section className="bg-bc-red px-6 py-12 text-center text-white">
        <h2 className="text-2xl font-bold sm:text-3xl">There’s always room for one more.</h2>
        <p className="mx-auto mt-3 max-w-lg leading-7 text-white/80">Join the Brooklyn College tech community and be part of what’s next.</p>
        <a href="https://www.clubs.brooklyn.cuny.edu/ComputerScienceClub/club_signup" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-bc-yellow px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-white">Join the Club <span className="ml-3" aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
