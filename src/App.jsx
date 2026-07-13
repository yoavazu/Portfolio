import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Footer from './components/Footer'
import Admin from './admin/Admin'
import { ContentProvider } from './content/ContentContext'

export default function App() {
  return (
    <ContentProvider>
      <Navbar />
      <main>
        <Hero />
        <Projects />
      </main>
      <Footer />
      <Admin />
    </ContentProvider>
  )
}
