import Section from './Section'
import { useContent } from '../content/ContentContext'

export default function Experience() {
  const { experience } = useContent().content
  return (
    <Section id="experience" eyebrow="Experience" title="The path so far" glow="#38bdf8">
      <ol className="relative ml-3 space-y-12 pl-8">
        {/* Gradient timeline spine */}
        <div
          aria-hidden
          className="absolute left-0 top-0 h-full w-px"
          style={{ background: 'linear-gradient(to bottom, #e0a458, #8b7cf6 55%, transparent)' }}
        />
        {experience.map((entry, i) => (
          <li key={i} className="relative">
            {/* Timeline dot */}
            <span className="absolute top-1.5 -left-[2.32rem] h-3 w-3 rounded-full border-2 border-accent bg-zinc-950 shadow-[0_0_10px_rgba(224,164,88,0.5)]" />
            <p className="text-xs font-medium tracking-widest text-zinc-500 uppercase">
              {entry.period}
            </p>
            <h3 className="mt-1.5 text-lg font-semibold text-white">{entry.title}</h3>
            <p className="text-sm text-accent">{entry.org}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
              {entry.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
