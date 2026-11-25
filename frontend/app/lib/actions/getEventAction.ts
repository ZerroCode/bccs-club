"use server";

import { readCalendar } from "../calendar/readCalendar";

export default async function getEventAction(slug: string) {
  return (await readCalendar(slug))[0] ?? null;
}
