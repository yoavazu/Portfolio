import Section from './Section'
import { useContent } from '../content/ContentContext'

/* Accent hues cycled across category cards */
const hues = ['#e0a458', '#8b7cf6', '#2dd4a0', '#38bdf8', '#f472b6', '#fb923c']

export default function Skills() {
  const { skills } = useContent().content
  return (
    <Section id="skills" eyebrow="Skills" title="Tools of the trade" glow="#8b7cf6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const hue = hues[i % hues.length]
          return (
            <div
              key={group.category}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${hue}66`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
            >
              <h3 className="mb-4 flex items-center gap-2.5 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full" style={{ background: hue, boxShadow: `0 0 8px ${hue}` }} />
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full bg-white/[0.05] px-3 py-1.5 text-xs text-zinc-400">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
