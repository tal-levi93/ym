import '../App.css'
import ProjectGrid from '../components/ProjectGrid'
import heroImage from '../assets/Designer.png'

function Home() {
  return (
    <main id="main-content">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-image-container">
          <img src={heroImage} alt="" className="hero-image" />
        </div>
      </section>

      {/* Description Section */}
      <section className="section description-section" aria-labelledby="description-title">
        <div className="section-header">
          <h2 id="description-title">מה אנחנו עושים</h2>
          <p>
            אנחנו מתמחים בשני תחומים עיקריים: אוטומציה עסקית ופיתוח אתרים מקצועיים.
            כל פרויקט שלנו מותאם במיוחד לצרכים הייחודיים של הלקוח.
          </p>
        </div>
        <div className="service-grid">
          <article className="service-card">
            <h3>שירותי אוטומציה</h3>
            <p>
              פיתוח מערכות אוטומציה מתקדמות המפשטות תהליכים עסקיים, 
              חוסכות זמן ומשאבים ומשפרות את היעילות הארגונית. 
              אנו מתמחים ביצירת פתרונות מותאמים אישית לכל עסק.
            </p>
          </article>
          <article className="service-card">
            <h3>יצירת אתרים</h3>
            <p>
              פיתוח אתרים מקצועיים, מודרניים וידידותיים למשתמש. 
              אנו יוצרים אתרים רספונסיביים, מהירים ומותאמים לנייד 
              המסייעים לעסקים להגדיל את הנוכחות הדיגיטלית שלהם.
            </p>
          </article>
          <article className="service-card">
            <h3>פתרונות דיגיטליים</h3>
            <p>
              אנו מציעים מגוון רחב של שירותים דיגיטליים כולל עיצוב ממשק משתמש, 
              אופטימיזציה למנועי חיפוש ותמיכה טכנית מתמשכת. 
              המטרה שלנו היא לעזור לעסקים להצליח במרחב הדיגיטלי.
            </p>
          </article>
        </div>
      </section>

      {/* About Us Section */}
      <section className="section about-section" aria-labelledby="about-title">
        <div className="section-header">
          <h2 id="about-title">קצת עלינו</h2>
        </div>
        <div className="about-content">
          <div className="about-card">
            <h3>טל לוי</h3>
            <p className="about-role">מהנדס תוכנה</p>
            <div className="about-details">
              <p>
                מהנדס תוכנה בן 32 עם 7 שנות ניסיון ומומחיות בתחום האפליקציות ווב. 
                מתמחה בפיתוח פתרונות דיגיטליים מתקדמים, יצירת אתרים מודרניים ומערכות אוטומציה חכמות 
                שמיועדות להקל על תהליכים עסקיים ולשפר את היעילות הארגונית.
              </p>
              <p>
                עם גישה מקצועית ומחויבות למצוינות, כל פרויקט מתבצע תוך הקפדה על איכות גבוהה, 
                זמני אספקה מדויקים ותמיכה מתמשכת. המטרה שלנו היא לספק פתרונות טכנולוגיים 
                שעונים בדיוק על הצרכים הייחודיים של כל לקוח ולסייע לעסקים להצליח בעידן הדיגיטלי.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase Section */}
      <section className="section projects-showcase" aria-labelledby="projects-title">
        <div className="section-header">
          <h2 id="projects-title">פרויקטים נבחרים</h2>
          <p>
            הנה מספר פרויקטים שמייצגים את העבודה שלנו. 
            גלוש עם העכבר מעל כל פרויקט כדי לראות תצוגה מקדימה.
          </p>
        </div>
        <ProjectGrid />
      </section>
    </main>
  )
}

export default Home

