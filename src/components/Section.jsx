import { motion } from 'framer-motion'

/**
 * Reusable section wrapper: anchor id, eyebrow label, title, fade-up on scroll.
 * `glow` tints the section's ambient background light and its eyebrow label,
 * giving each section a subtle color identity.
 */
export default function Section({
  id,
  eyebrow,
  title,
  children,
  className = '',
  glow = '#e0a458',
}) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-6 py-24 md:py-32 ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(45% 55% at 85% 0%, ${glow}12 0%, transparent 70%)`,
        }}
      />
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {eyebrow && (
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: glow }}
          >
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="mb-10 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {title}
          </h2>
        )}
        {children}
      </motion.div>
    </section>
  )
}
