/**
 * Global site content — edit freely (or via the in-site editor at /#edit).
 * In text fields, **word** renders the word in white for emphasis.
 */

export const hero = {
  eyebrow: 'Software Engineer · AI & Data Science Student',
  name: 'Yoav Azulay',
  intro:
    'I build complete products — from the first idea and UX sketch to architecture, code and deployment. Currently studying Data Science & Engineering at the Technion.',
}

export const about = {
  title: 'A builder at heart',
  paragraphs: [
    "I'm a Data Science & Engineering student at the **Technion**, and I've been programming since I was around 15.",
    'What drives me is building **complete products** — identifying a real problem, designing the experience, architecting the system, implementing it, and shipping it to real users.',
    "Along the way I've built React applications, React Native mobile apps, AI-powered tools, and data science projects — always aiming for work that feels considered, not just functional.",
  ],
  interests: ['AI', 'Software Engineering', 'Product Development', 'Mobile Apps', 'Data Science', 'Startups'],
}

export const contact = {
  heading: "Let's build something together.",
  blurb:
    'Open to internships, collaborations and interesting problems. The fastest way to reach me is email.',
}

export const links = {
  github: 'https://github.com/yoavazulay',
  linkedin: 'https://www.linkedin.com/in/yoavazulay',
  email: 'yoav.azu@gmail.com',
  resume: '/resume.pdf',
}

export const skills = [
  { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'C', 'C++'] },
  { category: 'Frameworks', items: ['React', 'React Native', 'Expo', 'Node.js', 'FastAPI', 'Tailwind CSS'] },
  { category: 'AI & Data', items: ['pandas', 'NumPy', 'scikit-learn', 'PyTorch', 'LLM APIs', 'Data Visualization'] },
  { category: 'Databases', items: ['PostgreSQL', 'SQLite', 'Firebase', 'MongoDB'] },
  { category: 'Tools', items: ['Git', 'Docker', 'Linux', 'Figma', 'Vite', 'CI/CD'] },
]

export const experience = [
  {
    period: '2023 — Present',
    title: 'B.Sc. Data Science & Engineering',
    org: 'Technion — Israel Institute of Technology',
    description:
      'Studying the full data science stack — mathematics, statistics, machine learning and software engineering.',
  },
  {
    period: '2024 — Present',
    title: 'Independent Product Development',
    org: 'Personal projects',
    description:
      'Designing, building and shipping complete products end to end: mobile apps, AI-powered tools and web applications.',
  },
  {
    period: '2015 — 2023',
    title: 'Self-taught Programmer',
    org: 'Started at age 15',
    description:
      'Learned programming by building things — from small scripts and games to full applications.',
  },
]
