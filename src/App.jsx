import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <div className="site-wrapper" id="top">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
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
