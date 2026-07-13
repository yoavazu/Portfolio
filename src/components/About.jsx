import Section from './Section'
import { useContent, Emphasis } from '../content/ContentContext'

export default function About() {
  const { about } = useContent().content
  return (
    <Section id="about" eyebrow="About" title={about.title} glow="#2dd4a0">
      <div className="grid gap-12 md:grid-cols-5">
        <div className="space-y-5 text-lg leading-relaxed text-zinc-400 md:col-span-3">
          {about.paragraphs.map((p, i) => (
            <p key={i}>
              <Emphasis text={p} />
            </p>
          ))}
        </div>
        <div className="md:col-span-2">
          <p className="mb-4 text-sm font-medium text-zinc-500">Interests</p>
          <div className="flex flex-wrap gap-2">
            {about.interests.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
