import { useContent } from '../content/ContentContext'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { hero, links } = useContent().content
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/70 px-5 py-3 backdrop-blur-xl md:mx-6 lg:mx-auto">
        <a href="#top" className="text-sm font-semibold tracking-tight text-white">
          {hero.name}<span className="text-accent">.</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href={links.resume}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-zinc-200 transition-colors hover:border-accent hover:text-accent"
        >
          Resume
        </a>
      </nav>
    </header>
  )
}
