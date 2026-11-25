import Link from "next/link";
import { ArrowUpRightIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function HeroSection() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-bc-red px-6 pt-28 text-white lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rotate-12 rounded-[3rem] border-[32px] border-bc-yellow/20" />
        <div className="relative mx-auto max-w-6xl pb-14 pt-10 sm:pb-20 sm:pt-16">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-bc-yellow">Let’s connect</p>
          <h1 className="text-6xl font-bold tracking-tight sm:text-8xl">Contact</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
            Have a question, an idea, or just want to say hello? We’d love to hear from you.
          </p>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <h2 id="contact-heading" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Get in touch</h2>
          <p className="mt-5 text-lg leading-8 text-gray-600">
            Send us an email or say hi on <a href="https://discord.gg/C77eXN8bHT" target="_blank" rel="noopener noreferrer" className="font-medium text-bc-red underline decoration-bc-red/30 underline-offset-4 hover:decoration-bc-red">Discord</a>. For club news, event announcements, and a look at what we’ve been up to, follow us on <a href="https://www.instagram.com/bccs.club/" target="_blank" rel="noopener noreferrer" className="font-medium text-bc-red underline decoration-bc-red/30 underline-offset-4 hover:decoration-bc-red">Instagram</a>.
          </p>
          <div className="mt-9 border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold tracking-tight text-gray-900">For sponsorships &amp; partnerships</h3>
            <p className="mt-3 leading-7 text-gray-600">Interested in supporting the club, hosting a workshop, or collaborating on an event? Tell us a little about your organization and what you have in mind.</p>
            <a href="mailto:bc.cis.club@gmail.com?subject=Sponsorship%20%26%20partnership%20inquiry" className="mt-5 inline-flex items-center gap-2 font-semibold text-bc-red underline decoration-bc-yellow decoration-2 underline-offset-8 hover:decoration-bc-red">Let’s work together <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4" /></a>
          </div>
        </div>

        <div className="rounded-3xl bg-[#faf6ef] p-7 sm:p-10">
          <EnvelopeIcon aria-hidden="true" className="h-8 w-8 text-bc-red" />
          <h3 className="mt-5 text-xl font-bold text-gray-900">Email the club</h3>
          <a href="mailto:bc.cis.club@gmail.com" className="mt-3 inline-flex max-w-full items-center gap-2 break-all text-lg font-semibold text-bc-red underline decoration-bc-red/30 underline-offset-4 hover:decoration-bc-red sm:text-xl">bc.cis.club@gmail.com <ArrowUpRightIcon aria-hidden="true" className="h-5 w-5 shrink-0" /></a>
          <div className="mt-8 border-t border-bc-red/15 pt-8">
            <div className="flex items-center gap-3"><MapPinIcon aria-hidden="true" className="h-6 w-6 text-bc-red" /><h3 className="text-xl font-bold text-gray-900">Come say hello</h3></div>
            <p className="mt-4 font-semibold text-bc-red">Club Hours: 12:00 PM – 2:00 PM</p>
            <p className="mt-4 leading-7 text-gray-600">Room 0317<br />Ingersoll Hall<br />Brooklyn College</p>
            <Link href="/events?view=calendar#event-schedule" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-bc-red hover:underline">Check the Club Hours schedule <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
