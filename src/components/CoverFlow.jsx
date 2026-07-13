import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import AlbumCover from './AlbumCover'

const spring = { type: 'spring', stiffness: 220, damping: 28 }

/**
 * Apple Cover Flow-style carousel.
 * Navigation: click a cover, arrow keys, mouse wheel / trackpad, drag/swipe.
 * Clicking the centered cover fires onOpen(project).
 */
export default function CoverFlow({ projects, onOpen }) {
  const [active, setActive] = useState(Math.floor(projects.length / 2))
  const [size, setSize] = useState(280)
  const containerRef = useRef(null)
  const dragState = useRef(null) // { startX, startIndex, moved }
  const activeRef = useRef(active)
  activeRef.current = active

  const clamp = useCallback(
    (i) => Math.max(0, Math.min(projects.length - 1, i)),
    [projects.length],
  )
  const step = useCallback((dir) => setActive((a) => clamp(a + dir)), [clamp])

  // Responsive cover size
  useEffect(() => {
    const el = containerRef.current
    const measure = () => setSize(Math.min(300, el.clientWidth * 0.52))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Mouse wheel / trackpad (non-passive so we can prevent page scroll)
  useEffect(() => {
    const el = containerRef.current
    let last = 0
    const onWheel = (e) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(d) < 8) return
      // At either end, let the page scroll instead of trapping the wheel
      const a = activeRef.current
      if ((d > 0 && a === projects.length - 1) || (d < 0 && a === 0)) return
      e.preventDefault()
      const now = Date.now()
      if (now - last < 220) return
      last = now
      step(d > 0 ? 1 : -1)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [step, projects.length])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(projects[active]) }
  }

  // Drag / swipe. Pointer capture is only taken once a real drag starts —
  // capturing on pointerdown would retarget the click event to the container
  // and covers would never receive their onClick.
  const onPointerDown = (e) => {
    dragState.current = { startX: e.clientX, startIndex: active, moved: false, id: e.pointerId }
  }
  const onPointerMove = (e) => {
    const drag = dragState.current
    if (!drag) return
    const dx = e.clientX - drag.startX
    if (!drag.moved && Math.abs(dx) > 8) {
      drag.moved = true
      containerRef.current.setPointerCapture(drag.id)
    }
    if (drag.moved) setActive(clamp(drag.startIndex + Math.round(-dx / (size * 0.55))))
  }
  const onPointerUp = () => {
    // Delay reset so the click handler can tell a drag from a tap
    setTimeout(() => { dragState.current = null }, 0)
  }

  const handleCoverClick = (i) => {
    if (dragState.current?.moved) return
    i === active ? onOpen(projects[i]) : setActive(i)
  }

  const spacing = size * 0.55

  return (
    <div>
      <div
        ref={containerRef}
        role="listbox"
        aria-label="Project covers"
        aria-activedescendant={`cover-${projects[active].id}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative flex cursor-grab touch-pan-y items-center justify-center overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-accent/60 active:cursor-grabbing rounded-3xl"
        style={{ height: size * 1.5, perspective: '1200px' }}
      >
        {projects.map((project, i) => {
          const offset = i - active
          const isActive = offset === 0
          return (
            <motion.div
              key={project.id}
              id={`cover-${project.id}`}
              role="option"
              aria-selected={isActive}
              aria-label={project.title}
              onClick={() => handleCoverClick(i)}
              className="reflect absolute cursor-pointer"
              style={{ width: size, height: size, zIndex: projects.length - Math.abs(offset) }}
              animate={{
                x: offset * spacing,
                z: isActive ? 110 : 0,
                rotateY: isActive ? 0 : offset > 0 ? -48 : 48,
                scale: isActive ? 1 : 0.82,
                opacity: Math.abs(offset) > 3 ? 0 : 1,
              }}
              transition={spring}
              whileHover={isActive ? { scale: 1.03 } : undefined}
            >
              <AlbumCover project={project} />
            </motion.div>
          )
        })}
      </div>

      {/* Caption + dots */}
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-white">{projects[active].title}</p>
        <p className="mt-1 text-sm text-zinc-500">
          {projects[active].tagline} · <span className="text-accent">click to open</span>
        </p>
        <div className="mt-5 flex justify-center gap-2" role="tablist" aria-hidden>
          {projects.map((p, i) => (
            <button
              key={p.id}
              tabIndex={-1}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-6 bg-accent' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
