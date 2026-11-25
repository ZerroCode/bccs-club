export default function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden bg-bc-red px-6 pt-28 text-white lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rotate-12 rounded-[3rem] border-[32px] border-bc-yellow/20" />
      <div className="relative mx-auto max-w-6xl pb-14 pt-10 sm:pb-20 sm:pt-16">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-bc-yellow">Meet. Learn. Build.</p>
          <h1 className="text-6xl font-bold tracking-tight sm:text-8xl">
            Events
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
            From hands-on workshops to talks and time with friends, there’s a place for you at the Computer Science Club. See what’s coming up and join us.
          </p>
        </div>
      </div>
    </div>
  );
}
