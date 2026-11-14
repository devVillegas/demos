import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Quoter from './components/Quoter.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import FloatingBadge from './components/FloatingBadge.jsx'
import SavedDataModal from './components/SavedDataModal.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'
import { DEMO_STORAGE_KEY } from './hooks/useLocalStorage.js'

export default function App() {
  const [quotations, setQuotations] = useLocalStorage('cotizaciones', [])
  const [messages, setMessages] = useLocalStorage('mensajes', [])
  const [viewerOpen, setViewerOpen] = useState(false)

  const deleteQuotation = (id) => {
    setQuotations((current) => current.filter((item) => item.id !== id))
  }

  const deleteMessage = (id) => {
    setMessages((current) => current.filter((item) => item.id !== id))
  }

  const resetDemoData = () => {
    try {
      window.localStorage.removeItem(DEMO_STORAGE_KEY)
    } catch {
      /* almacenamiento no disponible: la recarga igual restaura el estado inicial */
    }
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-night-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Quoter />
        <Testimonials />
        <Contact />
      </main>
      <Footer onReset={resetDemoData} />

      <FloatingBadge onClick={() => setViewerOpen(true)} />
      <SavedDataModal
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        quotations={quotations}
        messages={messages}
        onDeleteQuotation={deleteQuotation}
        onDeleteMessage={deleteMessage}
      />
    </div>
  )
}
