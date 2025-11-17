import { useState } from 'react'
import '../App.css'
import SEO from '../components/SEO'
import { getOrganizationStructuredData } from '../utils/structuredData'
import { projectsData } from '../data/projects'
import VideoModal from '../components/VideoModal'

function Projects() {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const structuredData = getOrganizationStructuredData()
  
  const allProjects = projectsData
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(null)

  const handleVideoClick = (videoUrl, projectTitle) => {
    if (videoUrl) {
      setSelectedVideo(videoUrl)
      setSelectedProjectTitle(projectTitle)
    }
  }

  const handleCloseModal = () => {
    setSelectedVideo(null)
    setSelectedProjectTitle(null)
  }

  return (
    <>
      <SEO
        title="כל הפרויקטים שלנו | אוטומציה ויצירת אתרים"
        description="אוסף הפרויקטים שלנו בתחומי האוטומציה ופיתוח אתרים. אתרים מותאמים אישית, מערכות CRM, אוטומציה עסקית ופתרונות דיגיטליים מתקדמים."
        keywords="פרויקטים, תיק עבודות, דוגמאות פרויקטים, אתרים, CRM, אוטומציה, פיתוח תוכנה, תיק פרויקטים"
        canonical={`${siteUrl}/projects`}
        ogImage={`${siteUrl}/favicon.png`}
        structuredData={structuredData}
      />
      <main id="main-content">
      <section className="section projects-page" aria-labelledby="projects-page-title">
        <div className="section-header">
          <h1 id="projects-page-title">כל הפרויקטים שלנו</h1>
          <p>
            הנה אוסף הפרויקטים שלנו בתחומי האוטומציה ופיתוח אתרים. 
            כל פרויקט מותאם במיוחד לצרכי הלקוח.
          </p>
        </div>
        <div className="projects-grid" role="list" aria-label="רשימת כל הפרויקטים">
          {allProjects.map((project) => (
            <article key={project.id} className="project-card-full" role="listitem">
              <div 
                className={`project-image-placeholder ${project.videoUrl ? 'has-video' : ''}`}
                onClick={() => handleVideoClick(project.videoUrl, project.title)}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && project.videoUrl) {
                    e.preventDefault()
                    handleVideoClick(project.videoUrl, project.title)
                  }
                }}
                style={{ cursor: project.videoUrl ? 'pointer' : 'default' }}
                role={project.videoUrl ? 'button' : undefined}
                tabIndex={project.videoUrl ? 0 : -1}
                aria-label={project.videoUrl ? `פתח וידאו של ${project.title}` : undefined}
              >
                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="project-video-thumbnail"
                    aria-hidden="true"
                  />
                ) : project.image ? (
                  <img src={project.image} alt={`תמונת פרויקט: ${project.title}`} />
                ) : (
                  <div className="project-placeholder-content">
                    <span className="project-category">{project.category}</span>
                  </div>
                )}
              </div>
              <div className="project-card-content">
                <span className="project-category-badge" aria-label={`קטגוריה: ${project.category}`}>
                  {project.category}
                </span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="project-technologies" role="list" aria-label="טכנולוגיות">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag" role="listitem">{tech}</span>
                    ))}
                  </div>
                )}
                {project.year && (
                  <span className="project-year" aria-label={`שנת פרויקט: ${project.year}`}>
                    {project.year}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <VideoModal
        videoUrl={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={handleCloseModal}
        projectTitle={selectedProjectTitle}
      />
    </main>
    </>
  )
}

export default Projects

