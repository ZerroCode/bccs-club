"use server";

import { readCalendar } from "../calendar/readCalendar";

export default async function getEventsAction() {
  return readCalendar();
}
