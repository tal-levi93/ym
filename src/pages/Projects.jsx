import '../App.css'
import { projectsData } from '../data/projects'

function Projects() {
  const allProjects = projectsData

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
                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    muted
                    loop
                    playsInline
                    className="project-video-thumbnail"
                  />
                ) : project.image ? (
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
                {project.technologies && project.technologies.length > 0 && (
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
                {project.year && (
                  <span className="project-year">{project.year}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Projects

