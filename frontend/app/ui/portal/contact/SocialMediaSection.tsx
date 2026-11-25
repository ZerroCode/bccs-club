import { BsLinkedin, BsInstagram, BsDiscord, BsWhatsapp, BsGithub } from "react-icons/bs";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const channels = [
  { name: "Discord", href: "https://discord.gg/C77eXN8bHT", icon: BsDiscord, description: "Ask questions, meet members, and join the conversation." },
  { name: "Instagram", href: "https://www.instagram.com/bccs.club/", icon: BsInstagram, description: "See event announcements, club photos, and highlights." },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/bc-compsci-club/", icon: BsLinkedin, description: "Follow club updates and connect with our tech community." },
  { name: "WhatsApp", href: "https://chat.whatsapp.com/ISU51DWQHSL0wQ7SoEAKa0", icon: BsWhatsapp, description: "Keep in touch and chat with fellow club members." },
  { name: "GitHub", href: "https://github.com/bc-compsci-club", icon: BsGithub, description: "Explore our code and contribute to club projects." },
];

export default function SocialMediaSection() {
  return (
    <section aria-labelledby="social-heading" className="border-t border-gray-200 px-6 py-14 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-bc-red">Stay in the loop</p>
        <h2 id="social-heading" className="mt-3 text-3xl font-bold tracking-tight text-gray-900">Find your community</h2>
        <p className="mt-4 max-w-xl leading-7 text-gray-600">Keep up with the club wherever you like to connect.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map(channel => (
            <a key={channel.name} href={channel.href} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-bc-yellow hover:bg-bc-yellow hover:shadow-md focus-visible:bg-bc-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bc-red">
              <div className="flex items-center justify-between"><channel.icon aria-hidden="true" className="h-6 w-6 text-bc-red" /><ArrowUpRightIcon aria-hidden="true" className="h-5 w-5 text-gray-400 group-hover:text-bc-red" /></div>
              <h3 className="mt-5 text-lg font-bold text-gray-900 group-hover:text-bc-red">{channel.name}<span className="sr-only"> (opens in a new tab)</span></h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{channel.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
