import { useContent } from '../content/ContentContext'

export default function Navbar() {
  const { hero } = useContent().content
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/70 px-5 py-3 backdrop-blur-xl md:mx-6 lg:mx-auto">
        <a href="#top" className="text-sm font-semibold tracking-tight text-white">
          {hero.name}<span className="text-accent">.</span>
        </a>
        <a href="#projects" className="text-sm text-zinc-400 transition-colors hover:text-white">
          Projects
        </a>
      </nav>
    </header>
  )
}
