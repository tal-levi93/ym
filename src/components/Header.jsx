import { Link } from 'react-router-dom'
import logo from '../assets/brand_logo.png'
import '../App.css'

function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="brand">
        <img src={logo} alt="לוגו החברה" className="brand-logo" />
      </div>
      <nav className="site-nav" aria-label="Primary">
        <ul>
          <li>
            <Link to="/">בית</Link>
          </li>
          <li>
            <Link to="/projects">פרויקטים</Link>
          </li>
          <li>
            <Link to="/contact">צור קשר</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

