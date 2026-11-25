import type { Event } from "@/app/utils/types";
import snapshot from "./published-events.json";

const publicCalendar = "https://api.bccs.club";

// Use the club's published calendar if the configured development API is offline.
// The snapshot contains only public records and keeps their detail pages available offline.
export async function readCalendar(slug?: string): Promise<Event[]> {
  const sources = new Set([process.env.BACKEND_URL, publicCalendar]);
  const path = slug ? `/slug/${encodeURIComponent(slug)}` : "";

  for (const source of sources) {
    if (!source) continue;
    let response: Response;
    try {
      response = await fetch(`${source}/v1/calendar/events${path}`, {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(4000),
      });
    } catch {
      continue;
    }
    if (response.status === 404 && slug) return [];
    if (response.status >= 500 || response.status === 408 || response.status === 429) continue;
    if (!response.ok) throw new Error(`Calendar request failed (${response.status})`);

    const data = await response.json();
    if (!slug && Array.isArray(data)) return data;
    if (slug && data?.slug === slug) return data.isActive ? [data] : [];
    throw new Error("Unexpected calendar response");
  }
  return slug ? snapshot.filter(event => event.slug === slug) : snapshot;
}
