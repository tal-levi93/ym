import '../App.css'

function Projects() {
  // Placeholder projects - can be replaced with actual data later
  const allProjects = [
    {
      id: 1,
      title: 'מערכת אוטומציה לניהול מלאי',
      description: 'פתרון מתקדם לניהול אוטומטי של מלאי ומעקב אחר מוצרים',
      category: 'אוטומציה',
      image: null, // Placeholder
    },
    {
      id: 2,
      title: 'אתר תדמית לעסק קטן',
      description: 'אתר תדמית מקצועי עם עיצוב מודרני ונוח לנייד',
      category: 'אתרים',
      image: null,
    },
    {
      id: 3,
      title: 'פלטפורמת מסחר אלקטרוני',
      description: 'מערכת מסחר מקוונת מתקדמת עם תשלומים מאובטחים',
      category: 'אתרים',
      image: null,
    },
    {
      id: 4,
      title: 'אוטומציה לניהול לקוחות',
      description: 'מערכת CRM מותאמת אישית עם תהליכי עבודה אוטומטיים',
      category: 'אוטומציה',
      image: null,
    },
    {
      id: 5,
      title: 'אתר חברה גדולה',
      description: 'אתר תדמית מורכב עם מערכת ניהול תוכן',
      category: 'אתרים',
      image: null,
    },
    {
      id: 6,
      title: 'אוטומציה לתהליכי ייצור',
      description: 'פתרון אוטומציה מותאם לתעשייה ספציפית',
      category: 'אוטומציה',
      image: null,
    },
  ]

  return (
    <main id="main-content">
      <section className="section projects-page" aria-labelledby="projects-page-title">
        <div className="section-header">
          <h1 id="projects-page-title">כל הפרויקטים שלנו</h1>
          <p>
            הנה אוסף הפרויקטים שלנו בתחומי האוטומציה ופיתוח אתרים. 
            כל פרויקט מותאם במיוחד לצרכי הלקוח.
          </p>
        </div>
        <div className="projects-grid">
          {allProjects.map((project) => (
            <article key={project.id} className="project-card-full">
              <div className="project-image-placeholder">
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div className="project-placeholder-content">
                    <span className="project-category">{project.category}</span>
                  </div>
                )}
              </div>
              <div className="project-card-content">
                <span className="project-category-badge">{project.category}</span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Projects

