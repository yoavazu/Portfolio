import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { projects } from '../data/projects'
import { hero, about, contact, links, skills, experience } from '../data/site'

/**
 * All site content flows through this context.
 * - Default: the published data files in src/data/.
 * - The /#edit admin panel writes drafts here; they persist in localStorage
 *   (this browser only) until exported back into the data files.
 */
const STORAGE_KEY = 'portfolio-content-draft'

export const defaultContent = { hero, about, contact, links, skills, experience, projects }

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent
    } catch {
      return defaultContent
    }
  })

  const isDraft = useMemo(
    () => JSON.stringify(content) !== JSON.stringify(defaultContent),
    [content],
  )

  useEffect(() => {
    if (isDraft) localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    else localStorage.removeItem(STORAGE_KEY)
  }, [content, isDraft])

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    setContent(defaultContent)
  }

  return (
    <ContentContext.Provider value={{ content, setContent, reset, isDraft }}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)

/** Renders **word** segments as white emphasis inside body text. */
export function Emphasis({ text }) {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) =>
      i % 2 ? <span key={i} className="text-white">{part}</span> : part,
    )
}
