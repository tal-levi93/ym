import { NavLink } from 'react-router-dom'
import logo from '../assets/brand_logo.png'
import '../App.css'

function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="brand">
        <img src={logo} alt="לוגו החברה" className="brand-logo" />
        <span className="brand-text">YM אתרים ואוטומציה</span>
      </div>
      <nav className="site-nav" aria-label="Primary">
        <ul>
          <li>
            <NavLink to="/" end>בית</NavLink>
          </li>
          <li>
            <NavLink to="/projects">פרויקטים</NavLink>
          </li>
          <li>
            <NavLink to="/contact">צור קשר</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

