import { useContent } from '../content/ContentContext'
import { patternNames } from '../components/AlbumCover'
import { exportContent } from './exportFiles'

/* ---------- small form primitives ---------- */

const inputCls =
  'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent'

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-zinc-500">{label}</span>
      <input className={inputCls} {...props} />
    </label>
  )
}

function Area({ label, rows = 3, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-zinc-500">{label}</span>
      <textarea rows={rows} className={inputCls} {...props} />
    </label>
  )
}

/** Comma-separated text input bound to an array of strings. */
function ListField({ label, value, onChange }) {
  return (
    <Field
      label={`${label} (comma separated)`}
      value={value.join(', ')}
      onChange={(e) =>
        onChange(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))
      }
    />
  )
}

function ColorField({ label, ...props }) {
  return (
    <label className="flex items-center gap-2">
      <input type="color" className="h-8 w-8 cursor-pointer rounded border border-white/10 bg-transparent" {...props} />
      <span className="text-xs text-zinc-500">{label}</span>
    </label>
  )
}

/** Collapsible editor section (native <details> keeps it simple + accessible). */
function Group({ title, children, defaultOpen = false }) {
  return (
    <details open={defaultOpen} className="rounded-xl border border-white/10 bg-white/[0.02]">
      <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-white">
        {title}
      </summary>
      <div className="space-y-3 border-t border-white/10 p-4">{children}</div>
    </details>
  )
}

function SmallBtn({ children, ...props }) {
  return (
    <button
      type="button"
      className="rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-400 hover:border-white/30 hover:text-white disabled:opacity-30"
      {...props}
    >
      {children}
    </button>
  )
}

/* ---------- panel ---------- */

export default function AdminPanel({ onClose }) {
  const { content, setContent, reset, isDraft } = useContent()

  // Immutable update helpers
  const patchObj = (key, field, val) =>
    setContent((c) => ({ ...c, [key]: { ...c[key], [field]: val } }))
  const patchItem = (key, i, field, val) =>
    setContent((c) => ({
      ...c,
      [key]: c[key].map((x, j) => (j === i ? { ...x, [field]: val } : x)),
    }))
  const addItem = (key, template) =>
    setContent((c) => ({ ...c, [key]: [...c[key], template] }))
  const removeItem = (key, i) =>
    setContent((c) => ({ ...c, [key]: c[key].filter((_, j) => j !== i) }))
  const moveItem = (key, i, dir) =>
    setContent((c) => {
      const arr = [...c[key]]
      const j = i + dir
      if (j < 0 || j >= arr.length) return c
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      return { ...c, [key]: arr }
    })

  const { hero, about, contact, links, skills, experience, projects } = content

  return (
    <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-zinc-950 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-white">Content editor</h2>
          <p className="text-xs text-zinc-500">
            {isDraft ? 'Unexported draft — visible only in this browser' : 'Matches published content'}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close editor"
          className="rounded-full p-2 text-zinc-500 hover:bg-white/10 hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Sections */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        <Group title="Hero" defaultOpen>
          <Field label="Name" value={hero.name} onChange={(e) => patchObj('hero', 'name', e.target.value)} />
          <Field label="Eyebrow line" value={hero.eyebrow} onChange={(e) => patchObj('hero', 'eyebrow', e.target.value)} />
          <Area label="Intro" value={hero.intro} onChange={(e) => patchObj('hero', 'intro', e.target.value)} />
        </Group>

        <Group title="About">
          <Field label="Title" value={about.title} onChange={(e) => patchObj('about', 'title', e.target.value)} />
          <Area
            label="Paragraphs (blank line between; **word** = emphasis)"
            rows={9}
            value={about.paragraphs.join('\n\n')}
            onChange={(e) =>
              patchObj('about', 'paragraphs', e.target.value.split(/\n\s*\n/).filter(Boolean))
            }
          />
          <ListField label="Interests" value={about.interests} onChange={(v) => patchObj('about', 'interests', v)} />
        </Group>

        <Group title={`Projects (${projects.length})`}>
          {projects.map((p, i) => (
            <details key={p.id} className="rounded-lg border border-white/10">
              <summary className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm text-zinc-200">
                <span className="truncate">{p.title || 'Untitled'}</span>
                <span className="ml-2 flex shrink-0 gap-1" onClick={(e) => e.preventDefault()}>
                  <SmallBtn disabled={i === 0} onClick={() => moveItem('projects', i, -1)}>↑</SmallBtn>
                  <SmallBtn disabled={i === projects.length - 1} onClick={() => moveItem('projects', i, 1)}>↓</SmallBtn>
                  <SmallBtn onClick={() => confirm(`Delete "${p.title}"?`) && removeItem('projects', i)}>✕</SmallBtn>
                </span>
              </summary>
              <div className="space-y-3 border-t border-white/10 p-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Title" value={p.title} onChange={(e) => patchItem('projects', i, 'title', e.target.value)} />
                  <Field label="Year" value={p.year} onChange={(e) => patchItem('projects', i, 'year', e.target.value)} />
                </div>
                <Field label="Tagline" value={p.tagline} onChange={(e) => patchItem('projects', i, 'tagline', e.target.value)} />
                <Area label="Description" value={p.description} onChange={(e) => patchItem('projects', i, 'description', e.target.value)} />
                <ListField label="Technologies" value={p.tech} onChange={(v) => patchItem('projects', i, 'tech', v)} />
                <Area label="Challenges" value={p.challenges} onChange={(e) => patchItem('projects', i, 'challenges', e.target.value)} />
                <Area label="What I learned" value={p.learned} onChange={(e) => patchItem('projects', i, 'learned', e.target.value)} />
                <Field label="GitHub URL" value={p.github ?? ''} onChange={(e) => patchItem('projects', i, 'github', e.target.value || null)} />
                <Field label="Live demo URL (optional)" value={p.demo ?? ''} onChange={(e) => patchItem('projects', i, 'demo', e.target.value || null)} />
                <div>
                  <ListField
                    label="Screenshots"
                    value={p.screenshots ?? []}
                    onChange={(v) => patchItem('projects', i, 'screenshots', v)}
                  />
                  <p className="mt-1 text-[0.65rem] leading-snug text-zinc-600">
                    Put image files in <code className="text-zinc-400">public/projects/</code> and list
                    their paths, e.g. <code className="text-zinc-400">/projects/{p.id}/1.png</code>
                  </p>
                </div>
                {/* Album cover artwork */}
                <div className="rounded-lg border border-white/10 p-3">
                  <p className="mb-2 text-xs font-medium text-zinc-500">Album cover</p>
                  <Field
                    label="Catalog code (top-left on the cover)"
                    value={p.cover.code ?? ''}
                    onChange={(e) => patchItem('projects', i, 'cover', { ...p.cover, code: e.target.value })}
                  />
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <ColorField label="From" value={p.cover.from} onChange={(e) => patchItem('projects', i, 'cover', { ...p.cover, from: e.target.value })} />
                    <ColorField label="To" value={p.cover.to} onChange={(e) => patchItem('projects', i, 'cover', { ...p.cover, to: e.target.value })} />
                    <ColorField label="Text" value={p.cover.ink} onChange={(e) => patchItem('projects', i, 'cover', { ...p.cover, ink: e.target.value })} />
                    <select
                      value={p.cover.pattern}
                      onChange={(e) => patchItem('projects', i, 'cover', { ...p.cover, pattern: e.target.value })}
                      className="rounded-lg border border-white/10 bg-zinc-900 px-2 py-1.5 text-xs text-white"
                    >
                      {patternNames.map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </details>
          ))}
          <SmallBtn
            onClick={() =>
              addItem('projects', {
                id: `project-${Date.now()}`,
                title: 'New Project',
                tagline: 'One-line description',
                year: String(new Date().getFullYear()),
                description: '',
                tech: [],
                challenges: '',
                learned: '',
                github: null,
                demo: null,
                screenshots: [],
                cover: { code: 'YA-NEW', from: '#71717a', to: '#18181b', ink: '#fafafa', pattern: 'rings' },
              })
            }
          >
            + Add project
          </SmallBtn>
        </Group>

        <Group title="Skills">
          {skills.map((group, i) => (
            <div key={i} className="space-y-2 rounded-lg border border-white/10 p-3">
              <div className="flex items-end gap-2">
                <Field label="Category" value={group.category} onChange={(e) => patchItem('skills', i, 'category', e.target.value)} />
                <SmallBtn onClick={() => removeItem('skills', i)}>✕</SmallBtn>
              </div>
              <ListField label="Items" value={group.items} onChange={(v) => patchItem('skills', i, 'items', v)} />
            </div>
          ))}
          <SmallBtn onClick={() => addItem('skills', { category: 'New category', items: [] })}>
            + Add category
          </SmallBtn>
        </Group>

        <Group title="Experience">
          {experience.map((entry, i) => (
            <div key={i} className="space-y-2 rounded-lg border border-white/10 p-3">
              <div className="flex items-end gap-2">
                <Field label="Period" value={entry.period} onChange={(e) => patchItem('experience', i, 'period', e.target.value)} />
                <SmallBtn disabled={i === 0} onClick={() => moveItem('experience', i, -1)}>↑</SmallBtn>
                <SmallBtn disabled={i === experience.length - 1} onClick={() => moveItem('experience', i, 1)}>↓</SmallBtn>
                <SmallBtn onClick={() => removeItem('experience', i)}>✕</SmallBtn>
              </div>
              <Field label="Title" value={entry.title} onChange={(e) => patchItem('experience', i, 'title', e.target.value)} />
              <Field label="Organization" value={entry.org} onChange={(e) => patchItem('experience', i, 'org', e.target.value)} />
              <Area label="Description" value={entry.description} onChange={(e) => patchItem('experience', i, 'description', e.target.value)} />
            </div>
          ))}
          <SmallBtn onClick={() => addItem('experience', { period: '2026', title: 'New entry', org: '', description: '' })}>
            + Add entry
          </SmallBtn>
        </Group>

        <Group title="Contact & links">
          <Field label="Contact heading" value={contact.heading} onChange={(e) => patchObj('contact', 'heading', e.target.value)} />
          <Area label="Contact blurb" value={contact.blurb} onChange={(e) => patchObj('contact', 'blurb', e.target.value)} />
          <Field label="Email" value={links.email} onChange={(e) => patchObj('links', 'email', e.target.value)} />
          <Field label="GitHub" value={links.github} onChange={(e) => patchObj('links', 'github', e.target.value)} />
          <Field label="LinkedIn" value={links.linkedin} onChange={(e) => patchObj('links', 'linkedin', e.target.value)} />
          <Field label="Resume path" value={links.resume} onChange={(e) => patchObj('links', 'resume', e.target.value)} />
        </Group>
      </div>

      {/* Footer actions */}
      <div className="space-y-2 border-t border-white/10 p-4">
        <button
          onClick={() => exportContent(content)}
          className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-transform hover:scale-[1.01]"
        >
          Export data files
        </button>
        <div className="flex items-center justify-between">
          <p className="pr-3 text-[0.65rem] leading-snug text-zinc-600">
            Publishing: put the downloaded files in <code className="text-zinc-400">src/data/</code> and redeploy.
          </p>
          <button
            onClick={() => confirm('Discard all local edits and restore published content?') && reset()}
            className="shrink-0 text-xs text-zinc-500 underline-offset-2 hover:text-red-400 hover:underline"
          >
            Discard draft
          </button>
        </div>
      </div>
    </aside>
  )
}
