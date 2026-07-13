import Section from './Section'
import { useContent } from '../content/ContentContext'

export default function Contact() {
  const { contact, links } = useContent().content
  return (
    <Section id="contact" className="text-center" glow="#f472b6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f472b6]">Contact</p>
      <h2 className="mx-auto max-w-2xl bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
        {contact.heading}
      </h2>
      <p className="mx-auto mt-5 max-w-md text-zinc-400">{contact.blurb}</p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <a
          href={`mailto:${links.email}`}
          className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-zinc-950 transition-transform hover:scale-[1.03] active:scale-95"
        >
          {links.email}
        </a>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
        >
          LinkedIn
        </a>
        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
        >
          GitHub
        </a>
      </div>
    </Section>
  )
}
