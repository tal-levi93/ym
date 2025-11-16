import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Services from './pages/Services'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <div className="site-wrapper" id="top">
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
          <a href="#top" className="back-to-top">
            חזרה למעלה
          </a>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
