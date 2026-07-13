import { lazy, Suspense, useEffect, useState } from 'react'

/**
 * Owner-only edit mode. Activate by visiting /#edit — invisible otherwise,
 * and the editor code is lazy-loaded so visitors never download it.
 *
 * PASS_HASH is the SHA-256 of the admin password. To change the password run:
 *   echo -n "your-new-password" | shasum -a 256
 * and paste the result here. (Default password: vinyl-2026)
 *
 * Note: this gates the editing UI only. Edits live in this browser's
 * localStorage until you export them into src/data/ and redeploy — the
 * published site can only change through a deploy.
 */
const PASS_HASH = '6c8675b5b3c764aab4e9e380cd4b49c05e5d1cf25f5122bd5b0e685d5eb936ad'
const SESSION_KEY = 'portfolio-admin'

const AdminPanel = lazy(() => import('./AdminPanel'))

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function PasswordGate({ onSuccess }) {
  const [error, setError] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    const value = new FormData(e.target).get('password')
    if ((await sha256(value)) === PASS_HASH) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onSuccess()
    } else {
      setError(true)
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-6 backdrop-blur-sm">
      <form
        onSubmit={submit}
        className="w-full max-w-xs rounded-2xl border border-white/10 bg-zinc-900 p-6"
      >
        <h2 className="text-sm font-semibold text-white">Owner access</h2>
        <p className="mt-1 text-xs text-zinc-500">Enter the edit-mode password.</p>
        <input
          name="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
        />
        {error && <p className="mt-2 text-xs text-red-400">Wrong password.</p>}
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-zinc-950"
          >
            Unlock
          </button>
          <button
            type="button"
            onClick={() => (location.hash = '')}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default function Admin() {
  const [wantsEdit, setWantsEdit] = useState(() => location.hash === '#edit')
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onHash = () => setWantsEdit(location.hash === '#edit')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (!wantsEdit) return null
  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />

  return (
    <>
      {/* Floating edit-mode pill */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-1 rounded-full border border-accent/40 bg-zinc-900/90 py-1.5 pl-4 pr-1.5 shadow-xl backdrop-blur">
        <span className="mr-2 flex items-center gap-2 text-xs font-medium text-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Edit mode
        </span>
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-950"
        >
          Open editor
        </button>
        <button
          onClick={() => {
            sessionStorage.removeItem(SESSION_KEY)
            location.hash = ''
          }}
          className="rounded-full px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
        >
          Exit
        </button>
      </div>
      {open && (
        <Suspense fallback={null}>
          <AdminPanel onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
