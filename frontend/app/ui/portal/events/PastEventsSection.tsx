import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { localFlyers } from "@/app/lib/calendar/localFlyers";
import type { Event } from "@/app/utils/types";

const dedicatedPages: Record<string, string> = {
  "19": "/game-jam-2025",
};

const zone = "America/New_York";
const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });
const timeFormat = new Intl.DateTimeFormat("en-US", { timeStyle: "short", timeZone: "UTC" });
const campusClock = new Intl.DateTimeFormat("sv-SE", {
  timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
});

// The API sends campus wall times without an offset. Compare and display all
// dates on that same clock, regardless of the visitor's own time zone.
function campusTime(value: string) {
  if (!value) return NaN;
  const hasOffset = /(?:Z|[+-]\d\d:\d\d)$/i.test(value);
  if (!hasOffset) return Date.parse(value.includes("T") ? value + "Z" : value);
  const instant = Date.parse(value);
  if (!Number.isFinite(instant)) return NaN;
  return Date.parse(campusClock.format(instant).replace(" ", "T") + "Z");
}

function imageFor(event: Event) {
  const flyer = localFlyers.get(String(event.id));
  if (flyer) return flyer.src;
  if (event.flierLink) {
    try {
      const url = new URL(event.flierLink, "https://bccs.club");
      if (url.protocol === "https:") return url.href;
    } catch {
      // Use the club logo for invalid flyer URLs.
    }
  }
  return "/club-logo.png";
}

export default function PastEventsSection({ events, now }: { events: Event[]; now: number }) {
  const [selectedYear, setSelectedYear] = useState("all");
  const cutoff = campusTime(new Date(now).toISOString());
  const archive = events
    .filter(event => event.title.trim().toLowerCase() !== "club hours")
    .map(event => ({
      event,
      start: campusTime(event.rrule?.dtstart || event.startTime),
      end: campusTime(event.rrule ? event.rrule.until : event.endTime || event.startTime),
    }))
    .filter(entry => entry.end < cutoff)
    .sort((a, b) => b.end - a.end);

  if (!archive.length) return <p>No past events have been published yet.</p>;

  const yearOf = ({ end }: { end: number }) => String(new Date(end).getUTCFullYear());
  const years = Array.from(new Set(archive.map(yearOf)));
  const visibleEvents = selectedYear === "all" ? archive : archive.filter(entry => yearOf(entry) === selectedYear);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-bc-red/15 pb-4">
        <fieldset className="min-w-0">
          <legend className="sr-only">Filter past events by year</legend>
          <div className="flex flex-wrap gap-2">
            {["all", ...years].map(year => (
              <label key={year} className="cursor-pointer">
                <input type="radio" name="archive-year" value={year} checked={selectedYear === year}
                  onChange={() => setSelectedYear(year)} className="peer sr-only" />
                <span className="inline-flex min-h-11 items-center rounded-full border border-bc-red/20 bg-white px-4 text-sm font-semibold tabular-nums text-bc-red transition-colors hover:bg-bc-yellow/30 peer-checked:border-bc-red peer-checked:bg-bc-red peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bc-red">
                  {year === "all" ? "All years" : year}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <p role="status" className="text-sm tabular-nums text-gray-600">
          {visibleEvents.length} {visibleEvents.length === 1 ? "event" : "events"}
        </p>
      </div>
      <ul className="space-y-6">
        {visibleEvents.map(({ event, start, end }) => {
          const begin = Number.isFinite(start) ? start : end;
          const firstDate = dateFormat.format(begin);
          const lastDate = dateFormat.format(end);
          const href = dedicatedPages[event.id] ?? `/events/${event.slug}`;
          return (
            <li key={event.slug}>
              <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white sm:grid sm:grid-cols-[minmax(12rem,30%)_1fr]">
                <div className="relative min-h-48 bg-stone-100">
                  <Image src={imageFor(event)} alt="" fill unoptimized className="object-contain p-4"
                    onError={e => {
                      if (!e.currentTarget.src.endsWith("/club-logo.png")) e.currentTarget.src = "/club-logo.png";
                    }} />
                </div>
                <div className="min-w-0 p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    <Link href={href} className="hover:text-bc-red hover:underline">{event.title}</Link>
                  </h3>
                  <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm leading-6">
                    {firstDate !== lastDate && !event.rrule ? (
                      <>
                        <dt className="font-semibold">Started</dt><dd>{firstDate} at {timeFormat.format(begin)} ET</dd>
                        <dt className="font-semibold">Ended</dt><dd>{lastDate} at {timeFormat.format(end)} ET</dd>
                      </>
                    ) : (
                      <>
                        <dt className="font-semibold">Date</dt><dd>{firstDate === lastDate ? firstDate : `${firstDate} – ${lastDate}`}</dd>
                        <dt className="font-semibold">Time</dt><dd>{Number.isFinite(start) ? timeFormat.format(start) : "Unavailable"}{!event.rrule && end !== begin && ` – ${timeFormat.format(end)}`} ET</dd>
                      </>
                    )}
                    <dt className="font-semibold">Location</dt><dd>{event.location || "Not recorded"}</dd>
                  </dl>
                  <p className="mt-4 whitespace-pre-line break-words leading-7 text-gray-700">{event.description || "No description was recorded."}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
