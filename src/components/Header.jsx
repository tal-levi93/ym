import { NavLink } from 'react-router-dom'
import logo from '../assets/brand_logo.png'
import '../App.css'

function Header() {
  return (
    <header className="site-header" role="banner">
      <a href="/" className="brand" aria-label="דף הבית - YM-TECH פתרונות דיגיטליים">
        <img src={logo} alt="לוגו YM-TECH פתרונות דיגיטליים" className="brand-logo" />
        <span className="brand-text">YM-TECH | פתרונות דיגיטליים</span>
      </a>
      <nav className="site-nav" aria-label="ניווט ראשי">
        <ul role="menubar">
          <li role="none">
            <NavLink to="/" end role="menuitem" aria-label="עבור לדף הבית">
              בית
            </NavLink>
          </li>
          <li role="none">
            <NavLink to="/services" role="menuitem" aria-label="עבור לעמוד השירותים">
              שירותים
            </NavLink>
          </li>
          <li role="none">
            <NavLink to="/faq" role="menuitem" aria-label="עבור לעמוד השאלות הנפוצות">
              שאלות נפוצות
            </NavLink>
          </li>
          <li role="none">
            <NavLink to="/contact" role="menuitem" aria-label="עבור לעמוד יצירת קשר">
              צור קשר
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

