import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Services from './pages/Services'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="site-wrapper" id="top">
        <a href="#main-content" className="skip-link">
          דלג לתוכן הראשי
        </a>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <footer className="site-footer" role="contentinfo">
          <p>
            &copy; {new Date().getFullYear()} אוטומציה ויצירת אתרים. 
            שירותים מקצועיים ללא פשרות.
          </p>
          <a href="#top" className="back-to-top" aria-label="חזרה לתחילת הדף">
            חזרה למעלה
          </a>
        </footer>
        <div id="aria-live-region" aria-live="polite" aria-atomic="true" className="sr-only"></div>
      </div>
    </BrowserRouter>
  )
}

export default App
