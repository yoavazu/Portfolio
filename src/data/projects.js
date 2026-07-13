/**
 * PROJECTS — the single source of truth for the Cover Flow section.
 *
 * To add / remove / reorder projects, edit this array. The UI generates itself.
 *
 * Each project:
 *  - id:          unique string
 *  - title:       project name
 *  - tagline:     one-liner shown on the cover & modal header
 *  - year:        shown on the cover like a record label
 *  - description: 2–4 sentences for the details panel
 *  - tech:        array of technology names
 *  - challenges:  short paragraph
 *  - learned:     short paragraph
 *  - github:      URL (or null to hide the button)
 *  - demo:        URL (or null to hide the button)
 *  - screenshots: array of image paths. Put the image files in public/projects/
 *                 and reference them like '/projects/solos/1.png'. Empty array
 *                 shows placeholder boxes.
 *  - cover:       CSS-only album artwork
 *      - from / to: gradient colors
 *      - ink:       text color on the cover
 *      - code:      catalog code printed top-left (e.g. 'YA-SOL')
 *      - pattern:   'rings' | 'map' | 'orb' | 'bars' | 'grid' | 'waves' |
 *                   'sunburst' | 'mosaic' — add new ones in AlbumCover.jsx
 */
export const projects = [
  {
    id: 'solos',
    title: 'SOLOS',
    tagline: 'Fitness trainer marketplace',
    year: '2025',
    description:
      'A marketplace that connects people with independent fitness trainers. Users browse trainer profiles, compare specialties and pricing, and book sessions directly — giving solo trainers the storefront they usually lack.',
    tech: ['React Native', 'Expo', 'Node.js', 'PostgreSQL'],
    challenges:
      'Designing a booking flow that works for both sides of the marketplace, and keeping trainer availability in sync in real time.',
    learned:
      'How to model a two-sided marketplace, and how much of a product lives in the details of onboarding and empty states.',
    github: 'https://github.com/yoavazulay',
    demo: null,
    screenshots: [],
    cover: { code: 'YA-SOL', from: '#ff5f3c', to: '#8a1b03', ink: '#fff3ec', pattern: 'bars' },
  },
  {
    id: 'safsalim',
    title: 'Safsalim',
    tagline: 'Map-based free furniture finder',
    year: '2024',
    description:
      'A community app for giving away and finding free furniture left on the street. Items are pinned on a live map with photos, so a couch finds a new home instead of a landfill.',
    tech: ['React Native', 'Expo', 'Maps SDK', 'Firebase'],
    challenges:
      'Keeping map performance smooth with many pins, and designing trust signals so listings stay fresh and accurate.',
    learned:
      'Working with geolocation and map clustering, and how community products depend on reducing friction to near zero.',
    github: 'https://github.com/yoavazulay',
    demo: null,
    screenshots: [],
    cover: { code: 'YA-SAF', from: '#2dd4a0', to: '#064e3b', ink: '#eafff6', pattern: 'map' },
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    tagline: 'LLM-powered automation',
    year: '2025',
    description:
      'An AI assistant that automates a real workflow end to end — understanding requests in natural language, calling tools, and reporting back. Built to explore agentic patterns beyond a plain chatbot.',
    tech: ['Python', 'Claude API', 'FastAPI', 'React'],
    challenges:
      'Making tool-calling reliable and safe, and designing prompts that stay robust as the workflow grows.',
    learned:
      'Practical LLM engineering: structured outputs, evaluation, and where deterministic code beats a model.',
    github: 'https://github.com/yoavazulay',
    demo: null,
    screenshots: [],
    cover: { code: 'YA-AI', from: '#8b7cf6', to: '#1e1145', ink: '#f0edff', pattern: 'orb' },
  },
  {
    id: 'data-science',
    title: 'Signal',
    tagline: 'Prediction & visualization study',
    year: '2024',
    description:
      'A data science project covering the full cycle: cleaning a messy real-world dataset, engineering features, training and comparing models, and presenting the findings through clear visualizations.',
    tech: ['Python', 'pandas', 'scikit-learn', 'Matplotlib'],
    challenges:
      'Resisting the urge to jump to modeling — most of the accuracy gains came from careful cleaning and feature work.',
    learned:
      'A disciplined ML workflow: honest validation, baseline-first thinking, and communicating results visually.',
    github: 'https://github.com/yoavazulay',
    demo: null,
    screenshots: [],
    cover: { code: 'YA-DAT', from: '#38bdf8', to: '#0b2447', ink: '#eaf7ff', pattern: 'grid' },
  },
  {
    id: 'mobile-app',
    title: 'Habitual',
    tagline: 'Minimal habit-tracking app',
    year: '2023',
    description:
      'A clean, opinionated mobile app for building habits — one screen, zero clutter. Designed, built and shipped as a complete product, from first sketch to app store screenshots.',
    tech: ['React Native', 'Expo', 'SQLite', 'Reanimated'],
    challenges:
      'Getting the interactions to feel native-smooth, and cutting features until only the essential loop remained.',
    learned:
      'That shipping a small polished product teaches more than starting a big unfinished one.',
    github: 'https://github.com/yoavazulay',
    demo: null,
    screenshots: [],
    cover: { code: 'YA-MOB', from: '#f4f4f5', to: '#9f9fa8', ink: '#18181b', pattern: 'rings' },
  },
]
