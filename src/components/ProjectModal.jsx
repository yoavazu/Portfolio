import { useEffect } from 'react'
import { motion } from 'framer-motion'
import AlbumCover from './AlbumCover'

function Detail({ label, children }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {label}
      </h4>
      <div className="text-sm leading-relaxed text-zinc-400">{children}</div>
    </div>
  )
}

/** Project details panel, opened by clicking the centered cover. */
export default function ProjectModal({ project, onClose }) {
  // Escape to close + lock body scroll while open
  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  // Rendered conditionally with an animated entrance; closing unmounts
  // immediately (exit animations via AnimatePresence proved unreliable here —
  // a stuck invisible overlay would swallow all page clicks).
  if (!project) return null

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/80 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            initial={{ y: 60, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 bg-zinc-900 sm:rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-start gap-5 border-b border-white/10 p-6 sm:p-8">
              <div className="h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                <AlbumCover project={project} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-2xl font-semibold tracking-tight text-white">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">{project.tagline} · {project.year}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="space-y-8 p-6 sm:p-8">
              <Detail label="About">{project.description}</Detail>

              <Detail label="Screenshots">
                {project.screenshots?.length ? (
                  <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3">
                    {project.screenshots.map((src) => (
                      <a key={src} href={src} target="_blank" rel="noreferrer">
                        <img
                          src={src}
                          alt={`${project.title} screenshot`}
                          loading="lazy"
                          className="w-full rounded-xl border border-white/10 transition-transform hover:scale-[1.02]"
                        />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] text-xs text-zinc-600"
                      >
                        Screenshot {n}
                      </div>
                    ))}
                  </div>
                )}
              </Detail>

              <div className="grid gap-8 sm:grid-cols-2">
                <Detail label="Challenges">{project.challenges}</Detail>
                <Detail label="What I learned">{project.learned}</Detail>
              </div>

              <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-transform hover:scale-[1.03]"
                  >
                    GitHub →
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-accent hover:text-accent"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
  )
}
