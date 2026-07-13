export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 text-xs text-zinc-600 sm:flex-row">
        <p>© {new Date().getFullYear()} Yoav Azulay</p>
        <p>Designed &amp; built with React, Tailwind and too much coffee.</p>
      </div>
    </footer>
  )
}
