import { motion } from 'framer-motion'
import { useContent } from '../content/ContentContext'

const fade = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

export default function Hero() {
  const { content } = useContent()
  const { hero, links } = content
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Ambient background: warm gold + cool violet glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(45% 45% at 22% 12%, rgba(224,164,88,0.13) 0%, transparent 70%),
            radial-gradient(38% 42% at 82% 30%, rgba(139,124,246,0.11) 0%, transparent 70%),
            radial-gradient(30% 35% at 65% 85%, rgba(45,212,160,0.06) 0%, transparent 70%)`,
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-6 pt-24">
        <motion.p {...fade(0)} className="mb-4 text-sm font-medium tracking-[0.25em] text-accent uppercase">
          {hero.eyebrow}
        </motion.p>
        <motion.h1
          {...fade(0.1)}
          className="bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-6xl font-semibold tracking-tighter text-transparent sm:text-7xl md:text-8xl"
        >
          {hero.name}
        </motion.h1>
        <motion.p {...fade(0.2)} className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
          {hero.intro}
        </motion.p>
        <motion.div {...fade(0.3)} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-r from-accent to-[#f0c479] px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-accent/25 transition-transform hover:scale-[1.03] active:scale-95"
          >
            View Projects
          </a>
          {[
            { label: 'LinkedIn', href: links.linkedin },
            { label: 'GitHub', href: links.github },
            { label: 'Resume', href: links.resume },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
            >
              {btn.label}
            </a>
          ))}
        </motion.div>
      </div>
      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest text-zinc-600"
      >
        SCROLL
      </motion.div>
    </section>
  )
}
