import { useState } from 'react'
import Section from './Section'
import CoverFlow from './CoverFlow'
import ProjectModal from './ProjectModal'
import { useContent } from '../content/ContentContext'

export default function Projects() {
  const { projects } = useContent().content
  const [selected, setSelected] = useState(null)

  return (
    <Section id="projects" eyebrow="Projects" title="The collection" className="max-w-7xl">
      <p className="-mt-6 mb-8 text-zinc-500">
        Browse like a record crate — scroll, drag, or use arrow keys.
      </p>
      <CoverFlow projects={projects} onOpen={setSelected} />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}
