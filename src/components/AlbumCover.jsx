/**
 * CSS/SVG-only album artwork. Each project's `cover` config picks a gradient
 * and one of the patterns below — no image assets needed.
 *
 * ADDING A NEW STYLE: add an entry here. It's a function that receives the
 * cover's ink (text) color and returns SVG elements drawn on a 200×200
 * canvas (the artwork area is roughly y=0..145; text sits below). It
 * automatically appears in the admin editor's pattern dropdown — no other
 * code changes needed. Keep opacities low (0.2–0.4) so the title stays legible.
 */
const patterns = {
  // Concentric vinyl grooves
  rings: (ink) => (
    <g fill="none" stroke={ink} opacity="0.25">
      {[30, 52, 74, 96, 118].map((r) => (
        <circle key={r} cx="100" cy="78" r={r} strokeWidth="1.2" />
      ))}
      <circle cx="100" cy="78" r="10" fill={ink} opacity="0.9" />
    </g>
  ),
  // Map pins & routes
  map: (ink) => (
    <g stroke={ink} fill="none" opacity="0.35">
      <path d="M-10 60 Q 60 30 100 70 T 210 55" strokeWidth="1" strokeDasharray="4 5" />
      <path d="M-10 120 Q 80 90 130 130 T 210 110" strokeWidth="1" strokeDasharray="4 5" />
      {[[45, 55], [110, 72], [160, 118], [70, 125]].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <circle cx={x} cy={y} r="4" fill={ink} stroke="none" />
          <circle cx={x} cy={y} r="9" strokeWidth="1" />
        </g>
      ))}
    </g>
  ),
  // Futuristic glowing orb
  orb: (ink) => (
    <g fill="none" stroke={ink}>
      <circle cx="100" cy="80" r="42" strokeWidth="1.5" opacity="0.8" />
      <ellipse cx="100" cy="80" rx="70" ry="22" strokeWidth="1" opacity="0.35" />
      <ellipse cx="100" cy="80" rx="70" ry="22" strokeWidth="1" opacity="0.35" transform="rotate(60 100 80)" />
      <ellipse cx="100" cy="80" rx="70" ry="22" strokeWidth="1" opacity="0.35" transform="rotate(-60 100 80)" />
      <circle cx="100" cy="80" r="5" fill={ink} stroke="none" />
    </g>
  ),
  // Rising analytics bars
  bars: (ink) => (
    <g fill={ink}>
      {[28, 52, 76, 100, 124, 148].map((x, i) => (
        <rect key={x} x={x} y={130 - (i + 1) * 16} width="14" rx="3"
          height={(i + 1) * 16} opacity={0.25 + i * 0.12} />
      ))}
    </g>
  ),
  // Perspective grid + trend line
  grid: (ink) => (
    <g stroke={ink} fill="none">
      {[30, 60, 90, 120].map((y) => (
        <line key={y} x1="10" y1={y} x2="190" y2={y} strokeWidth="0.7" opacity="0.2" />
      ))}
      {[40, 80, 120, 160].map((x) => (
        <line key={x} x1={x} y1="15" x2={x} y2="135" strokeWidth="0.7" opacity="0.2" />
      ))}
      <path d="M15 120 L60 95 L100 105 L145 55 L185 35" strokeWidth="2.5" opacity="0.9"
        strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="145" cy="55" r="4" fill={ink} stroke="none" />
    </g>
  ),
  // Layered sine waves
  waves: (ink) => (
    <g fill="none" stroke={ink} strokeWidth="1.5">
      {[40, 65, 90, 115].map((y, i) => (
        <path
          key={y}
          d={`M-10 ${y} Q 40 ${y - 22} 90 ${y} T 210 ${y}`}
          opacity={0.15 + i * 0.09}
        />
      ))}
    </g>
  ),
  // Rays radiating from a low sun
  sunburst: (ink) => (
    <g stroke={ink}>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * 26} y1={80 + Math.sin(a) * 26}
            x2={100 + Math.cos(a) * 85} y2={80 + Math.sin(a) * 85}
            strokeWidth="2" opacity="0.3"
          />
        )
      })}
      <circle cx="100" cy="80" r="16" fill={ink} stroke="none" opacity="0.85" />
    </g>
  ),
  // Halftone dot grid, fading toward a corner
  mosaic: (ink) => (
    <g fill={ink}>
      {Array.from({ length: 36 }, (_, i) => {
        const col = i % 6, row = Math.floor(i / 6)
        return (
          <circle
            key={i}
            cx={30 + col * 28} cy={20 + row * 22}
            r={1.5 + ((col + row) % 5)}
            opacity={0.12 + ((5 - col + row) % 6) * 0.05}
          />
        )
      })}
    </g>
  ),
}

/** Pattern options, used by the admin editor's dropdown. */
export const patternNames = Object.keys(patterns)

export default function AlbumCover({ project }) {
  const { cover, title, tagline, year, id } = project
  return (
    <div
      className="relative h-full w-full select-none overflow-hidden rounded-xl"
      style={{
        background: `linear-gradient(140deg, ${cover.from} 0%, ${cover.to} 100%)`,
        color: cover.ink,
        containerType: 'inline-size', // lets the title scale with cover size (cqw)
      }}
    >
      {/* Artwork */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
        {patterns[cover.pattern]?.(cover.ink)}
      </svg>
      {/* Sheen for a printed-sleeve feel */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(115deg, rgba(255,255,255,0.18) 0%, transparent 35%, transparent 75%, rgba(0,0,0,0.25) 100%)',
        }}
      />
      {/* Record-label typography */}
      <div className="absolute inset-0 flex flex-col justify-between p-[7%]">
        <div className="flex items-baseline justify-between text-[0.55rem] font-medium tracking-[0.2em] uppercase opacity-80">
          <span>{cover.code || `YA-${id.slice(0, 3).toUpperCase()}`}</span>
          <span>{year}</span>
        </div>
        <div>
          <h3 className="text-[clamp(1rem,9cqw,1.8rem)] leading-none font-bold tracking-tight">
            {title}
          </h3>
          {/* Tagline is hidden on tiny covers (e.g. modal thumbnail) */}
          <p className="mt-1.5 hidden text-[0.6rem] font-medium tracking-[0.15em] uppercase opacity-75 @[10rem]:block">
            {tagline}
          </p>
        </div>
      </div>
    </div>
  )
}
